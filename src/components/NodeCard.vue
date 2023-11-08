<template>
  <div class="card w-48 bg-info/50 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">{{ node.title }}</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TreeNode from '../entities/TreeNode';

defineProps({
    node: {
        type: TreeNode,
        required: true
    }
})
</script>
