<template>
    <iframe ref="iframe" width="100%" height="100%" border="0" style="position: fixed;" :src="drawUrl"
        :class="{ 'opacity-0': !ready }"></iframe>
</template>

<script lang="ts" setup>
import { onUnmounted, ref, onBeforeMount } from 'vue'
import DrawHelper from './DrawHelper';
import DrawConfig from './DrawConfig';

const props = defineProps({
    drawIoLink: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    },
    onReady: {
        type: Function,
        required: true
    },
    onUpdate: {
        type: Function,
        required: true
    },
    onClose: {
        type: Function,
        required: true
    }
})

const drawIoLink = props.drawIoLink
const drawUrl = DrawHelper.makeDrawUrl(drawIoLink)
const iframe = ref<HTMLIFrameElement>(null as unknown as HTMLIFrameElement)
const ready = ref(false)

function onDrawingPageReady() {
    ready.value = true
    props.onReady()
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
        init: () => {
            sendToDrawio({ action: 'load', xmlpng: props.src, autosave: 1 })
        },
        export: () => props.onUpdate(msg.data),
        exit: () => sendToDrawio({ action: 'export', format: 'xmlpng', spinKey: 'saving' }),
        save: () => {
            sendToDrawio({ action: 'export', format: 'xmlpng', spinKey: 'saving' })
            props.onClose()
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

function sendToDrawio(message: object) {
    iframe.value!.contentWindow!.postMessage(JSON.stringify(message), '*')
}

onBeforeMount(() => {
    window.addEventListener('message', receive)
})

onUnmounted(() => {
    window.removeEventListener('message', receive)
})

</script>
