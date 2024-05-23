# 附录 A. 扩充巴科斯范式（ABNF）语法

本节使用 [[RFC5234](https://www.rfc-editor.org/info/rfc5234)] 的符号，描述了本规范中定义的各元素的扩充巴科斯范式（ABNF）语法。以下 ABNF 使用 Unicode 码位 [[W3C.REC-xml-20081126](https://www.w3.org/TR/REC-xml/REC-xml-20081126.xml)] 定义；这些字符通常使用 UTF-8 编码。各元素根据定义顺序进行展示。

以下某些定义使用了 [[RFC3986](https://www.rfc-editor.org/info/rfc3986)] 中的“URI-reference”定义。

以下某些定义中使用了这些通用定义：

```
VSCHAR     = %x20-7E
NQCHAR     = %x21 / %x23-5B / %x5D-7E
NQSCHAR    = %x20-21 / %x23-5B / %x5D-7E
```

## A.1. “client_id”语法

[第 2.4.1 节](/client-registration/client-authentication#_2-4-1-客户端密钥)定义了元素“client_id”：

```
client-id     = *VSCHAR
```

## A.2. “client_secret”语法

[第 2.4.1 节](/client-registration/client-authentication#_2-4-1-客户端密钥)定义了元素“client_secret”：

```
client-secret = *VSCHAR
```

## A.3. “response_type”语法

[第 4.1.1 节](/grant-types/authorization-code-grant#_4-1-1-授权请求)和[第 6.4 节](/extensibility/defining-new-authorization-endpoint-response-types)定义了元素“response_type”：

```
response-type = response-name *( SP response-name )
response-name = 1*response-char
response-char = "_" / DIGIT / ALPHA
```

## A.4. “scope”语法

[第 1.4.1 节](/introduction/access-token#_1-4-1-访问令牌的范围)定义了元素“scope”：

```
 scope       = scope-token *( SP scope-token )
 scope-token = 1*NQCHAR
```

## A.5. “state”语法

[第 4.1.1 节](/grant-types/authorization-code-grant#_4-1-1-授权请求)、[第 4.1.2 节](/grant-types/authorization-code-grant#_4-1-2-授权响应)和[第 4.1.2.1 节](/grant-types/authorization-code-grant#_4-1-2-1-错误响应)定义了元素“state”：

```
 state      = 1*VSCHAR
```

## A.6. “redirect_uri”语法

[第 4.1.1 节](/grant-types/authorization-code-grant#_4-1-1-授权请求)和[第 4.1.3 节](/grant-types/authorization-code-grant#_4-1-3-令牌端点扩展)定义了元素“redirect_uri”：

```
 redirect-uri      = URI-reference
```

## A.7. “error”语法

[第 4.1.2.1 节](/grant-types/authorization-code-grant#_4-1-2-1-错误响应)、[第 3.2.4 节](/protocol-endpoints/token-endpoint#_3-2-4-错误响应)、[第 7.2 节](/security-considerations/client-authentication)和[第 8.5 节](/native-applications/security-considerations-in-native-apps)定义了元素“error”：

```
 error             = 1*NQSCHAR
```

## A.8. “error_description”语法

[第 4.1.2.1 节](/grant-types/authorization-code-grant#_4-1-2-1-错误响应)、[第 3.2.4 节](/protocol-endpoints/token-endpoint#_3-2-4-错误响应)和[第 5.3 节](/resource-requests/error-response)定义了元素“error_description”：

```
 error-description = 1*NQSCHAR
```

## A.9. “error_uri”语法

[第 4.1.2.1 节](/grant-types/authorization-code-grant#_4-1-2-1-错误响应)、[第 3.2.4 节](/protocol-endpoints/token-endpoint#_3-2-4-错误响应)和[第 7.2 节](/security-considerations/client-authentication)定义了元素“error_uri”：

```
error-uri         = URI-reference
```

## A.10. “grant_type”语法

[第 3.2.2 节](/protocol-endpoints/token-endpoint#_3-2-2-令牌请求)定义了元素“grant_type”：

```
grant-type = grant-name / URI-reference
grant-name = 1*name-char
name-char  = "-" / "." / "_" / DIGIT / ALPHA
```

## A.11. “code”语法

[第 4.1.3 节](/grant-types/authorization-code-grant#_4-1-3-令牌端点扩展)定义了元素“code”：

```
code       = 1*VSCHAR
```

## A.12. “access_token”语法

[第 3.2.3 节](/protocol-endpoints/token-endpoint#_3-2-3-令牌响应)定义了元素“access_token”：

```
access-token = 1*VSCHAR
```

## A.13. “token_type”语法

[第 3.2.3 节](/protocol-endpoints/token-endpoint#_3-2-3-令牌响应)和[第 6.1 节](/extensibility/defining-access-token-types)定义了元素“token_type”：

```
token-type = type-name / URI-reference
type-name  = 1*name-char
name-char  = "-" / "." / "_" / DIGIT / ALPHA
```

## A.14. “expires_in”语法

[第 3.2.3 节](/protocol-endpoints/token-endpoint#_3-2-3-令牌响应)定义了元素“expires_in”：

```
expires-in = 1*DIGIT
```

## A.15. “refresh_token”语法

[第 3.2.3 节](/protocol-endpoints/token-endpoint#_3-2-3-令牌响应)和[第 4.3 节](/grant-types/refresh-token-grant)定义了元素“refresh_token”：

```
refresh-token = 1*VSCHAR
```

## A.16. 端点参数语法

[第 6.2 节](/extensibility/defining-new-endpoint-parameters)定义了新的端点参数的语法：

```
param-name = 1*name-char
name-char  = "-" / "." / "_" / DIGIT / ALPHA
```

## A.17. “code_verifier”语法

下面是 code_verifier 的 ABNF。

```
code-verifier = 43*128unreserved
unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~"
ALPHA = %x41-5A / %x61-7A
DIGIT = %x30-39
```

## A.18. “code_challenge”语法

下面是 code_challenge 的 ABNF。

```
code-challenge = 43*128unreserved
unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~"
ALPHA = %x41-5A / %x61-7A
DIGIT = %x30-39
```
