# 附录 B. application/x-www-form-urlencoded 媒体类型的用法

在 [[RFC6749](https://www.rfc-editor.org/info/rfc6749)] 发布时，application/x-www-form-urlencoded 媒体类型在 [[W3C.REC-html401-19991224](https://www.w3.org/TR/1999/REC-html401-19991224/)] 中定义，但没有在 IANA MIME 媒体类型注册表（http://www.iana.org/assignments/media-types）中注册。而且，这一定义不完整，因为它没有考虑非 ASCII 字符。

在生成该媒体类型的内容时，为了克服这一缺点，名称和值**必须**先使用 UTF-8 字符编码方案 [[RFC3629](https://www.rfc-editor.org/info/rfc3629)] 编码。然后，获得的字节串需要使用 [[W3C.REC-html401-19991224](https://www.w3.org/TR/1999/REC-html401-19991224/)] 定义的转义规则进一步编码。

在从该媒体类型的内容中解析数据时，通过逆名称/值编码获得的名称和值也就需要被视为字节串，然后使用 UTF-8 字符编码方案解码。

例如，对于这一包含六个 Unicode 码位的值而言：U+0020（空格）、U+0025（百分比号）、U+0026（双引号）、U+002B（加号）、U+00A3（井号）和 U+20AC（欧元标志），它会被编码成下面的字节串（使用十六进制表示）：

```
20 25 26 2B C2 A3 E2 82 AC
```

然后在内容中表示为：

```
+%25%26%2B%C2%A3%E2%82%AC
```

GitHub 讨论：https://github.com/oauth-wg/oauth-v2-1/issues/128
