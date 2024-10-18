<script lang="ts" setup>
import { Editor as EditorVue } from '@tiptap/vue-3'
import { ref } from 'vue';

const props = defineProps({
    editor: {
        type: EditorVue,
        required: true
    }
})

const showCopyMessage = ref(false);

function copyToClipboard() {
    const content = props.editor.getHTML()
    navigator.clipboard.writeText(content)
        .then(() => {
            showCopyMessage.value = true;
            setTimeout(() => {
                showCopyMessage.value = false;
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
}
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
        'lg:max-w-3xl': true,
        'lg:px-0': true,
        'xl:max-w-3xl': true,
        'xl:px-0': true,
        '2xl:max-w-4xl': true,
        '2xl:px-0': true,
        'dark:bg-zinc-900/30': true,
        'shadow-inner': true,
        'rounded px-0 container prose-sm prose dark:prose-invert mb-48': true
    }">
        <div class="relative flex items-center mb-4">
            <button @click="copyToClipboard" class="px-4 py-2 bg-blue-500 text-white rounded">
                Copy Content
            </button>
            <span v-if="showCopyMessage" class="ml-4 text-green-500 text-sm">
                Content copied!
            </span>
        </div>
        <pre class="h-full whitespace-pre-wrap break-words">{{ props.editor.getHTML() }}</pre>
    </div>
</template>
