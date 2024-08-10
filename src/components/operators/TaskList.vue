<template>
  <Button
    @click="focusedNode.toggleTaskList().run()"
    tip="待办事项"
    size="md"
    :class="{ 'is-active': editor.isActive('taskList') }"
  >
    <IconTask></IconTask>
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

<script lang="ts" setup>
import { Editor } from '@tiptap/vue-3'
import { computed } from 'vue'
import Button from '../../ui/Button.vue'
import IconTask from '../icons/IconTask.vue'

const props = defineProps({
  editor: {
    type: Editor,
    required: true
  }
})

const focusedNode = computed(() => props.editor.chain().focus())
</script>
