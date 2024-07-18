<template>
  <div v-if="editor" class="flex flex-col tiptap">
    <!-- 选中文字后弹出的菜单 -->
    <BubbleMenus
      :editor="editor"
      v-if="editable && bubbleMenusEnable && !contextMenuDidShow"
    ></BubbleMenus>

    <!-- 回车后弹出的菜单 -->
    <FloatMenus
      :editor="editor"
      v-if="editable && floatingMenusEnable && !contextMenuDidShow"
    ></FloatMenus>

    <div
      class="flex flex-row justify-center 4md:justify-center py-4"
      :class="{
        'md:justify-end': shouldShowToc
      }"
    >
      <!-- 编辑器 -->
      <editor-content
        :editor="editor"
        :class="{
          'bg-slate-300/10': false,
          'md:bg-green-300/10': false,
          'lg:bg-blue-300/10': false,
          'xl:bg-purple-300/10': false,
          '2xl:bg-red-300/10': false,
          'md:max-w-xl': true,
          'md:px-8': true,
          'md:py-6': true,
          'lg:max-w-2xl': true,
          'lg:px-8': true,
          'lg:py-6': true,
          'xl:max-w-3xl': true,
          'xl:px-8': true,
          'xl:py-6': true,
          '2xl:max-w-4xl': true,
          '2xl:px-12': true,
          '2xl:py-8': true,
          'bg-base-300/20': true,
          'shadow-inner': true,
          'shadow-3xl': true,
          rounded: true
        }"
        class="flex flex-col pb-48 prose dark:prose-invert px-4 container prose-sm min-h-screen"
      />

      <!-- TOC，和顶部留一些距离，因为WEB项目顶部有导航栏 -->
      <div
        class="hidden flex-row justify-start h-screen right-0 overflow-y-scroll sticky top-12 md:flex 4md:fixed 4md:right-0"
        id="toc"
        v-if="shouldShowToc"
        :class="{
          'w-48': true,
          'md:w-56': true,
          '4md:w-48': true,
          'xl:w-64': true,
          '2xl:w-88': true
        }"
      >
        <div class="w-full my-12 overflow-y-scroll bg-green-400/0">
          <ul class="menu menu-xs bg-base-200/0" v-for="h in headingTree.children">
            <HeadingVue :heading="h"></HeadingVue>
          </ul>
        </div>
      </div>
    </div>

    <!-- 右键菜单 -->
    <ContextMenu :editor="editor"></ContextMenu>

    <!-- 提示信息 -->
    <Message :message="message"></Message>
  </div>
</template>

<script lang="ts" setup>
import { EditorContent } from '@tiptap/vue-3'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import BubbleMenus from './BubbleMenus.vue'
import FloatMenus from './FloatMenus.vue'
import TiptapAgent from '../entities/TiptapAgent'
import DrawAgent from '../entities/DrawAgent'
import EditorData from '../entities/EditorData'
import ContextMenu from './ContextMenu.vue'
import Message from './Message.vue'
import HeadingVue from './Heading.vue'
import EventManager from '../entities/EventManager'
import Heading from '../extensions/Toc/Heading'

const props = defineProps({
  uuid: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  editable: {
    type: Boolean,
    default: false
  },
  drawEnable: {
    required: true,
    type: Boolean,
    default: false
  },
  tableEnable: {
    type: Boolean,
    default: false,
    required: true
  },
  bubbleMenusEnable: {
    type: Boolean,
    default: true,
    required: true
  },
  floatingMenusEnable: {
    type: Boolean,
    default: true,
    required: true
  },
  onCreate: {
    type: Function,
    default: () => {}
  },
  onUpdate: {
    type: Function,
    default: () => {}
  },
  onSelectionUpdate: {
    type: Function,
    default: () => {}
  }
})

const editor = TiptapAgent.create({
  uuid: props.uuid,
  content: props.content,
  editable: props.editable,
  drawIoLink: DrawAgent.getLink(),
  drawEnable: props.drawEnable,
  tableEnable: props.tableEnable,
  onCreate: (data: EditorData) => {
    props.onCreate(data)
  },
  onUpdate: (data: EditorData) => {
    refreshToc('onUpdate')
    if (!props.editable) {
      return console.log('🍋 TiptapEditor: 只读模式，不回调更新')
    }

    props.onUpdate(data)
  },
  onSelectionUpdate(type) {
    console.log('🍋 TiptapEditor: onSelectionUpdate', type)
    props.onSelectionUpdate(type)
  }
})

const contextMenuDidShow = ref(false)
const message = ref('')
const eventManager = new EventManager()
const headingTree = ref(new Heading())
const shouldShowToc = computed(() => {
  return editor.commands.hasToc() && headingTree
})

function refreshToc(reason: string) {
  //console.log("刷新TOC，因为", reason)
  headingTree.value = Heading.makeTree(editor) as unknown as Heading
}

function onMouseDown(e: Event) {
  console.log('TiptapEditor: mousedown')

  let target = e.target as HTMLElement
  const pos = editor.view.posAtDOM(target, 1)
  editor.commands.focus(pos)
}

function onClick(e: Event) {
  // console.log('🍋 TiptapEditor: click，关闭应用的右键菜单')
  contextMenuDidShow.value = false
}

function onContextMenu(e: Event) {
  console.log('🍋 TiptapEditor: contextmenu')
  contextMenuDidShow.value = true

  let target = e.target as HTMLElement
  target.click()
}

watch(props, () => {
  console.log('🍋 🗒️ TiptapEditor: props changed', props.uuid)

  // 更新，但不触发onUpdate
  editor.setOptions({
    injectNonce: props.uuid
  })
  editor.commands.setContent(props.content, false)
  // 最后一步，触发onUpdate
  editor.setEditable(props.editable, true)
})

onMounted(() => {
  console.log('🍋 🗒️ TiptapEditor: onMounted')

  refreshToc('onMounted')

  // 处理事件
  eventManager.setListener(editor, (msg) => {
    message.value = msg
    document.getElementById('messageTrigger')?.click()
  })

  document.addEventListener('contextmenu', onContextMenu)
  // document.addEventListener('mousedown', onMouseDown)
  document.addEventListener('click', onClick)
})

onBeforeUnmount(() => {
  console.log('🍋 🗒️ TiptapEditor: onBeforeUnmount')
  editor.destroy()
  eventManager.removeListener()
  document.removeEventListener('mousedown', onMouseDown)
  document.removeEventListener('click', onClick)
  document.removeEventListener('contextmenu', onContextMenu)
})
</script>

<style lang="scss">
.ProseMirror {
  > * + * {
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
  > * + * {
    margin-top: 0.75em;
  }
}

/* Placeholder (at the top) */
.ProseMirror p.is-editor-empty:first-child::before {
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

ul[data-type='taskList'] {
  list-style: none;
  padding: 0;

  p {
    margin: 0;
  }

  li {
    display: flex;

    > label {
      flex: 0 0 auto;
      margin-right: 0.5rem;
      user-select: none;
    }

    > div {
      flex: 1 1 auto;
    }

    ul li,
    ol li {
      display: list-item;
    }

    ul[data-type='taskList'] > li {
      display: flex;
    }
  }
}
</style>
