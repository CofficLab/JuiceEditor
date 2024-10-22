<script lang="ts" setup>
import { Editor } from '@tiptap/core'
import { computed } from 'vue'
import Button from '../ui/Button.vue'
import { TASKLIST } from '../config/nodes';
import { RiListCheck3 } from '@remixicon/vue';

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  },
  size: {
    type: String,
    default: 'sm'
  },
  iconOnly: {
    type: Boolean,
    default: true
  }
})

const focusedNode = computed(() => props.editor.chain().focus())
</script>
<template>
  <Button @click="focusedNode.toggleTaskList().run()" tip="待办事项" :size="size"
    :class="{ 'is-active': editor.isActive(TASKLIST) }">
    <RiListCheck3 v-if="iconOnly" size="36px"></RiListCheck3>
  </Button>

  <!-- <button @click="focusedNode.splitListItem('taskItem').run()"
      :disabled="!editor.can().splitListItem('taskItem')">
      拆分
    </button> -->
  <!-- <button
      @click="focusedNode.sinkListItem('taskItem').run()"
      :disabled="!editor.can().sinkListItem('taskItem')"
    >
      <img src="../assets/increase.indent.svg" />
    </button> -->
  <!-- <button
      @click="focusedNode.liftListItem('taskItem').run()"
      :disabled="!editor.can().liftListItem('taskItem')"
    >
      <img src="../assets/decrease.indent.svg" />
    </button> -->
</template>