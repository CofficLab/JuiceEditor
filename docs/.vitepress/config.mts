import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Juice Editor",
  base: "/JuiceEditor/",
  description: "A Smart Editor",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '文档', link: '/drawio' }
    ],

    sidebar: [
      {
        text: '文档',
        items: [
          { text: '代码编辑器', link: '/code-editor' },
          { text: 'Drawio 画图', link: '/drawio' },
          { text: 'CI/CD', link: '/ci' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CofficLab/JuiceEditor' }
    ]
  }
})
