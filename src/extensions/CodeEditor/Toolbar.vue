<template>
    <div class="join join-vertical">
        <ul class="menu menu-sm bg-base-200 p-0">
            <li><a class="no-underline" @click="onNewTab">新标签</a></li>
            <li><a class="no-underline" @click="setNotRunnable">关运行</a></li>
            <li><a class="no-underline" @click="setRunnable">开运行</a></li>
            <li><a class="copy no-underline" v-bind:data-clipboard-text="content">复制代码</a></li>
            <li><a class="no-underline" @click="onDelete">删除</a></li>
            <li><a class="no-underline" @click="onNewLine">插入空行</a></li>
            <li>
                <details>
                    <summary>{{ language.getTitle() }}</summary>
                    <ul>
                        <li v-for="(item, index) in languages" :key="index">
                            <a @click="setLanguage(item)" class="no-underline">{{ item.getTitle() }}</a>
                        </li>
                    </ul>
                </details>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import ClipboardJS from 'clipboard'
import { SmartLanguage, languages } from './Entities/SmartLanguage'
import Helper from '../Helper'

var clipboard = new ClipboardJS('.copy')
clipboard
    .on('success', function () {
        console.log('🍋 💼 CodeEditor: 已将源码复制到剪贴板')
    })
    .on('error', function (error) {
        console.log('复制失败')
        console.log(error)
    })

const props = defineProps({
    language: {
        type: SmartLanguage,
        required: true,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    onNewTab: {
        type: Function,
        default: () => { }
    },
    onSetRunnable: {
        type: Function,
        default: () => { }
    },
    onSetNotRunnable: {
        type: Function,
        default: () => { }
    },
    onDelete: {
        type: Function,
        default: () => { }
    },
    onSetLanguage: {
        type: Function,
        default: () => { }
    },
    onNewLine: {
        type: Function,
        default: () => { }
    }
})

function onDelete() {
    props.onDelete()
}

function onNewTab() {
    props.onNewTab()
}

function onNewLine() {
    props.onNewLine()
}

function setLanguage(lan: SmartLanguage) {
    props.onSetLanguage(lan)
}

function setRunnable() {
    props.onSetRunnable()
}

function setNotRunnable() {
    props.onSetNotRunnable()
}
</script>
