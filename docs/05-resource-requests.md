**目录**

- [5. 资源请求](#5-资源请求)
  - [5.1. Bearer 令牌请求](#51-bearer-令牌请求)
    - [5.1.1. Authorization 请求头字段](#511-authorization-请求头字段)
    - [5.1.2. 表单编码的内容参数](#512-表单编码的内容参数)
  - [5.2. 访问令牌验证](#52-访问令牌验证)
  - [5.3. 错误响应](#53-错误响应)
    - [5.3.1. WWW-Authenticate 响应头字段](#531-www-authenticate-响应头字段)
    - [5.3.2. 错误代码](#532-错误代码)

# 5. 资源请求

客户端向资源服务器展示访问令牌，以访问受保护资源。资源服务器**必须**验证访问令牌，确保其没有过期，并且其范围包含了请求的资源。资源服务器验证访问令牌的方法超出了该规范的范围，但大体上涉及到资源服务器和授权服务器的交互或协调。例如，当资源服务器和授权服务器在同一处，或者属于同一个系统时，他们可能共享同一个数据库或其它存储。当两者独立运行时，他们可能使用令牌检查 [[RFC7662](https://www.rfc-editor.org/info/rfc7662)] 或结构化访问令牌，例如 JWT [[RFC9068](https://www.rfc-editor.org/info/rfc9068)]。

## 5.1. Bearer 令牌请求

该节定义了两种方法，用于在资源请求中将 Bearer 令牌发送给资源服务器。客户端**必须**使用下面定义的两种方法之一，并且**禁止**在一次请求中使用多种方法传输令牌。

特别是，客户端**禁止**在 URI 查询参数中发送访问令牌，资源服务器也**必须**忽略 URI 查询参数中的访问令牌。

### 5.1.1. Authorization 请求头字段

当在 HTTP/1.1 [[RFC7235](https://www.rfc-editor.org/info/rfc7235)] 定义的 Authorization 请求头字段中发送访问令牌时，客户端使用 Bearer 方案传输访问令牌。

例如：

```http
GET /resource HTTP/1.1
Host: server.example.com
Authorization: Bearer mF_9.B5f-4.1JqM
```

该方案中 Authorization 请求头字段的语法遵循 [[RFC2617](https://www.rfc-editor.org/info/rfc2617)] 第 2 节定义的 Basic 方案用法。注意，如同 Basic 方案，它不符合 [[RFC2617](https://www.rfc-editor.org/info/rfc2617)] 第 1.2 节定义的通用语法，但兼容 HTTP 1.1 认证 [[RFC7235](https://www.rfc-editor.org/info/rfc7235)] 中的通用认证框架——尽管它为了反映现有的部署情况，没有遵循其中概述的首选实践。Bearer 凭据的语法如下：

```abnf
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

### 5.1.2. 表单编码的内容参数

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

## 5.2. 访问令牌验证

在接收到访问令牌后，资源服务器必须检查访问令牌尚未过期、被授权访问请求的资源、在合适的范围下被颁发，并且满足了资源服务器关于访问受保护资源的其它策略要求。

访问令牌大体上分为两类：引用令牌或自编码令牌。引用令牌可以通过询问授权服务器，或者在令牌数据库中查找令牌，以被验证。而自编码令牌则在加密或签名的字符串中包含了授权信息，并且后者可以被资源服务器提取。

令牌检查（[[RFC7662](https://www.rfc-editor.org/info/rfc7662)]）定义了一种标准化方法，用于查询授权服务器，并检查访问令牌的有效性。

访问令牌的 JWT 形式（[[RFC9068](https://www.rfc-editor.org/info/rfc9068)]）定义了一种标准化方法，用于在令牌字符串中编码信息。

关于创建和验证访问令牌的额外考量见第 7.1 节。

## 5.3. 错误响应

如果一次资源访问请求失败了，资源服务器**应该**告知客户端该错误。错误响应的细节由特定的令牌类型决定，例如第 5.3.2 节中 Bearer 令牌的描述。

### 5.3.1. WWW-Authenticate 响应头字段

如果对受保护资源的请求不包含认证凭据，或者不包含可访问受保护资源的访问令牌，那么资源服务器**必须**包含 HTTP WWW-Authenticate 响应头字段。在其它条件下，资源服务器也**可以**在响应中包含它。WWW-Authenticate 头字段使用 HTTP/1.1 [[RFC7235](https://www.rfc-editor.org/info/rfc7235)] 定义的框架。

该令牌类型的所有质询**必须**使用认证方案值 Bearer。该方案之后**必须**跟上一个或多个认证参数值。该规范为该令牌类型使用或定义的认证参数属性如下。其它认证参数属性也**可以**被使用。

**“realm”：** realm 属性**可以**被包含，以通过 HTTP/1.1 [[RFC7235](https://www.rfc-editor.org/info/rfc7235)] 中描述的方法，表明保护范围。

**“scope”：** 第 1.4.1 节定义了 scope 属性。scope 属性是一个用空格分隔的、大小写敏感的范围值列表，表明了访问令牌要访问请求的资源所需要的范围。scope 值由具体实现定义，没有中央注册表。授权服务器定义了允许的值。scope 值的顺序不重要。在一些情况下，当请求具有足够访问范围的、新的访问令牌时，scope 值将被使用。scope 属性的使用是**可选**的。scope 属性**禁止**出现多次。scope 值仅供程序使用，而不展示给终端用户。

两个 scope 值的示例如下。它们分别来自 OpenID Connect [[OpenID.Messages](http://openid.net/specs/openid-connect-messages-1_0.html)] 和 Open Authentication Technology Committee（OATC）在线多媒体授权协议 [[OMAP](https://www.svta.org/product/online-multimedia-authorization-protocol/)] 的 OAuth 2.0 用例：

```
scope="openid profile email"
scope="urn:example:channel=HBO&urn:example:rating=G,PG-13"
```

**“error”：** 如果对受保护资源的请求包含了访问令牌，但认证失败，那么资源服务器**应该**包含 error 属性，给客户端提供访问请求被拒绝的原因。第 5.3.2 节描述了该参数的值。

**“error_description”：** 资源服务器**可以**包含 error_description 属性，给开发者提供一条人类可读的解释，但不展示给终端用户。

**“error_uri”：** 资源服务器**可以**包含 error_uri 属性，其值为一个绝对 URI，用于标识解释该错误的、人类可读的网页。

error、error_description、error_uri 属性**禁止**多次出现。

（附录 A.4 指定的）scope 属性值在表示范围值时，**禁止**包含集合 %x21 / %x23-5B / %x5D-7E 外的字符。在表示范围值之间的分隔符时，**禁止**包含 %x20 外的字符。（附录 A.7 和附录 A.8 指定的）error 和 error_description 属性**禁止**包含集合 %x20-21 / %x23-5B / %x5D-7E 外的字符。（附录 A.9 指定的）error_uri 属性**必须**符合 URI 引用语法，因此**禁止**包含集合 %x21 / %x23-5B / %x5D-7E 外的字符。

### 5.3.2. 错误代码

当请求失败时，资源服务器使用恰当的 HTTP 状态码（通常是 400、401、403、405）响应，并在响应中包含下列错误代码的其中之一。

**“invalid_request”：** 请求缺失必需的参数，或者包含了不支持的参数或参数值，或者重复了同一参数，或者使用多种方法包含了一个访问令牌，或者其它格式错误。资源服务器**应该**使用 HTTP 400（错误请求）状态码响应。

**“invalid_token”：** 提供的访问令牌过期、被收回、格式错误，或者由于其它原因无效。资源服务器**应该**使用 HTTP 401（未授权）状态码响应。客户端**可以**请求一个新的访问令牌，然后重新请求受保护资源。

**“insufficient_scope”：** 相比起授予给客户端的、访问令牌表示的范围，请求需要更高的权限（更宽的范围）。资源服务器**应该**使用 HTTP 403（被禁止）状态码响应，并且**可以**包含 scope 属性，其值为访问受保护资源所必要的范围。

扩展可以定义额外的错误代码，或者指定返回上述错误代码的额外情况。

如果请求缺少认证信息（例如，客户端不知道认证是必要的，或者试图使用不支持的认证方法），那么资源服务器**不应该**包含错误代码或其它错误信息。

例如：

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="example"
```

对于这一使用过期访问令牌尝试认证的、对受保护资源的请求，做出响应：

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer realm="example",
                  error="invalid_token",
                  error_description="The access token expired"
```
