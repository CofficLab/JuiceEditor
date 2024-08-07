<template>
  <Button
    class="tooltip"
    data-tip="添加图片"
    @click="editor.commands.insertImage()"
    :class="{ 'is-active': editor.isActive('banner') }"
  >
    <img :src="icon" alt="" class="m-0" />
    <input
      class="fixed"
      ref="fileInput"
      multiple="false"
      accept="image/*"
      type="file"
      style="display: none"
      @change="onFileSelected"
    />
  </Button>
</template>

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { ref } from 'vue'
import icon from '../../assets/photo.svg'
import Button from '../../ui/Button.vue'

const props = defineProps({
  editor: {
    type: Editor,
    required: true
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
