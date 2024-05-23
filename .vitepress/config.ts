import { defineConfig } from "vitepress";

export default defineConfig({
  title: "OAuth 2.1 简体中文",
  description: "第 11 版草案的简体中文翻译",
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/oauth.svg",
      },
    ],
  ],
  lang: "zh-Hans",
  cleanUrls: true,
  srcDir: "src",
  lastUpdated: true,
  themeConfig: {
    logo: "/oauth.svg",
    nav: [
      {
        text: "原文",
        link: "https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-11",
      },
      {
        text: "OAuth",
        link: "https://oauth.net",
      },
    ],
    sidebar: [
      {
        text: "序言",
        base: "/preface",
        collapsed: true,
        items: [
          {
            text: "序言",
            link: "/",
          },
        ],
      },
      {
        text: "1. 简介",
        base: "/introduction",
        collapsed: true,
        items: [
          {
            text: "概述",
            link: "/",
          },
          {
            text: "1.1. 角色",
            link: "/roles",
          },
          {
            text: "1.2. 协议流程",
            link: "/protocol-flow",
          },
          {
            text: "1.3. 授权许可",
            link: "/authorization-grant",
          },
          {
            text: "1.4. 访问令牌",
            link: "/access-token",
          },
          {
            text: "1.5. 通信安全",
            link: "/communication-security",
          },
          {
            text: "1.6. HTTP 重定向",
            link: "/http-redirections",
          },
          {
            text: "1.7. 互操作性",
            link: "/interoperability",
          },
          {
            text: "1.8. 与 OAuth 2.0 的兼容性",
            link: "/compatibility-with-oauth-2.0",
          },
          {
            text: "1.9. 符号约定",
            link: "/notational-conventions",
          },
        ],
      },
      {
        text: "2. 客户端注册",
        base: "/client-registration",
        collapsed: true,
        items: [
          {
            text: "概述",
            link: "/",
          },
          {
            text: "2.1. 客户端类型",
            link: "/client-types",
          },
          {
            text: "2.2. 客户端标识符",
            link: "/client-identifier",
          },
          {
            text: "2.3. 客户端重定向端点",
            link: "/client-redirection-endpoint",
          },
          {
            text: "2.4. 客户端认证",
            link: "/client-authentication",
          },
          {
            text: "2.5. 未注册的客户端",
            link: "/unregistered-clients",
          },
        ],
      },
      {
        text: "3. 协议端点",
        base: "/protocol-endpoints",
        collapsed: true,
        items: [
          {
            text: "概述",
            link: "/",
          },
          {
            text: "3.1. 授权端点",
            link: "/authorization-endpoint",
          },
          {
            text: "3.2. 令牌端点",
            link: "/token-endpoint",
          },
        ],
      },
      {
        text: "4. 许可类型",
        base: "/grant-types",
        collapsed: true,
        items: [
          {
            text: "概述",
            link: "/",
          },
          {
            text: "4.1. 授权码许可",
            link: "/authorization-code-grant",
          },
          {
            text: "4.2. 客户端凭据许可",
            link: "/client-credentials-grant",
          },
          {
            text: "4.3. 刷新令牌许可",
            link: "/refresh-token-grant",
          },
          {
            text: "4.4. 扩展许可",
            link: "/extension-grants",
          },
        ],
      },
      {
        text: "5. 资源请求",
        base: "/resource-requests",
        collapsed: true,
        items: [
          {
            text: "概述",
            link: "/",
          },
          {
            text: "5.1. 不记名令牌请求",
            link: "/bearer-token-requests",
          },
          {
            text: "5.2. 访问令牌验证",
            link: "/access-token-validation",
          },
          {
            text: "5.3. 错误响应",
            link: "/error-response",
          },
        ],
      },
      {
        text: "6. 可扩展性",
        base: "/extensibility",
        collapsed: true,
        items: [
          {
            text: "6.1. 定义新的访问令牌类型",
            link: "/defining-access-token-types",
          },
          {
            text: "6.2. 定义新的端点参数",
            link: "/defining-new-endpoint-parameters",
          },
          {
            text: "6.3. 定义新的授权许可类型",
            link: "/defining-new-authorization-grant-types",
          },
          {
            text: "6.4. 定义新的授权端点响应类型",
            link: "/defining-new-authorization-endpoint-response-types",
          },
          {
            text: "6.5. 定义新的错误代码",
            link: "/defining-additional-error-codes",
          },
        ],
      },
      {
        text: "7. 安全考量",
        base: "/security-considerations",
        collapsed: true,
        items: [
          {
            text: "概述",
            link: "/",
          },
          {
            text: "7.1. 访问令牌的安全考量",
            link: "/access-token-security-considerations",
          },
          {
            text: "7.2. 客户端认证",
            link: "/client-authentication",
          },
          {
            text: "7.3. 冒充客户端",
            link: "/client-impersonation",
          },
          {
            text: "7.4. 客户端冒充资源所有者",
            link: "/client-impersonating-resource-owner",
          },
          {
            text: "7.5. 授权码的安全考量",
            link: "/authorization-code-security-considerations",
          },
          {
            text: "7.6. 确保端点真实性",
            link: "/ensuring-endpoint-authenticity",
          },
          {
            text: "7.7. 凭据猜测攻击",
            link: "/credentials-guessing-attacks",
          },
          {
            text: "7.8. 钓鱼攻击",
            link: "/phishing-attacks",
          },
          {
            text: "7.9. 跨站请求伪造",
            link: "/cross-site-request-forgery",
          },
          {
            text: "7.10. 点击劫持",
            link: "/clickjacking",
          },
          {
            text: "7.11. 代码注入和输入验证",
            link: "/code-injection-and-input-validation",
          },
          {
            text: "7.12. 开放式重定向",
            link: "/open-redirection",
          },
          {
            text: "7.13. 减少授权服务器混淆攻击",
            link: "/authorization-server-mix-up-mitigation",
          },
        ],
      },
      {
        text: "8. 原生应用",
        base: "/native-applications",
        collapsed: true,
        items: [
          {
            text: "概述",
            link: "/",
          },
          {
            text: "8.1. 原生应用客户端注册",
            link: "/registration-of-native-app-clients",
          },
          {
            text: "8.2. 在原生应用中使用应用间 URI 通信实现 OAuth",
            link: "/using-inter-app-uri-communication-for-oauth-in-native-apps",
          },
          {
            text: "8.3. 在原生应用中发起授权请求",
            link: "/initiating-the-authorization-request-from-a-native-app",
          },
          {
            text: "8.4. 在原生应用中接收授权响应",
            link: "/receiving-the-authorization-response-in-a-native-app",
          },
          {
            text: "8.5. 原生应用的安全考量",
            link: "/security-considerations-in-native-apps",
          },
        ],
      },
      {
        text: "9. 浏览器应用",
        base: "/browser-based-apps",
        collapsed: true,
        items: [
          {
            text: "概述",
            link: "/",
          },
        ],
      },
      {
        text: "10. 与 OAuth 2.0 的区别",
        base: "/differences-from-oauth-2.0",
        collapsed: true,
        items: [
          {
            text: "概述",
            link: "/",
          },
          {
            text: "10.1. 移除 OAuth 2.0 隐式许可",
            link: "/removal-of-the-oauth-2.0-implicit-grant",
          },
          {
            text: "10.2. 令牌请求中的重定向 URI 参数",
            link: "/redirect-uri-parameter-in-token-request",
          },
        ],
      },
      {
        text: "11. IANA 考量",
        base: "/iana-considerations",
        collapsed: true,
        items: [
          {
            text: "概述",
            link: "/",
          },
        ],
      },
      {
        text: "12. 参考文献",
        base: "/references",
        collapsed: true,
        items: [
          {
            text: "概述",
            link: "/",
          },
          {
            text: "12.1. 规范性参考文献",
            link: "/normative-references",
          },
          {
            text: "12.2. 信息性参考文献",
            link: "/informative-references",
          },
        ],
      },
      {
        text: "附录",
        base: "/appendices",
        collapsed: true,
        items: [
          {
            text: "附录 A. 扩充巴科斯范式（ABNF）语法",
            link: "/augmented-backus-naur-form-abnf-syntax",
          },
          {
            text: "附录 B. application/x-www-form-urlencoded 媒体类型的用法",
            link: "/use-of-application-x-www-form-urlencoded-media-type",
          },
          {
            text: "附录 C. 扩展",
            link: "/extensions",
          },
          {
            text: "附录 D. 致谢",
            link: "/acknowledgements",
          },
          {
            text: "作者地址",
            link: "/authors-addresses",
          },
        ],
      },
    ],
    outline: {
      label: "页面导航",
      level: [2, 3],
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/mrcaidev/oauth-2.1-zh-hans",
      },
    ],
    footer: {
      message:
        '本站使用 <a href="https://vitepress.dev" target="_blank" rel="noreferrer">Vitepress</a> 构建',
      copyright:
        "原文 © 2024 IETF 信托基金和文档作者个人<br/>译文 © 2024 蔡与望",
    },
    editLink: {
      pattern:
        "https://github.com/mrcaidev/oauth-2.1-zh-hans/edit/master/src/:path",
      text: "在 GitHub 上编辑此页面",
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "short",
      },
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    darkModeSwitchLabel: "外观",
    lightModeSwitchTitle: "切换到明亮外观",
    darkModeSwitchTitle: "切换到暗黑外观",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "回到顶部",
  },
});
