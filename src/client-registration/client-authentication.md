# 2.4. 客户端认证

如果颁发/注册和分发凭证的过程能够确保凭证的机密性，授权服务器**必须**只依赖于客户端认证。

如果客户端是机密的，授权服务器**可以**接受满足其安全要求（例如密码、公钥/私钥对）的任何形式的客户端认证。

**建议**使用非对称（基于公钥）的客户端认证方法，例如 mTLS [[RFC8705](https://www.rfc-editor.org/info/rfc8705)] 或符合 [[RFC7521](https://www.rfc-editor.org/info/rfc7521)] 和 [[RFC7523](https://www.rfc-editor.org/info/rfc7523)] 要求的、使用签名的 JWT（"私钥 JWT"）（在 [[OpenID](https://openid.net/specs/openid-connect-core-1_0.html)] 中被定义为客户端认证方法 private_key_jwt）。当使用这些客户端认证方法时，授权服务器不需要存储敏感的对称密钥，使得这些方法对许多攻击更加健壮。

当无法进行客户端认证时，授权服务器**应该**采用其他方法来验证客户端的身份——例如要求客户端注册重定向 URI ，或者询问资源所有者来确认身份。仅仅拥有有效的重定向 URI 不足以在请求资源所有者授权时验证客户端的身份，但可以在获得资源所有者的授权后，用于防止将凭证交付给伪造的客户端。

客户端**禁止**在单个请求中使用多种认证方法，以避免认证机制权威性的冲突。

授权服务器**必须**考虑与未认证客户端交互的安全影响，并采取措施限制给这种客户端颁发的令牌的潜在曝光（例如限制刷新令牌的生命周期）。

授权服务器为某一客户端身份所关联的权限**必须**取决于对客户端标识符和客户端凭证生命周期管理的整体过程的评估。详见第 7.2 节。

## 2.4.1. 客户端密钥

为了支持拥有客户端密钥的客户端，授权服务器**必须**支持那些在请求体内容中使用下列参数包含客户端凭据的客户端：

**"client_id":** **必需**。在第 2.2 节描述的注册过程中，颁发给客户端的客户端标识符。

**"client_secret":** **必需**。客户端密钥。

这些参数只能在请求内容中传输，**禁止**包含在请求 URI 中。

例如，使用内容参数刷新访问令牌（第4.3节）的请求（为了显示目的添加了额外的换行符）：

```
POST /token HTTP/1.1
Host: server.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&refresh_token=tGzv3JOkF0XG5Qx2TlKWIA
&client_id=s6BhdRkqt3&client_secret=7Fjfp0ZBr1KtDRbnfVdmIw
```

授权服务器**可以**支持使用 HTTP 基本认证方案，来认证被颁发过客户端密钥的客户端。

当使用 [[RFC9110](https://www.rfc-editor.org/info/rfc9110)] 第 11 节中定义的 HTTP 基本认证方案与授权服务器进行认证时，客户端标识符以附录 B 中的 application/x-www-form-urlencoded 编码算法进行编码，编码后的值作为用户名。客户端密钥也使用相同的算法进行编码，作为密码。

例如（额外的换行符仅为展示目的）：

```
Authorization: Basic czZCaGRSa3F0Mzo3RmpmcDBaQnIxS3REUmJuZlZkbUl3
```

请注意，这种方法先将客户端标识符和密钥进行表单形式的编码，然后将编码后的值作为 HTTP 基本认证的用户名和密码，在过去导致过许多互操作性问题。一些实现漏掉了编码步骤，或者只编码特定的字符，或者在验证凭据时忽略了编码要求。这导致客户端不得不对于每个授权服务器，都定制一套凭证的展示方式。在请求体内容中包含凭证，则避免了编码问题，并且使得实现的互操作性更强。

除此之外，授权服务器**可以**支持在请求内容中包含客户端凭证，使用以下参数：

在请求内容中使用这两个参数来包含客户端凭证是**不建议**的，并且**应该**被限制在无法直接使用 HTTP 基本认证方案（或其他基于密码的 HTTP 认证方案）的客户端上。

由于客户端密钥认证方法涉及密码，授权服务器**必须**保护使用这种方法的任何端点免受暴力破解攻击。

## 2.4.2. 其它认证方法

授权服务器**可以**支持任何符合其安全要求的合适的认证方案。当使用其它认证方案时，授权服务器**必须**定义从客户端标识符（注册记录）到认证方案的映射。

一些其它的认证方法，例如 mTLS [[RFC8705](https://www.rfc-editor.org/info/rfc8705)] 和私钥 JWT [[RFC7523](https://www.rfc-editor.org/info/rfc7523)]，在文档[《OAuth 令牌端点认证方法》](https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#token-endpoint-auth-method)中进行了定义。它们可以用作通用的客户端认证方法，而不仅仅是保护令牌端点。
