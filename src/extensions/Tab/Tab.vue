<template>
  <NodeViewWrapper>
    <div class="flex flex-row overflow-auto pb-4" :class="{ ring: editable }">
      <!-- 拖动的把手 -->
      <div
        class="drag-handle bg-primary-600/40 mr-1 h-10 w-4"
        v-bind:class="{ hidden: !editable }"
        contenteditable="false"
        draggable="true"
        data-drag-handle
      ></div>

      <div class="flex w-full flex-col overflow-clip shadow-sm">
        <!-- 标题按钮 -->
        <div class="tabs tabs-boxed rounded-none bg-yellow-500/50" contenteditable="false">
          <div v-for="(title, index) in titles">
            <a
              class="tab no-underline"
              contenteditable="true"
              v-bind:data-index="index"
              v-bind:class="{ 'tab-active': current == index }"
              @click="activate(index)"
              @keyup="(event) => save(event)"
              >{{ title }}</a
            >
          </div>
        </div>

        <NodeViewContent
          ref="contents"
          v-bind:data-current="current"
          class="bg-sky-400/40 p-4"
        ></NodeViewContent>
      </div>
    </div>
  </NodeViewWrapper>
</template>

<script>
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import NodeController from '../controllers/NodeController'

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent
  },
  props: nodeViewProps,
  data() {
    return {
      current: this.node.attrs.current,
      titles: this.node.attrs.titles.split(',')
    }
  },
  computed: {
    editable: () => useRoute().query.editable
  },
  methods: {
    activate: function (index) {
      this.editor.storage.tab.current = index
      this.current = index
      this.updateAttributes({
        current: this.current
      })
    },
    save(event) {
      let target = event.target
      console.log('保存title名称', target)

      let titles = this.node.attrs.titles.split(',')
      titles[this.current] = target.innerHTML
      this.updateAttributes({
        titles: titles.join(',')
      })
    }
  },
  mounted() {
    // console.log("tab加载");
    this.activate(this.current)
  }
}
</script>

<style>
.drag-handle {
  flex: 0 0 auto;
  position: relative;
  cursor: grab;
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16"><path fill-opacity="0.2" d="M4 14c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM2 6C.9 6 0 6.9 0 8s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6C.9 0 0 .9 0 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
</style>
