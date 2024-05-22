# 4.2. 客户端凭据许可

当客户端请求访问受其自身控制的受保护资源，或者与授权服务器预先协定好的（其具体方法超出本规范的范围）、另一个资源所有者的受保护资源时，客户端可以仅使用其客户端凭据（或其它支持的认证方式），来请求访问令牌。

客户端凭据许可类型**必须**仅由机密客户端使用。

```
+---------+                                  +---------------+
|         |                                  |               |
|         |>--(1)- Client Authentication --->| Authorization |
| Client  |                                  |     Server    |
|         |<--(2)---- Access Token ---------<|               |
|         |                                  |               |
+---------+                                  +---------------+
```

<p align="center">图 4：客户端凭据许可</p>

图 4 所示的客户端凭据许可使用方法包括下列步骤：

（1）客户端与授权服务器进行认证，并从令牌端点处请求访问令牌。
（2）授权服务器认证客户端。如果有效，那么就颁发访问令牌。

## 4.2.1. 令牌端点扩展

在令牌端点上，该许可类型通过 grant_type 值为 client_credentials 来被标识。

如果设置了该值，那么以下这些在第 3.2.2 节描述之外的、额外的令牌请求参数也被支持：

**“scope”：** **可选**。访问请求的范围，如第 1.4.1 节所述。

例如，客户端使用 TLS 发起如下的 HTTP 请求（额外的换行符仅为展示目的）：

```http
POST /token HTTP/1.1
Host: server.example.com
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
```

授权服务器必须**认证**客户端。
