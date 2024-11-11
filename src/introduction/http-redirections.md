# 1.6. HTTP 重定向

本规范大量使用了 HTTP 重定向，其中的客户端或授权服务器会将资源所有者的用户代理定向到别处。虽然本规范中的示例使用的是 HTTP 302 状态码，但是任何其它的重定向方法，除了 HTTP 307，只要在用户代理中可用，都是被允许的，并且被视为具体的实现细节。详细描述见[第 7.5.4 节](/security-considerations/authorization-code-security-considerations#_7-5-4-http-307-重定向)。
