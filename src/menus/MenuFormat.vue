<script lang="ts" setup>
import { defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import { HEADING, IMAGE } from '../config/node-names';
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
    <Paragraph :editor="editor" v-if="editor.isActive(HEADING)"></Paragraph>
    <Bold :editor="editor" v-if="!editor.isActive(IMAGE)"></Bold>
    <Italic :editor="editor" v-if="!editor.isActive(IMAGE)"></Italic>
    <StrikeVue :editor="editor" v-if="!editor.isActive(IMAGE)"></StrikeVue>
    <BulletList :editor="editor" v-if="!editor.isActive(IMAGE)"></BulletList>
    <Code :editor="editor" v-if="!editor.isActive(IMAGE)"></Code>
    <Link :editor="editor" v-if="!editor.isActive(IMAGE)" />
    <Kbd :editor="editor" v-if="!editor.isActive(IMAGE)"></Kbd>
</template>