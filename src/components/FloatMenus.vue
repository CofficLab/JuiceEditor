<template>
  <!-- 回车后显示的菜单 -->
  <div>
    <floating-menu
      class="floating-menu"
      :tippy-options="{ duration: 100, maxWidth: 800 }"
      :editor="editor"
      :should-show="shouldShowFloatingMenu"
    >
      <button
        class="w-10"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        H2
      </button>
      <button
        class="w-10"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        H3
      </button>
      <button
        class="w-10"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        H4
      </button>
      <button
        class="w-10"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      >
        H5
      </button>
      <button
        class="w-10"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      >
        H6
      </button>
      <button
        class="w-10"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        <img src="../assets/list.bullet.svg" alt="" class="m-0" />
      </button>
      <button
        class="w-10"
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
      >
        <IconCode></IconCode>
      </button>
      <button
        class="w-10"
        @click="editor.chain().focus().toggleBanner().run()"
        :class="{ 'is-active': editor.isActive('banner') }"
      >
        <img src="../assets/123.rectangle.fill.svg" alt="" class="m-0" />
      </button>

      <!-- 图片 -->
      <button class="w-10" @click="addImage" :class="{ 'is-active': editor.isActive('banner') }">
        <img src="../assets/photo.svg" alt="" class="m-0" />
      </button>

      <!-- 画图 -->
      <button class="w-10" v-if="isDrawEnable" @click="editor.commands.insertDrawIo()">
        <img src="../assets/compass.drawing.svg" alt="" class="m-0" />
      </button>

      <!-- 添加表格 -->
      <button
        class="w-10"
        v-if="isTableEnable"
        @click="editor.chain().focus().insertSmartTable().run()"
      >
        <img src="../assets/tablecells.svg" alt="" class="m-0" />
      </button>

      <!-- 添加换行 -->
      <button class="w-10" @click="setHardBreak">
        <img src="../assets/return.svg" alt="" class="m-0" />
      </button>
    </floating-menu>
  </div>

  <input
    ref="fileInput"
    multiple="false"
    accept="image/*"
    type="file"
    style="display: none"
    @change="onFileSelected"
  />
</template>

<script lang="ts" setup>
import { Editor, FloatingMenu } from '@tiptap/vue-3'
import IconCode from '../icons/IconCode.vue'
import TiptapAgent from '../entities/TiptapAgent'
import { ref } from 'vue'
let fileInput = ref<HTMLInputElement | null>(null)

let props = defineProps({
  editor: {
    type: Editor,
    required: true
  }
})

const shouldShowFloatingMenu = TiptapAgent.shouldShowFloatingMenu
const isDrawEnable = TiptapAgent.isDrawEnable(props.editor)
const isTableEnable = TiptapAgent.isTableEnable(props.editor)

function addImage() {
  console.log('添加图片')
  fileInput.value?.click()
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

function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

let setHardBreak = function () {
  props.editor.chain().focus().setHardBreak().run()
}
</script>

<style scoped lang="postcss">
.floating-menu {
  @apply bg-info/95 text-info-content rounded-md px-2 py-1 flex flex-row flex-wrap ml-2;

  button {
    @apply btn btn-sm btn-ghost px-1;
  }
}
</style>
