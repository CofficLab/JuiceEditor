<template>
  <node-view-wrapper>
    <Panel>
      <template v-slot:content>
        <img ref="img" :src="node.attrs.src" :class="node.attrs.class" class="p-0 m-0" />
      </template>

      <template v-slot:operators>
        <div class="join">
          <button class="btn btn-sm join-item" @click="openLoading">
            <IconEdit class="w-5 h-6"></IconEdit>
          </button>
          <button class="btn btn-sm join-item" @click="downloadImage">
            <IconDownload class="w-5 h-6"></IconDownload>
          </button>
          <button class="btn btn-sm join-item" @click="Helper.newLine(props)">
            <IconNewLine class="w-5 h-6"></IconNewLine>
          </button>
          <button class="btn btn-sm join-item text-error" @click="deleteNode">
            <Delete class="w-5 h-6"></Delete>
          </button>
        </div>

        <Opening :onReady="open" :visible="isOpening" class="opening hidden"></Opening>
      </template>
    </Panel>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { computed, ref } from 'vue'
import { makeDrawUrl } from './MakeDrawUrl'
import Helper from './Helper'
import Config from './Config'
import Delete from './Icons/Delete.vue'
import IconEdit from './Icons/IconEdit.vue'
import IconNewLine from './Icons/IconNewLine.vue'
import IconDownload from './Icons/IconDownload.vue'
import Opening from './Opening.vue'
import webkit from '../../entities/WebKit';
import Base64Helper from './Base64Helper'
import Panel from '../Panel.vue'

const img = ref<HTMLImageElement | null>(null)
const props = defineProps(nodeViewProps)
const drawingPage = document.createElement('iframe')
const drawingDialog = document.createElement('dialog')
const loadingDialog = document.createElement('dialog')

const isOpening = ref(false)
const isSelected = ref(false)
const isWebKit = 'webkit' in window
const isEditable = computed(() => props.editor.isEditable)

// 画图页面已经准备完成，可以展示了
function onDrawingPageReady() {
  drawingDialog.showModal()
  loadingDialog.close()
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
      Base64Helper.getBase64FromBase64Image(base64ImageString),
      'Image' + Base64Helper.getExtension(base64ImageString)
    )
  } else {
    let a = Base64Helper.download(base64ImageString)

    // Clean up
    a.remove()
    URL.revokeObjectURL(a.href)
  }
}

function downloadImage() {
  let base64ImageString: string = props.node.attrs.src

  if (base64ImageString.startsWith('data:image/jpeg;base64,')) {
    return exportBase64(base64ImageString)
  }

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
        config: Config
      })

      break
    default:
      console.log(`🍋 SmartDraw: 收到 drawio 发来的消息 -> ${msg.event}，不知道怎么处理`)
  }
}
</script>

<style>
dialog:modal {
  max-width: 100vw;
  max-height: 100vw;
  height: 100%;
  width: 100%;
}
</style>
