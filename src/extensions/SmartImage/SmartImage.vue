<template>
  <node-view-wrapper>
    <div class="dropdown dropdown-open dropdown-right">
      <div tabindex="0" role="button"  @click="onClick" v-bind:class="[
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
      <div tabindex="0" class="p-2 dropdown-content z-[1]" v-show="selected" contenteditable="false">
        <!-- 菜单按钮 -->
        <div class="absolute top-0 right-0 z-40 p-0 flex items-end" v-if="editor.isEditable">
          <div class="dropdown dropdown-hover dropdown-bottom dropdown-end m-0">
            <ul class="operators">
              <input ref="fileInput" multiple="false" accept="image/*" type="file" style="display: none"
                @change="onFileSelected" />
              <li><a @click="changeImage">更换图片</a></li>
              <li><a @click="downloadImage">下载图片</a></li>
              <li><a @click="setSquircle">方圆形</a></li>
              <!-- <li><a @click="setTriangle">三角形</a></li> -->
              <!-- <li><a @click="setTriangle2">三角形2</a></li> -->
              <!-- <li><a @click="setTriangle3">三角形3</a></li> -->
              <!-- <li><a @click="setTriangle4">三角形4</a></li> -->
              <li><a @click="setHeart">心形</a></li>
              <li><a @click="setCircle">圆形</a></li>
              <li><a @click="setSquare">正方形</a></li>
              <li><a @click="setDiamond">菱形</a></li>
              <li><a @click="setParallelogram">平行四边形</a></li>
              <!-- <li><a @click="setParallelogram2">平行四边形2</a></li> -->
              <!-- <li><a @click="setParallelogram3">平行四边形3</a></li> -->
              <!-- <li><a @click="setParallelogram4">平行四边形4</a></li> -->
              <li><a @click="setStar">星形</a></li>
              <!-- <li><a @click="setStar2">星形2</a></li> -->
              <li><a @click="setPentagon">五角形</a></li>
              <li><a @click="setHexagon">六边形</a></li>
              <!-- <li><a @click="setHexagon2">六边形2</a></li> -->
              <li><a @click="setDecagon">十边形</a></li>
              <li><a @click="reset">原始形状</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import Setting from './Icons/Setting.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import Base64Helper from './Base64Helper'
import webkit from '../../entities/WebKit';
import Helper from './Helper';

const isSelected = ref(false)
const isWebKit = 'webkit' in window
let imgDom = ref<HTMLImageElement | null>(null)
let props = defineProps(nodeViewProps)
let fileInput = ref<HTMLInputElement | null>(null)

function onClick(e: Event) {
  isSelected.value = true
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
    console.log('SmartImage: editor is not editable, hide banner toolbar')
    return
  }

  // 如果鼠标在 Banner 内，显示菜单

  const currentPos = props.editor.state.selection.anchor
  const start = props.getPos()
  const end = props.getPos() + props.node.nodeSize

  // console.log('SmartBanner: clicked')
  // console.log('SmartBanner: currentPos', currentPos)
  // console.log('SmartBanner: start', start)
  // console.log('SmartBanner: end', end)

  isSelected.value = currentPos >= start && currentPos <= end
}

onMounted(() => {
  Helper.insertNewLineIfIsTheLastNode(props)
  document.addEventListener('click', checkToolbar)
})

onUnmounted(() => {
  document.removeEventListener('click', checkToolbar)
})
</script>

<style lang="postcss" scoped>
.operators {
  @apply menu p-2 shadow dropdown-content z-[1] bg-base-300 rounded w-32;

  a {
    @apply no-underline;
  }
}
</style>
