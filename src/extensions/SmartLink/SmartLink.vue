<template>
  <node-view-wrapper class="inline">
    <div class="dropdown dropdown-top dropdown-hover">
      <label tabindex="0" contenteditable="true" class="m-0 link link-hover link-primary">
        <span v-html="props.node.attrs.text"></span>
        <node-view-content class="hidden" />
      </label>
      <div
        tabindex="0"
        class="dropdown-content z-50 menu p-2 w-96 flex flex-col gap-2 bg-base-100/90"
      >
        <div class="join rounded-none flex justify-between" contenteditable="false">
          <div class="flex">
            <button class="btn btn-xs join-item" @click="notLink">取消</button>
            <button class="btn btn-xs join-item">
              <a :href="props.node.attrs.href" target="_blank" class="no-underline">访问</a>
            </button>
          </div>
          <button class="btn btn-xs join-item btn-ghost p-1" @click="deleteNode">
            <IconDelete class="w-4 h-4"></IconDelete>
          </button>
        </div>
        <input
          type="text"
          v-model="props.node.attrs.href"
          placeholder="在此输入链接"
          class="input focus:outline-none input-primary w-full bg-opacity-95 input-sm"
        />
        <input
          type="text"
          v-model="props.node.attrs.text"
          placeholder="在此输入文字"
          class="input focus:outline-none w-full bg-opacity-95 input-sm input-primary p-0 m-0"
        />
      </div>
    </div>
  </node-view-wrapper>
</template>
<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import IconDelete from './Icons/Delete.vue'
import { watch } from 'vue'

const props = defineProps(nodeViewProps)

const deleteNode = () => {
  props.deleteNode()
}

const notLink = () => {
  props.editor
    .chain()
    .setNodeSelection(props.getPos())
    .deleteSelection()
    .insertContent(props.node.attrs.text)
    .run()
}

watch(
  () => props.node.attrs.href,
  () => {
    props.updateAttributes({
      href: props.node.attrs.href
    })
  }
)

watch(
  () => props.node.attrs.text,
  () => {
    props.updateAttributes({
      text: props.node.attrs.text
    })
  }
)
</script>
