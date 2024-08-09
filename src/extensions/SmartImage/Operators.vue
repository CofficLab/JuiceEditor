<template>
  <Button @click="changeImage" tip="更换图片">
    <IconEdit></IconEdit>
  </Button>
  <Button @click="downloadImage" data-tip="下载">
    <IconDownload></IconDownload>
  </Button>
  <!-- <li><a @click="setTriangle">三角形</a></li> -->
  <!-- <li><a @click="setTriangle2">三角形2</a></li> -->
  <!-- <li><a @click="setTriangle3">三角形3</a></li> -->
  <!-- <li><a @click="setTriangle4">三角形4</a></li> -->
  <!-- <li><a @click="setParallelogram2">平行四边形2</a></li> -->
  <!-- <li><a @click="setParallelogram3">平行四边形3</a></li> -->
  <!-- <li><a @click="setParallelogram4">平行四边形4</a></li> -->
  <!-- <li><a @click="setStar2">星形2</a></li> -->
  <!-- <li><a @click="setHexagon2">六边形2</a></li> -->
  <Button @click="setSquircle">
    <div class="w-5 h-5 bg-cyan-400 mask mask-squircle"></div>
  </Button>
  <Button @click="setHeart">
    <div class="w-5 h-5 bg-cyan-400 mask mask-heart"></div>
  </Button>
  <Button @click="setDecagon">
    <div class="w-5 h-5 bg-cyan-400 mask mask-decagon"></div>
  </Button>
  <Button @click="setHexagon">
    <div class="w-5 h-5 bg-cyan-400 mask mask-hexagon"></div>
  </Button>
  <Button @click="setPentagon">
    <div class="w-5 h-5 bg-cyan-400 mask mask-pentagon"></div>
  </Button>
  <Button @click="setStar">
    <div class="w-5 h-5 bg-cyan-400 mask mask-star"></div>
  </Button>
  <Button @click="setParallelogram">
    <div class="w-5 h-5 bg-cyan-400 mask mask-parallelogram"></div>
  </Button>
  <Button @click="setDiamond">
    <div class="w-5 h-5 bg-cyan-400 mask mask-diamond"></div>
  </Button>
  <Button @click="setSquare">
    <div class="w-5 h-5 bg-cyan-400 mask mask-square"></div>
  </Button>
  <Button @click="setCircle">
    <div class="w-5 h-5 bg-cyan-400 mask mask-circle"></div>
  </Button>
  <Button @click="reset" data-tip="恢复原始形状">
    <Reset></Reset>
  </Button>
  <Button @click="newLine" data-tip="在图片后插入空白行">
    <IconNewLine></IconNewLine>
  </Button>
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
import { nodeViewProps } from '@tiptap/vue-3'
import Helper from '../../helper/ImageHelper'
import { defineProps, ref } from 'vue'
import webkit from '../../api/WebKit'
import IconNewLine from './Icons/IconNewLine.vue'
import IconDownload from './Icons/IconDownload.vue'
import IconEdit from './Icons/IconEdit.vue'
import Reset from './Icons/Reset.vue'
import Button from '../../ui/Button.vue'

const isSelected = ref(false)
const isWebKit = 'webkit' in window
let imgDom = ref<HTMLImageElement | null>(null)
let props = defineProps(nodeViewProps)
let fileInput = ref<HTMLInputElement | null>(null)

function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
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

  if (base64ImageString.startsWith('data: image/jpeg;base64,')) {
    return exportBase64(base64ImageString)
  }

  if (base64ImageString.startsWith('data:image/png;base64,')) {
    return exportBase64(base64ImageString)
  }

  if (base64ImageString.startsWith('data: image/png;base64,')) {
    return exportBase64(base64ImageString)
  }

  console.log('base64ImageString', base64ImageString)

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
      Helper.getBase64FromBase64Image(base64ImageString),
      'Image' + Helper.getExtension(base64ImageString)
    )
  } else {
    let a = Helper.download(base64ImageString)

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
</script>
../../helper/Helper ./ImageHelper
