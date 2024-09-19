<script lang="ts" setup>
import { defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import Button from '../ui/Button.vue'
import Info from '../ui/icons/IconInfo.vue'
import Question from '../ui/icons/Question.vue'
import IconStop from '../ui/icons/IconStop.vue'

let props = defineProps({
    editor: {
        type: Editor,
        required: true
    }
})

function setStyleToCyan(type) {
    props.editor.commands.setParagraph({ class: 'text-cyan-500' })
}

function setStyleToBlue(type) {
    props.editor.commands.setParagraph({ class: 'text-blue-500' })
}

function setStyleToYellow(type) {
    props.editor.commands.setParagraph({ class: 'text-yellow-500' })
}

function setStyleToRed(type) {
    props.editor.commands.setParagraph({ class: 'text-red-500' })
}

function setStyleToGreen(type) {
    props.editor.commands.setParagraph({ class: 'text-green-500' })
}

function setStyleToParagraph() {
    props.editor.commands.setParagraph({ class: 'text-gray-500' })
}
</script>

<template>
    <Button @click="setStyleToCyan('info')">
        <Info class="w-5 h-6 text-cyan-500"></Info>
    </Button>
    <Button @click="setStyleToBlue('info')">
        <Info class="w-5 h-6 text-blue-500"></Info>
    </Button>
    <Button @click="setStyleToYellow('info')">
        <Info class="w-5 h-6 text-yellow-500"></Info>
    </Button>
    <Button @click="setStyleToRed('info')">
        <Info class="w-5 h-6 text-red-500"></Info>
    </Button>
    <Button @click="setStyleToGreen('info')">
        <Info class="w-5 h-6 text-green-500"></Info>
    </Button>
    <Button @click="setStyleToCyan('question')">
        <Question class="w-5 h-6 text-cyan-500"></Question>
    </Button>
    <Button @click="setStyleToBlue('question')">
        <Question class="w-5 h-6 text-blue-500"></Question>
    </Button>
    <Button @click="setStyleToYellow('question')">
        <Question class="w-5 h-6 text-yellow-500"></Question>
    </Button>
    <Button @click="setStyleToRed('question')">
        <Question class="w-5 h-6 text-red-500"></Question>
    </Button>
    <Button @click="setStyleToGreen('question')">
        <Question class="w-5 h-6 text-green-500"></Question>
    </Button>
    <Button @click="setStyleToParagraph">
        <IconStop class="w-5 h-6 text-gray-500"></IconStop>
    </Button>
</template>