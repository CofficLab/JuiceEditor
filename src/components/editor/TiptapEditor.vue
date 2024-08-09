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
      class="flex flex-row justify-center pt-4 pb-24 4md:justify-center"
      :class="{
        'md:justify-end': shouldShowToc
      }"
    >
      <!-- 编辑器 -->
      <EditorContent
        :editor="editor"
        :class="{
          'bg-slate-300/10': true,
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
          'dark:bg-zinc-900/30': true,
          'shadow-inner': true,
          'shadow-3xl': true,
          rounded: true
        }"
        class="container flex flex-col min-h-screen px-4 pb-48 prose-sm prose dark:prose-invert"
      />

      <!-- TOC，和顶部留一些距离，因为WEB项目顶部有导航栏 -->
      <div
        class="sticky right-0 flex-row justify-start hidden h-screen overflow-y-scroll top-12 md:flex 4md:fixed 4md:right-0"
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
    <!-- <ContextMenu :editor="editor"></ContextMenu> -->

    <!-- 提示信息 -->
    <Message :message="message"></Message>
  </div>
</template>

<script lang="ts" setup>
import { EditorContent } from '@tiptap/vue-3'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import BubbleMenus from './BubbleMenus.vue'
import FloatMenus from './FloatMenus.vue'
import TiptapAgent from './TiptapAgent'
import EditorData from '../../model/EditorData'
import Message from '../../ui/Message.vue'
import HeadingVue from '../Heading.vue'
import EventManager from '../../event/EventManager'
import Heading from '../../extensions/Toc/Heading'
import SmartEditorProps from './SmartEditorProps'

const props = defineProps(SmartEditorProps)

const editor = TiptapAgent.create({
  uuid: props.uuid,
  content: props.content,
  editable: props.editable,
  drawIoLink: props.drawLink,
  drawEnable: props.drawEnable,
  tableEnable: props.tableEnable,
  onCreate: (data: EditorData) => {
    props.onCreate(data)
  },
  onUpdate: (data: EditorData) => {
    refreshToc('onUpdate')
    if (!props.editable) {
      return log('只读模式，不回调更新')
    }

    props.onUpdate(data)
  },
  onSelectionUpdate(type) {
    log('onSelectionUpdate', type)
    props.onSelectionUpdate(type)
  }
})

const verbose = false
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
  // log('click，关闭应用的右键菜单')
  contextMenuDidShow.value = false
}

function onContextMenu(e: Event) {
  log('contextmenu')
  contextMenuDidShow.value = true

  let target = e.target as HTMLElement
  target.click()
}

watch(props, () => {
  log('props changed', props.uuid)

  // 更新，但不触发onUpdate
  editor.setOptions({
    injectNonce: props.uuid
  })
  editor.commands.setContent(props.content, false)
  // 最后一步，触发onUpdate
  editor.setEditable(props.editable, true)
})

onMounted(() => {
  log('onMounted')

  refreshToc('onMounted')

  // 处理事件
  eventManager.setListener(editor, (msg) => {
    message.value = msg
    document.getElementById('messageTrigger')?.click()
  })

  document.addEventListener('contextmenu', onContextMenu)
  // document.addEventListener('mousedown', onMouseDown)
  document.addEventListener('click', onClick)

  // 监听 URL 变化
  window.onpopstate = onURLChanged
})

onBeforeUnmount(() => {
  log('onBeforeUnmount')
  editor.destroy()
  eventManager.removeListener()
  document.removeEventListener('mousedown', onMouseDown)
  document.removeEventListener('click', onClick)
  document.removeEventListener('contextmenu', onContextMenu)
})

function onURLChanged() {
  let hash = window.location.hash
  if (hash) {
    goto(hash.substring(1), 'juice-editor')
  }
}

function goto(id: string, shadowHostSelector: string) {
  log('goto', id)

  // 获取 Shadow DOM 的宿主元素
  const shadowHost = document.querySelector(shadowHostSelector)
  if (!shadowHost) {
    console.error('Shadow host not found')
    return
  }

  // 访问 Shadow DOM
  const shadowRoot = shadowHost.shadowRoot
  if (!shadowRoot) {
    console.error('Shadow root not found')
    return
  }

  // 获取目标 div
  const targetDiv = shadowRoot.getElementById(id)

  // 如果找到目标 div，则滚动到该 div
  if (targetDiv) {
    targetDiv.scrollIntoView({ behavior: 'smooth' })
  } else {
    log('Target div not found in Shadow DOM')
  }
}

function log(...message: any[]) {
  if (verbose) console.log('🍋 TiptapEditor:', ...message)
}
</script>
