import CodeBlock from '@tiptap/extension-code-block'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import SmartPreVue from './SmartPre.vue'
import MonacoFactory from './MonacoFactory';
import { Component } from 'vue';
import { TiptapEditor } from '../../model/TiptapGroup';

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
      title: '💻 SmartPre',
      booted: false,
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
    return VueNodeViewRenderer(SmartPreVue as Component)
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

  onCreate() {
    if (this.editor?.isEditable && !this.storage.booted) {
      if (this.storage.verbose) {
        console.log(this.storage.title, 'onCreate, boot Monaco')
      }
      MonacoFactory.boot()
      this.storage.booted = true
    }
  },

  onUpdate() {
    if (this.editor?.isEditable && !this.storage.booted) {
      if (this.storage.verbose) {
        console.log(this.storage.title, 'onUpdate, boot Monaco')
      }
      MonacoFactory.boot()
      this.storage.booted = true
    }
  }
})
