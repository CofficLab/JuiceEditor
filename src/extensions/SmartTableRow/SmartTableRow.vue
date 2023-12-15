<template>
  <node-view-wrapper as="tr" class="relative" @click="addDom">
  </node-view-wrapper>
</template>
<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import { watch, onMounted } from 'vue'

const props = defineProps(nodeViewProps)

onMounted(() => {
  console.log('onMounted')


})

function addDom() {
  let btn = document.createElement('p')
  btn.className = 'btn btn-sm btn-primary btn-add-row absolute top-0 right-0'
  btn.innerText = 'Add rowsfsfsdfsdfsdfd'
  let w = document.getElementsByClassName('tableWrapper').item(0)

  if (w) {
    console.log(w.parentNode)
    w.parentNode.insertBefore(btn, w)
  }
}


</script>

<style lang="scss">
.tiptap {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  overflow: hidden;

  td,
  th {
    min-width: 1em;
    border: 2px solid #ced4da;
    padding: 3px 5px;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;

    >* {
      margin-bottom: 0;
    }
  }

  th {
    font-weight: bold;
    text-align: left;
    background-color: #f1f3f5;
  }

  .selectedCell:after {
    z-index: 2;
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(200, 200, 255, 0.4);
    pointer-events: none;
  }

  .column-resize-handle {
    position: absolute;
    right: -2px;
    top: 0;
    bottom: -2px;
    width: 4px;
    background-color: #adf;
    pointer-events: none;
  }

  p {
    margin: 0;
  }
}

.tableWrapper {
  padding: 1rem 0;
  overflow-x: auto;
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}
</style>