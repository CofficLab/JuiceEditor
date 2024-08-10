<template>
  <NodeViewWrapper>
    <Panel
      :deleteNode="props.deleteNode"
      :readOnly="!props.editor.isEditable"
      :editor="props.editor"
      :node="props.node"
      :pos="props.getPos()"
    >
      <template v-slot:content>
        <img ref="img" :src="node.attrs.src" :class="node.attrs.class" class="z-10 p-0 m-0" />

        <Opening :onReady="open" :visible="isOpening" class="opening" ref="opening"></Opening>
      </template>

      <template v-slot:operators>
        <Button @click="openLoading">
          <IconEdit></IconEdit>
        </Button>
        <Button @click="downloadImage">
          <IconDownload></IconDownload>
        </Button>
      </template>
    </Panel>
  </NodeViewWrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { ref } from 'vue'
import { makeDrawUrl } from './DrawUrl'
import DrawConfig from './DrawConfig'
import IconEdit from './Icons/IconEdit.vue'
import IconDownload from './Icons/IconDownload.vue'
import Opening from './Opening.vue'
import webkit from '../../api/WebKit'
import Panel from '../Panel.vue'
import Button from '../../ui/Button.vue'
import ImageHelper from '../../helper/ImageHelper'

const img = ref<HTMLImageElement | null>(null)
const opening = ref<HTMLImageElement | null>(null)
const props = defineProps(nodeViewProps)

const drawingPage = document.createElement('iframe')
drawingPage.setAttribute('frameborder', '0')
drawingPage.setAttribute('src', makeDrawUrl(props.extension.options.drawIoLink))
drawingPage.setAttribute('width', '100%')
drawingPage.setAttribute('height', '100%')

const drawingDialog = document.createElement('dialog')
drawingDialog.classList.add('modal')
drawingDialog.style.border = 'none'

const isOpening = ref(false)
const isSelected = ref(false)
const isWebKit = 'webkit' in window

// 画图页面已经准备完成，可以展示了
function onDrawingPageReady() {
  drawingDialog.showModal()
  isOpening.value = false
}

// 响应外部调用调用关闭画图事件
function onClose(_event: any) {
  console.log('🍋 SmartDraw: 收到关闭画图的事件')

  destroy()
}

function sendToDrawio(message: object) {
  drawingPage.contentWindow!.postMessage(JSON.stringify(message), '*')
}

// 显示打开画图前的loading页面
function openLoading() {
  if (!props.editor.isEditable) {
    return
  }

  isOpening.value = true
}

// 打开画图
function open() {
  if (!props.editor.isEditable) {
    return
  }

  console.log('打开画图')

  drawingDialog.appendChild(drawingPage)
  document.body.appendChild(drawingDialog)

  // 接收画图iframe传递的消息
  window.addEventListener('message', receive)
  // 接收关闭画图的事件
  document.addEventListener('close-draw', onClose)
}

// 销毁画图的Iframe
function destroy() {
  console.log('🍋 SmartDraw: 销毁画图的 Iframe，同时取消事件监听')

  window.removeEventListener('message', receive)
  document.removeEventListener('close-draw', onClose)
  document.body.removeChild(drawingDialog)
  drawingDialog.close()
  isSelected.value = false
}

function exportBase64(base64ImageString: string) {
  // 下载
  if (isWebKit) {
    webkit.downloadImage(
      ImageHelper.getBase64FromBase64Image(base64ImageString),
      'Image' + ImageHelper.getExtension(base64ImageString)
    )
  } else {
    ImageHelper.download2(base64ImageString)
  }
}

function downloadImage() {
  console.log('下载图片')

  let base64ImageString: string = props.node.attrs.src

  if (base64ImageString.startsWith('data:image/')) {
    return exportBase64(base64ImageString)
  }

  console.log('下载图片，不是一个base64图片编码，先获取base64图片编码')

  // 不是一个base64图片编码，先获取base64图片编码
  const imgDom = img.value as HTMLImageElement

  // 创建canvas并设置大小
  const canvas = document.createElement('canvas')
  canvas.width = imgDom.width
  canvas.height = imgDom.height

  // 获取context并绘制图片
  const ctx = canvas.getContext('2d')
  ctx!.drawImage(imgDom, 0, 0)

  // 转换为blob
  canvas.toBlob(function (blob) {
    // 转换为base64
    const reader = new FileReader()
    reader.readAsDataURL(blob!)
    reader.onloadend = function () {
      base64ImageString = reader.result as string

      exportBase64(base64ImageString)
    }
  }, 'image/png')
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
      destroy()
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
        config: DrawConfig
      })

      break
    default:
      console.log(`🍋 SmartDraw: 收到 drawio 发来的消息 -> ${msg.event}，不知道怎么处理`)
  }
}
</script>
