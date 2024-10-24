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
      <div class="fixed inset-0 flex items-center justify-center z-50 max-w-3xl mx-auto prose dark:prose-invert">
        <div class="card glass max-w-3xl shadow-2xl">
          <figure class="m-0 p-0">
            <img :src="ErrorIcon" />
          </figure>
          <div class="card-body m-0 pt-0">
            <h2 class="card-title my-0 py-0">错误</h2>
            <p class="my-0 py-0">{{ displayMessage }}</p>

            <div v-if="keyValues.length > 0" class="mt-4 bg-slate-300/60 dark:bg-slate-600/60 p-2 rounded-lg">
              <table class="w-full text-sm border-collapse m-0 p-0">
                <tr v-for="([key, value], index) in keyValues" :key="key"
                  :class="{ 'border-b border-gray-400': index !== keyValues.length - 1 }">
                  <td class="font-medium text-primary py-2">{{ key }}:</td>
                  <td class="text-right py-2">{{ value }}</td>
                </tr>
              </table>
            </div>

            <div class="card-actions justify-end">
              <button class="btn btn-primary btn-sm" @click="closeMessage">关闭</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </template>
</template>
