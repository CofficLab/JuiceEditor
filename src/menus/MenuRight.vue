<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { TiptapEditor } from '../model/TiptapGroup'
import { getFirstActiveNodePosition } from '../extensions/SmartActive'
import ButtonGroup from '../ui/ButtonGroup.vue'
import MenuTable from './MenuTable.vue'
import Table from '@tiptap/extension-table'
import Heading from '@tiptap/extension-heading'

const props = defineProps({
    editor: {
        type: TiptapEditor,
        required: true
    },
    iconSize: {
        type: String,
        default: '24px'
    },
    shape: {
        type: String,
        default: 'rectangle'
    },
    backgroundClass: {
        type: String,
        required: true,
        default: 'bg-yellow-100/95 dark:bg-yellow-500/95'
    }
})

const emoji = '🐶 RightMenu'
const editor = computed(() => props.editor)
const visible = ref(false)
const marginLeft = ref(0)
const scrollTop = ref(0)
const shouldShowTableMenu = computed(() => props.editor.isActive(Table.name))

watch(
    editor,
    (val) => {
        if (val) {
            editor.value.on('selectionUpdate', () => {
                let verbose = false

                if (verbose) {
                    console.log(emoji, 'selectionUpdate')
                }

                updateMenuPosition()
            })
            editor.value.on('focus', () => {
                let verbose = false

                if (verbose) {
                    console.log(emoji, 'focus')
                }

                updateMenuPosition()
            })
        } else {
            visible.value = false
        }
    },
    { immediate: true }
)

function updateMenuPosition() {
    let verbose = false
    let editorDom = props.editor.view.dom

    if (!editorDom) {
        throw new Error('editorDom is null')
    }

    // 如果是只读模式，不显示
    if (props.editor.isEditable == false) {

        visible.value = false
        return
    }

    // 如果是Heading，且Level=1，不显示
    if (props.editor.isActive(Heading.name) && props.editor.getAttributes(Heading.name).level === 1) {
        visible.value = false
        return
    }

    let { offsetLeft } = editorDom as HTMLElement

    marginLeft.value = offsetLeft + editorDom.clientWidth + 12

    const { offsetTop } = getFirstActiveNodePosition(editor.value)

    if (verbose) {
        console.log(emoji, "offsetTop", offsetTop)
    }

    if (offsetTop === null) {
        return
    }

    visible.value = true
    scrollTop.value = offsetTop - 24
}
</script>

<template>
    <div v-if="visible && shouldShowTableMenu" :style="`transform: translate(${marginLeft}px, ${scrollTop}px);`"
        class="w-22 absolute">
        <ButtonGroup direction="vertical" :backgroundClass="backgroundClass">
            <MenuTable :editor="editor"></MenuTable>
        </ButtonGroup>
    </div>
</template>
