# 3.2. 令牌端点

客户端使用如[第 4 节](/grant-types/)和[第 4.3 节](/grant-types/refresh-token-grant)所述的许可，在令牌端点上获取访问令牌。

客户端获知令牌端点 URL 的方式不在本规范的范围内，但该 URL 通常会在服务的文档中提供，并在客户端开发期间依此配置；或者会在授权服务器的元数据文档 [[RFC8414](https://www.rfc-editor.org/info/rfc8414)] 中提供，并在运行时用代码获取。

令牌端点 URL **禁止**包含片段部分，**可以**包含查询字符串部分（[附录 C.1](/appendices/serializations#c-1-查询字符串序列化)）。

客户端**必须**使用 HTTP POST 方法请求令牌端点。

授权服务器**必须**忽略发送到令牌端点的、无法识别的请求参数。

**禁止**重复携带本规范定义的请求和响应参数。没有值的参数**必须**被视为从请求中省略。

授权服务器如果想要支持浏览器应用（仅在客户端 JavaScript 中运行，不访问后端服务器的应用），那么就需要确保令牌端点支持必要的 CORS [[WHATWG.CORS](https://fetch.spec.whatwg.org/#http-cors-protocol)] 头，以允许应用看到响应。如果授权服务器向应用提供了其它端点，例如元数据 URL、动态客户端注册、撤销、检查、发现或用户信息端点，那么这些端点也可能被浏览器应用访问，并且同样需要定义 CORS 头以允许访问。详见 [[I-D.ietf-oauth-browser-based-apps](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps-19)]。

## 3.2.1. 客户端认证

私密客户端在请求令牌端点时，**必须**与授权服务器进行认证，如[第 2.4 节](/client-registration/client-authentication)所述。

客户端认证用于：

- 强制绑定刷新令牌、授权码和它们被颁发给的客户端。当授权码通过不安全的信道被传输给重定向端点时，客户端认证能多加一层安全保障。

- 通过禁用客户端或更改其凭据，从被攻陷的客户端中恢复，从而防止攻击者滥用被盗的刷新令牌。只更改一套客户端凭据，要比撤销其所有刷新令牌快得多。

- 实现认证管理的最佳实践，后者要求定期进行凭据轮换。轮换所有刷新令牌可能有一定挑战性，而一套客户端凭据的轮换则要容易得多。

## 3.2.2. 令牌请求

客户端在请求令牌端点时，使用 UTF-8 字符编码，以[附录 C.2](/appendices/serializations#c-2-表单编码序列化) 中的表单编码序列化格式，在 HTTP 请求内容中发送下列参数：

**“grant_type”：必需**。客户端在本次令牌请求中使用的许可类型标识符。本规范定义了这些值：authorization_code、refresh_token 和 client_credentials。许可类型决定了令牌请求进一步要求或支持的参数。后续章节定义了这些许可类型的细节。

**“client_id”：可选**。如果使用的客户端认证方法依赖该参数，或者许可类型要求辨识公共客户端，那么就会用到客户端标识符。

私密客户端**必须**与授权服务器进行认证，如[第 3.2.1 节](/protocol-endpoints/token-endpoint#_3-2-1-客户端认证)所述。

例如，客户端发送以下 HTTP 请求（额外换行仅为展示目的）：

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

- 要求私密客户端进行客户端认证（或有其它认证要求的客户端）。
- 如果请求中携带了客户端认证信息，那么就认证客户端。

其它各个许可类型特有的处理规则会在对应章节中详细说明。

## 3.2.3. 令牌响应

如果访问令牌请求有效且已授权，授权服务器就颁发访问令牌和可选的刷新令牌。

如果请求的客户端认证失败或无效，授权服务器就返回错误响应，如[第 3.2.4 节](/protocol-endpoints/token-endpoint#_3-2-4-错误响应)所述。

授权服务器在颁发访问令牌和可选的刷新令牌时，使用 [[RFC8259](https://www.rfc-editor.org/info/rfc8259)] 定义的 application/json 媒体类型，按照[附录 C.3](/appendices/serializations#c-3-json-序列化) 创建 HTTP 响应，其中包含下列参数和 HTTP 200（OK）状态码。

**“access_token”：必需**。授权服务器颁发的访问令牌。

**“token_type”：必需**。颁发的访问令牌的类型，如[第 1.4 节](/introduction/access-token)所述。其值不区分大小写。

**“expires_in”：建议**。一个 JSON 数字，代表了访问令牌的生命周期，以秒为单位。例如，值 3600 表示访问令牌将在响应生成一小时后过期。如果省略，那么授权服务器**应该**通过其它方式提供过期时间，或者记载默认值。

**“scope”：** 如果与客户端所请求的范围相同，那么就只是**建议**的；否则就是**必需**的。访问令牌的范围如[第 1.4.1 节](/introduction/access-token#_1-4-1-访问令牌的范围)所述。

**“refresh_token”：可选**。刷新令牌。根据对应令牌请求中的许可，可用于获取新的访问令牌。

授权服务器**应该**根据风险评估和自身策略，决定是否向某个客户端颁发刷新令牌。如果授权服务器决定不颁发刷新令牌，那么客户端**可以**重启 OAuth 流程（例如发起新的授权码请求）来获取新的访问令牌。在这种情况下，授权服务器可以利用 cookies 和持久化许可，来优化用户体验。

如果授权服务器决定颁发刷新令牌，这些刷新令牌**必须**与资源所有者所同意的范围和资源服务器绑定。这是为了防止合法客户端的权限提升，同时减轻刷新令牌泄漏的影响。

这些参数被序列化为 JSON 结构，如[附录 C.3](/appendices/serializations#c-3-json-序列化) 所述。

授权服务器**必须**在所有携带令牌、凭据或其它敏感信息的响应中，携带 HTTP Cache-Control 响应头字段（见 [[RFC9111](https://www.rfc-editor.org/info/rfc9111)] 第 5.2 节），其值为 no-store。

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

客户端**必须**忽略响应中无法识别的字段。从授权服务器处收到的令牌和其它值的长度不作定义。客户端应该避免假定值的长度。授权服务器**应该**记载其颁发的所有值的长度。

## 3.2.4. 错误响应

授权服务器返回 HTTP 400（Bad Request）状态码（除非另有规定），并在响应中携带下列参数：

**“error”：必需**。下列 ASCII [[USASCII](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-12#USASCII)] 错误代码之一：

- **“invalid_request”：** 请求缺少必需的参数，或者携带了不支持的参数值（授权许可类型除外），或者重复了某个参数，或者携带了多个凭据，或者使用了多种客户端认证机制，或者虽然授权请求未发送 code_challenge，但令牌请求却包含了 code_verifier，或者有其它格式错误。
- **“invalid_client”：** 客户端认证失败（例如未知客户端，未携带客户端认证信息，或者认证方法不支持）。授权服务器**可以**返回 HTTP 401（Unauthorized）状态码，并表明支持哪些 HTTP 认证方案。如果客户端尝试通过 Authorization 请求头字段进行认证，那么授权服务器**必须**响应 HTTP 401（Unauthorized）状态码，并携带与客户端使用的认证方案相匹配的 WWW-Authenticate 响应头字段。
- **“invalid_grant”：** 提供的授权许可（例如授权码，或者资源所有者凭据）或刷新令牌无效，或者过期，或者被撤销，或者与授权请求中使用的重定向 URI 不匹配，或者是颁发给其他客户端的。
- **“unauthorized_client”：** 认证的客户端无权使用该授权许可类型。
- **“unsupported_grant_type”：** 授权服务器不支持该授权许可类型。
- **“invalid_scope”：** 请求的范围无效，或者未知，或者格式错误，或者超出了资源所有者所许可的范围。
- error 参数的值**禁止**包含集合 %x20-21 / %x23-5B / %x5D-7E 以外的字符。

**“error_description”：可选**。人类可读的 ASCII [[USASCII](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-12#USASCII)] 文本，提供了额外信息，用于帮助客户端开发人员理解发生的错误。error_description 参数的值**禁止**包含集合 %x20-21 / %x23-5B / %x5D-7E 以外的字符。

**“error_uri”：可选**。一个 URI，指向了人类可读的、显示错误信息的网页，用于向客户端开发人员提供错误的更多信息。error_uri 参数的值**必须**符合 URI 引用语法，因此**禁止**包含集合 %x21 / %x23-5B / %x5D-7E 以外的字符。

这些参数以[附录 C.3](/appendices/serializations#c-3-json-序列化) 中定义的 application/json 媒体类型，被携带在 HTTP 响应内容中。

例如：

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
Cache-Control: no-store

{
 "error": "invalid_request"
}
```
