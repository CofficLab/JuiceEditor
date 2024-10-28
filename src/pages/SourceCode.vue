<script lang="ts" setup>
import { Editor as EditorVue } from '@tiptap/vue-3'

const props = defineProps({
    editor: {
        type: EditorVue,
        required: true
    }
})
</script>

<template>
    <div id="source-code" :class="{
        'bg-slate-300/10': true,
        'md:bg-green-300/10': true,
        'lg:bg-blue-300/10': true,
        'xl:bg-purple-300/10': true,
        '2xl:bg-red-300/10': true,
        'px-4': true,
        'justify-center container': true,
        'md:px-0': true,
        'lg:max-w-3xl lg:px-0': true,
        'xl:max-w-3xl xl:px-0': true,
        '2xl:max-w-4xl 2xl:px-0': true,
        'dark:bg-zinc-900/30': true,
        'shadow-inner': true,
        'rounded px-0 container prose-sm prose dark:prose-invert mb-48 pt-8': true
    }">
        <pre class="h-full whitespace-pre-wrap break-words">{{ props.editor.getHTML() }}</pre>
    </div>
</template>
