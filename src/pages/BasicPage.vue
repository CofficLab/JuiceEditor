<script setup lang="ts">
import { useAppStore } from '../store/AppStore'
import { useFeatureStore } from '../store/FeatureStore'
import Loading from '../ui/Loading.vue'
import CoreEditor from '../core/CoreEditor.vue'
import TreeNode from '../model/TreeNode'
import Config from '../config/config'
import Children from '../core/Children.vue'
import { onMounted, watch } from 'vue'
import { useDocStore } from '../store/DocStore'
import PluginProvider from '../provider/PluginProvider'
import ListenerProvider from '../provider/ListenerProvider'
import ApiProvider from '../provider/ApiProvider'
import { useNodeStore } from '../store/NodeStore'
import { useDocsStore } from '../store/DocsStore'
import UUIDHelper from '../helper/UUIDHelper'
import PageMode from '../model/PageMode'
import { useModeStore } from '../store/ModeStore'

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
const nodeStore = useNodeStore()
const docsStore = useDocsStore()
const modeStore = useModeStore()
const children: TreeNode[] = []
const pluginProvider = new PluginProvider(Config.plugins)
const listenerProvider = new ListenerProvider(Config.listeners)
const apiProvider = new ApiProvider({
    featureProvider: feature,
    editorProvider: docStore,
    nodeProvider: nodeStore,
    docsProvider: docsStore,
    modeProvider: modeStore
})

docStore.drawLink = props.drawio
feature.editable = !props.readonly

onMounted(() => {
    listenerProvider.boot(PageMode.BASIC)
    apiProvider.boot()

    app.setReady()
})


watch(() => app.ready, () => pluginProvider.onReadyChange())
watch(() => docStore.getDoc(), () => pluginProvider.onDocUpdated(docStore.getDoc()), { deep: true })

</script>

<template>
    <main class="main">
        <slot></slot>

        <Loading v-if="app.loading"></Loading>

        <CoreEditor v-if="feature.editorVisible" :content="docStore.getHTML()" :editable="feature.editable"
            :tableEnable="feature.tableEnabled" :drawEnable="feature.drawEnabled" :drawLink="docStore.drawLink"
            :bubbleMenusEnable="feature.bubbleMenuVisible" :floatingMenusEnable="feature.floatingMenuVisible"
            :onUpdate="docStore.updateDoc" :onMessage="onMessage" :uuid="docStore.getUUID() ?? UUIDHelper.generate()" />

        <Children v-if="children.length > 0" :children="children"></Children>
    </main>
</template>
