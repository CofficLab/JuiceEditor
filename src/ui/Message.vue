<template>
  <label for="message" id="messageTrigger" class="hidden btn"></label>

  <input type="checkbox" id="message" class="modal-toggle" />
  <div class="prose modal dark:prose-invert" role="dialog">
    <div class="flex flex-col items-center justify-center w-56 p-0 bg-blue-300 modal-box">
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

<script lang="ts" setup>
import { defineProps, ref, watch, onMounted, onUnmounted } from 'vue'
import Helper from '../helper/Helper'

const props = defineProps({
  message: {
    type: String,
    required: false
  },
  tips: {
    type: String,
    required: false
  },
  uuid: {
    type: String,
    required: true
  }
})

const displayMessage = ref('')
let lastUuid = ''

watch(
  () => props.uuid,
  (newVal) => {
    displayMessage.value = props.tips ?? props.message
      toggleModal()
      setTimeout(() => {
        toggleModal()
        displayMessage.value = ''
      }, 3000)
  }
)

onMounted(() => {
  if (props.tips && props.uuid !== lastUuid) {
    displayMessage.value = props.tips
    toggleModal()
    setTimeout(() => {
      toggleModal()
      displayMessage.value = ''
    }, 3000)
    lastUuid = props.uuid
  } else if (props.message && props.uuid !== lastUuid) {
    displayMessage.value = props.message
    toggleModal()
    lastUuid = props.uuid
  }
})

onUnmounted(() => {
  showModal.value = false
  displayMessage.value = ''
})

function toggleModal() {
  const trigger = Helper.findElement('messageTrigger')
  console.log('trigger', trigger)
  trigger.click()
}
</script>