import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Juice Editor",
  base: "/JuiceEditor/",
  description: "A Smart Editor",
  head: [
    ['link', { rel: 'icon', href: '/JuiceEditor/images/favicon.png' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/images/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/guide/drawio', activeMatch: '/guide/' }
    ],

    sidebar: [
      {
        text: '文档',
        items: [
          { text: '代码编辑器', link: '/guide/code-editor' },
          { text: 'Drawio 画图', link: '/guide/drawio' },
          { text: 'CI/CD', link: '/guide/ci' },
          { text: 'Web Component', link: '/guide/web-component' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CofficLab/JuiceEditor' }
    ]
  }
})
