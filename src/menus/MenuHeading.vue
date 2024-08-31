<script lang="ts" setup>
import { defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import { HEADING, IMAGE } from '../config/node-names';
import Heading from '../operators/Heading.vue'

defineProps({
    editor: {
        type: Editor,
        required: true
    }
})
</script>

<template>
    <Heading :editor="editor" :level="2" v-if="editor.isActive(HEADING)" />
    <Heading :editor="editor" :level="3" v-if="editor.isActive(HEADING)" />
    <Heading :editor="editor" :level="4" v-if="editor.isActive(HEADING)" />
    <Heading :editor="editor" :level="5" v-if="editor.isActive(HEADING)" />
    <Heading :editor="editor" :level="6" v-if="editor.isActive(HEADING)" />
</template>