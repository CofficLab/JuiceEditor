<script setup lang="ts">
import { useAppStore } from '../store/AppStore'
import { useFeatureStore } from '../store/FeatureStore'
import Loading from '../ui/Loading.vue'
import CoreEditor from '../core/CoreEditor.vue'
import TreeNode from '../model/TreeNode'
import Children from '../core/Children.vue'
import { onMounted } from 'vue'
import { useDocStore } from '../store/EditorStore'
import EditorData from '../model/EditorData'
const props = defineProps({
    drawio: {
        type: String,
        required: true
    },
    readonly: {
        type: Boolean,
        default: false
    },
    onMessage: {
        type: Function,
        required: true
    }
})

const feature = useFeatureStore()
const app = useAppStore()
const docStore = useDocStore()
const children: TreeNode[] = []

feature.editable = !props.readonly

onMounted(() => {
    docStore.setDoc(EditorData.default(), "SlotPage onMounted")

    app.setReady("SlotPage onMounted")
})

</script>

<template>
    <main class="main">
        <slot></slot>

        <Loading v-if="app.loading"></Loading>

        <CoreEditor v-if="feature.editorVisible" :content="docStore.getHTML()" :editable="feature.editable"
            :tableEnable="feature.tableEnabled" :drawEnable="feature.drawEnabled"
            :bubbleMenusEnable="feature.bubbleMenuVisible" :floatingMenusEnable="feature.floatingMenuVisible"
            :onUpdate="docStore.updateDoc" :onMessage="onMessage" />

        <Children v-if="children.length > 0" :children="children"></Children>
    </main>
</template>
