<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue'
import Button from '../ui/Button.vue'
import { Editor } from '@tiptap/core'
import { IMAGE } from '../config/nodes'
import ImageHelper from '../helper/ImageHelper'
import SmartImage from '../extensions/SmartImage/SmartImage'
import { RiDownload2Fill, RiShape2Line, RiEdit2Fill } from '@remixicon/vue'

let props = defineProps({
    editor: {
        type: Editor,
        required: true
    },
    shape: {
        type: String,
        default: 'rectangle'
    },
    iconSize: {
        type: String,
        default: '24px'
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

function changeImage() {
    fileInput.value?.click()
}

function downloadImage() {
    let verbose = false

    let attrs = props.editor.getAttributes(SmartImage.name)
    let src: string = attrs.src

    if (verbose) {
        console.log('downloadImage', SmartImage.name)
        console.log('downloadImage', attrs)
        console.log('downloadImage', src)
    }

    window.dispatchEvent(new CustomEvent('downloadImage', {
        detail: {
            src: src,
            name: "image-" + Date.now() + ImageHelper.getExtension(src)
        }
    }))
}

async function onFileSelected() {
    let file = fileInput.value?.files?.item(0)
    const base64 = await fileToBase64(file!)

    // base64编码的文件内容
    props.editor.commands.updateAttributes(IMAGE, {
        src: base64
    })
}

let shapeClass = computed(() => {
    return props.editor.options.extensions.find(extension => extension.name === SmartImage.name)?.options.shapeClass
})
</script>

<template>
    <Button @click="changeImage" tips="更换图片" :shape="shape">
        <RiEdit2Fill :size="iconSize"></RiEdit2Fill>
    </Button>
    <Button @click="downloadImage" tips="下载" :shape="shape">
        <RiDownload2Fill :size="iconSize"></RiDownload2Fill>
    </Button>
    <Button tips="样式" :shape="shape">
        <RiShape2Line :size="iconSize"></RiShape2Line>

        <template #dropdown-item>
            <div v-for="shape in Object.keys(shapeClass)"
                class="w-7 h-7 flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 rounded-full p-1"
                :key="shape" @click="props.editor.commands.setShape(shape)">
                <div :class="[
                    shapeClass[shape],
                    'w-5 h-5 rounded-full p-1',
                    { 'ring-1 scale-90': shape === 'none' },
                    { ' bg-cyan-400': shape !== 'none' }
                ]"></div>
            </div>
        </template>
    </Button>
    <input ref="fileInput" multiple="false" accept="image/*" type="file" style="display: none"
        @change="onFileSelected" />
</template>
