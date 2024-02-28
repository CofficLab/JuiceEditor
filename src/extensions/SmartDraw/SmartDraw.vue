<template>
  <node-view-wrapper>
      <details class="dropdown dropdown-bottom md:dropdown-left">
        <summary class="m-1" @click="onClick" v-bind:class="[
          { 'outline-orange-600 outline-dashed outline-2 outline-offset-1': isSelected },
        ]">
          <img crossOrigin="anonymous" :src="node.attrs.src" ref="img" class="p-0 m-0 "/>
        </summary>
        <div class="dropdown-content z-[1]">
          <div class="join md:join-vertical shadow-2xl ring-1 ring-orange-900/30 rounded-xl">
            <button class="btn btn-sm join-item" @click="openLoading">
              <IconEdit class="w-5 h-6"></IconEdit>
            </button>
            <button class="btn btn-sm join-item" @click="Helper.newLine(props)">
              <IconNewLine class="w-5 h-6"></IconNewLine>
            </button>
            <button class="btn btn-sm join-item text-error" @click="deleteNode">
              <Delete class="w-5 h-6"></Delete>
            </button>
          </div>

          <Opening :onReady="open" :visible="isOpening" class="opening hidden"></Opening>
        </div>
      </details>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { makeDrawUrl } from './MakeDrawUrl'
import Helper from './Helper'
import Config from './Config'
import Delete from './Icons/Delete.vue'
import IconEdit from './Icons/IconEdit.vue'
import IconNewLine from './Icons/IconNewLine.vue'
import Opening from './Opening.vue'

const img = ref(null)
const props = defineProps(nodeViewProps)
const drawingPage = document.createElement('iframe')
const drawingDialog = document.createElement('dialog')
const loadingDialog = document.createElement('dialog')

const isOpening = ref(false)
const isSelected = ref(false)
const isEditable = computed(() => props.editor.isEditable)

function onClick(e: Event) {
  isSelected.value = true
}

// 画图页面已经准备完成，可以展示了
function onDrawingPageReady() {
  drawingDialog.showModal()
  loadingDialog.close()
  isOpening.value = false
}

function onClose(_event: any) {
  console.log('🍋 SmartDraw: 收到关闭画图的事件')

  destroy(drawingDialog)
}

function sendToDrawio(message: object) {
  drawingPage.contentWindow!.postMessage(JSON.stringify(message), '*')
}

// 显示loading页面
function openLoading() {
  if (!props.editor.isEditable) {
    return
  }

  loadingDialog.classList.add('modal')
  let openingDom = document.getElementsByClassName('opening')[0]
  openingDom.classList.remove('hidden')
  loadingDialog.appendChild(openingDom)
  document.body.appendChild(loadingDialog)
  loadingDialog.showModal()

  isOpening.value = true
}

// 打开画图
function open() {
  if (!props.editor.isEditable) {
    return
  }

  console.log("打开画图")

  drawingDialog.classList.add('modal')

  drawingPage.setAttribute('frameborder', '0')
  drawingPage.setAttribute('src', makeDrawUrl(props.extension.options.drawIoLink))
  drawingPage.setAttribute('width', '100%')
  drawingPage.setAttribute('height', '100%')

  drawingDialog.appendChild(drawingPage)
  document.body.appendChild(drawingDialog)

  // 接收画图iframe传递的消息
  window.addEventListener('message', receive)
  // 接收关闭画图的事件
  document.addEventListener('close-draw', onClose);
}

// 销毁画图的Iframe
function destroy(dialog: HTMLDialogElement) {
  console.log('🍋 SmartDraw: 销毁画图的 Iframe，同时取消事件监听')

  window.removeEventListener('message', receive)
  document.removeEventListener('close-draw', onClose)
  document.body.removeChild(dialog)
  dialog.close()
}

// 负责接收iframe中的drawio发来的消息
function receive(event: MessageEvent): void {
  console.log('🍋 SmartDraw: 收到 drawio 发来的消息，开始解析')
  const source = img.value as unknown as HTMLElement
  if (event.data.length == 0) {
    return
  }
  try {
    var msg = JSON.parse(event.data)
  } catch {
    return
  }

  switch (msg.event) {
    case 'init':
      console.log('🍋 SmartDraw: 收到 drawio 发来的消息 -> init，向它发送消息 -> load')
      sendToDrawio({
        action: 'load',
        xmlpng: source.getAttribute('src'),
        autosave: 1
      })
      break
    case 'save':
      console.log('🍋 SmartDraw: 收到 drawio 发来的消息 -> save，表示在画图 Iframe 中点击了保存')
      sendToDrawio({
        action: 'export',
        format: 'xmlpng',
        spinKey: 'saving'
      })
      destroy(drawingDialog)
      break
    case 'export':
      console.log('🍋 SmartDraw: 收到 drawio 发来的消息 -> export，存储数据')
      props.updateAttributes({
        src: msg.data
      })
      break
    case 'autosave':
      console.log('🍋 SmartDraw: 收到 drawio 发来的消息 -> autosave，向它发送消息 -> export')
      sendToDrawio({
        action: 'export',
        format: 'xmlpng'
      })
      break
    case 'exit':
      console.log('🍋 SmartDraw: 收到 drawio 发来的消息 -> exit，销毁 iframe')
      console.log('🍋 SmartDraw: 收到 drawio 发来的消息 -> exit，先让 drawio 把数据发送出来')
      sendToDrawio({
        action: 'export',
        format: 'xmlpng',
        spinKey: 'saving'
      })
      break
    case 'load':
      console.log('🍋 SmartDraw: 收到 drawio 发来的消息 -> load，表示画图 Iframe 已加载')
      onDrawingPageReady()
      break
    case 'configure':
      console.log('🍋 SmartDraw: 收到 drawio 发来的消息 -> configure，向它发送配置')
      sendToDrawio({
        action: 'configure',
        config: Config
      })

      break
    default:
      console.log(`🍋 SmartDraw: 收到 drawio 发来的消息 -> ${msg.event}，不知道怎么处理`)
  }
}

function checkToolbar() {
  if (!isEditable) {
    isSelected.value = false
    console.log('SmartBanner: editor is not editable, hide banner toolbar')
    return
  }

  Array.from(document.getElementsByTagName('details')).forEach((element) => {
    element.open = false
  })

  // 如果鼠标在 Banner 内，显示菜单

  const currentPos = props.editor.state.selection.anchor
  const start = props.getPos()
  const end = props.getPos() + props.node.nodeSize

  // console.log('SmartDraw: clicked')
  // console.log('SmartDraw: currentPos', currentPos, id)
  // console.log('SmartDraw: start', start, id)
  // console.log('SmartDraw: end', end, id)

  isSelected.value = currentPos >= start && currentPos < end
}

onMounted(() => {
  Helper.insertNewLineIfIsTheLastNode(props)
  document.addEventListener('click', checkToolbar)
})

onUnmounted(() => {
  document.removeEventListener('click', checkToolbar)
})
</script>

<style>
dialog:modal {
  max-width: 100vw;
  max-height: 100vw;
  height: 100%;
  width: 100%;
}
</style>
