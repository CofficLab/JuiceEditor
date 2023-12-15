<template>
  <node-view-wrapper class="tiptap">
    <!-- 表格的操作 -->
    <template v-if="editor.isActive('table')">
      <div class="menus">
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().addColumnBefore().run()"
        >
          <img src="../../assets/table.column.plus.before.svg" alt="" class="m-0 w-5 h-5" />
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().addColumnAfter().run()"
        >
          <img src="../../assets/table.column.plus.after.svg" alt="" class="m-0 w-5 h-5" />
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().deleteColumn().run()"
        >
          <img src="../../assets/table.column.remove.svg" alt="" class="m-0 w-6 h-6" />
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().addRowBefore().run()"
        >
          <img src="../../assets/table.row.plus.before.svg" alt="" class="m-0 w-6 h-6" />
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().addRowAfter().run()"
        >
          <img src="../../assets/table.row.plus.after.svg" alt="" class="m-0 w-6 h-6" />
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().deleteRow().run()"
        >
          <img src="../../assets/table.row.remove.svg" alt="" class="m-0 w-6 h-6" />
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().deleteTable().run()"
        >
          <img src="../../assets/table.remove.svg" alt="" class="m-0 w-6 h-6" />
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().mergeCells().run()"
        >
          <img src="../../assets/table.cell.merge.svg" alt="" class="m-0 w-6 h-6" />
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().splitCell().run()"
        >
          <img src="../../assets/table.cell.split.svg" alt="" class="w-6 h-6 m-0" />
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().toggleHeaderColumn().run()"
        >
          切换表头列
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().toggleHeaderRow().run()"
        >
          切换表头行
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().toggleHeaderCell().run()"
        >
          切换表头格
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().mergeOrSplit().run()"
        >
          合并或拆分
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().setCellAttribute('colspan', 2).run()"
        >
          占两格
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().fixTables().run()"
        >
          修复
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().goToNextCell().run()"
        >
          下一格
        </button>
        <button
          v-if="editor.isActive('tableCell')"
          @click="editor.chain().focus().goToPreviousCell().run()"
        >
          上一格
        </button>
      </div>
    </template>

    <!-- 表格 -->
    <NodeViewContent as="div" />
  </node-view-wrapper>
</template>
<script setup lang="ts">
import { nodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/vue-3'
import IconDelete from './Icons/Delete.vue'
import { watch, onMounted } from 'vue'
</script>

<style lang="postcss" scoped>
.menus {
  @apply bg-info/95 text-info-content rounded-md px-2 py-1 flex flex-row flex-wrap;

  button {
    @apply btn btn-sm btn-ghost px-1;
  }
}
</style>
