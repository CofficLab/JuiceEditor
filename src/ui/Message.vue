<template>
  <template v-if="props.type === 'message'">
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

  <template v-else-if="props.type === 'tips' && displayMessage">
    <Transition name="fade">
      <div class="prose dark:prose-invert fixed mx-auto inset-0 flex items-center justify-center z-50">
        <div class="mt-4 bg-cyan-100/90 dark:bg-slate-800 rounded stats shadow-3xl">
          <div class="stat">
            <div class="text-center stat-title">{{ displayMessage }}</div>
          </div>
        </div>
      </div>
    </Transition>
  </template>
</template>

<script lang="ts" setup>
import { defineProps, watch, ref } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true,
    default: 'tips',
    validator: (value: string) => ['message', 'tips'].includes(value)
  },
  uuid: {
    type: String,
    required: true
  }
})

const displayMessage = ref(props.message)

watch(
  () => props.uuid,
  (newVal) => {
    displayMessage.value = props.message

    if (props.type === 'message') {
      toggleModal()
      setTimeout(() => {
        toggleModal()
      }, 3000)
    }

    if (props.type === 'tips') {
      setTimeout(() => {
        displayMessage.value = ''
      }, 3000)
    }
  }
)

function toggleModal() {
  const trigger = Helper.findElement('messageTrigger')

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
