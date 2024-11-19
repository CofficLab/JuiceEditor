<script lang="ts" setup>
import { defineProps } from 'vue'
import Button from '../ui/Button.vue'
import { TiptapEditor } from '../model/TiptapGroup'
import { ref, watch } from 'vue'
import { RiGlobalLine, RiLinkM } from '@remixicon/vue'
import { LinkExtension } from '../model/TiptapGroup'

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
    },
    backgroundClass: {
        type: String,
        required: true,
        default: 'bg-indigo-100/95 dark:bg-indigo-500/95'
    },
    onEditStart: {
        type: Function,
        required: true
    },
    onEditEnd: {
        type: Function,
        required: true
    }
})

var href = ref(props.editor.getAttributes(LinkExtension.name).href)
var text = ref(props.editor.getAttributes(LinkExtension.name).text)

function openLink() {
    let link = props.editor.getAttributes(LinkExtension.name)
    if (link.href) {
        window.open(link.href, '_blank')
    }
}

function updateLink() {
    props.onEditStart?.()
    props.editor
        .chain()
        .extendMarkRange(LinkExtension.name)
        .insertContent(text.value, {
            updateSelection: false
        })
        .setLink({ href: href.value, target: '_blank' })
        .run()
    props.onEditEnd?.()
}

watch(href, () => updateLink())
watch(text, () => updateLink())

</script>

<template>
    <Button tips="在浏览器中打开" @click="openLink" contenteditable="false" :shape="shape">
        <RiLinkM :size="iconSize"></RiLinkM>
    </Button>

    <input type="text" v-model="href" placeholder="在此输入链接"
        class="w-48 rounded-none input focus:outline-none focus:ring-1 input-sm" />

    <input type="text" v-model="text" placeholder="在此输入文字"
        class="w-48 rounded-none input focus:outline-none focus:ring-1 input-sm" />

    <Button tips="删除链接，保留文字" @click="editor.commands.unsetLink()" contenteditable="false" :shape="shape">
        <RiGlobalLine :size="iconSize"></RiGlobalLine>
    </Button>
</template>
