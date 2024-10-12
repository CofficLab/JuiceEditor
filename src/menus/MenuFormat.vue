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
    },
    shape: {
        type: String,
        default: 'rectangle'
    }
})
</script>

<template>
    <Paragraph :editor="editor" :shape="shape"></Paragraph>
    <Bold :editor="editor" :shape="shape"></Bold>
    <Italic :editor="editor" :shape="shape"></Italic>
    <StrikeVue :editor="editor" :shape="shape"></StrikeVue>
    <BulletList :editor="editor" :shape="shape"></BulletList>
    <Code :editor="editor" :shape="shape"></Code>
    <Link :editor="editor" :shape="shape">
    </Link>
    <Kbd :editor="editor" :shape="shape"></Kbd>
</template>