# 附录 D. 扩展

下面列出了本规范发布时已发展成熟的扩展。

**[[RFC9068](https://www.rfc-editor.org/info/rfc9068)]：OAuth 2.0 访问令牌的 JWT 形式**

该规范定义了一种形式，以 JSON 网络令牌（JWT）格式颁发 OAuth 访问令牌。

**[[RFC8628](https://www.rfc-editor.org/info/rfc8628)]：OAuth 2.0 设备授权许可**

设备授权许可（原称为设备流程）是一项扩展，让没有浏览器或输入能力有限的设备也能够获取访问令牌。这通常用于智能电视应用，或者像硬件视频编码器一样，可以将视频流式传输到流媒体视频服务的设备。

**[[RFC8414](https://www.rfc-editor.org/info/rfc8414)]：授权服务器元数据**

授权服务器元数据（也称为 OAuth 发现）定义了一个端点，客户端可以用它来检索与特定 OAuth 服务器交互所需的信息，例如授权端点和令牌端点的位置，以及支持的许可类型。

**[[RFC8707](https://www.rfc-editor.org/info/rfc8707)]：资源指示器**

为客户端提供了一种方法，向授权服务器明确示意它准备在哪里使用正在请求的访问令牌。

**[[RFC7591](https://www.rfc-editor.org/info/rfc7591)]：客户端动态注册**

客户端动态注册提供了一种机制，通过编程方式在授权服务器上注册客户端。

**[[RFC9449](https://www.rfc-editor.org/info/rfc9449)]：持有证明展示（DPoP）**

DPoP 描述了一种机制，将令牌绑定到其被颁发给的客户端，并在发起请求时在 HTTP 头中提供该绑定的证明。

**[[RFC8705](https://www.rfc-editor.org/info/rfc8705)]：双向 TLS**

双向 TLS 描述了一种机制，将令牌绑定到其被颁发给的客户端，以及一种通过 TLS 证书认证客户端的机制。

**[[RFC7662](https://www.rfc-editor.org/info/rfc7662)]：令牌检查**

令牌检查定义了一种机制，让资源服务器获取访问令牌的相关信息。

**[[RFC7009](https://www.rfc-editor.org/info/rfc7009)]：令牌撤销**

令牌撤销定义了一种机制，让客户端向授权服务器示意不再需要某个访问令牌。

**[[RFC9126](https://www.rfc-editor.org/info/rfc9126)]：授权请求推送**

授权请求推送描述了一种技术，可以从后端通道启动 OAuth 流程，提供更高的安全性和更强的灵活性，用于构建复杂的授权请求。

**[[RFC9207](https://www.rfc-editor.org/info/rfc9207)]：授权服务器的颁发者身份**

授权响应中的 iss 参数表示了授权服务器的身份，以防止客户端处的混淆攻击。

**[[RFC9396](https://www.rfc-editor.org/info/rfc9396)]：富授权请求**

富授权请求规定了一个新参数 authorization_details，用于在 OAuth 授权请求中携带细粒度的授权数据。

**[[RFC9470](https://www.rfc-editor.org/info/rfc9470)]：阶跃认证挑战协议**

阶跃认证描述了一种机制，资源服务器可以用其向客户端示意，当前请求中的访问令牌所关联的认证事件不满足其认证要求。
