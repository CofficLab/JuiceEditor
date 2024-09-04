<script lang="ts" setup>
import { defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import Kbd from '../buttons/ButtonKbd.vue';
import Link from '../buttons/ButtonLink.vue'
import Paragraph from '../buttons/ButtonParagraph.vue';
import Bold from '../buttons/ButtonBold.vue';
import Italic from '../buttons/ButtonItalic.vue';
import StrikeVue from '../buttons/ButtonStrike.vue';
import BulletList from '../buttons/BulletList.vue';
import Code from '../buttons/ButtonCode.vue'

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