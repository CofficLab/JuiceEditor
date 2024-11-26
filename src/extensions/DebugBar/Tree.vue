<template>
    <div class="pl-4">
        <div v-for="node in nodes" :key="node.getUUID()" class="my-1">
            <div class="flex items-center gap-2">
                <span class="text-blue-600">{{ node.type }}</span>
                <span class="text-gray-500 text-sm">({{ node.getUUID() }})</span>
                <span v-if="node.title" class="text-emerald-600">"{{ node.title }}"</span>
            </div>

            <div v-if="node.children?.length" class="border-l border-red-500 ml-2">
                <Tree :nodes="node.children" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import EditorNode from '../../model/EditorNode'

export default defineComponent({
    name: 'Tree',
    props: {
        nodes: {
            type: Array as PropType<EditorNode[]>,
            required: true
        }
    }
})
</script>
