# 2.4. 客户端认证

授权服务器**必须**仅在颁发、注册和分发凭据的过程能够确保凭据的私密性时，才依赖客户端认证。

如果客户端是私密的，那么授权服务器**可以**接受满足其安全要求的任何形式（例如密码或公钥/私钥对）的客户端认证。

**建议**使用非对称（基于公钥）的客户端认证方法，例如 mTLS [[RFC8705](https://www.rfc-editor.org/info/rfc8705)] 或者符合 [[RFC7521](https://www.rfc-editor.org/info/rfc7521)] 和 [[RFC7523](https://www.rfc-editor.org/info/rfc7523)] 要求的签名 JWT（"私钥 JWT"，在 [[OpenID](https://openid.net/specs/openid-connect-core-1_0.html)] 中被定义为客户端认证方法 private_key_jwt）。当使用这些客户端认证方法时，授权服务器不需要存储敏感的对称密钥，因此这些方法对许多攻击来说更加健壮。

当无法进行客户端认证时，授权服务器**应该**采取其他方法来验证客户端的身份——例如要求客户端注册重定向 URI，或者询问资源所有者来确认身份。有效的重定向 URI 不足以在征求资源所有者授权时验证客户端的身份，但可以在获得资源所有者的授权后，用于防止把凭据发送给伪造的客户端。

客户端**禁止**在单个请求中使用多种认证方法，以避免认证机制的认责冲突。

授权服务器**必须**考虑与未认证客户端交互的安全影响，并采取措施限制颁发给此类客户端的令牌的潜在暴露可能性（例如限制刷新令牌的生命周期）。

授权服务器为某一客户端身份关联的权限**必须**取决于辨识客户端和客户端凭证生命周期管理的整体过程的评估。详见[第 7.2 节](/security-considerations/client-authentication)。

## 2.4.1. 客户端密钥

为了支持拥有客户端密钥的客户端，授权服务器**必须**支持在请求体内容中使用下列参数携带客户端凭据的客户端：

**“client_id”：必需**。在[第 2.2 节](/client-registration/client-identifier)所述的注册过程中，颁发给客户端的客户端标识符。

**“client_secret”：必需**。客户端密钥。

这些参数只能在请求的内容中传输，**禁止**包含在请求 URI 中。

例如，使用内容参数刷新访问令牌（[第4.3节](/grant-types/refresh-token-grant)）的请求（额外换行仅为展示目的）：

```
POST /token HTTP/1.1
Host: server.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&refresh_token=tGzv3JOkF0XG5Qx2TlKWIA
&client_id=s6BhdRkqt3&client_secret=7Fjfp0ZBr1KtDRbnfVdmIw
```

授权服务器**可以**支持 HTTP 基本认证方案，来认证被颁发过客户端密钥的客户端。

当使用如 [[RFC9110](https://www.rfc-editor.org/info/rfc9110)] 第 11 节中定义的 HTTP 基本认证方案与授权服务器进行认证时，客户端标识符使用[附录 B](/appendices/use-of-application-x-www-form-urlencoded-media-type) 中的 application/x-www-form-urlencoded 编码算法进行编码，编码后的值作为用户名。客户端密钥也使用相同的算法进行编码，作为密码。

例如（额外换行仅为展示目的）：

```
Authorization: Basic czZCaGRSa3F0Mzo3RmpmcDBaQnIxS3REUmJuZlZkbUl3
```

请注意，这种方法先将客户端标识符和密钥进行表单编码，然后将编码后的值作为 HTTP 基本认证的用户名和密码，曾经导致了许多互操作性问题。一些实现漏掉了编码步骤，或者只编码特定的字符，或者在验证凭据时忽略了编码要求。这导致客户端不得不对于每个授权服务器，都定制一套凭据的展示方式。在请求体内容中携带凭证则避免了编码问题，并且增强了实现的互操作性。

由于客户端密钥认证方法涉及到密码，授权服务器**必须**保护使用该方法的任何端点，使其免受暴力破解攻击。

## 2.4.2. 其它认证方法

授权服务器**可以**支持任何满足其安全要求的合适的认证方案。当使用其它认证方法时，授权服务器**必须**定义一套从客户端标识符（注册记录）到认证方案的映射。

一些其它的认证方法，例如 mTLS [[RFC8705](https://www.rfc-editor.org/info/rfc8705)] 和私钥 JWT [[RFC7523](https://www.rfc-editor.org/info/rfc7523)]，在[《OAuth 令牌端点认证方法》](https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#token-endpoint-auth-method)大全中进行了定义。它们可以用作通用的客户端认证方法，而不仅仅是用于保护令牌端点。
