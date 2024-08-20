# 介绍

## 为什么要开发 JuiceEditor

作者因为经常需要记笔记，所以尝试过很多笔记软件，都不满意：

- 有的功能太少
- 有的功能太多
- 有的交互较差

所以作者就决定自己开发一个笔记 APP，满足自己的需求。  

这个笔记APP的富文本编辑器就是 JuiceEditor。

对于作者的使用需求，JuiceEditor 要满足以下需求：

- 功能强大
- 交互良好
- 可扩展
- 可嵌入 APP
- 简洁
- 可嵌入网页
- SEO 友好

这是一个很大的工程，尽管作者很努力，目前（2024年8月）仍处于开发中，尚不稳定。

## 有什么不一样

- JuiceEditor 作为一个标签嵌入到页面中：`<juice-editor></juice-editor>`；
- 任何框架都可用，可以用在任何支持Javascript、CSS、HTML 的环境中；
- JuiceEditor 内置插件系统，可以灵活增加插件实现更多功能，比如：
  - 在写文章时，可以随时打开画图组件，为文章插入一张流程图

## 案例

目前，有以下产品的富文本模块用到了 JuiceEditor：

- [快易知 APP](https://apps.apple.com/cn/app/%E5%BF%AB%E6%98%93%E7%9F%A5/id6457892799)
- [快易知](https://www.kuaiyizhi.cn)

## 基于什么开发

- [ChatGPT](https://chatgpt.com/)
- [Draw.io](https://github.com/jgraph/drawio)
- [TailwindCSS](https://tailwindcss.com/)
- [Vue3](https://v3.vuejs.org/)
- [Tiptap](https://tiptap.dev/)
- [Web Component](https://cn.vuejs.org/guide/extras/web-components.html)