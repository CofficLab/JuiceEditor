<template>
  <template v-if="messageStore.error">
    <Transition name="fade">
      <div class="fixed inset-0 flex items-center justify-center z-50 px-12">
        <Card title="错误" :line1="displayMessage" :onClose="closeMessage" bodyColor="red"></Card>
      </div>
    </Transition>
  </template>
</template>

<script lang="ts" setup>
import { watch, ref, computed } from 'vue'
import { useMessageStore } from '../store/MessageStore'
import Card from '../ui/Card.vue';

const title = "🍚 Message"
const messageStore = useMessageStore()
const message = computed(() => messageStore.message)
const displayMessage = ref(message.value.text)

function closeMessage() {
  messageStore.clearError()
}

watch(
  () => messageStore.error,
  (newVal) => {
    let verbose = false

    if (verbose) {
      console.log(title, 'messageStore.uuid', newVal)
    }

    if (messageStore.error) {
      displayMessage.value = messageStore.error.message
    }
  }
)
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

.fixed {
  background-color: rgba(0, 0, 0, 0.5);
  /* 添加半透明背景 */
}
</style>
