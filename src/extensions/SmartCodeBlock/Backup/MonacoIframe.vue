<template>
  <div class="relative">
    <!-- Monaco -->
    <iframe :name="name" ref="iframe" :src="'index?language=' + language.key" width="100%" height="0" frameborder="0"
      allowfullscreen></iframe>

    <div class="absolute top-0 right-0">
      <LanguageSelect :on-changed="onLanguageChanged" :language="props.language" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import LanguageSelect from './LanguageSelect.vue'
import { SmartLanguage } from '../SmartLanguage'

const verbose = false
const name = uuidv4()
const iframe = ref<HTMLIFrameElement>(null as unknown as HTMLIFrameElement)

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: SmartLanguage,
    required: true
  },
  onUpdated: {
    type: Function,
    required: true,
    default: () => { }
  },
  onLanguageChanged: {
    type: Function,
    required: true,
    default: () => { }
  }
})

onMounted(() => {
  window.addEventListener('message', handleMessage)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage)
})

function onLanguageChanged(lan: SmartLanguage) {
  log('onLanguageChanged ->', lan)
  // iframe.value.contentWindow!.setLanguage(lan.key)
  props.onLanguageChanged(lan)
}

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
    // iframe.value.contentWindow!.setCode(props.code)
  }

  if (event.data.event === 'resize' && event.data.height) {
    iframe.value.style.height = `${event.data.height}px` // 设置 iframe 高度
  }

  if (event.data.event === 'update') {
    props.onUpdated(event.data.content)
  }
}

function log(...message: any[]) {
  if (verbose) {
    console.log('💼 MonacoCard: ', ...message)
  }
}
</script>
