# 10.1. 移除 OAuth 2.0 的隐式许可

OAuth 2.1 省略了 OAuth 2.0 的隐式许可，因为后者在 [[I-D.ietf-oauth-security-topics](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-27)] 中被废弃。

移除隐式许可的目的是，不再在授权响应中颁发访问令牌，因为这种令牌容易被泄露或注入，并且对客户端而言，无法成为发送者限制的令牌。客户端曾经可以使用 response_type=token 参数表示隐式许可。在 OAuth 2.1 中，该 response_type 参数值不再被定义。

response_type=token 的移除不影响其它扩展响应类型。这些扩展类型会从授权端点返回其它人为规定的值，例如，[[OpenID](https://openid.net/specs/openid-connect-core-1_0.html)] 定义的 response_type=id_token。
