# 3.2. 令牌端点

客户端使用令牌端点，凭借如第 4 节和第 4.3 节所述的授权，来获取访问令牌。

客户端获取令牌端点 URL 的方式不在本规范的范围内，但该 URL 通常在该服务的文档中提供，并在客户端开发期间进行配置，或者在授权服务器的元数据文档 [[RFC8414](https://www.rfc-editor.org/info/rfc8414)] 中提供，并在运行时以编程方式获取。

令牌端点 URL **禁止**包含片段组件，**可以**包含一个 application/x-www-form-urlencoded 格式的查询组件 [[WHATWG.URL](https://url.spec.whatwg.org/)]。

客户端在请求令牌端点时，**必须**使用 HTTP POST 方法。

授权服务器**必须**忽略发送到令牌端点的未识别的请求参数。

**禁止**重复包含本规范定义的请求和响应参数。没有值的参数**必须**被视为从请求中省略。

希望支持浏览器应用（仅在客户端 JavaScript 中运行、不访问后端服务器的应用）的授权服务器需要确保令牌端点支持必要的 CORS [[WHATWG.CORS](https://fetch.spec.whatwg.org/#http-cors-protocol)] 头，以允许应用看到响应。如果授权服务器向应用提供了其它端点，例如元数据 URL、动态客户端注册、撤销、检查、发现或用户信息端点，那么这些端点也可以被浏览器应用访问，并且还需要定义 CORS 头以允许访问。详见 [[I-D.ietf-oauth-browser-based-apps](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps-15)]。

## 3.2.1. 客户端认证

机密客户端在请求令牌端点时，**必须**与授权服务器进行认证，如第 2.4 节所述。

客户端认证用于：

- 强制绑定刷新令牌、授权码和它们被颁发给的客户端。当授权码通过不安全的通道传输到重定向端点时，客户端认证增加了额外的安全层。

- 通过禁用客户端或更改其凭据，从被攻陷的客户端中恢复，以防止攻击者滥用被盗的刷新令牌。只更改单组客户端凭据，要比撤销整个组的刷新令牌快得多。

- 实现认证管理的最佳实践，后者要求定期进行凭据轮换。整组刷新令牌的轮换可能具有挑战性，而单组客户端凭据的轮换则更加容易。

## 3.2.2. 令牌请求

客户端使用 UTF-8 字符编码，以附录 B 中的 application/x-www-form-urlencoded 格式，在 HTTP 请求内容中发送以下参数，来请求令牌端点：

**"client_id"：** 如果客户端未与授权服务器进行认证（如 3.2.1 节所述），则此参数是**必需**的。

**"grant_type"：** **必需**。客户端在该次令牌请求中使用的授权许可类型标识符。本规范定义的值有 authorization_code、refresh_token 和 client_credentials。授权许可类型决定了令牌请求所需的或支持的进一步参数。关于这些授权许可类型的详细信息在下面定义。

机密客户端**必须**与授权服务器进行认证，如第 3.2.1 节所述。

例如，客户端发送以下 HTTP 请求（额外的换行符仅用于展示）：

```http
POST /token HTTP/1.1
Host: server.example.com
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code=SplxlOBeZQQYbYS6WxSbIA
&redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb
&code_verifier=3641a2d12d66101249cdf7a79c000c1f8c05d2aafcf14bf146497bed
```

授权服务器**必须**：

- 要求认证机密客户端（或有其他认证要求的客户端）。
- 如果请求中包含客户端认证信息，则认证客户端。

还有一些每种授权许可类型特有的处理规则，在相应的授权许可类型中进行了说明。

## 3.2.3. 令牌响应

如果访问令牌请求有效且已授权，授权服务器就颁发访问令牌和可选的刷新令牌。

如果请求的客户端认证失败或无效，授权服务器就返回错误响应，如第 3.2.4 节所述。

授权服务器在颁发访问令牌和可选的刷新令牌时，使用 [[RFC8259](https://www.rfc-editor.org/info/rfc8259)] 定义的 application/json 媒体类型，创建 HTTP 响应内容，其中包含以下参数和 HTTP 200（OK）状态码。

**"access_token"：** **必需**。授权服务器颁发的访问令牌。

**"token_type"：** **必需**。颁发的访问令牌的类型，如第 1.4 节所述。值不区分大小写。

**"expires_in"：** **建议**。访问令牌的生命周期，形式为 JSON 数字，以秒为单位。例如，值 3600 表示访问令牌将在响应生成一小时后过期。如果省略，那么授权服务器**应该**通过其他方式提供过期时间，或者在文档中记录默认值。

**"scope"：** 如果与客户端请求的范围相同，那么就是**建议**的，否则是**必需**的。访问令牌的范围如第 1.4.1 节所述。

**"refresh_token"：** **可选**。刷新令牌，可用于根据相应的令牌请求中传递的授权许可，来获取新的访问令牌。

授权服务器**应该**根据风险评估和自身策略，决定是否向特定客户端颁发刷新令牌。如果授权服务器决定不颁发刷新令牌，客户端**可以**通过再次启动 OAuth 流程（例如发起新的授权码请求）来获取新的访问令牌。在这种情况下，授权服务器可以使用 cookies 和长期授权许可，来优化用户体验。

如果授权服务器决定颁发刷新令牌，这些刷新令牌**必须**与资源所有者所同意的范围和资源服务器绑定。这是为了防止合法客户端的权限提升，并减轻刷新令牌泄漏的影响。

这些参数被序列化为 JavaScript 对象表示（JSON）结构，被依次添加到 JSON 的最高结构层级。参数名称和字符串值以 JSON 字符串形式被包含。数字值以 JSON 数字形式被包含。参数的顺序不重要，可以改变。

授权服务器**必须**在包含有令牌、凭据或其它敏感信息的任何响应中，包含 HTTP Cache-Control 响应头字段（参见 [[RFC9111](https://www.rfc-editor.org/info/rfc9111)] 的第 5.2 节），值为 no-store。

例如：

```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store

{
  "access_token":"2YotnFZFEjr1zCsicMWpAA",
  "token_type":"Bearer",
  "expires_in":3600,
  "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA",
  "example_parameter":"example_value"
}
```

客户端**必须**忽略响应中未识别的值名称。从授权服务器接收到的令牌和其他值的大小未定义。客户端应该避免对值的大小做出假设。授权服务器**应该**在文档中记录其颁发的任何值的大小。

## 3.2.4. 错误响应

授权服务器以 HTTP 400（错误请求）状态码作为响应（除非另有规定），并在响应中包含以下参数：

**"error"：** **必需**。下列 ASCII [[USASCII](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-10#USASCII)] 字符的错误代码之一：

- **"invalid_request"：** 请求缺少必需的参数，或者包含了不支持的参数值（授权许可类型除外），或者重复了某个参数，或者包含了多个凭据，或者使用了多种客户端认证机制，或者虽然在授权请求中未发送 code_challenge，但是现在却包含了 code_verifier，或者格式有其它错误。
- **"invalid_client"：** 客户端认证失败（例如，未知客户端，或者未包含客户端认证信息，或者认证方法不支持）。授权服务器**可以**返回 HTTP 401（未授权）状态码，来指示支持哪些 HTTP 认证方案。如果客户端尝试通过 Authorization 请求头字段进行认证，授权服务器**必须**响应 HTTP 401（未授权）状态码，并包含与客户端使用的认证方案相匹配的 WWW-Authenticate 响应头字段。
- **"invalid_grant"：** 提供的授权许可（例如，授权码或资源所有者凭据）或刷新令牌无效、过期、被撤销、与授权请求中使用的重定向 URI 不匹配，或已被颁发给其他客户端。
- **"unauthorized_client"：** 认证客户端无权使用该授权许可类型。
- **"unsupported_grant_type"：** 授权服务器不支持该授权许可类型。
- **"invalid_scope"：** 请求的范围无效、未知、格式错误或超出了资源所有者授予的范围。
- error 参数的值**禁止**包含集合 %x20-21 / %x23-5B / %x5D-7E 之外的字符。

**"error_description"：** **可选**。提供额外信息的人类可读 ASCII [[USASCII](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-10#USASCII)] 文本，用于帮助客户端开发人员理解发生的错误。error_description 参数的值**禁止**包含集合 %x20-21 / %x23-5B / %x5D-7E 之外的字符。

**"error_uri"：** **可选**。标识了人类可读的包含错误信息的网页的 URI，用于向客户端开发人员提供错误的更多信息。error_uri 参数的值**必须**符合 URI 引用语法，因此**禁止**包含集合 %x21 / %x23-5B / %x5D-7E 之外的字符。

这些参数以 [[RFC7159](https://www.rfc-editor.org/info/rfc7159)] 定义的 application/json 媒体类型，包含在 HTTP 响应的内容中。这些参数被序列化为 JSON 结构，依次被添加到最高结构层级。参数名称和字符串值以 JSON 字符串形式被包含。数字值以 JSON 数字形式被包含。参数的顺序不重要，可以改变。

例如：

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
Cache-Control: no-store

{
 "error":"invalid_request"
}
```
