<script lang="ts" setup>
import { defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import IconCircle from '../ui/icons/IconCircle.vue'
import Button from '../ui/Button.vue'
import IconInfo from '../ui/icons/IconInfo.vue';
let props = defineProps({
    editor: {
        type: Editor,
        required: true
    }
})
</script>

<template>
    <div class="dropdown dropdown-bottom h-8 w-8">
        <Button tabindex="0" role="button" tip="样式" size="md">
            <IconInfo color="primary"></IconInfo>
        </Button>
        <div tabindex="0" class="dropdown-content bg-slate-100 rounded-box z-50 p-2 shadow w-48">
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                <div class="w-7 h-7 flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 rounded-full p-1"
                    @click="props.editor.commands.setBackgroundCyan()">
                    <div class="w-5 h-5 bg-cyan-500 rounded-full p-1"></div>
                </div>
                <div class="w-7 h-7 flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 rounded-full p-1"
                    @click="props.editor.commands.setBackgroundBlue()">
                    <div class="w-5 h-5 bg-blue-500 rounded-full p-1"></div>
                </div>
                <div class="w-7 h-7 flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 rounded-full p-1"
                    @click="props.editor.commands.setBackgroundYellow()">
                    <div class="w-5 h-5 bg-yellow-500 rounded-full p-1"></div>
                </div>
                <div class="w-7 h-7 flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 rounded-full p-1"
                    @click="props.editor.commands.setBackgroundRed()">
                    <div class="w-5 h-5 bg-red-500 rounded-full p-1"></div>
                </div>
                <div class="w-7 h-7 flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 rounded-full p-1"
                    @click="props.editor.commands.setBackgroundGreen()">
                    <div class="w-5 h-5 bg-green-500 rounded-full p-1"></div>
                </div>
                <div class="w-7 h-7 flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 rounded-full p-1"
                    @click="props.editor.commands.setParagraph()">
                    <div class="w-5 h-5 bg-slate-200 rounded-full p-1"></div>
                </div>
            </div>
        </div>
    </div>
</template>
