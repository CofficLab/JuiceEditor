<template>
  <node-view-wrapper class="inline">
    <Panel :inline="true">
      <template v-slot:content>
        <!-- 链接的内容 -->
        <label
          tabindex="0"
          contenteditable="false"
          class="m-0 link link-hover link-primary"
          @click="onClickLink"
        >
          <span v-html="props.node.attrs.text"></span>
          <node-view-content class="hidden" />
          <a :href="props.node.attrs.href" ref="goto" target="_blank" class="no-underline hidden"
            >访问</a
          >
        </label>
      </template>

      <template v-slot:operators>
        <template v-if="props.editor.isEditable">
          <button
            class="btn join-item btn-sm tooltip"
            data-tip="在浏览器中打开"
            contenteditable="false"
          >
            <a :href="props.node.attrs.href" target="_blank" class="no-underline">
              <Open></Open>
            </a>
          </button>

          <button class="btn btn-sm join-item w-48 p-0 m-0 tooltip" data-tip="在此输入链接">
            <input
              type="text"
              v-model="props.node.attrs.href"
              placeholder="在此输入链接"
              class="input w-full rounded-none h-full focus:outline-none input-xs"
            />
          </button>

          <button class="btn btn-sm join-item w-32 p-0 tooltip" data-tip="在此输入文字">
            <input
              type="text"
              v-model="props.node.attrs.text"
              placeholder="在此输入文字"
              class="w-full focus:outline-none h-full rounded-none input-xs input"
            />
          </button>

          <button
            class="btn btn-sm join-item rounded-none tooltip"
            data-tip="删除链接，保留文字"
            @click="notLink"
            contenteditable="false"
          >
            <NoLink></NoLink>
          </button>

          <button class="btn btn-sm join-item tooltip" data-tip="删除" @click="deleteNode">
            <IconDelete class="w-5 h-6"></IconDelete>
          </button>
        </template>
      </template>
    </Panel>
  </node-view-wrapper>
</template>
<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import IconDelete from './Icons/Delete.vue'
import { ref } from 'vue'
import Panel from '../Panel.vue'
import Open from './Icons/Open.vue'
import NoLink from './Icons/NoLink.vue'

const props = defineProps(nodeViewProps)

const deleteNode = () => {
  props.deleteNode()
}

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
