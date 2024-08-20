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
      { text: '文档', link: '/documents/guide/introduce', activeMatch: '/documents/guide/' }
    ],

    sidebar: [
      {
        text: '使用',
        items: [
          { text: '介绍', link: '/documents/guide/introduce' },
          { text: '开始', link: '/documents/guide/start' },
        ]
      },
      {
        text: '富文本组件',
        items: [
          { text: 'Banner', link: '/documents/components/banner' },
          { text: 'BlockQuote', link: '/documents/components/blockquote' },
          { text: 'Heading', link: '/documents/components/heading' },
          { text: 'Image', link: '/documents/components/image' },
          { text: 'Table', link: '/documents/components/table' },
          { text: 'Link', link: '/documents/components/link' },
          { text: 'Paragraph', link: '/documents/components/paragraph' },
          { text: 'BulletList', link: '/documents/components/bulletList' },
          { text: 'TaskList', link: '/documents/components/tasklist' },
          { text: 'Kbd', link: '/documents/components/keyboard' },
        ]
      },
      {
        text: '原理',
        items: [
          { text: 'CI/CD', link: '/documents/principle/ci' },
          { text: 'Web Component', link: '/documents/principle/web-component' }
        ]
      },
      {
        text: '案例',
        items: [
          { text: '快易知网站', link: '/documents/projects/kuaiyizhi_web' },
          { text: '快易知APP', link: '/documents/projects/kuaiyizhi_app' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CofficLab/JuiceEditor' }
    ]
  }
})
