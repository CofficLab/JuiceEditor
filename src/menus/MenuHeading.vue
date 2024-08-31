<script lang="ts" setup>
import { defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import Heading from '../operators/Heading.vue'

defineProps({
    editor: {
        type: Editor,
        required: true
    }
})
</script>

<template>
    <Heading :editor="editor" :level="2" />
    <Heading :editor="editor" :level="3" />
    <Heading :editor="editor" :level="4" />
    <Heading :editor="editor" :level="5" />
    <Heading :editor="editor" :level="6" />
</template>