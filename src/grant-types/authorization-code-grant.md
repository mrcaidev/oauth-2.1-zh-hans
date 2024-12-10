# 4.1. 授权码许可

授权码许可类型用于获取访问令牌和刷新令牌。

该许可类型使用额外的授权端点，以便授权服务器与资源所有者进行交互，来获取对资源访问权限的同意。

由于该流程基于重定向，客户端必须能够使用资源所有者的用户代理（通常是网络浏览器）启动流程，并且能够从授权服务器处被重定向回到客户端自身。

```
+----------+
| Resource |
|   Owner  |
+----------+
    ^
    |
    |
+-----|----+          Client Identifier      +---------------+
| .---+---------(1)-- & Redirect URI ------->|               |
| |   |    |                                 |               |
| |   '---------(2)-- User authenticates --->|               |
| | User-  |                                 | Authorization |
| | Agent  |                                 |     Server    |
| |        |                                 |               |
| |    .--------(3)-- Authorization Code ---<|               |
+-|----|---+                                 +---------------+
|    |                                         ^      v
|    |                                         |      |
^    v                                         |      |
+---------+                                      |      |
|         |>---(4)-- Authorization Code ---------'      |
|  Client |          & Redirect URI                     |
|         |                                             |
|         |<---(5)----- Access Token -------------------'
+---------+       (w/ Optional Refresh Token)
```

<p align="center">图 3：授权码流程</p>

图 3 所示的流程包括下列步骤：

（1）客户端启动流程，将资源所有者的用户代理定向到授权端点。客户端在此次定向中包含它的客户端标识符、代码质询（派生自生成的代码验证器）、可选的请求范围、可选的本地状态，以及重定向 URI。一旦访问权限被许可（或拒绝），授权服务器就会将用户代理送回该重定向 URI。

（2）授权服务器（通过用户代理）认证资源所有者，并确认资源所有者是许可还是拒绝客户端的访问权限请求。

（3）假设资源所有者许可访问权限，那么授权服务器就使用之前（在请求中或客户端注册时）提供的重定向 URI，将用户代理重定向回到客户端。重定向 URI 包含了授权码和客户端之前提供的本地状态。

（4）客户端向授权服务器的令牌端点请求访问令牌，并在该请求中包含上一步骤中接收到的授权码，以及它的代码验证器。在发起请求时，如果可能，客户端与授权服务器进行认证。客户端还在该请求中包含用于获取授权码的重定向 URI，用于验证。

（5）授权服务器认证客户端（如果可能）、验证授权码、验证代码验证器，并确保接收到的重定向 URI 与步骤（3）中用于重定向客户端的 URI 相匹配。如果有效，授权服务器响应访问令牌和可选的刷新令牌。

## 4.1.1. 授权请求

为了发起授权请求，客户端在授权服务器的授权端点 URI 上添加参数，来构建授权请求 URI。客户端最终会将用户代理重定向到该 URI，来发起授权请求。

为了防止授权码注入和 CSRF 攻击，客户端在每个授权请求中，都使用一把唯一的密钥。客户端首先生成该密钥，然后在它拿到授权码时使用，来证明使用授权码的客户端就是请求授权码的客户端。

客户端以附录 B 中的 application/x-www-form-urlencoded 格式，将以下参数添加到授权端点 URI 的查询组件中，来构建请求 URI：

**"response_type":** **必需**。授权端点支持不同的请求参数和响应参数。客户端使用特定的 response_type 值，来决定流程的类型。本规范定义了值 code，该值必须用于表示客户端希望使用授权码流程。

扩展的响应类型**可以**包含一个以空格（%x20）分隔的值列表，值的顺序不重要（例如，响应类型 a b 与 b a 相同）。这种组合式响应类型的含义，由它们各自的规范定义。

[[OpenID](https://openid.net/specs/openid-connect-core-1_0.html)] 定义了一些扩展响应类型。

如果授权请求缺少 response_type 参数，或者 response_type 参数无法被理解，授权服务器**必须**返回错误响应，如第 4.1.2.1 节所述。

**“client_id”：** **必需**。客户端标识符，如第 2.2 节所述。

**“code_challenge”：** **必需**或**建议**（见第 7.5.1 节）。代码质询。

**“code_challenge_method”：** 可选。如果请求中未提供，那么就默认为 plain。代码验证器的转换方法为 S256 或 plain。

**“redirect_uri”：** 仅当客户端只注册了一个重定向 URI 时，是**可选**的。如果客户端注册了多个重定向 URI，则是**必需**的。见第 2.3.2 节。

**“scope”：** **可选**。访问请求的范围，如第 1.4.1 节所述。

**“state”：** **可选**。客户端使用的一个不透明值，用来在请求和重定向回调之间保持状态。在将用户代理重定向回到客户端时，授权服务器包含此值。

代码验证器是为每个授权请求生成的唯一的高熵加密随机字符串，使用未保留字符 [A-Z] / [a-z] / [0-9] / "-" / "." / "\_" / "~"，最短 43 个字符，最长 128 个字符。

客户端临时存储代码验证器，然后计算代码质询，用于授权请求。

代码验证器的 ABNF 定义如下。

```
code-verifier = 43*128unreserved
unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~"
ALPHA = %x41-5A / %x61-7A
DIGIT = %x30-39
```

客户端**应该**使用不会在授权请求中暴露代码验证器的代码质询方法。否则，能够读取授权请求的攻击者（见 [[I-D.ietf-oauth-security-topics](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-24)] 中的攻击者 A4）可以破坏该机制提供的安全性。目前，S256 是唯一的这种方法。

请注意，代码验证器**应该**具有足够高的熵，以至于猜中它的值变得不切实际。**建议**使用合适的随机数生成器的输出，来创建一个 32 个字节的序列。然后，将字节序列进行 base64url 编码，以生成一个 43 个字节的、URL 安全的字符串，作为代码验证器。

然后，客户端通过对代码验证器使用以下转换之一，派生一个代码质询：

```
S256
  code_challenge = BASE64URL-ENCODE(SHA256(ASCII(code_verifier)))

plain
  code_challenge = code_verifier
```

如果客户端能够使用 S256，那么它就**必须**使用 S256，因为 S256 在服务器上是强制实现（MTI）的。仅当由于技术原因无法支持 S256 时，例如客户端没有可用的哈希函数，并且通过带外配置或授权服务器元数据 [[RFC8414](https://www.rfc-editor.org/info/rfc8414)] 得知服务器支持 plain 时，客户端才被允许使用 plain。

代码质询的 ABNF 如下：

```
code-challenge = 43*128unreserved
unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~"
ALPHA = %x41-5A / %x61-7A
DIGIT = %x30-39
```

代码质询和代码验证器采用了 OAuth 2.0 扩展中称为“Proof-Key for Code Exchange”或 PKCE [[RFC7636](https://www.rfc-editor.org/info/rfc7636)] 的技术。该技术在此被最先提出。

授权服务器**必须**支持 code_challenge 和 code_verifier 参数。

客户端**必须**使用 code_challenge 和 code_verifier，授权服务器**必须**强制使用它们，除非条件不符合第 7.5.1 节的描述。在这种情况下，仍然**建议**按照以下描述，强制使用 code_challenge 和 code_verifier。

state 和 scope 参数**不应该**以明文形式包含敏感的客户端信息或资源拥有者信息，因为它们可能通过不安全的通道传输，或者以不安全的方式存储。

客户端通过 HTTP 重定向，或者其它用户代理中可用的方式，将资源拥有者定向到构建的 URI。

例如，客户端将用户代理定向，来发起如下请求（额外的换行符仅为展示目的）：

```http
GET /authorize?response_type=code&client_id=s6BhdRkqt3&state=xyz
    &redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb
    &code_challenge=6fdkQaPm51l13DSukcAH3Mdx7_ntecHYd1vi3n0hMZY
    &code_challenge_method=S256 HTTP/1.1
Host: server.example.com
```

授权服务器验证请求，确保所有必需的参数都存在且有效。

特别是，如果请求中存在 redirect_uri，那么授权服务器就**必须**验证它，确保它与在客户端注册过程中事先注册好的重定向 URI 之一相匹配（第 2 节）。在比较这两个 URI 时，授权服务器**必须**确保两个 URI 相等，详见 [[RFC3986](https://www.rfc-editor.org/info/rfc3986)] 第 6.2.1 节“字符串简单匹配”。

如果请求有效，那么授权服务器就认证资源所有者，并（通过询问资源所有者，或者通过其他方式进行批准）获取授权的决定。

当决定被做出时，授权服务器通过 HTTP 重定向响应，或者通过用户代理中可用的其它方式，将用户代理定向到提供的客户端重定向 URI。

## 4.1.2. 授权响应

如果资源所有者许可了访问权限的请求，那么授权服务器将颁发一个授权码，并以 application/x-www-form-urlencoded 格式，将下列参数添加到重定向 URI 的查询组件中，将其传递给客户端：

**“code”：** **必须**。授权码由授权服务器生成，并且对客户端不透明。授权码**必须**在被颁发后的短时间内过期，以减少泄露的风险。授权码的最长寿命**建议**为 10 分钟。授权码与客户端标识符、代码质询和重定向 URI 绑定。

**“state”：** 如果客户端的授权请求中存在 state 参数，那么就是**必需**的。其值与从客户端处接收到的值相同。

**“iss”：** **可选**。授权服务器的标识符。如果客户端与多个授权服务器进行交互，那么客户端可以使用它来防止混淆攻击。关于该参数何时是必要的，以及客户端如何使用它来防止混淆攻击，详见第 7.13 节和 [[RFC9207](https://www.rfc-editor.org/info/rfc9207)]。

例如，授权服务器发送以下 HTTP 响应，将用户代理重定向：

```http
HTTP/1.1 302 Found
Location: https://client.example.com/cb?code=SplxlOBeZQQYbYS6WxSbIA
          &state=xyz&iss=https%3A%2F%2Fauthorization-server.example.com
```

客户端**必须**忽略未识别的响应参数。本规范未定义授权码字符串的大小。客户端应该避免对授权码值的大小做出假设。授权服务器**应该**记载其颁发的任何值的大小。

授权服务器**必须**将 code_challenge 和 code_challenge_method 的值与颁发的授权码关联起来，以便稍后可以验证代码质询。

服务器用来关联 code_challenge 和颁发的授权码的确切方法不在本规范的范围内。代码质询可以被存储在服务器上，并与授权码关联。code_challenge 和 code_challenge_method 的值可以以加密形式存储在授权码本身中，但服务器**禁止**以除授权服务器外的其它实体可以提取的形式，在响应参数中包含 code_challenge 的值。

客户端**必须**防止攻击者将授权码注入（重播）到授权响应中。使用 code_challenge 和 code_verifier 可以防止授权码注入，因为授权服务器会拒绝 code_verifier 不匹配的令牌请求。详见第 7.5.1 节。

### 4.1.2.1. 错误响应

如果由于重定向 URI 缺失、无效或不匹配，或者客户端标识符缺失或无效，导致请求失败，授权服务器**应该**告知资源所有者错误，并且**禁止**自动将用户代理重定向到无效的重定向 URI。

授权服务器**必须**拒绝来自公共客户端的、没有 code_challenge 的请求。授权服务器也**必须**拒绝来自其它类型客户端的这种请求，除非有合理的保障表明客户端以其它方式减轻了授权码注入的风险。详见第 7.5.1 节。

如果服务器不支持请求的 code_challenge_method 转换方法，那么授权端点**必须**返回授权错误响应，并将 error 值设置为 invalid_request。error_description 或 error_uri 的响应**应该**解释错误的性质，例如，不支持的转换算法。

如果资源所有者拒绝了访问权限请求，或者请求由于除了重定向 URI 缺失或无效以外的其它原因而失败，那么授权服务器就以附录 B 中的 application/x-www-form-urlencoded 格式，将以下参数添加到重定向 URI 的查询组件中，来告知客户端：

**“error”：** **必需**。下列之一的 ASCII [[USASCII](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-12#USASCII)] 错误代码：

- **“invalid_request”：** 请求缺少必需的参数，或者包含无效的参数值，或者重复包含同个参数，或者其它格式错误。
- **“unauthorized_client”：** 客户端无权使用该方法来请求授权码。
- **“access_denied”：** 资源所有者或授权服务器拒绝了请求。
- **“unsupported_response_type”：** 授权服务器不支持使用该方法来获取授权码。
- **“invalid_scope”：** 请求的范围无效、未知或格式错误。
- **“server_error”：** 授权服务器遇到意外情况，无法满足请求。（需要该错误代码，因为无法通过 HTTP 重定向将 500 内部服务器错误 HTTP 状态码返回给客户端。）
- **“temporarily_unavailable”：** 授权服务器当前无法处理请求，因为服务器临时超载或正在维护。（需要该错误代码，因为无法通过 HTTP 重定向将 503 服务不可用 HTTP 状态代码返回给客户端。）

error 参数的值**禁止**包含集合 %x20-21 / %x23-5B / %x5D-7E 之外的字符。

**“error_description”：** **可选**。人类可读的 ASCII [[USASCII](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-12#USASCII)] 文本，提供额外信息，帮助客户端开发者理解发生的错误。error_description 参数的值**禁止**包含集合 %x20-21 / %x23-5B / %x5D-7E 之外的字符。

**“error_uri”：** **可选**。标识了一个人类可读的网页的 URI，提供关于错误的信息，向客户端开发者提供额外的错误信息。error_uri 参数的取值**必须**符合 URI 引用语法，因此**禁止**包含集合 %x21 / %x23-5B / %x5D-7E 之外的字符。

**“state”：** 如果客户端的授权请求中存在 state 参数，那么就是**必需**的。其值与从客户端处接收到的值相同。

**“iss”：** **可选**。授权服务器的标识符。详见第 4.1.2 节所述。

例如，授权服务器发送如下的 HTTP 响应，将用户代理重定向：

```http
HTTP/1.1 302 Found
Location: https://client.example.com/cb?error=access_denied
          &state=xyz&iss=https%3A%2F%2Fauthorization-server.example.com
```

## 4.1.3. 令牌端点扩展

在令牌端点上，该许可类型通过 grant_type 值为 authorization_code 来被标识。

如果设置了该值，那么以下这些在第 3.2.2 节描述之外的、额外的令牌请求参数也是必需的：

**“code”：** **必需**。从授权服务器处接收到的授权码。

**“code_verifier”：** 如果授权请求中包含了 code_challenge 参数，那么就是**必需**的，否则**禁止**使用。原始的代码验证器字符串。

对于一个给定的授权码，授权服务器**必须**仅返回一次访问令牌。

如果在第二次有效的令牌请求中，其授权码与先前已成功的令牌请求中的相同，那么授权服务器**必须**拒绝该请求，并且**应该**（在可能的情况下）撤销先前颁发的、基于该授权码的所有访问令牌和刷新令牌。详见第 7.5.3 节。

例如，客户端发起了如下的 HTTP 请求（额外的换行符仅为展示目的）：

```http
POST /token HTTP/1.1
Host: server.example.com
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=SplxlOBeZQQYbYS6WxSbIA
&code_verifier=3641a2d12d66101249cdf7a79c000c1f8c05d2aafcf14bf146497bed
```

除了第 3.2.2 节中的处理规则以外，授权服务器还**必须**：

- 确保授权码颁发给了经过认证的机密客户端。或者，如果客户端是公共客户端，那么确保授权码颁发给了请求中的 client_id。
- 验证授权码有效。
- 当且仅当授权请求中存在 code_challenge 参数时，验证 code_verifier 参数是否存在。
- 如果 code_verifier 存在，那么首先根据客户端指定的 code_challenge_method 方法将它转换，派生出一个代码质询，然后与先前关联的 code_challenge 比较，来验证 code_verifier。
- 如果对于令牌请求中的授权码，没有任何授权请求中的 code_challenge 与其相关联，那么授权服务器**必须**拒绝该令牌请求。

关于令牌请求中的 redirect_uri 参数与 OAuth 2.0 客户端的向后兼容性，详见第 10.2 节。
