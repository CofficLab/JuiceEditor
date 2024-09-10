<template>
  <template v-if="message.isTips() && displayMessage">
    <Transition name="fade">
      <div class="fixed inset-0 flex items-center justify-center z-50 translate-y-1/3 w-72 mx-auto">
        <Card title="提示" :line1="displayMessage"></Card>
      </div>
    </Transition>
  </template>

  <template v-if="message.isDebug() && displayMessage">
    <Transition name="fade">
      <div class="fixed inset-0 flex items-center justify-center z-50 translate-y-1/3 w-72 mx-auto">
        <Card title="调试" :line1="displayMessage"></Card>
      </div>
    </Transition>
  </template>
</template>

<script lang="ts" setup>
import { watch, ref, computed } from 'vue'
import { useMessageStore } from '../store/MessageStore'
import PluginProvider from '../provider/PluginProvider'
import { Config } from '../config/config'
import Card from '../ui/Card.vue';

const title = "🍚 Message"
const messageStore = useMessageStore()
const message = computed(() => messageStore.message)
const displayMessage = ref(message.value.text)
const pluginProvider = new PluginProvider(Config.plugins)

watch(
  () => messageStore.message.uuid,
  (newVal) => {
    let verbose = false

    if (verbose) {
      console.log(title, 'messageStore.uuid', newVal)
    }

    displayMessage.value = messageStore.message.text

    setTimeout(() => {
      displayMessage.value = ''
    }, 3000)
  }
)

watch(() => messageStore.message, () => {
  pluginProvider.onMessage(messageStore.message.text)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
