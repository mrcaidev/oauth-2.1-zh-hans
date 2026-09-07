# 4.4. 扩展许可

客户端使用扩展许可类型的方法是，将（授权服务器定义的）绝对 URI 作为令牌端点 grant_type 参数的值，并添加任何必要的额外参数，来指定许可类型。

例如，当用户在另一设备上授权了客户端时，为了使用 [RFC8628] 定义的设备授权许可来请求访问令牌，客户端发起如下 HTTP 请求（额外的换行符仅为展示目的）：

```http
POST /token HTTP/1.1
Host: server.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Adevice_code
&device_code=GmRhmhcxhwEzkoEqiMEg_DnyEysNkuNhszIySk9eS
&client_id=C409020731
```

如果访问令牌的请求有效，并且经过了授权，那么授权服务器就颁发访问令牌和可选的刷新令牌，如第 3.2.3 节所述。如果请求未能通过客户端认证，或者无效，那么授权服务器就返回错误响应，如第 3.2.4 节所述。
