import CodeBlock from '@tiptap/extension-code-block'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import SmartPreVue from './SmartPre.vue'
import { v4 as uuidv4 } from 'uuid';
import MonacoBox from './Entities/MonacoBox';

const verbose = true;

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
  name: 'pre',

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
    }
  },

  addNodeView() {
    return VueNodeViewRenderer(SmartPreVue)
  },

  addCommands() {
    return {
      insertSmartPre:
        attributes => ({ commands }) => {

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

  addStorage() {
    return {
      editorUUID: "",
    }
  },

  onDestroy() {
    let verbose = false;
    if (verbose) {
      console.log('onTiptapDestroy')
    }
  },

  onCreate() {
    // The editor is ready.

    let verbose = false;
    if (verbose) {
      console.log("Boot Monaco")
    }
    MonacoBox.boot()

    let juiceEditor = document.querySelector('juice-editor')
    let shadowRoot = juiceEditor!.shadowRoot!
    let monacoDom = document.createElement('div')
    monacoDom.id = 'MonacoStyleBox'
    shadowRoot.appendChild(monacoDom)

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

function log(...messages: any[]) {
  if (!verbose) {
    return;
  }

  console.log('💼 SmartPre:', ...messages)
}