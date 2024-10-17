<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue'
import IconDownload from '../ui/icons/IconDownload.vue'
import IconEdit from '../ui/icons/IconEdit.vue'
import Button from '../ui/Button.vue'
import { Editor } from '@tiptap/core'
import { IMAGE } from '../config/nodes'
import ImageHelper from '../helper/ImageHelper'
import IconInfo from '../ui/icons/IconInfo.vue';
import SmartImage from '../extensions/SmartImage/SmartImage'

let props = defineProps({
    editor: {
        type: Editor,
        required: true
    },
    shape: {
        type: String,
        default: 'rectangle'
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
    <Button @click="changeImage" tip="更换图片" :shape="shape">
        <IconEdit></IconEdit>
    </Button>
    <Button @click="downloadImage" tip="下载" :shape="shape">
        <IconDownload></IconDownload>
    </Button>
    <div class="dropdown dropdown-bottom h-8 w-8">
        <Button tabindex="0" role="button" tip="样式" size="md" :shape="shape">
            <IconInfo></IconInfo>
        </Button>
        <div tabindex="0" class="dropdown-content bg-slate-100 dark:bg-zinc-900 rounded-box z-50 p-2 shadow w-48">
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                <div v-for="shape in Object.keys(shapeClass)"
                    class="w-7 h-7 flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 rounded-full p-1"
                    :key="shape" @click="props.editor.commands.setShape(shape)">
                    <div :class="shapeClass[shape]" class="w-5 h-5 rounded-full p-1 bg-cyan-400"></div>
                </div>
            </div>
        </div>
    </div>
    <input ref="fileInput" multiple="false" accept="image/*" type="file" style="display: none"
        @change="onFileSelected" />
</template>