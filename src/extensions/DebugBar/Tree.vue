<template>
    <div>
        <div v-if="isRoot" class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-gray-900">节点结构</h3>
            <button class="text-gray-500 hover:text-gray-700" @click="$emit('close')">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div class="pl-4">
            <div class="my-1">
                <div class="flex items-center gap-2">
                    <span class="text-blue-600">{{ node.type }}</span>
                    <span class="text-gray-500 text-sm">({{ node.getUUID() }})</span>
                    <span v-if="node.title" class="text-emerald-600">"{{ node.title }}"</span>
                </div>

                <div v-if="node.children?.length" class="border-l border-red-500 ml-2">
                    <Tree v-for="child in node.children" :key="child.getUUID()" :node="child" />
                </div>
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
        node: {
            type: Object as PropType<EditorNode>,
            required: true
        },
        isRoot: {
            type: Boolean,
            default: false
        }
    }
})
</script>
