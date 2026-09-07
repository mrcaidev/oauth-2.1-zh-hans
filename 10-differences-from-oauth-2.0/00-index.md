# 概述

本草案结合了 OAuth 2.0 [[RFC6749](https://www.rfc-editor.org/info/rfc6749)]、原生应用的 OAuth 2.0 [[RFC8252](https://www.rfc-editor.org/info/rfc8252)] 、代码交换的证明密钥 [[RFC7636](https://www.rfc-editor.org/info/rfc7636)]、浏览器应用的 OAuth 2.0 [[I-D.ietf-oauth-browser-based-apps](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps-18)]、OAuth 安全的当前最佳实践 [[I-D.ietf-oauth-security-topics](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-27)]，以及不记名令牌用法 [[RFC6750](https://www.rfc-editor.org/info/rfc6750)]。

如果新稿更新或废弃了原稿 [[RFC6749](https://www.rfc-editor.org/info/rfc6749)] 中的功能，该稿中的对应功能也会根据如新稿所述的规范更改，进行更新或彻底移除。

下面列出了一系列自 OAuth 2.0 以来的非规范改变。

- 授权码许可使用 PKCE [[RFC7636](https://www.rfc-editor.org/info/rfc7636)] 中的功能进行了扩展。因此，根据本规范，授权码许可的默认使用方法需要添加 PKCE 参数。
- 根据 [[I-D.ietf-oauth-security-topics](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-27)] 第 4.1.3 节，重定向 URI 的比对必须使用严格字符串匹配。
- 根据 [[I-D.ietf-oauth-security-topics](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-27)] 第 2.1.2 节，本规范省略了隐式许可（response_type=token）。
- 根据 [[I-D.ietf-oauth-security-topics](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-27)] 第 2.4 节，本规范省略了资源所有者密码凭据许可。
- 根据 [[I-D.ietf-oauth-security-topics](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-27)] 第 4.3.2 节，不记名令牌用法省略了不记名令牌在 URI 查询字符串中的用法。
- 根据 [[I-D.ietf-oauth-security-topics](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics-27)] 第 4.13.2 节，公共客户端的刷新令牌必须要么是发送者限制的，要么是一次性的。
- 包含授权码的令牌端点请求不再包含 redirect_uri 参数。
