# 1.5. 通信安全

本规范的实现**必须**使用某种机制（例如 TLS 协议 [[RFC8446](https://www.rfc-editor.org/info/rfc8446)] 来提供通信的认证、完整性和机密性，以保护内容或头部字段中的明文凭据和令牌的交换，防止窃听、篡改和消息伪造（例如，见[第 2.4.1 节](/client-registration/client-authentication#_2-4-1-客户端密钥)、[第 7.5.1 节](/security-considerations/authorization-code-security-considerations#_7-5-1-授权码注入)、[第 3.2 节](/protocol-endpoints/token-endpoint)和[第 1.4.2 节](/introduction/access-token#_1-4-2-bearer-令牌)）。

OAuth 中的各个 URL **必须**使用 HTTPS 协议，除非是回环接口的重定向 URI，后者**可以**使用 HTTP 协议。在使用 HTTPS 时，**必须**根据 [[RFC9110](https://www.rfc-editor.org/info/rfc9110)] 检查 TLS 证书。截至到本文编写时，TLS 的最新版本是 1.3 版本 [[RFC8446](https://www.rfc-editor.org/info/rfc8446)]。

本规范的实现也**可以**使用另外的传输层安全机制，只要其能够满足实现者的安全要求。

针对 TLS 版本和算法的识别不在本规范的范围内。关于传输层安全的最新建议见 [[BCP195](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-10#BCP195)]。证书的验证和其它安全考量见相关规范。
