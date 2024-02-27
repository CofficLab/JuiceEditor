<template>
  <node-view-wrapper>
    <div class="dropdown dropdown-open dropdown-bottom">
      <div tabindex="0" role="button" @click="onClick" v-bind:class="[
        { 'outline-orange-600 outline-dashed outline-2 outline-offset-1': isSelected },
      ]">
        <!-- 内容 -->
        <div class="bg-red-100/0 flex">
          <div class="card rounded-none p-0 mx-auto">
            <figure class="m-0 px-12">
              <img ref="imgDom" crossOrigin="anonymous" :src="props.node.attrs.src" :class="props.node.attrs.class"
                class="p-0 m-0" id="my-image" />
            </figure>
          </div>
        </div>
      </div>

      <!-- 操作栏 -->
      <div tabindex="0" class="p-2 dropdown-content z-[1] gap-2 flex flex-col" v-show="isSelected" contenteditable="false">
        <input ref="fileInput" multiple="false" accept="image/*" type="file" style="display: none"
          @change="onFileSelected" />
        <div class="join">
          <button @click="changeImage" class="btn join-item btn-sm">更换图片</button>
          <button @click="downloadImage" class="btn join-item btn-sm">下载图片</button>
          <button @click="reset" class="btn join-item btn-sm">原始形状</button>
          <button class="btn btn-sm join-item" @click="newLine">
              <IconNewLine class="w-5 h-6"></IconNewLine>下方插入空行
            </button>
          <!-- <li><a @click="setTriangle">三角形</a></li> -->
          <!-- <li><a @click="setTriangle2">三角形2</a></li> -->
          <!-- <li><a @click="setTriangle3">三角形3</a></li> -->
          <!-- <li><a @click="setTriangle4">三角形4</a></li> -->
          <!-- <li><a @click="setParallelogram2">平行四边形2</a></li> -->
          <!-- <li><a @click="setParallelogram3">平行四边形3</a></li> -->
          <!-- <li><a @click="setParallelogram4">平行四边形4</a></li> -->
          <!-- <li><a @click="setStar2">星形2</a></li> -->
          <!-- <li><a @click="setHexagon2">六边形2</a></li> -->
        </div>
        <div class="join">
          <button @click="setSquircle" class="join-item btn btn-sm">
            <div class="h-4 w-4 bg-red-400 mask mask-squircle"></div>
          </button>
          <button @click="setHeart" class="join-item btn btn-sm">
            <div class="h-4 w-4 bg-red-400 mask mask-heart"></div>
          </button>
          <button @click="setDecagon" class="join-item btn btn-sm">
            <div class="h-4 w-4 bg-red-400 mask mask-decagon"></div>
          </button>
          <button @click="setHexagon" class="join-item btn btn-sm">
            <div class="h-4 w-4 bg-red-400 mask mask-hexagon"></div>
          </button>
          <button @click="setPentagon" class="join-item btn btn-sm">
            <div class="h-4 w-4 bg-red-400 mask mask-pentagon"></div>
          </button>
          <button @click="setStar" class="join-item btn btn-sm">
            <div class="h-4 w-4 bg-red-400 mask mask-star"></div>
          </button>
          <button @click="setParallelogram" class="join-item btn btn-sm">
            <div class="h-4 w-4 bg-red-400 mask mask-parallelogram"></div>
          </button>
          <button @click="setDiamond" class="join-item btn btn-sm">
            <div class="h-4 w-4 bg-red-400 mask mask-diamond"></div>
          </button>
          <button @click="setSquare" class="join-item btn btn-sm">
            <div class="h-4 w-4 bg-red-400 mask mask-square"></div>
          </button>
          <button @click="setCircle" class="join-item btn btn-sm">
            <div class="h-4 w-4 bg-red-400 mask mask-circle"></div>
          </button>
        </div>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import { onMounted, onUnmounted, ref } from 'vue'
import Base64Helper from './Base64Helper'
import webkit from '../../entities/WebKit';
import Helper from './Helper';
import IconNewLine from './Icons/IconNewLine.vue';

const isSelected = ref(false)
const isWebKit = 'webkit' in window
let imgDom = ref<HTMLImageElement | null>(null)
let props = defineProps(nodeViewProps)
let fileInput = ref<HTMLInputElement | null>(null)

function onClick(e: Event) {
  isSelected.value = true
}

function newLine() {
  Helper.newLine(props)
  isSelected.value = false
}

function setHexagon() {
  props.updateAttributes({
    class: 'mask mask-hexagon'
  })
}

function setHexagon2() {
  props.updateAttributes({
    class: 'mask mask-hexagon-2'
  })
}

function setHeart() {
  props.updateAttributes({
    class: 'mask mask-heart'
  })
}

function setSquircle() {
  props.updateAttributes({
    class: 'mask mask-squircle'
  })
}

function setDecagon() {
  props.updateAttributes({
    class: 'mask mask-decagon'
  })
}

function setPentagon() {
  props.updateAttributes({
    class: 'mask mask-pentagon'
  })
}

function setDiamond() {
  props.updateAttributes({
    class: 'mask mask-diamond'
  })
}

function setSquare() {
  props.updateAttributes({
    class: 'mask mask-square'
  })
}

function setCircle() {
  props.updateAttributes({
    class: 'mask mask-circle'
  })
}

function setParallelogram() {
  props.updateAttributes({
    class: 'mask mask-parallelogram'
  })
}

function setParallelogram2() {
  props.updateAttributes({
    class: 'mask mask-parallelogram-2'
  })
}

function setParallelogram3() {
  props.updateAttributes({
    class: 'mask mask-parallelogram-3'
  })
}

function setParallelogram4() {
  props.updateAttributes({
    class: 'mask mask-parallelogram-4'
  })
}

function setStar() {
  props.updateAttributes({
    class: 'mask mask-star'
  })
}

function setStar2() {
  props.updateAttributes({
    class: 'mask mask-star-2'
  })
}

function setTriangle() {
  props.updateAttributes({
    class: 'mask mask-triangle'
  })
}

function setTriangle2() {
  props.updateAttributes({
    class: 'mask mask-triangle-2'
  })
}

function setTriangle3() {
  props.updateAttributes({
    class: 'mask mask-triangle-3'
  })
}

function setTriangle4() {
  props.updateAttributes({
    class: 'mask mask-triangle-4'
  })
}

function reset() {
  props.updateAttributes({
    class: ''
  })
}

function changeImage() {
  fileInput.value?.click()
}

function downloadImage() {
  let base64ImageString: string = props.node.attrs.src

  if (base64ImageString.startsWith('data:image/jpeg;base64,')) {
    return exportBase64(base64ImageString)
  }

  // 不是一个base64图片编码，先获取base64图片编码
  const img = imgDom.value as HTMLImageElement

  // 创建canvas并设置大小
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height

  // 获取context并绘制图片
  const ctx = canvas.getContext('2d')
  ctx!.drawImage(img, 0, 0)

  // 转换为blob
  canvas.toBlob(function (blob) {
    // 转换为base64
    const reader = new FileReader()
    reader.readAsDataURL(blob!)
    reader.onloadend = function () {
      base64ImageString = reader.result as string

      exportBase64(base64ImageString)
    }
  }, 'image/png')
}

function exportBase64(base64ImageString: string) {
  // 下载
  if (isWebKit) {
    webkit.downloadImage(
      Base64Helper.getBase64FromBase64Image(base64ImageString),
      'Image' + Base64Helper.getExtension(base64ImageString)
    )
  } else {
    let a = Base64Helper.download(base64ImageString)

    // Clean up
    a.remove()
    URL.revokeObjectURL(a.href)
  }
}

async function onFileSelected() {
  let file = fileInput.value?.files?.item(0)
  const base64 = await fileToBase64(file!)

  // base64编码的文件内容
  props.updateAttributes({
    src: base64
  })
}

function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

function checkToolbar(event: Event) {
  if (!props.editor.isEditable) {
    isSelected.value = false
    console.log('SmartImage: editor is not editable, hide image toolbar')
    return
  }

  // 如果鼠标在 Image 内，显示菜单

  const currentPos = props.editor.state.selection.anchor
  const start = props.getPos()
  const end = props.getPos() + props.node.nodeSize

  // console.log('SmartImage: clicked')
  // console.log('SmartImage: currentPos', currentPos)
  // console.log('SmartImage: start', start)
  // console.log('SmartImage: end', end)

  isSelected.value = currentPos >= start && currentPos < end
}

onMounted(() => {
  Helper.insertNewLineIfIsTheLastNode(props)
  document.addEventListener('click', checkToolbar)
})

onUnmounted(() => {
  document.removeEventListener('click', checkToolbar)
})
</script>
