<template>
  <node-view-wrapper>
    <!-- 只读模式，仅显示图片 -->
    <div v-if="!editor.isEditable">
      <img v-bind:src="node.attrs.src" ref="img" />
    </div>
    <div v-else>
      <!-- 无法开启画图，点击会显示提示框 -->
      <div v-if="showWarning" contenteditable="false">
        <label for="warning">
          <img v-bind:src="node.attrs.src" ref="img" />
        </label>
        <input type="checkbox" id="warning" class="modal-toggle" />
        <div class="modal" role="dialog">
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
          <label class="modal-backdrop" for="warning">Close</label>
        </div>
      </div>

      <!-- 正常开启画图，点击后先显示loading后显示画图 -->
      <div v-else contenteditable="false">
        <label for="loading">
          <img v-bind:src="node.attrs.src" alt="" @click="showIframe" ref="img" />
        </label>
        <input type="checkbox" id="loading" class="modal-toggle" />
        <div class="modal" role="dialog">
          <div class="modal-box flex flex-col justify-center items-center w-56 p-0">
            <div class="font-bold text-lg m-0 mt-4">正在打开画图界面</div>
            <div class="stats shadow-3xl bg-blue-100/50 w-full mt-4 rounded-none">
              <div class="stat">
                <div class="stat-title text-center">
                  <span class="loading loading-ring loading-lg"></span>
                </div>
              </div>
            </div>
          </div>
          <label class="modal-backdrop" for="loading">Close</label>
        </div>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { makeDrawUrl } from './MakeDrawUrl'
import Config from './Config'

const img = ref(null)
const props = defineProps(nodeViewProps)
const shouldShowAlert = ref(false)
const warningVisible = ref(false)
var width = ref(window.innerWidth)
var iframe = document.createElement('iframe')
var dialog = document.createElement('dialog')
// drawio有bug，当页面宽度小于1000px时，画图页面无法弹出 形状 菜单
var showWarning = computed(() => {
  return width.value < 1000
})

function openLoadingAndDraw() {
  let loadingDom = document.querySelector("label[for='loading']") as HTMLElement
  loadingDom.click()
  showIframe()
}

function closeLoading() {
  let loadingDom = document.querySelector("label[for='loading']") as HTMLElement
  loadingDom.click()
}

function hideAlert() {
  shouldShowAlert.value = false
}

function handleResize() {
  width.value = window.innerWidth

  const checkbox = document.getElementById('warning')

  if (checkbox instanceof HTMLInputElement && checkbox.type === 'checkbox') {
    if (checkbox.checked) {
      warningVisible.value = true
    } else {
      warningVisible.value = false
    }
  } else {
    warningVisible.value = false
  }
}

function closeListener(_event: any) {
  console.log('🍋 SmartDraw: 收到关闭画图的事件')

  destroyIframe(dialog)
}

function sendToDrawio(message: object) {
  iframe.contentWindow!.postMessage(JSON.stringify(message), '*')
}

// 打开画图
function showIframe() {
  if (!props.editor.isEditable) {
    return
  }

  hideAlert()

  dialog.classList.add('modal')

  iframe.setAttribute('frameborder', '0')
  iframe.setAttribute('src', makeDrawUrl(props.extension.options.drawIoLink))
  iframe.setAttribute('width', '100%')
  iframe.setAttribute('height', '100%')

  dialog.appendChild(iframe)
  document.body.appendChild(dialog)

  // 接收画图iframe传递的消息
  window.addEventListener('message', receive)
  // 接收关闭画图的事件
  document.addEventListener('close-draw', closeListener)
}

// 销毁画图的Iframe
function destroyIframe(dialog: HTMLDialogElement) {
  console.log('🍋 SmartDraw: 销毁画图的 Iframe，同时取消事件监听')

  window.removeEventListener('message', receive)
  document.removeEventListener('close-draw', closeListener)
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
      destroyIframe(dialog)
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
      dialog.showModal()
      closeLoading()
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

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

watch(warningVisible, (newValue, oldValue) => {
  // 当宽度不足的提示框消失时，打开画图
  if (newValue == false && oldValue == true) {
    openLoadingAndDraw()
  }
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
