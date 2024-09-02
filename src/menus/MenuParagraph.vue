<script lang="ts" setup>
import { defineProps } from 'vue'
import { Editor } from '@tiptap/core'

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
    <Bold :editor="editor"></Bold>
    <Italic :editor="editor"></Italic>
    <StrikeVue :editor="editor"></StrikeVue>
    <BulletList :editor="editor"></BulletList>
    <Code :editor="editor"></Code>
    <Link :editor="editor" />
    <Kbd :editor="editor"></Kbd>
</template>