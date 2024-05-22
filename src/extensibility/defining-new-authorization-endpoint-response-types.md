# 6.4. 定义新的授权端点响应类型

用于授权端点的新响应类型，遵循 [RFC6749] 第 11.3 节的步骤，在授权端点响应类型注册表中定义并注册。响应类型名称**必须**符合 response-type 的 ABNF。

```abnf
response-type  = response-name *( SP response-name )
response-name  = 1*response-char
response-char  = "_" / DIGIT / ALPHA
```

如果一种响应类型包含了一个或多个空格字符（%x20），那么它以用空格分隔的值列表的形式被比较，其中值的顺序不重要。只有一种值的顺序可以被注册，其覆盖了相同值集合的其它所有排列。

例如，一项扩展可以定义并注册响应类型 code other_token。一旦注册，该组合就不能被注册为 other_token code，但两者都可以用于表示同一种响应类型。
