<script lang="ts" setup>
import { defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import Info from '../ui/icons/IconInfo.vue'
import Question from '../ui/icons/Question.vue'
import IconStop from '../ui/icons/IconStop.vue'
import Button from '../ui/Button.vue'
let props = defineProps({
    editor: {
        type: Editor,
        required: true
    }
})
</script>

<template>
    <div class="dropdown dropdown-bottom w-full">
        <Button tabindex="0" role="button" tip="样式">
            <div class="w-6 h-6 flex justify-center items-center">
                <div class="w-5 h-5 text-white bg-blue-500 rounded-full p-1"></div>
            </div>
        </Button>
        <div tabindex="0" class="dropdown-content bg-slate-100 rounded-box z-50 p-2 shadow w-48">
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                <Info
                    class="w-7 h-7 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 text-cyan-500"
                    @click="props.editor.commands.setParagraphCyan('info')"></Info>
                <Info
                    class="w-7 h-7 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 text-blue-500"
                    @click="props.editor.commands.setParagraphBlue('info')"></Info>
                <Info
                    class="w-7 h-7 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 text-yellow-500"
                    @click="props.editor.commands.setParagraphYellow('info')"></Info>
                <Info
                    class="w-7 h-7 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 text-red-500"
                    @click="props.editor.commands.setParagraphRed('info')"></Info>
                <Info
                    class="w-7 h-7 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 text-green-500"
                    @click="props.editor.commands.setParagraphGreen('info')"></Info>
                <Question
                    class="w-7 h-7 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 text-cyan-500"
                    @click="props.editor.commands.setParagraphCyan('question')"></Question>
                <Question
                    class="w-7 h-7 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 text-blue-500"
                    @click="props.editor.commands.setParagraphBlue('question')"></Question>
                <Question
                    class="w-7 h-7 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 text-yellow-500"
                    @click="props.editor.commands.setParagraphYellow('question')"></Question>
                <Question
                    class="w-7 h-7 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 text-red-500"
                    @click="props.editor.commands.setParagraphRed('question')"></Question>
                <Question
                    class="w-7 h-7 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 text-green-500"
                    @click="props.editor.commands.setParagraphGreen('question')"></Question>
                <IconStop
                    class="w-7 h-7 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 text-gray-500"
                    @click="props.editor.commands.setParagraph()"></IconStop>
            </div>
        </div>
    </div>
</template>