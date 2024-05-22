import { defineConfig } from "vitepress";

export default defineConfig({
  title: "OAuth 2.1 简体中文",
  description: "第 11 版草稿的简体中文翻译",
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
        text: "译文",
        link: "/preface",
      },
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
        link: "/preface",
      },
      {
        text: "1. 简介",
        items: [
          {
            text: "概述",
            link: "/introduction",
          },
          {
            text: "1.1. 角色",
            link: "/introduction/roles",
          },
          {
            text: "1.2. 协议流程",
            link: "/introduction/protocol-flow",
          },
        ],
      },
    ],
    outline: {
      label: "页面导航",
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/mrcaidev/oauth-2.1-zh-hans",
      },
    ],
    editLink: {
      pattern:
        "https://github.com/mrcaidev/oauth-2.1-zh-hans/edit/master/src/:path",
      text: "在 GitHub 上编辑此页面",
    },
    footer: {
      message:
        '本站使用 <a href="https://vitepress.dev" target="_blank" rel="noreferrer">Vitepress</a> 构建',
      copyright: "原文 © 2024 IETF 信托和文档作者个人<br/>译文 © 2024 蔡与望",
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
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
