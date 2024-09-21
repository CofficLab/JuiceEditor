<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import IconDownload from '../ui/icons/IconDownload.vue'
import IconEdit from '../ui/icons/IconEdit.vue'
import Reset from '../ui/icons/Reset.vue'
import Button from '../ui/Button.vue'
import { Editor } from '@tiptap/core'
import { IMAGE } from '../config/nodes'
import EventProvider from '../provider/EventProvider'
import ImageHelper from '../helper/ImageHelper'

let props = defineProps({
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

function setHexagon() {
    props.editor.commands.updateAttributes(IMAGE, {
        class: 'mask mask-hexagon'
    })
}


function setHeart() {
    props.editor.commands.updateAttributes(IMAGE, {
        class: 'mask mask-heart'
    })
}

function setSquircle() {
    props.editor.commands.updateAttributes(IMAGE, {
        class: 'mask mask-squircle'
    })
}

function setDecagon() {
    props.editor.commands.updateAttributes(IMAGE, {
        class: 'mask mask-decagon'
    })
}

function setPentagon() {
    props.editor.commands.updateAttributes(IMAGE, {
        class: 'mask mask-pentagon'
    })
}

function setDiamond() {
    props.editor.commands.updateAttributes(IMAGE, {
        class: 'mask mask-diamond'
    })
}

function setSquare() {
    props.editor.commands.updateAttributes(IMAGE, {
        class: 'mask mask-square'
    })
}

function setCircle() {
    props.editor.commands.updateAttributes(IMAGE, {
        class: 'mask mask-circle'
    })
}

function setParallelogram() {
    props.editor.commands.updateAttributes(IMAGE, {
        class: 'mask mask-parallelogram'
    })
}

function setStar() {
    props.editor.commands.updateAttributes(IMAGE, {
        class: 'mask mask-star'
    })
}

function reset() {
    props.editor.commands.updateAttributes(IMAGE, {
        class: ''
    })
}

function changeImage() {
    fileInput.value?.click()
}

function downloadImage() {
    let attrs = props.editor.getAttributes(IMAGE)
    let src: string = attrs.src

    EventProvider.downloadImage(src, "image-" + Date.now() + ImageHelper.getExtension(src))
}

async function onFileSelected() {
    let file = fileInput.value?.files?.item(0)
    const base64 = await fileToBase64(file!)

    // base64编码的文件内容
    props.editor.commands.updateAttributes(IMAGE, {
        src: base64
    })
}
</script>

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
    <input ref="fileInput" multiple="false" accept="image/*" type="file" style="display: none"
        @change="onFileSelected" />
</template>