<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue'
import Button from '../ui/Button.vue'
import { TiptapEditor } from '../model/TiptapGroup'
import SmartImage from '../extensions/SmartImage/SmartImage'
import { RiEditLine, RiDownloadLine, RiShapeLine } from '@remixicon/vue'

let props = defineProps({
    editor: {
        type: TiptapEditor,
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

async function onFileSelected() {
    let file = fileInput.value?.files?.item(0)
    const base64 = await fileToBase64(file!)

    // base64编码的文件内容
    props.editor.commands.updateAttributes(Image.name, {
        src: base64
    })
}

let shapeClass = computed(() => {
    return props.editor.options.extensions.find(extension => extension.name === SmartImage.name)?.options.shapeClass
})
</script>

<template>
    <Button @click="changeImage" tips="更换图片" :shape="shape">
        <RiEditLine :size="iconSize"></RiEditLine>
    </Button>
    <Button @click="props.editor.commands.downloadImage()" tips="下载" :shape="shape">
        <RiDownloadLine :size="iconSize"></RiDownloadLine>
    </Button>
    <Button tips="样式" :shape="shape">
        <RiShapeLine :size="iconSize"></RiShapeLine>

        <template #dropdown-item>
            <div class="grid grid-cols-2 z-50 md:grid-cols-4 gap-2 w-32 place-items-center">
                <div v-for="shape in Object.keys(shapeClass)"
                    class="w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 rounded-full p-1"
                    :key="shape" @click="props.editor.commands.setShape(shape)">
                    <div :class="[
                        shapeClass[shape],
                        'w-5 h-5 p-1',
                        { 'ring-1 scale-90 rounded-full': shape === 'none' },
                        { ' bg-cyan-400': shape !== 'none' }
                    ]"></div>
                </div>
            </div>
        </template>
    </Button>
    <input ref="fileInput" multiple="false" accept="image/*" type="file" style="display: none"
        @change="onFileSelected" />
</template>
