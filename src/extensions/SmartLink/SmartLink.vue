<template>
  <NodeViewWrapper class="inline">
    <Panel :inline="true" :deleteNode="props.deleteNode" :readOnly="!props.editor.isEditable">
      <template v-slot:content>
        <!-- 链接的内容 -->
        <label
          tabindex="0"
          contenteditable="false"
          class="m-0 link link-hover link-primary"
          @click="onClickLink"
        >
          <span v-html="props.node.attrs.text" class="text-blue-500"></span>
          <NodeViewContent class="hidden" />
          <a :href="props.node.attrs.href" ref="goto" target="_blank" class="no-underline hidden"
            >访问</a
          >
        </label>
      </template>

      <template v-slot:operators>
        <Button tip="在浏览器中打开" contenteditable="false">
          <a :href="props.node.attrs.href" target="_blank" class="no-underline">
            <Open></Open>
          </a>
        </Button>

        <Button tip="在此输入链接">
          <input
            type="text"
            v-model="props.node.attrs.href"
            placeholder="在此输入链接"
            class="input w-48 rounded-none h-full focus:outline-none input-xs text-blue-500"
          />
        </Button>

        <Button tip="在此输入文字">
          <input
            type="text"
            v-model="props.node.attrs.text"
            placeholder="在此输入文字"
            class="w-48 focus:outline-none h-full rounded-none input-xs input"
          />
        </Button>

        <Button tip="删除链接，保留文字" @click="notLink" contenteditable="false">
          <NoLink></NoLink>
        </Button>
      </template>
    </Panel>
  </NodeViewWrapper>
</template>
<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { ref } from 'vue'
import Panel from '../Panel.vue'
import Open from './Icons/Open.vue'
import NoLink from './Icons/NoLink.vue'
import Button from '../../ui/Button.vue'

const props = defineProps(nodeViewProps)
const goto = ref()

const notLink = () => {
  props.editor
    .chain()
    .setNodeSelection(props.getPos())
    .deleteSelection()
    .insertContent(props.node.attrs.text)
    .run()
}

function onClickLink() {
  if (!props.editor.isEditable) {
    goto.value.click()
  }
}
</script>
