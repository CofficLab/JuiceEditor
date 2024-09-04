<template>
  <template v-if="message.type === 'message'">
    <label for="message" id="messageTrigger" class="hidden btn"></label>

    <input type="checkbox" id="message" class="modal-toggle" />
    <div class="prose modal dark:prose-invert" role="dialog">
      <div class="flex flex-col items-center justify-center w-56 p-0 bg-blue-300 dark:bg-slate-800 modal-box">
        <div class="m-0 mt-4 text-lg font-bold">提示</div>
        <div class="w-full mt-4 bg-blue-100 rounded-none stats shadow-3xl">
          <div class="stat">
            <div class="text-center stat-title">{{ displayMessage }}</div>
          </div>
        </div>
      </div>
      <label class="modal-backdrop" for="message">Close</label>
    </div>
  </template>

  <template v-else-if="message.type === 'tips' && displayMessage">
    <Transition name="fade">
      <div class="fixed bottom-4 right-4 z-50">
        <Card title="提示" :line1="displayMessage"></Card>
      </div>
    </Transition>
  </template>
</template>

<script lang="ts" setup>
import DomHelper from '../helper/DomHelper';
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
  () => messageStore.uuid,
  (newVal) => {
    let verbose = false

    if (verbose) {
      console.log(title, 'messageStore.uuid', newVal)
    }

    displayMessage.value = messageStore.message.text

    if (messageStore.message.type === 'message') {
      toggleModal()
      setTimeout(() => {
        toggleModal()
      }, 3000)
    }

    if (messageStore.message.type === 'tips') {
      setTimeout(() => {
        displayMessage.value = ''
      }, 3000)
    }
  }
)

watch(() => messageStore.message, () => {
  pluginProvider.onMessage(messageStore.message.text)
})

function toggleModal() {
  const trigger = DomHelper.findElement('messageTrigger')

  if (!trigger) return
  trigger.click()
}
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
