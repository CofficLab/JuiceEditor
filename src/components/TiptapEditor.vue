<template>
  <div v-if="editor" class="flex">
    <!-- 选中文字后弹出的菜单 -->
    <BubbleMenus :editor="editor"></BubbleMenus>

    <!-- 回车后弹出的菜单 -->
    <FloatMenus :editor="editor"></FloatMenus>

    <div class="container mx-auto px-4 md:px-0 flex flex-col pt-12 pb-48 prose dark:prose-invert">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { CodeEditor } from '../extensions/CodeEditor/CodeEditor'
import { Toc } from '../extensions/Toc/Toc.js'
import SmartImage from '../extensions/SmartImage/SmartImage'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
import StarterKit from '@tiptap/starter-kit'
import SmartDraw from '../extensions/SmartDraw/SmartDraw'
import { SmartBanner } from '../extensions/SmartBanner/SmartBanner'
import BubbleMenus from './BubbleMenus.vue'
import FloatMenus from './FloatMenus.vue'
import TreeNode from '../entities/TreeNode'

let isDebug = process.env.NODE_ENV === 'development'

const drawIoLink = computed(() => {
  const query = httpBuildQuery({
    embed: '1',
    ui: 'min',
    spin: '1',
    modified: 'unsavedChanges',
    proto: 'json',
    lang: 'zh',
    'hide-pages': '1',
    lightbox: '0',
    browser: '0',
    gapi: '0',
    db: '0',
    od: '0',
    tr: '0',
    gh: '0',
    gl: '0',
    noSaveBtn: '0',
    noExitBtn: '1',
    saveAndExit: '0',
    dev: isDebug ? '1' : '0'
  })
  return isDebug
    ? 'http://localhost:5173/drawio/src/main/webapp/index.html?' + query
    : 'http://localhost:8080/dist/draw/index.html?' + query
})

const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  onUpdate: {
    type: Function,
    default: (editor: Editor) => { }
  }
})

var editor = new Editor({
  extensions: [
    CodeEditor,
    CharacterCount,
    SmartBanner,
    SmartDraw.configure({
      drawIoLink: drawIoLink.value,
      openDialog: 'click'
    }),
    Toc,
    SmartImage.configure({
      allowBase64: true,
      HTMLAttributes: {
        class: ''
      }
    }),
    Document.extend({
      content: 'heading block*'
    }),
    StarterKit.configure({
      document: false,
      codeBlock: false
    }),
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === 'heading' && node.attrs.level == 1) {
          return '输入标题'
        }

        return ''
      }
    })
  ],
  autofocus: true,
  content: props.content,
  onUpdate() {
    let treeNode = getTreeNodeFromEditor()
    console.log('TiptapEditor: onUpdate, callback with TreeNode')
    props.onUpdate(treeNode)
  }
})

watch(props, () => {
  console.log('TiptapEditor: props.content changed')

  const isSame = editor.getHTML() === props.content

  if (isSame) {
    return
  }

  console.log('TiptapEditor: props.content changed, update content')
  editor.commands.setContent(props.content, false)
})

onMounted(() => {
  document.addEventListener('ToggleToc', function (e) {
    editor.chain().focus().toggleToc().run()
  })
})

onBeforeUnmount(() => {
  editor.destroy()
})

function httpBuildQuery(params: { [x: string]: any; hasOwnProperty: (arg0: string) => any }) {
  var queryString = ''

  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var value = params[key]
      queryString += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&'
    }
  }

  // 去除最后一个多余的"&"
  queryString = queryString.slice(0, -1)

  return queryString
}

function getTreeNodeFromEditor(): TreeNode {
  let nodes = editor.state.doc.content
  let title = ''
  nodes.forEach((node) => {
    if (node.type.name == 'heading' && title == '') {
      title = node.textContent!
    }
  })

  return new TreeNode({
    title: title,
    content: editor.getHTML(),
    characterCount: editor.storage.characterCount.characters(),
    wordCount: editor.storage.characterCount.words()
  })
}
</script>

<style lang="scss">
.ProseMirror {
  >*+* {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }
}

/* Basic editor styles */
.ProseMirror {
  >*+* {
    margin-top: 0.75em;
  }
}

/* Placeholder (at the top) */
/*.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #ced4da;
  pointer-events: none;
  height: 0;
}

/* Placeholder (on every new line) */
.ProseMirror .is-empty::before {
  content: attr(data-placeholder);
  float: left;
  color: #ced4da;
  pointer-events: none;
  height: 0;
}
</style>
