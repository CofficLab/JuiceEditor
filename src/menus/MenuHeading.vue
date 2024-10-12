<script lang="ts" setup>
import { defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import Heading from '../buttons/ButtonHeading.vue'

defineProps({
    editor: {
        type: Editor,
        required: true
    },
    shape: {
        type: String,
        default: 'rectangle'
    }
})
</script>

<template>
    <Heading :editor="editor" :level="2" :shape="shape"></Heading>
    <Heading :editor="editor" :level="3" :shape="shape"></Heading>
    <Heading :editor="editor" :level="4" :shape="shape"></Heading>
    <Heading :editor="editor" :level="5" :shape="shape"></Heading>
    <Heading :editor="editor" :level="6" :shape="shape"></Heading>
</template>