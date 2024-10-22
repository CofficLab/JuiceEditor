<script lang="ts" setup>
import { defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import Kbd from '../buttons/ButtonKbd.vue';
import Link from '../buttons/ButtonLink.vue'
import Bold from '../buttons/ButtonBold.vue';
import Italic from '../buttons/ButtonItalic.vue';
import StrikeVue from '../buttons/ButtonStrike.vue';
import BulletList from '../buttons/ButtonBulletList.vue';
import Code from '../buttons/ButtonCode.vue'
import ButtonText from '../buttons/ButtonText.vue';
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
    <ButtonText :editor="editor" :shape="shape" :iconSize="iconSize"></ButtonText>
    <Bold :editor="editor" :shape="shape" :iconSize="iconSize"></Bold>
    <Italic :editor="editor" :shape="shape" :iconSize="iconSize"></Italic>
    <StrikeVue :editor="editor" :shape="shape" :iconSize="iconSize"></StrikeVue>
    <BulletList :editor="editor" :shape="shape" :iconSize="iconSize"></BulletList>
    <Code :editor="editor" :shape="shape" :iconSize="iconSize"></Code>
    <Link :editor="editor" :shape="shape" :iconSize="iconSize">
    </Link>
    <Kbd :editor="editor" :shape="shape" :iconSize="iconSize"></Kbd>
</template>