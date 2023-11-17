<template>
  <div>
    <floating-menu
      class="floating-menu"
      :tippy-options="{ duration: 100, maxWidth: 800 }"
      :editor="editor"
      :should-show="shouldShowFloatingMenu"
    >
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        H2
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        H3
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        H4
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      >
        H5
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      >
        H6
      </button>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        无序列表
      </button>
      <button
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
      >
        代码块
      </button>
      <button
        @click="editor.chain().focus().toggleBanner().run()"
        :class="{ 'is-active': editor.isActive('banner') }"
      >
        提示
      </button>
      <button @click="addImage" :class="{ 'is-active': editor.isActive('banner') }">图片</button>
      <button @click="editor.commands.insertDrawIo()">绘图</button>
      <button @click="setHardBreak">换行</button>
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
import { ref } from 'vue'
let fileInput = ref<HTMLInputElement | null>(null)

let props = defineProps({
  editor: {
    type: Editor,
    required: true
  }
})

const shouldShowFloatingMenu = function (props: {
  editor: import('@tiptap/core').Editor
  view: import('prosemirror-view').EditorView
  state: import('prosemirror-state').EditorState
  oldState?: import('prosemirror-state').EditorState | undefined
}) {
  let isAtBannerPosition = props.editor.isActive('banner')
  let isAtSmartImagePosition = props.editor.isActive('image')
  const { selection } = props.state
  const { $anchor, empty } = selection
  const isEmptyTextBlock =
    $anchor.parent.isTextblock && !$anchor.parent.type.spec.code && !$anchor.parent.textContent
  const type = $anchor.parent.type.name

  // console.log('shouldShowFloatingMenu: type', type)

  // 如果在 H1 中，不展示
  if (type == 'heading' && selection.$head.parent.attrs.level == 1) {
    return false
  }

  // 如果在 Banner 中，不展示
  if (type == 'banner') {
    return false
  }

  // 如果在 draw 中，不展示
  if (type == 'draw') {
    return false
  }

  if (isAtBannerPosition && !isEmptyTextBlock) {
    return false
  }

  if (isAtSmartImagePosition) {
    return false
  }

  if (!isEmptyTextBlock) {
    return false
  }

  return true
}

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
  @apply bg-info text-info-content rounded-md px-2 py-1 flex items-center;
  button {
    @apply btn btn-xs btn-ghost;
  }
}
</style>
