<script setup lang="ts">
import { useAppStore } from '../store/AppStore'
import { useFeatureStore } from '../store/FeatureStore'
import Loading from '../ui/Loading.vue'
import CoreEditor from '../core/CoreEditor.vue'
import TreeNode from '../model/TreeNode'
import Children from '../core/Children.vue'
import { onMounted, computed } from 'vue'
import { useDocStore } from '../store/DocStore'
import UUIDHelper from '../helper/UUIDHelper'
import EditorDoc from '../model/EditorDoc'
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
const uuid = computed(() => {
    const uuid = docStore.getUUID()

    if (uuid && UUIDHelper.isUUID(uuid)) {
        return uuid
    }

    const newUuid = UUIDHelper.generate()

    return newUuid
})

feature.editable = !props.readonly

onMounted(() => {
    docStore.setDoc(EditorDoc.default(), "SlotPage onMounted")

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
            :onUpdate="docStore.updateDoc" :onMessage="onMessage" :uuid="uuid" />

        <Children v-if="children.length > 0" :children="children"></Children>
    </main>
</template>
