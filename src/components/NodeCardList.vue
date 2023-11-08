<template>
    <div class="grid grid-cols-2 gap-2 md:grid-cols-3">
        <NodeCard v-for="node in nodes" :key="node.id" :node="node"></NodeCard>
    </div>
</template>

<script lang="ts" setup>
import TreeNode from '../entities/TreeNode';
import NodeCard from './NodeCard.vue';

defineProps({
    nodes: {
        type: Array<TreeNode>,
        required: true,
    }
})
</script>