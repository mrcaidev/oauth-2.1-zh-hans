# 1.5. 通信安全

该规范的实现**必须**使用一种机制来提供通信的认证、完整性和机密性，例如传输层安全性协议 [[RFC8446](https://www.rfc-editor.org/info/rfc8446)]，以保护内容或头部字段中的明文凭据和令牌的交换，防止窃听、篡改和消息伪造（例如，见第 2.4.1 节、第 7.5.1 节、第 3.2 节和第 1.4.2 节）。

OAuth 的 URL **必须**使用 https 协议，除了回环接口重定向 URI **可以**使用 http 协议。在使用 https 时，**必须**根据 [[RFC9110](https://www.rfc-editor.org/info/rfc9110)] 检查 TLS 证书。截至本文撰写时，TLS 的最新版本是 1.3 版本 [[RFC8446](https://www.rfc-editor.org/info/rfc8446)]。

该规范的实现也**可以**支持满足其安全要求的其他传输层安全机制。

TLS 版本和算法的辨识超出了该规范的范围。关于传输层安全的最新建议见 [[BCP195](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-10#BCP195)]。证书验证和其他安全考量见相关规范。
