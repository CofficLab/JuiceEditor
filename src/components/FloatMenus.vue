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
        <img src="../icons/list.bullet.svg" alt="" class="m-0" />
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
        <img src="../icons/123.rectangle.fill.svg" alt="" class="m-0" />
      </button>
      <button class="w-10" @click="addImage" :class="{ 'is-active': editor.isActive('banner') }">
        <img src="../icons/photo.svg" alt="" class="m-0" />
      </button>
      <button class="w-10" @click="editor.commands.insertDrawIo()">
        <img src="../icons/compass.drawing.svg" alt="" class="m-0" />
      </button>
      <button class="w-10" @click="setHardBreak">
        <img src="../icons/return.svg" alt="" class="m-0" />
      </button>
      <button
        class="w-10"
        @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"
      >
        <img src="../icons/tablecells.svg" alt="" class="m-0" />
      </button>

      <!-- 表格的操作 -->
      <div class="flex flex-wrap">
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().addColumnBefore().run()"
        >
          前插一列
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().addColumnAfter().run()"
        >
          后插一列
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().deleteColumn().run()"
        >
          删除该列
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().addRowBefore().run()"
        >
          前插一行
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().addRowAfter().run()"
        >
          后插一行
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().deleteRow().run()"
        >
          删除该行
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().deleteTable().run()"
        >
          删除表格
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().mergeCells().run()"
        >
          合并单元
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().splitCell().run()"
        >
          拆分单元
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().toggleHeaderColumn().run()"
        >
          切换表头列
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().toggleHeaderRow().run()"
        >
          切换表头行
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().toggleHeaderCell().run()"
        >
          切换表头格
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().mergeOrSplit().run()"
        >
          合并或拆分
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().setCellAttribute('colspan', 2).run()"
        >
          占两格
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().fixTables().run()"
        >
          修复
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().goToNextCell().run()"
        >
          下一格
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().goToPreviousCell().run()"
        >
          上一格
        </button>
      </div>
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
  const excludes = ['banner', 'draw', 'table', 'link', 'tableCell', 'tableRow', 'tableHeader']
  const { selection } = props.state
  const { $anchor, empty } = selection
  const isEmptyTextBlock =
    $anchor.parent.isTextblock && !$anchor.parent.type.spec.code && !$anchor.parent.textContent
  const type = $anchor.parent.type.name

  console.log('shouldShowFloatingMenu: type', type)

  // 如果在 H1 中，不展示
  if (type == 'heading' && selection.$head.parent.attrs.level == 1) {
    return false
  }

  if (excludes.includes(type)) {
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
  @apply bg-info/95 text-info-content rounded-md px-2 py-1 flex flex-wrap items-center;
  button {
    @apply btn btn-sm btn-ghost px-1;
  }
}
</style>
