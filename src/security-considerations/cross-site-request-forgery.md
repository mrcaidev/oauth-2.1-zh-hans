# 7.9. 跨站请求伪造

攻击者可能会尝试向受害者设备上合法客户端的重定向 URI 注入请求，例如，使客户端访问由攻击者控制的资源。这是跨站请求伪造（CSRF）攻击的变种。

传统的对策是，客户端在 state 参数中传递一个随机值（也称为 CSRF 令牌），将对重定向 URI 的请求关联到上述的用户代理会话。[[RFC6819](https://www.rfc-editor.org/info/rfc6819)] 第 5.3.5 节详细描述了该对策。code_verifier 参数或 OpenID Connect 的 nonce 值也提供了同样的保护。

在使用 code_verifier 代替 state 或 nonce 进行 CSRF 保护时，以下几点非常重要：

- 客户端必须确保授权服务器支持客户端打算使用的 code_challenge_method。如果授权服务器不支持所请求的方法，那么**必须**转而使用 state 或 nonce 进行 CSRF 保护。
- 如果 state 用于携带应用状态，并且其内容的完整性是一个问题，那么客户端**必须**保护 state 免受篡改和交换。这可以通过将 state 的内容绑定到浏览器会话，以及/或者签名/加密 state 值 [[I-D.bradley-oauth-jwt-encoded-state](https://datatracker.ietf.org/doc/html/draft-bradley-oauth-jwt-encoded-state-09)] 来实现。

因此，授权服务器**必须**提供一种方法，用于检测它支持的code_challenge_method，要么根据 [[RFC8414](https://www.rfc-editor.org/info/rfc8414)] 使用授权服务器的元数据，要么提供一种针对部署的方法来确保或确定支持的方法。
