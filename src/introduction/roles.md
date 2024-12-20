# 1.1. 角色

OAuth 定义了四种角色：

**资源所有者：**能够授予对受保护资源的访问权限的实体。当资源所有者是个人时，称其为终端用户。有时简称其为“RO”。

**资源服务器：**托管了受保护资源的服务器，其能够基于访问令牌，接受并响应对受保护资源的请求。资源服务器通常通过 API 来访问。有时简称其为“RS”。

**客户端：**代表资源所有者，并在其授权下，请求受保护资源的应用。这里的术语“客户端”不表示任何具体的实现细节（例如应用是运行在服务器、桌面还是其它设备上）。

**授权服务器：**在成功认证资源所有者，并且获得其授权后，给客户端颁发访问令牌的服务器。有时简称其为“AS”。

本规范主要定义了客户端和授权服务器的交互，以及客户端和资源服务器的交互。

授权服务器和资源服务器之间的交互不在本规范的范围内，不过已经有若干扩展提供了两者的互操作性选项。授权服务器和资源服务器可以是同一台服务器，也可以是不同的实体。一台授权服务器颁发的访问令牌可以被多个资源服务器所接受。

资源所有者和授权服务器的交互（例如终端用户如何与授权服务器进行认证）同样不在本规范的范围内。但有若干例外，例如在征求终端用户同意时的安全考量。

当资源所有者是终端用户时，用户会与客户端进行交互。当客户端是网络应用时，用户会通过用户代理与客户端进行交互，如 [[RFC9110](https://www.rfc-editor.org/info/rfc9110)] 第 3.5 节所述。当客户端是原生应用时，用户会直接通过操作系统与客户端进行交互。详见[第 2.1 节](/client-registration/client-types)。
