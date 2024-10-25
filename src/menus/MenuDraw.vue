<script lang="ts" setup>
import { defineProps, ref, onUnmounted, computed } from 'vue'
import Button from '../ui/Button.vue'
import { Editor } from '@tiptap/core'
import Opening from '../extensions/SmartImage/Opening.vue'
import DrawConfig from '../extensions/SmartImage/DrawConfig'
import ImageHelper from '../helper/ImageHelper'
import DrawHelper from '../extensions/SmartImage/DrawHelper'
import { RiDownloadLine, RiEditLine, RiShapeLine } from '@remixicon/vue'
import SmartImage from '../extensions/SmartImage/SmartImage'
import Image from '@tiptap/extension-image'

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

const opening = ref<HTMLImageElement | null>(null)
const drawIoLink = DrawHelper.getDrawIoLink(props.editor)
const drawingDialog = DrawHelper.makeDrawDialog(drawIoLink)
const isOpening = ref(false)
const isSelected = ref(false)

const getSrc = () => props.editor.getAttributes(Image.name).src

const downloadImage = () => {
    const src = getSrc()
    window.dispatchEvent(new CustomEvent('downloadImage', {
        detail: { src, name: `image-${Date.now()}${ImageHelper.getExtension(src)}` }
    }))
}

function onDrawingPageReady() {
    drawingDialog.style.opacity = '1'
    isOpening.value = false
}

function onClose(_event: any) {
    console.log('🍋 SmartDraw: 收到关闭画图的事件')

    destroy()
}

function sendToDrawio(message: object) {
    drawingDialog.querySelector('iframe')!.contentWindow!.postMessage(JSON.stringify(message), '*')
}

function openLoading() {
    if (!props.editor.isEditable) {
        return
    }

    isOpening.value = true
}

function open() {
    if (!props.editor.isEditable) {
        return
    }

    document.body.appendChild(drawingDialog)

    window.addEventListener('message', receive)
    window.addEventListener('close-draw', onClose)
}

function destroy() {
    window.removeEventListener('message', receive)
    window.removeEventListener('close-draw', onClose)
    document.body.removeChild(drawingDialog)
    drawingDialog.close()
    isSelected.value = false
}

const receive = (event: MessageEvent): void => {
    if (!event.data) return
    let msg: { event: string; data?: string }
    try {
        msg = JSON.parse(event.data)
    } catch {
        return
    }

    const actions = {
        autosave: () => sendToDrawio({ action: 'export', format: 'xmlpng' }),
        configure: () => sendToDrawio({ action: 'configure', config: DrawConfig }),
        init: () => sendToDrawio({ action: 'load', xmlpng: getSrc(), autosave: 1 }),
        export: () => props.editor.commands.updateAttributes(Image.name, { src: msg.data }),
        exit: () => sendToDrawio({ action: 'export', format: 'xmlpng', spinKey: 'saving' }),
        save: () => {
            sendToDrawio({ action: 'export', format: 'xmlpng', spinKey: 'saving' })
            destroy()
        },
        load: onDrawingPageReady,
    }

    const action = actions[msg.event as keyof typeof actions]
    if (action) {
        action()
    } else {
        console.log(`🍋 SmartDraw: 收到未知消息 -> ${msg.event}`)
    }
}

onUnmounted(() => {
    window.removeEventListener('message', receive)
    window.removeEventListener('close-draw', onClose)
})
let shapeClass = computed(() => {
    return props.editor.options.extensions.find(extension => extension.name === SmartImage.name)?.options.shapeClass
})
</script>

<template>
    <Opening :onReady="open" :visible="isOpening" class="opening" ref="opening"></Opening>
    <Button @click="downloadImage" tips="下载图片" :shape="shape">
        <RiDownloadLine :size="iconSize"></RiDownloadLine>
    </Button>
    <Button @click="openLoading" tips="打开画图界面" :shape="shape">
        <RiEditLine :size="iconSize"></RiEditLine>
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
</template>
