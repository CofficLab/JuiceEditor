<template>
  <div v-show="ready" class="w-full">
    <IndexPage></IndexPage>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import IndexPage from './components/IndexPage.vue'
import { useAppStore } from './stores/AppStore'

const appStore = useAppStore()
const ready = ref(false)

onMounted(() => {
  ready.value = true

  // 将方法暴露到外部，swift 可以调用
  window.updater = {
    showEditor: appStore.showEditor,
    hideEditor: appStore.hideEditor,
    enableEdit: appStore.enableEdit,
    disableEdit: appStore.disableEdit,
    showAndEditable: appStore.showEditorAndEnableEdit,
    updateNode: appStore.updateNode
  }
})
</script>
