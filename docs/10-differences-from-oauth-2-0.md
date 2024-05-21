**目录**

- [10. 与 OAuth 2.0 的区别](#10-与-oauth-20-的区别)
  - [10.1. 移除 OAuth 2.0 的隐式许可](#101-移除-oauth-20-的隐式许可)
  - [10.2. 令牌请求中的重定向 URI 参数](#102-令牌请求中的重定向-uri-参数)

# 10. 与 OAuth 2.0 的区别

该草稿结合了 OAuth 2.0 [[RFC6749](https://www.rfc-editor.org/info/rfc6749)]、原生应用的 OAuth 2.0（[[RFC8252](https://www.rfc-editor.org/info/rfc8252)]）、代码交换的证明密钥（[[RFC7636](https://www.rfc-editor.org/info/rfc7636)]）、浏览器应用的 OAuth 2.0（[[I-D.ietf-oauth-browser-based-apps](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps-18)]）、OAuth 安全的当前最佳实践（[[I-D.ietf-oauth-security-topics](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-27)]），以及 Bearer 令牌用法（[[RFC6750](https://www.rfc-editor.org/info/rfc6750)]）。

如果新稿更新或废弃了原稿 [[RFC6749](https://www.rfc-editor.org/info/rfc6749)] 中的功能，该稿中的对应功能也会根据如新稿所述的规范更改，进行更新或彻底移除。

下面列出了一系列自 OAuth 2.0 以来的非规范改变。

- 授权码许可使用 PKCE（[[RFC7636](https://www.rfc-editor.org/info/rfc7636)]）中的功能进行了扩展。因此，根据该规范，授权码许可的默认使用方法需要添加 PKCE 参数。
- 根据 [[I-D.ietf-oauth-security-topics](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-27)] 第 4.1.3 节，重定向 URI 的比对必须使用严格字符串匹配。
- 根据 [[I-D.ietf-oauth-security-topics](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-27)] 第 2.1.2 节，该规范省略了隐式许可（response_type=token）。
- 根据 [[I-D.ietf-oauth-security-topics](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-27)] 第 2.4 节，该规范省略了资源所有者密码凭据许可。
- 根据 [[I-D.ietf-oauth-security-topics](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-27)] 第 4.3.2 节，Bearer 令牌用法省略了 Bearer 令牌在 URI 查询字符串中的用法。
- 根据 [[I-D.ietf-oauth-security-topics](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-27)] 第 4.13.2 节，公共客户端的刷新令牌必须要么是发送者限制的，要么是一次性的。
- 包含授权码的令牌端点请求不再包含 redirect_uri 参数。

## 10.1. 移除 OAuth 2.0 的隐式许可

OAuth 2.1 省略了 OAuth 2.0 的隐式许可，因为后者在 [[I-D.ietf-oauth-security-topics](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-27)] 中被废弃。

移除隐式许可的目的是，不再在授权响应中颁发访问令牌，因为这种令牌容易被泄露或注入，并且对客户端而言，无法成为发送者限制的令牌。客户端曾经可以使用 response_type=token 参数表示隐式许可。在 OAuth 2.1 中，该 response_type 参数值不再被定义。

response_type=token 的移除不影响其它扩展响应类型。这些扩展类型会从授权端点返回其它人为规定的值，例如，[[OpenID](https://openid.net/specs/openid-connect-core-1_0.html)] 定义的 response_type=id_token。

## 10.2. 令牌请求中的重定向 URI 参数

在 OAuth 2.0 的授权码流程中（[[RFC6749](https://www.rfc-editor.org/info/rfc6749)] 第 4.1.3 节），对令牌端点的请求包含了一个可选的 redirect_uri 参数。该参数原用于防止授权码注入攻击。如果原授权请求中发送了 redirect_uri 参数，那么令牌请求中的 redirect_uri 参数就是必需的。只有在客户端注册了多个重定向 URI 时，授权请求才被要求携带 redirect_uri 参数。然而，在实践中，即使只注册了一条 URI，许多授权服务器的实现也要求授权请求携带 redirect_uri 参数，导致 redirect_uri 参数在令牌端点也变成了必需。

在 OAuth 2.1 中，code_challenge 和 code_verifier 参数防止了授权码注入，使得在令牌请求中包含 redirect_uri 参数变得徒劳无益。因此，它被移除了。

对于希望同时支持 OAuth 2.0 和 OAuth 2.1 客户端的授权服务器而言，为了向后兼容性，授权服务器**必须**允许客户端在令牌请求中发送 redirect_uri 参数（第 4.1.3 节），并且**必须**强制包含该参数，如 [[RFC6749](https://www.rfc-editor.org/info/rfc6749)] 所述。授权服务器可以使用请求中的 client_id，来决定是否对已知使用 OAuth 2.0 行为的特定客户端强制执行该行为。

只遵循 OAuth 2.1 建议的客户端不会在令牌请求中发送 redirect_uri，因此也就不兼容那些期望在令牌请求中包含该参数的授权服务器。
