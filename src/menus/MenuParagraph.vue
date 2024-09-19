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
</script>

<template>
    <Button @click="props.editor.commands.setParagraphCyan('info')">
        <Info class="w-5 h-6 text-cyan-500"></Info>
    </Button>
    <Button @click="props.editor.commands.setParagraphBlue('info')">
        <Info class="w-5 h-6 text-blue-500"></Info>
    </Button>
    <Button @click="props.editor.commands.setParagraphYellow('info')">
        <Info class="w-5 h-6 text-yellow-500"></Info>
    </Button>
    <Button @click="props.editor.commands.setParagraphRed('info')">
        <Info class="w-5 h-6 text-red-500"></Info>
    </Button>
    <Button @click="props.editor.commands.setParagraphGreen('info')">
        <Info class="w-5 h-6 text-green-500"></Info>
    </Button>
    <Button @click="props.editor.commands.setParagraphCyan('question')">
        <Question class="w-5 h-6 text-cyan-500"></Question>
    </Button>
    <Button @click="props.editor.commands.setParagraphBlue('question')">
        <Question class="w-5 h-6 text-blue-500"></Question>
    </Button>
    <Button @click="props.editor.commands.setParagraphYellow('question')">
        <Question class="w-5 h-6 text-yellow-500"></Question>
    </Button>
    <Button @click="props.editor.commands.setParagraphRed('question')">
        <Question class="w-5 h-6 text-red-500"></Question>
    </Button>
    <Button @click="props.editor.commands.setParagraphGreen('question')">
        <Question class="w-5 h-6 text-green-500"></Question>
    </Button>
    <Button @click="props.editor.commands.setParagraph()">
        <IconStop class="w-5 h-6 text-gray-500"></IconStop>
    </Button>
</template>