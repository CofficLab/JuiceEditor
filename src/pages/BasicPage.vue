<script setup lang="ts">
import { useAppStore } from '../store/AppStore'
import { useFeatureStore } from '../store/FeatureStore'
import Loading from '../ui/Loading.vue'
import Message from '../ui/Message.vue'
import CoreEditor from '../core/CoreEditor.vue'
import TreeNode from '../model/TreeNode'
import Config from '../config/config'
import Children from '../core/Children.vue'
import { useMessageStore } from '../store/MessageStore'
import { onMounted, watch } from 'vue'
import { useDocStore } from '../store/DocStore'
import PluginProvider from '../provider/PluginProvider'
import ListenerProvider from '../provider/ListenerProvider'
import ApiProvider from '../provider/ApiProvider'
import { useNodeStore } from '../store/NodeStore'

const props = defineProps({
    drawio: {
        type: String,
        required: true
    },
    readonly: {
        type: Boolean,
        default: false
    }
})

const feature = useFeatureStore()
const app = useAppStore()
const editorStore = useDocStore()
const nodeStore = useNodeStore()
const messageStore = useMessageStore()
const children: TreeNode[] = []
const pluginProvider = new PluginProvider(Config.plugins)
const listenerProvider = new ListenerProvider(Config.listeners)
const apiProvider = new ApiProvider(app, feature, editorStore, nodeStore)

editorStore.drawLink = props.drawio
feature.editable = !props.readonly

onMounted(() => {
    listenerProvider.boot()
    apiProvider.boot()

    app.setReady()
})

watch(() => app.message.uuid, () => messageStore.setMessage(app.message.text))
watch(() => app.ready, () => pluginProvider.onReadyChange())
watch(() => messageStore.message, () => pluginProvider.onMessage(messageStore.message))
watch(() => editorStore.getDoc(), () => pluginProvider.onDocUpdated(editorStore.getDoc()))

</script>

<template>
    <main class="main">
        <slot></slot>

        <Loading v-if="app.loading"></Loading>

        <CoreEditor v-if="feature.editorVisible" :content="editorStore.getContent()" :editable="feature.editable"
            :tableEnable="feature.tableEnabled" :drawEnable="feature.drawEnabled" :drawLink="editorStore.drawLink"
            :bubbleMenusEnable="feature.bubbleMenuVisible" :floatingMenusEnable="feature.floatingMenuVisible"
            :onUpdate="editorStore.updateDoc" :onMessage="messageStore.setMessage" :uuid="editorStore.getUUID()" />

        <Children v-if="children.length > 0" :children="children"></Children>

        <Message :message="messageStore.message" type="tips" :uuid="messageStore.uuid"></Message>
    </main>
</template>
