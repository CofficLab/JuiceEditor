<template>
  <label for="message" id="messageTrigger" class="hidden btn"></label>

  <input type="checkbox" id="message" class="modal-toggle" />
  <div class="prose modal dark:prose-invert" role="dialog">
    <div class="flex flex-col items-center justify-center w-56 p-0 bg-blue-300 modal-box">
      <div class="m-0 mt-4 text-lg font-bold">提示</div>
      <div class="w-full mt-4 bg-blue-100 rounded-none stats shadow-3xl">
        <div class="stat">
          <div class="text-center stat-title">{{ props.message }}</div>
        </div>
      </div>
    </div>
    <label class="modal-backdrop" for="message">Close</label>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, watch, onMounted, onUnmounted } from 'vue'
import Helper from '../helper/Helper'

const props = defineProps({
  message: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true,
    validator: (value: string) => ['message', 'tips'].includes(value)
  },
  uuid: {
    type: String,
    required: true
  }
})

watch(
  () => props.uuid,
  (newVal) => {
    toggleModal()
    setTimeout(() => {
      toggleModal()
    }, 3000)
  }
)

function toggleModal() {
  const trigger = Helper.findElement('messageTrigger')

  if (!trigger) return
  trigger.click()
}
</script>
