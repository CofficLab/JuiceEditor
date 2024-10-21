<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import IconDownload from '../ui/icons/IconDownload.vue'
import IconEdit from '../ui/icons/IconEdit.vue'
import Button from '../ui/Button.vue'
import { Editor } from '@tiptap/core'
import { IMAGE } from '../config/nodes'
import { makeDrawUrl } from '../extensions/SmartImage/DrawUrl'
import Opening from '../extensions/SmartImage/Opening.vue'
import DrawConfig from '../extensions/SmartImage/DrawConfig'
import ImageHelper from '../helper/ImageHelper'
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

const opening = ref<HTMLImageElement | null>(null)
const drawIoLink = props.editor.options.extensions.find((extension: any) => extension.name === SmartImage.name)?.options.drawIoLink

if (!drawIoLink) {
    console.error('🍋 SmartDraw: 没有找到 drawIoLink')
}

const drawingPage = document.createElement('iframe')
drawingPage.setAttribute('frameborder', '0')
drawingPage.setAttribute('src', makeDrawUrl(drawIoLink))
drawingPage.setAttribute('width', '100%')
drawingPage.setAttribute('height', '100%')

const drawingDialog = document.createElement('dialog')
drawingDialog.classList.add('modal')
drawingDialog.style.border = 'none'

const isOpening = ref(false)
const isSelected = ref(false)

let fileInput = ref<HTMLInputElement | null>(null)

function getSrc() {
    let attrs = props.editor.getAttributes(IMAGE)
    let src: string = attrs.src

    return src
}

function fileToBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
}

function downloadImage() {
    let attrs = props.editor.getAttributes(IMAGE)
    let src: string = attrs.src

    window.dispatchEvent(new CustomEvent('downloadImage', { detail: { src: src, name: "image-" + Date.now() + ImageHelper.getExtension(src) } }))
}

// 画图页面已经准备完成，可以展示了
function onDrawingPageReady() {
    drawingDialog.showModal()
    isOpening.value = false
}

// 响应外部调用调用关闭画图事件
function onClose(_event: any) {
    console.log('🍋 SmartDraw: 收到关闭画图的事件')

    destroy()
}

function sendToDrawio(message: object) {
    drawingPage.contentWindow!.postMessage(JSON.stringify(message), '*')
}

// 显示打开画图前的loading页面
function openLoading() {
    if (!props.editor.isEditable) {
        return
    }

    isOpening.value = true
}

// 打开画图
function open() {
    if (!props.editor.isEditable) {
        return
    }

    console.log('打开画图')

    drawingDialog.appendChild(drawingPage)
    document.body.appendChild(drawingDialog)

    // 接收画图iframe传递的消息
    window.addEventListener('message', receive)
    // 接收关闭画图的事件
    document.addEventListener('close-draw', onClose)
}

// 销毁画图的Iframe
function destroy() {
    console.log('🍋 SmartDraw: 销毁画图的 Iframe，同时取消事件监听')

    window.removeEventListener('message', receive)
    document.removeEventListener('close-draw', onClose)
    document.body.removeChild(drawingDialog)
    drawingDialog.close()
    isSelected.value = false
}

// 负责接收iframe中的drawio发来的消息
function receive(event: MessageEvent): void {
    console.log('🍋 SmartDraw: 收到 drawio 发来的消息，开始解析')
    if (event.data.length == 0) {
        return
    }
    try {
        var msg = JSON.parse(event.data)
    } catch {
        return
    }

    switch (msg.event) {
        case 'init':
            console.log('🍋 SmartDraw: 收到 drawio 发来的消息 -> init，向它发送消息 -> load')
            sendToDrawio({
                action: 'load',
                xmlpng: getSrc(),
                autosave: 1
            })
            break
        case 'save':
            console.log('🍋 SmartDraw: 收到 drawio 发来的消息 -> save，表示在画图 Iframe 中点击了保存')
            sendToDrawio({
                action: 'export',
                format: 'xmlpng',
                spinKey: 'saving'
            })
            destroy()
            break
        case 'export':
            console.log('🍋 SmartDraw: 收到 drawio 发来的消息 -> export，存储数据')
            props.editor.commands.updateAttributes(IMAGE, {
                src: msg.data
            })
            break
        case 'autosave':
            console.log('🍋 SmartDraw: 收到 drawio 发来的消息 -> autosave，向它发送消息 -> export')
            sendToDrawio({
                action: 'export',
                format: 'xmlpng'
            })
            break
        case 'exit':
            console.log('🍋 SmartDraw: 收到 drawio 发来的消息 -> exit，销毁 iframe')
            console.log('🍋 SmartDraw: 收到 drawio 发来的消息 -> exit，先让 drawio 把数据发送出来')
            sendToDrawio({
                action: 'export',
                format: 'xmlpng',
                spinKey: 'saving'
            })
            break
        case 'load':
            console.log('🍋 SmartDraw: 收到 drawio 发来的消息 -> load，表示画图 Iframe 已加载')
            onDrawingPageReady()
            break
        case 'configure':
            console.log('🍋 SmartDraw: 收到 drawio 发来的消息 -> configure，向它发送配置')
            sendToDrawio({
                action: 'configure',
                config: DrawConfig
            })

            break
        default:
            console.log(`🍋 SmartDraw: 收到 drawio 发来的消息 -> ${msg.event}，不知道怎么处理`)
    }
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
    <Opening :onReady="open" :visible="isOpening" class="opening" ref="opening"></Opening>
    <Button @click="downloadImage" tip="下载图片" :shape="shape">
        <IconDownload size="sm" color="primary"></IconDownload>
    </Button>
    <Button @click="openLoading" tip="打开画图界面" :shape="shape">
        <IconEdit size="sm" color="primary"></IconEdit>
    </Button>
    <input ref="fileInput" multiple="false" accept="image/*" type="file" style="display: none"
        @change="onFileSelected" />
</template>