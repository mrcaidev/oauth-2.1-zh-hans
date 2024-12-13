# 3.1. 授权端点

授权端点用于与资源所有者交互，并获取授权许可。授权服务器**必须**首先认证资源所有者。授权服务器认证资源所有者的方式（例如用户名密码登录、通行密钥、联合登录或使用已建立的会话）不在本规范的范围内。

客户端获知授权端点 URL 的方式不在本规范的范围内，但该 URL 通常会在服务的文档或授权服务器的元数据文档 [[RFC8414](https://www.rfc-editor.org/info/rfc8414)] 中提供。

授权端点 URL **禁止**包含片段部分，**可以**包含查询字符串部分（[附录 C.1](/appendices/serializations#c-1-查询字符串序列化)）。后续添加额外的查询参数时，**必须**保留原查询部分。

授权服务器**必须**支持对授权端点使用 HTTP GET 方法（[[RFC9110](https://www.rfc-editor.org/info/rfc9110)] 第 9.3.1 节），**可以**同时支持 POST 方法 [[RFC9110](https://www.rfc-editor.org/info/rfc9110)] 第 9.3.3 节）。

授权服务器**必须**忽略发送到授权端点的、无法识别的请求参数。

**禁止**重复携带本规范定义的请求和响应参数。没有值的参数**必须**被视为从请求中省略。

在重定向可能携带用户凭据的请求时，授权服务器**必须**避免意外转发这些用户凭据（详见[第 7.5.4 节](/security-considerations/authorization-code-security-considerations#_7-5-4-http-307-重定向)）。

**禁止**支持跨源资源共享 [[WHATWG.CORS](https://fetch.spec.whatwg.org/#http-cors-protocol)]，因为客户端不会直接访问授权端点，而是将用户代理重定向到该端点。
