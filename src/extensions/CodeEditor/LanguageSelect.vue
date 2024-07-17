<template>
  <div
    class="relative w-20"
    contenteditable="false"
    @mouseover="showLanguageSelect"
    @mouseleave="hideLanguageSelect"
  >
    <div
      tabindex="1"
      class="w-full p-1 text-xs cursor-pointer text-end text-info/40 hover:bg-green-800/30"
    >
      {{ language.getTitle() }}
    </div>
    <div
      v-show="shouldShowLanguageSelect"
      class="absolute top-0 w-full p-0 shadow -right-20 menu menu-xs bg-base-100/95"
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
