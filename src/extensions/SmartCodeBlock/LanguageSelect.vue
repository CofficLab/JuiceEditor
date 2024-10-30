<template>
  <div class="relative w-20" contenteditable="false" @mouseover="showSelect" @mouseleave="hideSelect">
    <Label>{{ current.getTitle() }}</Label>
    <List :items="languages" :onclick="changed" v-if="shouldShowSelect"></List>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import List from '../../ui/List.vue'
import Label from '../../ui/Label.vue'
import { SmartLanguage, languages } from './SmartLanguage'

const props = defineProps({
  current: {
    type: SmartLanguage,
    required: false,
    default: languages[0]
  },
  onChanged: {
    type: Function,
    required: true
  },
  editable: {
    type: Boolean,
    default: true
  }
})

const current = ref(props.current)
const shouldShowSelect = ref(false)

function changed(language: SmartLanguage) {
  current.value = language
  props.onChanged(language)
}

function showSelect() {
  shouldShowSelect.value = true && props.editable
}

function hideSelect() {
  setTimeout(() => {
    shouldShowSelect.value = false
  }, 300)
}
</script>
