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
    },
    iconSize: {
        type: String,
        default: '24px'
    }
})
</script>

<template>
    <Heading :editor="editor" :level="2" :shape="shape" :iconSize="iconSize"></Heading>
    <Heading :editor="editor" :level="3" :shape="shape" :iconSize="iconSize"></Heading>
    <Heading :editor="editor" :level="4" :shape="shape" :iconSize="iconSize"></Heading>
    <Heading :editor="editor" :level="5" :shape="shape" :iconSize="iconSize"></Heading>
    <Heading :editor="editor" :level="6" :shape="shape" :iconSize="iconSize"></Heading>
</template>