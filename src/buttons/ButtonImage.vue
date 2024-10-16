<template>
  <Button tip="添加图片" :size="size" @click="editor.commands.insertImage()"
    :class="{ 'is-active': editor.isActive(BANNER) }">
    <IconPhoto />
    <input class="fixed" ref="fileInput" multiple="false" accept="image/*" type="file" style="display: none"
      @change="onFileSelected" />
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import { ref } from 'vue'
import IconPhoto from '../ui/icons/IconPhoto.vue'
import Button from '../ui/Button.vue'
import { BANNER } from '../config/nodes';

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  },
  size: {
    type: String,
    default: 'sm'
  }
})
let fileInput = ref<HTMLInputElement | null>(null)

function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

async function onFileSelected() {
  console.log(fileInput.value?.files?.item(0))
  let file = fileInput.value?.files?.item(0)
  const base64 = await fileToBase64(file!)

  props.editor
    .chain()
    .focus()
    .setImage({ src: base64 as string })
    .run()
}

function addImage() {
  console.log('添加图片')
  fileInput.value?.click()
}
</script>
