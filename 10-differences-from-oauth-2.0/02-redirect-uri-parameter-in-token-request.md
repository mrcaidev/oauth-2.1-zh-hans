# 10.2. 令牌请求中的重定向 URI 参数

在 OAuth 2.0 的授权码流程中（[[RFC6749](https://www.rfc-editor.org/info/rfc6749)] 第 4.1.3 节），对令牌端点的请求包含了一个可选的 redirect_uri 参数。该参数原用于防止授权码注入攻击。如果原授权请求中发送了 redirect_uri 参数，那么令牌请求中的 redirect_uri 参数就是必需的。只有在客户端注册了多个重定向 URI 时，授权请求才被要求携带 redirect_uri 参数。然而，在实践中，即使只注册了一条 URI，许多授权服务器的实现也要求授权请求携带 redirect_uri 参数，导致 redirect_uri 参数在令牌端点也变成了必需。

在 OAuth 2.1 中，code_challenge 和 code_verifier 参数防止了授权码注入，使得在令牌请求中包含 redirect_uri 参数变得徒劳无益。因此，它被移除了。

对于希望同时支持 OAuth 2.0 和 OAuth 2.1 客户端的授权服务器而言，为了向后兼容性，授权服务器**必须**允许客户端在令牌请求中发送 redirect_uri 参数（第 4.1.3 节），并且**必须**强制包含该参数，如 [[RFC6749](https://www.rfc-editor.org/info/rfc6749)] 所述。授权服务器可以使用请求中的 client_id，来决定是否对已知使用 OAuth 2.0 行为的特定客户端强制执行该行为。

只遵循 OAuth 2.1 建议的客户端不会在令牌请求中发送 redirect_uri，因此也就不兼容那些期望在令牌请求中包含该参数的授权服务器。
