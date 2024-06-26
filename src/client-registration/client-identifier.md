# 2.2. 客户端标识符

在授权服务器上，每个客户端的标识都依靠一个客户端标识符，即一个代表客户端提供的注册信息的唯一字符串。虽然授权服务器通常是自己颁发客户端标识符，但它也可以服务那些由其它方颁发标识符的客户端。客户端标识符不是一个秘密；它被暴露给资源所有者，并且**禁止**仅使用客户端标识符来认证客户端。在授权服务器上，客户端标识符是唯一的。

客户端标识符是一个不透明的字符串，其大小在本规范中没有定义。客户端应该避免假设标识符大小。授权服务器**应该**记录其颁发的任何标识符的大小。

如果授权服务器支持由其它方颁发标识符的客户端，那么授权服务器**应该**采取预防措施，防止客户端冒充资源所有者，如第 7.4 节所述。
