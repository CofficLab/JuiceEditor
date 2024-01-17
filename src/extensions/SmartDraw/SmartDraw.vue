<template>
  <node-view-wrapper>
    <template v-if="showWarning">
      <!-- Open the modal using ID.showModal() method -->
      <img v-bind:src="node.attrs.src" alt="" onclick="my_modal_2.showModal()" ref="img" />
      <dialog id="my_modal_2" class="modal">
        <div class="modal-box flex flex-col justify-center items-center w-56 p-0">
          <div class="font-bold text-lg m-0 mt-4">请将窗口调宽一点</div>
          <p class="text-center text-xs">画图要求的最小宽度：1000</p>
          <div class="stats shadow-3xl bg-blue-100/50 w-full mt-4 rounded-none">
            <div class="stat">
              <div class="stat-title text-center">当前宽度</div>
              <div class="stat-value text-center">{{ width }}</div>
            </div>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </template>

    <img v-else v-bind:src="node.attrs.src" alt="" @click="showIframe" ref="img" />
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const img = ref(null)
const props = defineProps(nodeViewProps)
var width = ref(window.innerWidth)
var iframe = document.createElement('iframe')
var dialog = document.createElement('dialog')
// drawio有bug，当页面宽度小于1000px时，画图页面无法弹出 形状 菜单
var showWarning = computed(() => {
  return width.value < 1000
})

function handleResize() {
  width.value = window.innerWidth;
}

function closeListener(_event: any) {
  console.log('收到关闭画图的事件')
  document
    .getElementsByTagName('iframe')
    .item(0)
    ?.contentWindow?.postMessage(JSON.stringify({ action: 'exit' }), '*')
}

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

onMounted(() => {
  window.addEventListener('resize', handleResize);
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
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
