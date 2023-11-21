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

const closeListener = (_event: any) => {
  console.log('收到关闭画图的事件')
  document.getElementsByTagName('iframe').item(0)?.contentWindow?.postMessage(JSON.stringify({ action: 'exit' }), '*');
};

const showIframe = function () {
  if (!props.editor.isEditable) {
    return
  }

  const dialog = document.createElement('dialog')
  dialog.classList.add('modal')

  const iframe = document.createElement('iframe')
  iframe.setAttribute('frameborder', '0')
  iframe.setAttribute('src', props.extension.options.drawIoLink)
  iframe.setAttribute('width', '100%')
  iframe.setAttribute('height', '100%')

  dialog.appendChild(iframe)
  document.body.appendChild(dialog)

  dialog.showModal()
  window.addEventListener('message', (event: MessageEvent) => {
    receive(event, iframe, dialog)
  })

  document.addEventListener('close-draw', closeListener)
}

const receive = function (
  event: MessageEvent,
  iframe: HTMLIFrameElement,
  dialog: HTMLDialogElement
): void {
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
      console.log('收到事件', msg)
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
      console.log('收到事件', msg)
      props.updateAttributes({
        src: msg.data
      })
      window.removeEventListener('message', receive)
      document.body.removeChild(dialog)
      dialog.close()
      break
    case 'exit':
      window.removeEventListener('message', receive)
      document.removeEventListener('close-draw', closeListener)
      document.body.removeChild(dialog)
      dialog.close()
      break
    case 'load':
      console.log('收到事件', msg)
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
