# 5.3. 错误响应

如果一次资源访问请求失败了，资源服务器**应该**告知客户端该错误。错误响应的细节由特定的令牌类型决定，例如第 5.3.2 节中 Bearer 令牌的描述。

## 5.3.1. WWW-Authenticate 响应头字段

如果对受保护资源的请求不包含认证凭据，或者不包含可访问受保护资源的访问令牌，那么资源服务器**必须**包含 HTTP WWW-Authenticate 响应头字段。在其它条件下，资源服务器也**可以**在响应中包含它。WWW-Authenticate 头字段使用 HTTP/1.1 [[RFC7235](https://www.rfc-editor.org/info/rfc7235)] 定义的框架。

该令牌类型的所有质询**必须**使用认证方案值 Bearer。该方案之后**必须**跟上一个或多个认证参数值。本规范为该令牌类型使用或定义的认证参数属性如下。其它认证参数属性也**可以**被使用。

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

## 5.3.2. 错误代码

当请求失败时，资源服务器使用恰当的 HTTP 状态码（通常是 400、401、403、405）响应，并在响应中包含下列错误代码的其中之一。

**“invalid_request”：** 请求缺失必需的参数，或者包含了不支持的参数或参数值，或者重复了同一参数，或者使用多种方法包含了一个访问令牌，或者其它格式错误。资源服务器**应该**使用 HTTP 400（错误请求）状态码响应。

**“invalid_token”：** 提供的访问令牌过期、被撤销、格式错误，或者由于其它原因无效。资源服务器**应该**使用 HTTP 401（未授权）状态码响应。客户端**可以**请求一个新的访问令牌，然后重新请求受保护资源。

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
