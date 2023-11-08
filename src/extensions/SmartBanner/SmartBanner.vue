<template>
  <node-view-wrapper>
    <div class="my-4 flex flex-row gap-2 rounded-xl bg-gradient-to-r from-cyan-800/50 p-3 ring-1">
      <div class="flex items-center justify-between">
        <Info></Info>
      </div>
      <node-view-content class="border border-none px-4 dark:border-cyan-800"  />
    </div>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import Info from "./IconInfo.vue";
import { ref } from "vue"

defineProps(nodeViewProps);
const editable = ref(true)
</script>
