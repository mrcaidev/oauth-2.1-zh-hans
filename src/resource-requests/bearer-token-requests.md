# 5.1. Bearer 令牌请求

本节定义了两种方法，用于在资源请求中将 Bearer 令牌发送给资源服务器。客户端**必须**使用下面定义的两种方法之一，并且**禁止**在一次请求中使用多种方法传输令牌。

特别是，客户端**禁止**在 URI 查询参数中发送访问令牌，资源服务器也**必须**忽略 URI 查询参数中的访问令牌。

## 5.1.1. Authorization 请求头字段

当在 HTTP/1.1 [[RFC7235](https://www.rfc-editor.org/info/rfc7235)] 定义的 Authorization 请求头字段中发送访问令牌时，客户端使用 Bearer 方案传输访问令牌。

例如：

```http
GET /resource HTTP/1.1
Host: server.example.com
Authorization: Bearer mF_9.B5f-4.1JqM
```

该方案中 Authorization 请求头字段的语法遵循 [[RFC2617](https://www.rfc-editor.org/info/rfc2617)] 第 2 节定义的 Basic 方案用法。注意，如同 Basic 方案，它不符合 [[RFC2617](https://www.rfc-editor.org/info/rfc2617)] 第 1.2 节定义的通用语法，但兼容 HTTP 1.1 认证 [[RFC7235](https://www.rfc-editor.org/info/rfc7235)] 中的通用认证框架——尽管它为了反映现有的部署情况，没有遵循其中概述的首选实践。Bearer 凭据的语法如下：

```
token68    = 1*( ALPHA / DIGIT /
                 "-" / "." / "_" / "~" / "+" / "/" ) *"="
credentials = "Bearer" 1*SP token68
```

客户端应该使用 Bearer HTTP 认证方案，在 Authorization 请求头字段中发送访问令牌，以发起经过认证的请求。资源服务器**必须**支持这种方法。

如 [RFC5234] 第 2.3 节所述， Bearer 字符串大小写不敏感。这意味着下列所有字符串都是 Authorization 请求头的有效用法：

```http
Authorization: Bearer mF_9.B5f-4.1JqM
```

```http
Authorization: bearer mF_9.B5f-4.1JqM
```

```http
Authorization: BEARER mF_9.B5f-4.1JqM
```

## 5.1.2. 表单编码的内容参数

当在 HTTP 请求内容中发送访问令牌时，客户端使用 access_token 参数向请求内容中添加访问令牌。客户端**禁止**使用该方法，除非下列所有条件全部满足：

- HTTP 请求包含 Content-Type 头字段，其值为 application/x-www-form-urlencoded。
- 内容遵循 URL 现行规范 [[WHATWG.URL](https://url.spec.whatwg.org/)] 定义的 application/x-www-form-urlencoded 的编码要求。
- HTTP 请求内容是单块的。
- 请求中要编码的内容**必须**全部由 ASCII [[UNASCII](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-11#USASCII)] 字符构成。
- 内容已经定义了 HTTP 请求方法的语义。特别是，这意味着 GET 方法被**禁止**使用。

内容**可以**包含其它请求特定的参数。在这种情况下，access_token 参数**必须**使用“&”字符（ASCII 码为 38）与请求特定的参数分开。

例如，客户端使用 TLS 发起如下 HTTP 请求：

```http
POST /resource HTTP/1.1
Host: server.example.com
Content-Type: application/x-www-form-urlencoded

access_token=mF_9.B5f-4.1JqM
```

application/x-www-form-urlencoded 方法**不应该**被使用，除非在应用程序的环境中，参与的客户端无法访问 Authorization 请求头字段。资源服务器**可以**支持这种方法。
