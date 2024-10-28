import CodeBlock from '@tiptap/extension-code-block'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import SmartPreVue from './SmartPre.vue'
import MonacoBox from './Entities/MonacoBox';
import { title } from 'process';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    SmartPre: {
      insertSmartPre: (attributes?: {
        language: string;
      }) => ReturnType;
    }
  }
}

// 保存成HTML的时候要考虑HTML转Markdown
export default CodeBlock.extend({
  addStorage() {
    return {
      verbose: true,
      title: '🍋 SmartPre',
    }
  },
  addAttributes() {
    return {
      language: {
        default: null,
        parseHTML: element => {
          const { languageClassPrefix } = this.options
          const classNames = [...(element.firstElementChild?.classList || [])]
          const languages = classNames
            .filter(className => className.startsWith(languageClassPrefix))
            .map(className => className.replace(languageClassPrefix, ''))
          const language = languages[0]

          if (!language) {
            return null
          }

          return language
        },
        rendered: false,
      },
      height: {
        default: 0,
        rendered: true
      },
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(SmartPreVue as any)
  },

  addCommands() {
    return {
      insertSmartPre:
        () => ({ commands }) => {
          return commands.insertContent("<pre><code class='language-text'></code></pre>");
        },
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

  onDestroy() {
    let verbose = false;
    if (verbose) {
      console.log('onTiptapDestroy')
    }
  },

  onCreate() {
    if (this.storage.verbose) {
      console.log(this.storage.title, 'onCreate', 'boot Monaco')
    }
    MonacoBox.boot()

    let dom = this.editor.options.element
    let monacoDom = document.createElement('div')
    monacoDom.id = 'MonacoStyleBox'
    dom.appendChild(monacoDom)

    // 仅用于让Monaco将样式写入dom中
    MonacoBox.createEmptyEditor(monacoDom)
  },

  onBeforeCreate() {
    // log('onBeforeCreate, 存储 UUID ->', this.editor.options.injectNonce)
    // this.storage.editorUUID = this.editor.options.injectNonce
  },

  // onUpdate() {
  //   console.log('🍋 💼 CodeEditor: onTiptapUpdate, UUID', this.editor.options.injectNonce)
  //   this.storage.editorUUID = this.editor.options.injectNonce
  // },
})