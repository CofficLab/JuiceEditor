<script setup lang="ts">
import { useAppStore } from '../store/AppStore'
import { useFeatureStore } from '../store/FeatureStore'
import CoreEditor from '../core/CoreEditor.vue'
import { onMounted } from 'vue'
import { useDocStore } from '../store/DocStore'
import UUIDHelper from '../helper/UUIDHelper'

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

docStore.drawLink = props.drawio
feature.editable = !props.readonly

onMounted(() => {
    app.setReady("BasicPage onMounted")
})

</script>

<template>
    <main class="main">
        <CoreEditor v-if="feature.editorVisible" :content="docStore.getHTML()" :editable="feature.editable"
            :tableEnable="feature.tableEnabled" :drawEnable="feature.drawEnabled" :drawLink="docStore.drawLink"
            :bubbleMenusEnable="feature.bubbleMenuVisible" :floatingMenusEnable="feature.floatingMenuVisible"
            :onUpdate="docStore.updateDoc" :onMessage="onMessage" :uuid="docStore.getUUID() ?? UUIDHelper.generate()" />
    </main>
</template>
