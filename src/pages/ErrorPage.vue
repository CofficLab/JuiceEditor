<script lang="ts" setup>
import { watch, ref, computed } from 'vue'
import { useMessageStore } from '../store/MessageStore'
import ErrorIcon from '../assets/error.svg';

const title = "🍚 Message"
const messageStore = useMessageStore()
const message = computed(() => messageStore.message)
const displayMessage = ref(message.value.text)
const keyValues = ref<[string, unknown][]>([])
const show = ref(false)

function closeMessage() {
  messageStore.clearError()
  show.value = false
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
      show.value = true
    }
  }
)

watch(() => messageStore.errorEvent?.detail, (newVal: any) => {
  displayMessage.value = newVal.message
  keyValues.value = Object.entries(newVal.debug ?? {})
  show.value = true
})
</script>

<template>
  <template v-if="show">
    <Transition name="fade">
      <div class="fixed inset-0 flex items-center justify-center z-50 w-96 mx-auto">
        <div class="card glass w-96 shadow-2xl">
          <figure>
            <img :src="ErrorIcon" alt="car!" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">错误</h2>
            <p>{{ displayMessage }}</p>

            <div v-if="keyValues.length > 0" class="mt-4 bg-slate-300/60 p-3 rounded-lg">
              <h3 class="font-bold mb-2">调试信息</h3>
              <table class="w-full text-sm border-collapse">
                <tr v-for="([key, value], index) in keyValues" :key="key"
                  :class="{ 'border-b border-gray-400': index !== keyValues.length - 1 }">
                  <td class="font-medium text-primary py-2">{{ key }}:</td>
                  <td class="text-right py-2">{{ value }}</td>
                </tr>
              </table>
            </div>

            <div class="card-actions justify-end">
              <button class="btn btn-primary" @click="closeMessage">关闭</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </template>
</template>
