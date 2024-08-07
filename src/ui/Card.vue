<template>
  <div class="flex flex-col justify-center items-center w-56 p-0 bg-white rounded-lg shadow-2xl">
    <div class="font-bold text-lg m-0 mt-4">{{ props.title }}</div>
    <p class="text-center text-xs">{{ props.subTitle }}</p>

    <div class="shadow-3xl bg-blue-200/50 w-full mt-4 text-center py-4 rounded-bl-lg rounded-br-lg">
      <div class="stat" v-if="props.line1 || props.line2">
        <div class="stat-title text-center">{{ props.line1 }}</div>
        <div class="stat-value text-center">{{ props.line2 }}</div>
      </div>

      <span class="loading loading-ring loading-lg" v-if="props.showLoading"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Card Title',
    required: true
  },
  subTitle: {
    type: String,
    default: '',
    required: false
  },
  showLoading: {
    type: Boolean,
    default: false
  },
  line1: {
    type: String,
    default: ''
  },
  line2: {
    type: String,
    default: ''
  }
})
</script>
