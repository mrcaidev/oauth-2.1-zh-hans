# 1.3. 授权许可

授权许可代表了资源所有者（允许访问他拥有的受保护资源）的授权，客户端使用其获取访问令牌。本规范定义了三种许可类型，即授权码、刷新令牌和客户端凭据，以及用于定义额外类型的扩展机制。

## 1.3.1. 授权码

授权码是一种临时凭据，用于获取访问令牌。客户端不直接从资源所有者处请求授权，而是将资源所有者（通过其用户代理）定向到授权服务器；后者再将其定向回到客户端，并附上授权码。之后，客户端就可以使用授权码交换访问令牌。

在将资源所有者定向回到客户端并附上授权码之前，授权服务器认证资源所有者，并且可能会征求资源所有者的同意，或者告知他们客户端的请求。由于资源所有者只与授权服务器进行认证，资源所有者的凭据永远不会被分享给客户端。客户端也无需了解其它任何认证步骤，例如多因素认证或委托账户。

授权码提供了一些重要的安全优势，例如能够认证客户端，以及能够直接将访问令牌传输给客户端，而无需经过资源所有者的用户代理，从而避免了潜在的泄露，其中也包括泄露给资源所有者。

## 1.3.2. 刷新令牌

刷新令牌是用于获取访问令牌的凭据。刷新令牌可以由授权服务器颁发给客户端，并在现有的访问令牌失效或过期时，用于获取新的访问令牌，或者获取额外的、范围一致或更小的访问令牌（与资源所有者所授权的相比，访问令牌可以有更短的寿命、更少的权限）。刷新令牌的颁发是可选的，由授权服务器决定，并且可以根据客户端的属性、请求的属性、授权服务器的内置策略或任何其它依据来颁发。如果授权服务器选择颁发刷新令牌，刷新令牌就会与访问令牌一并颁发（例如图 2 的步骤（2）所示）。

刷新令牌是代表了资源所有者授予客户端的授权的字符串。这一字符串被视为对客户端不透明。刷新令牌可能是用于获取授权信息的标识符，也可能其本身就编码了这一信息。与访问令牌不同的是，刷新令牌旨在仅被用于授权服务器，而永远不发送给资源服务器。

```
+--------+                                           +---------------+
|        |--(1)------- Authorization Grant --------->|               |
|        |                                           |               |
|        |<-(2)----------- Access Token -------------|               |
|        |               & Refresh Token             |               |
|        |                                           |               |
|        |                            +----------+   |               |
|        |--(3)---- Access Token ---->|          |   |               |
|        |                            |          |   |               |
|        |<-(4)- Protected Resource --| Resource |   | Authorization |
| Client |                            |  Server  |   |     Server    |
|        |--(5)---- Access Token ---->|          |   |               |
|        |                            |          |   |               |
|        |<-(6)- Invalid Token Error -|          |   |               |
|        |                            +----------+   |               |
|        |                                           |               |
|        |--(7)----------- Refresh Token ----------->|               |
|        |                                           |               |
|        |<-(8)----------- Access Token -------------|               |
+--------+           & Optional Refresh Token        +---------------+
```

<p align="center">图 2：刷新过期的访问令牌</p>

图 2 所示的流程包括以下步骤：

1. 客户端与授权服务器进行认证，并展示授权许可，来请求访问令牌。
2. 授权服务器认证客户端，并验证授权许可。如果有效，就颁发访问令牌和可选的刷新令牌。
3. 客户端展示访问令牌，来请求资源服务器上的受保护资源。
4. 资源服务器验证访问令牌。如果有效，就为请求提供服务。
5. 重复步骤（3）和（4），直到访问令牌过期。如果客户端知道访问令牌已过期，它就跳转到步骤（7）；否则，它就再次请求受保护资源。
6. 由于访问令牌无效，资源服务器返回无效令牌错误。
7. 客户端展示刷新令牌，并提供客户端的认证信息（如果它被颁发过凭据），来请求新的访问令牌。客户端的认证要求取决于客户端类型和授权服务器的策略。
8. 授权服务器认证客户端，并验证刷新令牌。如果有效，就颁发新的访问令牌（和可选的新的刷新令牌）。

## 1.3.3. 客户端凭据

当授权范围仅限于由客户端控制的受保护资源时，或者仅限于与授权服务器预先协定好的受保护资源时，客户端凭据，或者其它形式的客户端认证信息（例如，用于给 JWT 签名的私钥，如 [[RFC7523](https://www.rfc-editor.org/info/rfc7523)] 所述），可以用作一种授权许可。当客户端根据与授权服务器预先协定好的授权，请求访问受保护资源时，客户端凭据将被使用。
