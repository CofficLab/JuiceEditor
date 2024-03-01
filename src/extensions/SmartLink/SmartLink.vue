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
        <!-- 链接的操作栏 -->
        <div class="w-full flex flex-row p-1">
          <!-- 删除链接 -->
          <div
            class="join rounded-none flex justify-end items-center tooltip"
            data-tip="删除链接和文字"
            contenteditable="false"
          >
            <button class="btn btn-sm join-item btn-ghost p-1 h-full" @click="deleteNode">
              <IconDelete class="w-5 h-6"></IconDelete>
            </button>
          </div>

          <!-- 输入链接和文字 -->
          <div class="flex flex-col gap-1 flex-grow w-72">
            <div class="join">
              <button class="btn join-item btn-sm rounded-none" contenteditable="false">
                链接
              </button>
              <input
                type="text"
                v-model="props.node.attrs.href"
                placeholder="在此输入链接"
                class="input w-full focus:outline-none join-item input-sm"
              />
              <button
                class="btn join-item btn-sm rounded-none tooltip"
                data-tip="在浏览器中打开"
                contenteditable="false"
              >
                <a :href="props.node.attrs.href" target="_blank" class="no-underline"
                  ><Open></Open
                ></a>
              </button>
            </div>
            <div class="join">
              <button class="btn join-item btn-sm rounded-none" contenteditable="false">
                文字
              </button>
              <input
                type="text"
                v-model="props.node.attrs.text"
                placeholder="在此输入文字"
                class="input w-full focus:outline-none input-sm join-item"
              />
              <button
                class="btn btn-sm join-item rounded-none tooltip"
                data-tip="删除链接，保留文字"
                @click="notLink"
                contenteditable="false"
              >
                <NoLink></NoLink>
              </button>
            </div>
          </div>
        </div>
      </template>
    </Panel>
  </node-view-wrapper>
</template>
<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import IconDelete from './Icons/Delete.vue'
import { ref, watch } from 'vue'
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
