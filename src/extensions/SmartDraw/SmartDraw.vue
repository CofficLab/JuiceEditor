<template>
  <node-view-wrapper>
    <div class="dropdown dropdown-open dropdown-top md:dropdown-left">
      <div tabindex="0" role="button" @click="onClick" v-bind:class="[
        { 'outline-orange-600 outline-dashed outline-2 outline-offset-1': isSelected },
      ]">
        <!-- 内容 -->
        <img v-bind:src="node.attrs.src" ref="img" class="m-0 p-0 not-prose" />
      </div>

      <!-- 操作栏 -->
      <div tabindex="0" class="p-2 dropdown-content z-[1]" v-show="isSelected" contenteditable="false">
        <div class="join md:join-vertical shadow-inner shadow-orange-700 ring-1 ring-orange-900/30 rounded-xl">
          <label :for="loadingId" class="btn btn-sm join-item" @click="open">
            <IconEdit class="w-5 h-6"></IconEdit>
          </label>
          <button class="btn btn-sm join-item" @click="Helper.newLine(props)">
            <IconNewLine class="w-5 h-6"></IconNewLine>
          </button>
          <button class="btn btn-sm join-item text-error" @click="deleteNode">
            <Delete class="w-5 h-6"></Delete>
          </button>
        </div>
      </div>

      <div>
        <!-- 正在打开的弹层 -->
        <input type="checkbox" :id="loadingId" class="modal-toggle" />
        <div class="modal" role="dialog">
          <div class="modal-box flex flex-col justify-center items-center w-56 p-0">
            <template v-if="!canShowDrawing">
              <div class="font-bold text-lg m-0 mt-4">请将窗口调宽一点</div>
              <p class="text-center text-xs">画图要求的最小宽度：1000</p>
              <div class="stats shadow-3xl bg-blue-100/50 w-full mt-4 rounded-none">
                <div class="stat">
                  <div class="stat-title text-center">当前宽度</div>
                  <div class="stat-value text-center">{{ width }}</div>
                </div>
              </div>
            </template>

            <template v-else>
              <div class="font-bold text-lg m-0 mt-4">正在打开画图界面</div>
              <div class="stats shadow-3xl bg-blue-100/50 w-full mt-4 rounded-none">
                <div class="stat">
                  <div class="stat-title text-center">
                    <span class="loading loading-ring loading-lg"></span>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <label class="modal-backdrop" :for="loadingId" :id="loadingCloseId">Close</label>
        </div>
      </div>
    </div>
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
import { v4 as uuid } from 'uuid';

// 要考虑一个页面中存在多个画图的情况
const id = uuid()
const loadingId = 'loading-' + id
const loadingCloseId = 'loading-close-' + id
const img = ref(null)
const props = defineProps(nodeViewProps)
const width = ref(window.innerWidth)
const iframe = document.createElement('iframe')
const dialog = document.createElement('dialog')

const canShowDrawing = ref(isWidthEnough())

const isSelected = ref(false)
const isEditable = computed(() => props.editor.isEditable)

// loading 页面是否展示了
function isLoadingVisible(): Boolean {
  const checkbox = document.getElementById(loadingId)

  if (checkbox instanceof HTMLInputElement && checkbox.type === 'checkbox') {
    return checkbox.checked
  }

  console.log('loading 不存在')
  return false
}

function onClick(e: Event) {
  isSelected.value = true
}

// 关闭“正在打开画图”的弹层
function closeLoading() {
  (document.getElementById(loadingCloseId) as HTMLElement).click()
}

// 画图页面已经准备完成，可以展示了
function onDrawingPageReady() {
  closeLoading()
  dialog.showModal()
  window.removeEventListener('resize', refreshWidth)
}

function onClose(_event: any) {
  console.log('🍋 SmartDraw: 收到关闭画图的事件')

  destroy(dialog)
}

function isWidthEnough() {
  return width.value >= 1000
}

// 更新窗口宽度
// drawio有bug，当页面宽度小于1000px时，画图页面无法弹出 形状 菜单
function refreshWidth() {
  width.value = window.innerWidth
  canShowDrawing.value = isWidthEnough()
}

function sendToDrawio(message: object) {
  iframe.contentWindow!.postMessage(JSON.stringify(message), '*')
}

// 打开画图
function open() {
  if (!props.editor.isEditable) {
    return
  }

  window.addEventListener('resize', refreshWidth)
  refreshWidth()

  if (!canShowDrawing.value) {
    console.log("不能打开画图，因为宽度不足")
    return
  }

  console.log("打开画图")

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
      destroy(dialog)
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

  // 如果鼠标在 Banner 内，显示菜单

  const currentPos = props.editor.state.selection.anchor
  const start = props.getPos()
  const end = props.getPos() + props.node.nodeSize

  console.log('SmartDraw: clicked')
  console.log('SmartDraw: currentPos', currentPos, id)
  console.log('SmartDraw: start', start, id)
  console.log('SmartDraw: end', end, id)

  isSelected.value = currentPos >= start && currentPos < end
}

onMounted(() => {
  Helper.insertNewLineIfIsTheLastNode(props)
  document.addEventListener('click', checkToolbar)
})

onUnmounted(() => {
  document.removeEventListener('click', checkToolbar)
  window.removeEventListener('resize', refreshWidth)
})

watch(canShowDrawing, (newValue, oldValue) => {
  if (oldValue == false && newValue == true && isLoadingVisible()) {
    open()
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
