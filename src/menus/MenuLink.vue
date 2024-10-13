<script lang="ts" setup>
import { defineProps } from 'vue'
import Open from '../ui/icons/Open.vue'
import Button from '../ui/Button.vue'
import { Editor } from '@tiptap/core'
import NoLink from '../ui/icons/NoLink.vue'
import { ref, watch } from 'vue'
import { LINK } from '../config/nodes'

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

var href = ref(props.editor.getAttributes(LINK).href)
var text = ref(props.editor.getAttributes(LINK).text)

function openLink() {
    let link = props.editor.getAttributes(LINK)
    if (link.href) {
        window.open(link.href, '_blank')
    }
}

watch(href, (newVal) => {
    props.editor.commands.setLink({ href: newVal })
})
</script>

<template>
    <Button tip="在浏览器中打开" @click="openLink" contenteditable="false" shape="rectangle" size="xs">
        <Open></Open>
    </Button>

    <input type="text" v-model="href" placeholder="在此输入链接"
        class="w-48 rounded-none input focus:outline-none focus:ring-1 input-sm" />

    <input type="text" v-model="text" placeholder="在此输入文字"
        class="w-48 rounded-none input focus:outline-none focus:ring-1 input-sm" />

    <Button tip="删除链接，保留文字" @click="editor.commands.unsetLink()" contenteditable="false" shape="rectangle">
        <NoLink></NoLink>
    </Button>
</template>