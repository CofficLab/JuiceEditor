<script lang="ts" setup>
import { defineProps, ref, onUnmounted } from 'vue'
import IconDownload from '../ui/icons/IconDownload.vue'
import IconEdit from '../ui/icons/IconEdit.vue'
import Button from '../ui/Button.vue'
import { Editor } from '@tiptap/core'
import { IMAGE } from '../config/nodes'
import Opening from '../extensions/SmartImage/Opening.vue'
import DrawConfig from '../extensions/SmartImage/DrawConfig'
import ImageHelper from '../helper/ImageHelper'
import DrawHelper from '../extensions/SmartImage/DrawHelper'

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

const opening = ref<HTMLImageElement | null>(null)
const drawIoLink = DrawHelper.getDrawIoLink(props.editor)
const drawingDialog = DrawHelper.makeDrawDialog(drawIoLink)
const isOpening = ref(false)
const isSelected = ref(false)

const getSrc = () => props.editor.getAttributes(IMAGE).src

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
    let msg
    try {
        msg = JSON.parse(event.data)
    } catch {
        return
    }

    const actions = {
        autosave: () => sendToDrawio({ action: 'export', format: 'xmlpng' }),
        configure: () => sendToDrawio({ action: 'configure', config: DrawConfig }),
        init: () => sendToDrawio({ action: 'load', xmlpng: getSrc(), autosave: 1 }),
        export: () => props.editor.commands.updateAttributes(IMAGE, { src: msg.data }),
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
</script>

<template>
    <Opening :onReady="open" :visible="isOpening" class="opening" ref="opening"></Opening>
    <Button @click="downloadImage" tip="下载图片" :shape="shape">
        <IconDownload size="sm" color="primary"></IconDownload>
    </Button>
    <Button @click="openLoading" tip="打开画图界面" :shape="shape">
        <IconEdit size="sm" color="primary"></IconEdit>
    </Button>
</template>
