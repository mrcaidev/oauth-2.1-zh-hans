# 附录 A. 扩充巴科斯范式（ABNF）语法

该节使用 [[RFC5234](https://www.rfc-editor.org/info/rfc5234)]，为该规范定义的各元素提供了扩充巴科斯范式（ABNF）语法的描述。下面的 ABNF 使用 Unicode 码位 [[W3C.REC-xml-20081126](https://www.w3.org/TR/REC-xml/REC-xml-20081126.xml)] 定义。这些字符通常使用 UTF-8 编码。各元素根据定义顺序进行展示。

下面的某些定义使用了 [[RFC3986](https://www.rfc-editor.org/info/rfc3986)] 中的“URI-reference”定义。

下面的某些定义中使用了这些通用定义：

```abnf
VSCHAR     = %x20-7E
NQCHAR     = %x21 / %x23-5B / %x5D-7E
NQSCHAR    = %x20-21 / %x23-5B / %x5D-7E
```

## A.1. “client_id”语法

第 2.4.1 节定义了元素“client_id”：

```abnf
client-id     = *VSCHAR
```

## A.2. “client_secret”语法

第 2.4.1 节定义了元素“client_secret”：

```abnf
client-secret = *VSCHAR
```

## A.3. “response_type”语法

第 4.1.1 节和第 6.4 节定义了元素“response_type”：

```abnf
response-type = response-name *( SP response-name )
response-name = 1*response-char
response-char = "_" / DIGIT / ALPHA
```

## A.4. “scope”语法

第 1.4.1 节定义了元素“scope”：

```abnf
 scope       = scope-token *( SP scope-token )
 scope-token = 1*NQCHAR
```

## A.5. “state”语法

第 4.1.1 节、第 4.1.2 节和第 4.1.2.1 节定义了元素“state”：

```abnf
 state      = 1*VSCHAR
```

## A.6. “redirect_uri”语法

第 4.1.1 节和第 4.1.3 节定义了元素“redirect_uri”：

```abnf
 redirect-uri      = URI-reference
```

## A.7. “error”语法

第 4.1.2.1 节、第 3.2.4 节、第 7.2 节和第 8.5 节定义了元素“error”：

```abnf
 error             = 1*NQSCHAR
```

## A.8. “error_description”语法

第 4.1.2.1 节、第 3.2.4 节和第 5.3 节定义了元素“error_description”：

```abnf
 error-description = 1*NQSCHAR
```

## A.9. “error_uri”语法

第 4.1.2.1 节、第 3.2.4 节和第 7.2 节定义了元素“error_uri”：

```abnf
error-uri         = URI-reference
```

## A.10. “grant_type”语法

第 3.2.2 节定义了元素“grant_type”：

```abnf
grant-type = grant-name / URI-reference
grant-name = 1*name-char
name-char  = "-" / "." / "_" / DIGIT / ALPHA
```

## A.11. “code”语法

第 4.1.3 节定义了元素“code”：

```abnf
code       = 1*VSCHAR
```

## A.12. “access_token”语法

第 3.2.3 节定义了元素“access_token”：

```abnf
access-token = 1*VSCHAR
```

## A.13. “token_type”语法

第 3.2.3 节和第 6.1 节定义了元素“token_type”：

```abnf
token-type = type-name / URI-reference
type-name  = 1*name-char
name-char  = "-" / "." / "_" / DIGIT / ALPHA
```

## A.14. “expires_in”语法

第 3.2.3 节定义了元素“expires_in”：

```abnf
expires-in = 1*DIGIT
```

## A.15. “refresh_token”语法

第 3.2.3 节和第 4.3 节定义了元素“refresh_token”：

```abnf
refresh-token = 1*VSCHAR
```

## A.16. 端点参数语法

第 6.2 节定义了新的端点参数的语法：

```abnf
param-name = 1*name-char
name-char  = "-" / "." / "_" / DIGIT / ALPHA
```

## A.17. “code_verifier”语法

下面是 code_verifier 的 ABNF。

```abnf
code-verifier = 43*128unreserved
unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~"
ALPHA = %x41-5A / %x61-7A
DIGIT = %x30-39
```

## A.18. “code_challenge”语法

下面是 code_challenge 的 ABNF。

```abnf
code-challenge = 43*128unreserved
unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~"
ALPHA = %x41-5A / %x61-7A
DIGIT = %x30-39
```
