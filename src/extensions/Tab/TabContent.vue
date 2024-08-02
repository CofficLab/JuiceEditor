<template>
  <NodeViewWrapper
    contenteditable="false"
    ref="content"
    class="border border-red-900 outline-none"
    v-show="this.current == this.node.attrs.index"
  >
    <NodeViewContent
      contenteditable="true"
      data-type="tab-content-content"
      class="overflow-hidden border-yellow-900 bg-green-300/40"
    ></NodeViewContent>
  </NodeViewWrapper>
</template>

<script>
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent
  },
  props: nodeViewProps,
  data() {
    return {
      current: 0
    }
  },
  methods: {
    setCurrent: function () {
      this.$nextTick(function () {
        this.current = this.$refs.content.$el.parentElement.getAttribute('data-current')
      })
    }
  },
  mounted: function () {
    this.setCurrent()
    this.editor.on('update', this.setCurrent)
  }
}
</script>
