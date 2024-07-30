<template>
  <div class="card bg-info/50 shadow-xl">
    <div class="card-body">
      <div class="flex flex-row gap-2">
        <img
          v-if="node.children.length > 0"
          src="../assets/folder.svg"
          alt=""
          class="text-red-300 w-6 h-6"
        />
        <img v-else src="../assets/doc.svg" alt="" class="text-red-300 w-5 h-6" />
        <div class="card-title">{{ node.title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TreeNode from '../model/TreeNode'

defineProps({
  node: {
    type: TreeNode,
    required: true
  }
})
</script>
