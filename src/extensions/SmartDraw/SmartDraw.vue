<template>
  <node-view-wrapper>
    <img v-bind:src="node.attrs.src" alt="" @click="showIframe" ref="img" />
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { ref } from 'vue'

const img = ref(null)
const props = defineProps(nodeViewProps)
var iframe = document.createElement('iframe')
var dialog = document.createElement('dialog')

function closeListener(_event: any) {
  console.log('收到关闭画图的事件')
  document
    .getElementsByTagName('iframe')
    .item(0)
    ?.contentWindow?.postMessage(JSON.stringify({ action: 'exit' }), '*')
}

// drawio有bug，当页面宽度小于1000px时，画图页面无法弹出 形状 菜单
function showIframe() {
  if (!props.editor.isEditable) {
    return
  }

  dialog.classList.add('modal')

  iframe.setAttribute('frameborder', '0')
  iframe.setAttribute('src', props.extension.options.drawIoLink)
  iframe.setAttribute('width', '100%')
  iframe.setAttribute('height', '100%')

  dialog.appendChild(iframe)
  document.body.appendChild(dialog)

  dialog.showModal()
  window.addEventListener('message', receive)

  document.addEventListener('close-draw', closeListener)
}

function destroyIframe(dialog: HTMLDialogElement) {
  console.log('SmartDraw: 销毁画图的 Iframe，同时取消事件监听')
  window.removeEventListener('message', receive)
  document.removeEventListener('close-draw', closeListener)
  document.body.removeChild(dialog)
  dialog.close()
}

function receive(event: MessageEvent): void {
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
      iframe.contentWindow!.postMessage(
        JSON.stringify({
          action: 'load',
          xmlpng: source.getAttribute('src')
        }),
        '*'
      )
      break
    case 'save':
      console.log('SmartDraw: 收到 Save 事件，表示在画图 Iframe 中点击了保存')
      iframe.contentWindow!.postMessage(
        JSON.stringify({
          action: 'export',
          format: 'xmlpng',
          spinKey: 'saving'
        }),
        '*'
      )
      break
    case 'export':
      console.log('SmartDraw: 收到 Export 事件，解析并存储数据')
      props.updateAttributes({
        src: msg.data
      })
      destroyIframe(dialog)
      break
    case 'exit':
      console.log('SmartDraw: 收到 Exit 事件，表示画图 Iframe 已退出')
      break
    case 'load':
      console.log('SmartDraw: 收到 Load 事件，表示画图 Iframe 已加载')
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
