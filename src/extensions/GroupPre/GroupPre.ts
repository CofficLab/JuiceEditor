import CodeBlock from '@tiptap/extension-code-block'
import { Node, VueNodeViewRenderer } from '@tiptap/vue-3'
import GroupPreVue from './GroupPre.vue'
import { v4 as uuidv4 } from 'uuid';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    GroupPre: {
      insertGroupPre: (attributes?: {
        language: string;
      }) => ReturnType;
    }
  }
}

// 保存成HTML的时候要考虑HTML转Markdown
export const GroupPre = Node.create({
  name: 'groupPre',
  content: 'pre*',
  group: 'block',

  // 将什么样的HTML解析成本节点
  parseHTML() {
    return [
      { tag: 'group-pre' },
    ]
  },

  // 当执行editor.getHTML()的时候，本节点输出的内容
  renderHTML: ({ node }) => ["group-pre", node.attrs, 0],

  // 在页面渲染时要执行的内容
  addNodeView() {
    return VueNodeViewRenderer(GroupPreVue)
  },

  addCommands() {
    return {
      insertGroupPre:
        attributes => ({ commands }) => {
          console.log("insert group pre")
          return commands.insertContent("<group-pre><pre><code>type here1</code></pre><pre><code>type here2</code></pre></group-pre>");
        },
    }
  }
})
