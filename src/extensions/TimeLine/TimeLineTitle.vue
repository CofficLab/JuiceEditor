<template>
  <NodeViewWrapper>
    <div class="h-0 -translate-x-96 border-t border-cyan-700 text-xl" v-show="editable">
      <NodeViewContent
        class="w-56 border border-t-0 border-dashed px-4 dark:border-cyan-800"
        v-show="editable"
        v-bind:class="{ 'border-none': !editable }"
      />
    </div>
  </NodeViewWrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import Info from '../../ui/Icons/IconInfo.vue'

export default {
  components: {
    NodeViewWrapper,
    NodeViewContent,
    Info
  },

  mounted() {
    console.log('加载time line title node view')
  },

  computed: {
    editable: () => useRoute().query.editable
  },

  props: nodeViewProps
}
</script>
