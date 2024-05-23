# 8.5. 原生应用的安全考量

## 8.5.1. 原生应用的嵌入式用户代理

嵌入式用户代理是一种在技术上可行的方法，用于授权原生应用。根据定义，对于授权服务器而言，第三方使用这些嵌入式用户代理是不安全的，因为托管嵌入式用户代理的应用可以访问用户的所有认证凭据，而不只是针对该应用的 OAuth 授权许可。

在典型的、基于网络视图的嵌入式用户代理实现中，主机应用可以记录登录表单中的每个按键输入，以获取用户名和密码、自动提交表单以绕过用户同意，以及复制会话 cookies，并使用其冒充用户进行认证。

即使是由与授权服务器属于同一方的可信应用使用，嵌入式用户代理也违反了最少特权原则，因为它们可以访问比其所需更强大的凭据，从而可能增加攻击面。

如果鼓励用户在嵌入式用户代理中输入凭据，并且没有浏览器通常拥有的地址栏和可见的证书验证功能，那么用户就不可能知道自己是否在登录合法网站。即使知道了，这也会让用户认为不先验证网站就输入凭据是没问题的。

除了安全问题，嵌入式用户代理还不与其它应用或浏览器共享认证状态。这就要求用户在每次授权请求时都要登录，而这通常被认为是一种差劲的用户体验。

## 8.5.2. 原生应用的虚假外部用户代理

发起授权请求的原生应用对用户界面有很大的控制权，并且可能展示虚假外部用户代理，即伪装成外部用户代理的嵌入式用户代理。

当所有善意参与者都使用外部用户代理时，好处是安全专家有可能发现恶意参与者，因为任何伪造外部用户代理的人都可以被证明是坏人。另一方面，如果善意参与者和恶意参与者都使用嵌入式用户代理，那么恶意参与者就不需要伪造任何东西，从而更难被发现。一旦检测到恶意应用，这些知识就可能被用于在恶意软件扫描软件中，将该恶意应用的签名列入黑名单，并采取删除措施（如果是应用商店分发的应用）和其它措施，以减少恶意应用的影响和传播。

授权服务器还可以要求使用只有真正的外部用户代理才能使用的认证因素，以直接防止虚假外部用户代理。

如果用户在使用应用内浏览器标签时，特别关注自己的安全，那么他们也可以采取额外的步骤，从应用内浏览器标签打开完整浏览器，再在后者中打开请求并完成授权，因为大多数应用内浏览器标签模式的实现都提供了这种功能。

## 8.5.3. 原生应用的恶意外部用户代理

如果恶意应用能够将自己配置为操作系统中 https 协议 URI 的默认处理程序，它就能够拦截使用默认浏览器的授权请求，并滥用这种信任地位，以达到恶意目的，例如对用户进行钓鱼。

这种攻击不只局限于 OAuth。如此配置的恶意应用会给用户带来原生应用使用 OAuth 以外的、普遍而持续的风险。许多操作系统会要求用户明确更改 http 和 https 协议 URI 的默认处理程序，以减轻这一问题。

## 8.5.4. 原生应用的回环重定向考量

回环接口重定向 URI **可以** 使用 http 协议（即不使用 TLS）。由于 HTTP 请求从不离开设备，对于回环接口重定向 URI 而言，这是可以接受的。

只在发起授权请求时，客户端才应该打开网络端口。一旦响应返回，客户端就应该关闭网络端口。

客户端应该只监听回环网络接口，以避免其它网络参与者的干扰。

客户端应该使用回环 IP，而不是如第 8.4.2 节所述的字符串 localhost。