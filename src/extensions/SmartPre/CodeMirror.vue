<template>
  <div class="w-full h-full" ref="dom"></div>
</template>

<script lang="ts" setup>
import { EditorView, basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { onMounted, ref } from 'vue'

const dom = ref<HTMLElement>(null as unknown as HTMLElement)

onMounted(() => {
  console.log('🐰 CodeMirror: mounted')

  new EditorView({
    doc: `console.log('hello')`,
    extensions: [basicSetup, javascript()],
    parent: dom.value
  })
})
</script>
