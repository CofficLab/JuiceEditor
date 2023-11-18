<template>
  <node-view-wrapper class="inline">
    <div class="dropdown dropdown-top dropdown-hover">
      <label tabindex="0" contenteditable="true" class="m-0 link link-hover link-primary">
        <span v-html="props.node.attrs.text"></span>
        <node-view-content class="hidden" />
      </label>
      <div tabindex="0" class="dropdown-content z-50 menu p-2 w-96 flex flex-col gap-2">
        <div class="join rounded-none flex justify-end" contenteditable="false">
          <button class="btn btn-xs join-item" @click="notLink">取消链接</button>
          <button class="btn btn-xs join-item" @click="goto">访问</button>
          <button class="btn btn-xs join-item" @click="deleteNode">删除</button>
        </div>
        <input
          type="text"
          v-model="props.node.attrs.href"
          placeholder="在此输入链接"
          class="input focus:outline-none input-primary w-full bg-opacity-90"
        />
        <input
          type="text"
          v-model="props.node.attrs.text"
          placeholder="在此输入文字"
          class="input focus:outline-none input-primary w-full bg-opacity-90"
        />
      </div>
    </div>
  </node-view-wrapper>
</template>
<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { watch } from 'vue'

const props = defineProps(nodeViewProps)

const goto = () => {
  window.open(props.node.attrs.href)
}

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
