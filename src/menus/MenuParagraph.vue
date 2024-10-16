<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { Editor } from '@tiptap/core'
import Button from '../ui/Button.vue'
import IconInfo from '../ui/icons/IconInfo.vue';
import ButtonTranslate from '../buttons/ButtonTranslate.vue';
import IconLanguage from '../ui/icons/IconLanguage.vue';

let props = defineProps({
    editor: {
        type: Editor,
        required: true
    }
})

let colorClass = computed(() => {
    return props.editor.options.extensions.find(extension => extension.name === 'paragraph')?.options.colorClass
})

let languages = computed(() => {
    return props.editor.options.extensions.find(extension => extension.name === 'paragraph')?.options.languages
})
</script>

<template>
    <div class="dropdown dropdown-bottom h-8 w-8">
        <Button tabindex="0" role="button" tip="样式" size="md">
            <IconInfo color="primary"></IconInfo>
        </Button>
        <div tabindex="0" class="dropdown-content bg-slate-100 dark:bg-zinc-900 rounded-box z-50 p-2 shadow w-48">
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                <div v-for="color in Object.keys(colorClass)"
                    class="w-7 h-7 flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 rounded-full p-1"
                    :key="color" @click="props.editor.commands.setBackgroundColor(color)">
                    <div :class="colorClass[color]" class="w-5 h-5 rounded-full p-1"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="dropdown dropdown-bottom h-8 w-8">
        <Button tabindex="0" role="button" tip="翻译" size="md">
            <IconLanguage color="primary"></IconLanguage>
        </Button>
        <div tabindex="0" class="dropdown-content bg-slate-100 dark:bg-zinc-900 rounded-box z-50 p-2 shadow w-48">
            <div class="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-2">
                <div v-for="language in languages" @click="props.editor.commands.translate(language)">
                    <Button size="xl" shape="square">{{ language }}</Button>
                </div>
            </div>
        </div>
    </div>
</template>
