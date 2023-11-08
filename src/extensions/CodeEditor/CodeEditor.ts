import CodeBlock from '@tiptap/extension-code-block'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import CodeEditorVue from './CodeEditor.vue'
import { Database, CodeBlock as DatabaseCodeBlock } from './Database'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    prettyBanner: {
      toggleBanner: (attributes?: { language: string }) => ReturnType
    }
  }
}

export const CodeEditor = CodeBlock.extend({
  name: 'codeEditor',

  isolating: true,

  allowGapCursor: true,

  content: 'text*',

  marks: '',

  group: 'block',

  code: true,

  defining: true,

  addAttributes() {
    return {
      height: {
        default: 0,
        rendered: true
      },
      code: {
        default: 'hello world',
        rendered: false,
        parseHTML: (element) => element.firstElementChild?.textContent
      },
      database: {
        default: new Database().toJSON(),
        parseHTML: (element) => {
          let getFromAttribute = element.getAttribute('database')

          if (getFromAttribute && getFromAttribute.length > 0) {
            try {
              return new Database(getFromAttribute).toJSON()
            } catch (error) {
              console.log(error)
            }
          }

          return Database.createWithSingleCodeBlock(
            new DatabaseCodeBlock({
              content: element.innerText,
              title: '代码块',
              language: 'javascript',
              runnable: false
            })
          ).toJSON()
        }
      }
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(CodeEditorVue)
  },

  renderHTML({ node }) {
    // console.log("转换成HTML", node.attrs);
    return [
      'pre',
      {
        height: node.attrs.height,
        database: node.attrs.database
      },
      ['code', node.attrs.code]
    ]
  },

  addCommands() {
    return {
      setCodeBlock:
        attributes => ({ commands }) => {
          return commands.setNode(this.name, attributes)
        },
      toggleCodeBlock:
        attributes => ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph', attributes)
        },
    }
  },
})
