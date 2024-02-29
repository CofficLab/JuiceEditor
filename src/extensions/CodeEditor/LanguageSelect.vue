<template>
  <div
    class="relative w-20"
    contenteditable="false"
    @mouseover="showLanguageSelect"
    @mouseleave="hideLanguageSelect"
  >
    <div
      tabindex="1"
      class="w-full p-1 text-end text-xs cursor-pointer text-info/40 hover:bg-green-800/30"
    >
      {{ language.getTitle() }}
    </div>
    <div
      v-show="shouldShowLanguageSelect"
      class="absolute top-6 right-0 menu menu-xs p-0 shadow bg-base-100/95 w-full"
    >
      <li v-for="(item, index) in languages" :key="index">
        <a @click="onLanguageChanged(item)" class="no-underline">{{ item.getTitle() }}</a>
      </li>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { SmartLanguage, languages } from './Entities/SmartLanguage'

const props = defineProps({
  language: {
    type: SmartLanguage,
    required: true
  },
  onLanguageChanged: {
    type: Function,
    default: (language: SmartLanguage) => {
      console.log('🍋 💼 MonacoBox: monaco language changed', language)
    }
  }
})

const shouldShowLanguageSelect = ref(false)

function showLanguageSelect() {
  console.log('showLan')
  shouldShowLanguageSelect.value = true
}

function hideLanguageSelect() {
  setTimeout(() => {
    shouldShowLanguageSelect.value = false
  }, 300)
}
</script>

<style scoped lang="postcss">
li {
  @apply rounded-none p-0 m-0 !important;
  a {
    @apply rounded-none !important;
  }
}
</style>
