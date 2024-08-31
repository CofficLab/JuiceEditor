<script lang="ts" setup>
import { defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import Kbd from './ButtonKbd.vue';
import Link from './ButtonLink.vue'
import Paragraph from './ButtonParagraph.vue';
import Bold from './ButtonBold.vue';
import Italic from './ButtonItalic.vue';
import StrikeVue from './ButtonStrike.vue';
import BulletList from './BulletList.vue';
import Code from './ButtonCode.vue'

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