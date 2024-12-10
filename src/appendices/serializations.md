# 附录 C. 序列化

本规范中的许多信息都使用下列方法之一进行序列化。本章节描述了这些序列化方法的语法；其它章节描述了能够并且必须使用它们的场合。请注意，不是每种方法都适用于所有信息。

## C.1. 查询字符串序列化

客户端使用 [WHATWG.URL] 中定义的 application/x-www-form-urlencoded 格式，把参数和值添加到 URL 的查询组件中，从而获得目标字符串。这种方法通常用于 HTTP GET 请求。

## C.2. 表单编码序列化

使用[附录 B](/appendices/use-of-application-x-www-form-urlencoded-media-type) 中定义的 application/x-www-form-urlencoded 格式，把参数和值添加到 HTTP 请求体中，从而序列化参数和值。这种方法通常用于 HTTP POST 请求。

## C.3. JSON 序列化

把每个参数添加到 JSON [[RFC8259](https://www.rfc-editor.org/info/rfc8259)] 结构的最高级。参数名称和字符串值用 JSON 字符串表示。数字值用 JSON 数字表示。布尔值用 JSON 布尔表示。被省略的参数和无值参数**应该**从对象中省略，而不是用 JSON null 值表示，除非另有规定。参数的值**可以**是 JSON 对象或 JSON 数组。参数的顺序不重要，可以调换。
