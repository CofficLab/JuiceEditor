<template>
  <node-view-wrapper>
    <div class="chat" :class="node.attrs.position == 'start' ? 'chat-start  flex items-end' : 'chat-end'">
      <!-- 对话框 -->
      <div class="chat-image flex flex-col items-end" contenteditable="false">
        <div class="chat-header">编译器</div>
        <div class="dropdown dropdown-hover">
          <label tabindex="0" class="flex items-end">
            <div class="avatar">
              <div class="w-10 rounded-full">
                <!-- <img src="/images/logo-Golang.png" class="dark:brightness-50" @click="switchPosition" /> -->
              </div>
            </div>
          </label>
          <ul tabindex="0" class="chat-operators dropdown-content rounded-box" v-if="editable">
            <li class="cursor-pointer list-none hover:bg-base-200" @click="switchPosition">左右切换</li>
            <li class="cursor-pointer list-none hover:bg-base-200" @click="deleteSelf">删除</li>
          </ul>
        </div>
      </div>
      <div class="chat-bubble relative" :class="node.attrs.position == 'end' ? 'chat-bubble-info' : ''">
        <node-view-content class="border border-dashed border-yellow-500/50 px-4 dark:border-cyan-800" v-bind:class="{ 'border-none': !editable }" />
      </div>
    </div>
  </node-view-wrapper>
</template>

<script setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import { computed } from "vue";

const props = defineProps(nodeViewProps);

const editable = computed(() => props.editor.options.editable);

const switchPosition = function () {
  console.log("切换左右");
  props.updateAttributes({
    position: props.node.attrs.position == "start" ? "end" : "start",
  });
};
const deleteSelf = function () {
  this.deleteNode();
};
</script>

<style lang="postcss">
.chat {
  img {
    @apply my-0 !important;
  }
  p {
    @apply my-0 !important;
  }
  /* 操作区域 */
  ul.dropdown-content.chat-operators {
    @apply my-0  w-52 bg-base-100 p-0 shadow !important;
    li {
      @apply px-4 py-2 !important;
    }
  }
  /* 用户输入的普通的ul */
  ul {
    @apply my-0 !important;
  }
}
</style>
