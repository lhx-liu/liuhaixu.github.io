process.env.VITE_EXTRA_EXTENSIONS = 'crx'

import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "刘海旭",
  description: "组件、学习笔记与项目踩坑记录",
  base: '/lhx-liu/',
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
          { text: 'umijs', link: '/learn/umijs学习小结' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lhx-liu' }
    ]
  }
})
