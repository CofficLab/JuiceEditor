<template>
  <div
      class="tabs flex flex-row justify-between overflow-hidden rounded-none bg-yellow-600 p-0 border-red-800"
      contenteditable="false"
    >
      <!-- 标签列表 -->
      <div class="tab-list" ref="titlesDom">
        <div
          v-for="(item, index) in items"
          class="flex h-8 flex-row flex-nowrap items-stretch outline-none"
          :class="{ 'bg-gray-900': index == activatedIndex }"
        >
          <a
            class="code-title"
            :contenteditable="true"
            @keyup="handleUpdateTitle"
            @click="clickTab(index)"
            >{{ item.title }}</a
          >
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { Database, CodeBlock } from './Database'
import { ref, computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  database: {
    type: Database,
    required: true
  },
  onCreateTab: {
    type: Function,
    required: true
  },
  onClickTab: {
    type: Function,
    required: true
  }
})

let titlesDom = ref()
let items = computed<CodeBlock[]>(() => props.database.items)
let activatedIndex = computed(() => props.database.activatedIndex)
let activatedItem = computed(() => items.value[activatedIndex.value])

function clickTab(index: number) {
  props.onClickTab(index)
}

function handleUpdateTitle(e: { target: any } ) {
  // props.updateAttributes({
  //   database: database.value.updateTitle(e.target!.innerText).toJSON()
  // })
}
</script>

<style lang="postcss">
.tab-list {
  @apply flex w-5/6 max-w-max flex-grow flex-row gap-px overflow-x-scroll overscroll-none bg-gray-800;
}

.tab-operators {
  @apply flex w-1/6 max-w-max justify-end border-l border-lime-900/30 shadow-2xl dark:border-l-lime-900;
}
.code-title {
  @apply tab min-w-max max-w-xl flex-grow flex-nowrap whitespace-nowrap rounded-none text-gray-500 no-underline outline-none focus-visible:outline-none dark:text-gray-200 !important;
}
</style>
