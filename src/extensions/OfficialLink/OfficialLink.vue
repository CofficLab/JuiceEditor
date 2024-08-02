<template>
  <NodeVIewWrapper>
    <div
      class="mb-6 mt-1 flex flex-row items-center justify-between rounded border-2 border-black/60 bg-yellow-400 px-4 dark:bg-yellow-600/50"
    >
      <div class="flex flex-row items-center gap-1">
        <InfoIcon></InfoIcon>
        <span>官网</span>
      </div>
      <NodeViewContent
        class="mx-4 border border-dashed border-cyan-900 p-1 px-4"
        v-bind:class="{ 'border-none': !editable }"
      />
      <a :href="link" target="_blank" class="hover:cursor-pointer"><LinkIcon></LinkIcon></a>
    </div>
  </NodeVIewWrapper>
</template>

<script>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import LinkIcon from '../icons/IconGoto.vue'
import InfoIcon from '../icons/IconInfo.vue'
import { useRoute } from 'vue-router'

export default {
  components: { NodeViewWrapper, NodeViewContent, LinkIcon, InfoIcon },

  data() {
    return {
      link: ''
    }
  },

  computed: {
    editable: () => useRoute().query.editable
  },

  methods: {
    updateLink() {
      this.link = this.node.content.content[0].text
    }
  },

  mounted() {
    this.editor.on('update', this.updateLink)
    this.updateLink()
  },

  props: nodeViewProps
}
</script>
