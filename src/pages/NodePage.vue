<script lang="ts" setup>
import BasicPage from './BasicPage.vue';
import { useDocsStore } from '../store/DocsStore';
import { useNodeStore } from '../store/NodeStore';
import { computed, ref } from 'vue';
import { useDocStore } from '../store/DocStore';
import EditorDoc from '../model/EditorDoc';
import { watch } from 'vue';
import PluginProvider from '../provider/PluginProvider'
import Config from '../config/config'

const props = defineProps({
    drawio: {
        type: String,
        required: true
    },
    readonly: {
        type: Boolean,
        default: false
    }
});

const docStore = useDocStore();
const nodeStore = useNodeStore();
const docsStore = useDocsStore();
const docs = computed(() => docsStore.getDocs());
const currentDoc = computed(() => docStore.getDoc());
const selected = ref(currentDoc.value.uuid);
const pluginProvider = new PluginProvider(Config.plugins)

watch(() => docStore.getDoc(), (newDoc) => {
    docsStore.upsertDoc(newDoc);
    selected.value = newDoc.uuid
}, { deep: true })

watch(selected, (newSelected) => {
    const doc = docsStore.getDoc(newSelected);
    if (doc) {
        docStore.setDoc(doc);
    }
})

const newDoc = () => {
    const doc = EditorDoc.makeDefaultDoc();
    docStore.setDoc(doc);
    selected.value = doc.uuid
}

watch(() => docsStore.docs, () => {
    pluginProvider.onDocsUpdated(docsStore.docs)
}, { deep: true })

watch(() => docStore.getDoc(), () => pluginProvider.onDocUpdatedWithNode(docStore.getDoc(), nodeStore.getNode()), { deep: true })

</script>

<template>
    <div style="position: relative;" class="mt-0">
        <BasicPage :drawio="drawio" :readonly="readonly" />
        <div style="position: absolute; top: 0; right: 0;" class="mt-12 mr-24 z-50">
            <select v-model="selected" v-if="docs.length > 0">
                <option v-for="doc in docs" :key="doc.uuid" :value="doc.uuid" :selected="doc.uuid == currentDoc.uuid">{{
                    doc.title }}</option>
            </select>
            <button @click="newDoc()">新建</button>
        </div>
    </div>
</template>