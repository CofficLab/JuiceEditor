<script lang="ts" setup>
import { defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import Kbd from '../operators/Kbd.vue';
import Link from '../operators/Link.vue'
import Paragraph from '../operators/Paragraph.vue';
import Bold from '../operators/Bold.vue';
import Italic from '../operators/Italic.vue';
import StrikeVue from '../operators/Strike.vue';
import BulletList from '../operators/BulletList.vue';
import Code from '../operators/Code.vue'

defineProps({
    editor: {
        type: Editor,
        required: true
    }
})
</script>

<template>
    <Paragraph :editor="editor"></Paragraph>
    <Bold :editor="editor"></Bold>
    <Italic :editor="editor"></Italic>
    <StrikeVue :editor="editor"></StrikeVue>
    <BulletList :editor="editor"></BulletList>
    <Code :editor="editor"></Code>
    <Link :editor="editor" />
    <Kbd :editor="editor"></Kbd>
</template>