<script lang="ts" setup>
import TreeNode from '../model/TreeNode';

defineProps({
    children: {
        type: Array as () => TreeNode[],
        required: true
    }
})
</script>

<template>
    <div class="children-container">
        <NodeCardList :nodes="children"></NodeCardList>
    </div>
</template>
