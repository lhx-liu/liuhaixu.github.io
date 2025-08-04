process.env.VITE_EXTRA_EXTENSIONS = 'crx'

import { defineConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';


// 自动生成侧边栏
const vitePressSidebarOptions = {
  // VitePress Sidebar's options here...
  documentRootPath: '/',
  collapsed: false,
  capitalizeFirst: true,
  excludeByGlobPattern: ["README.md"]
};

// https://vitepress.dev/reference/site-config
export default defineConfig(
  withSidebar({
  logo: '',
  lastUpdated: true,
  title: "编程学习之旅",
  description: "编程学习之旅",
  base: '/liuhaixu.github.io/', // 部署到github时  需要增加这个base 否则样式无法解决
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '组件', link: '/components' }
    ],
    // 支持搜索
    search: {
      provider: 'local'
    },

    sidebar: [],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lhx-liu' }
    ],
    //头上角要主题切换的文字 Appearance
    lightModeSwitchTitle: "切换主题",
    darkModeSwitchTitle: "切换主题",
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
}, vitePressSidebarOptions))
