import CodeBlock from '@tiptap/extension-code-block'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import CodeEditorVue from './CodeEditor.vue'
import { Database, CodeBlock as DatabaseCodeBlock } from './Database'
import MonacoBox from './MonacoBox'
import { randomUUID } from 'crypto'
import { v4 as uuidv4 } from 'uuid';

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
      uuid: {
        default: uuidv4(),
        parseHTML: (element) => {
          let getFromAttribute = element.getAttribute('uuid')

          if (getFromAttribute && getFromAttribute.length > 0) {
            return getFromAttribute
          }

          return uuidv4()
        }
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
        database: node.attrs.database,
        uuid: node.attrs.uuid,
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

  addStorage() {
    return {
      editorUUID: "",
    }
  },

  onDestroy() {
    console.log('🍋  💼 CodeEditor: onTiptapDestroy')
    MonacoBox.disposeAll()
  },

  // onBeforeCreate() {
  //   console.log('🍋 💼 CodeEditor: onBeforeCreate, 存储 UUID ->', this.editor.options.injectNonce)
  //   this.storage.editorUUID = this.editor.options.injectNonce
  // },

  // onUpdate() {
  //   console.log('🍋 💼 CodeEditor: onTiptapUpdate, UUID', this.editor.options.injectNonce)
  //   this.storage.editorUUID = this.editor.options.injectNonce
  // },
})
