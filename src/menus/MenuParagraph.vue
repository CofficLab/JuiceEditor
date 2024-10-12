<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { Editor } from '@tiptap/core'
import Button from '../ui/Button.vue'
import IconInfo from '../ui/icons/IconInfo.vue';

let props = defineProps({
    editor: {
        type: Editor,
        required: true
    }
})

let colorClass = computed(() => {
    return props.editor.options.extensions.find(extension => extension.name === 'paragraph')?.options.colorClass
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
                <div v-for="color in Object.keys(colorClass)"
                    class="w-7 h-7 flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 rounded-full p-1"
                    :key="color" @click="props.editor.commands.setBackgroundColor(color)">
                    <div :class="colorClass[color]" class="w-5 h-5 rounded-full p-1"></div>
                </div>
            </div>
        </div>
    </div>
</template>