process.env.VITE_EXTRA_EXTENSIONS = 'crx'

import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "刘海旭",
  description: "组件、学习笔记与项目踩坑记录",
  base: '/liuhaixu.github.io/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '组件', link: '/components' }
    ],

    sidebar: [
      {
        text: '组件',
        link: '/components/index',
        items: [
          { text: 'phone-login', link: '/components/phone-login' },
          { text: 'unv-calendar', link: '/components/unv-calendar' },
          { text: 'unv-progress', link: '/components/unv-progress' }
        ]
      },
      {
        text: '学习',
        link: '/learn/index',
        items: [
          { text: 'umijs', link: '/learn/umijs学习小结' },
          { text: 'webpack插件之html-webpack-plugin', link: '/learn/webpack插件之html-webpack-plugin' },
          { text: 'webpack插件之mini-css-extract-plugin', link: '/learn/webpack插件之mini-css-extract-plugin' },
          { text: 'webpack构建React、TSX项目（一）', link: '/learn/webpack构建React、TSX项目（一）' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lhx-liu' }
    ],
    //头上角要主题切换的文字 Appearance
    lightModeSwitchTitle: "切换主题",
    lightModeSwitchTitle: "切换主题",
    // 文章翻页
    docFooter: {
      prev: "上一篇", //Next page
      next: "下一篇", //Previous page
    },
    //当前页面 On this page
    outlineTitle: "页面内容",

    // 返回顶部 Return to top
    returnToTopLabel: "返回顶部",

    // 菜单  Menu
    sidebarMenuLabel: "菜单",
  },

  //设置为中文，相当于html标签加lang="zh-CN"
  lang: "zh-CN",
  locales: {
    "/": {
      label: "简体中文",
      lang: "zh-CN",
    },
  },
})
