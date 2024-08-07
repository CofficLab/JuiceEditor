<template>
  <div>
    <!-- Monaco -->
    <iframe
      :name="name"
      ref="iframe"
      :src="monacoLink"
      width="100%"
      height="0"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount, onUpdated } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const name = uuidv4()
const iframe = ref<HTMLIFrameElement>(null as unknown as HTMLIFrameElement)

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  monacoLink: {
    type: String,
    required: true
  },
  onUpdated: {
    type: Function,
    required: true,
    default: () => {}
  }
})

onMounted(() => {
  console.log('🍋 💼 MonacoCard: mounted')

  window.addEventListener('message', handleMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage)
})

function handleMessage(event: {
  origin: string
  data: { sender: string; event: string; height?: number; content?: string }
}) {
  if (event.origin !== window.location.origin) {
    return
  }

  if (event.data.sender != name) {
    return
  }

  //console.log('接收到来自 iframe 的消息:', event.data)

  if (event.data.event == 'ready') {
    iframe.value.contentWindow!.setCode(props.code)
  }

  if (event.data.event === 'resize' && event.data.height) {
    iframe.value.style.height = `${event.data.height}px` // 设置 iframe 高度
  }

  if (event.data.event === 'update') {
    props.onUpdated(event.data.content)
  }
}
</script>
