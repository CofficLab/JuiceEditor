<template>
  <Li>
    <Link :href="link">{{ heading.text }}</Link>

    <Ul v-if="heading.children.length > 0">
      <HeadingVue :heading="child" v-for="child in heading.children"></HeadingVue>
    </Ul>
  </Li>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Heading from '../extensions/Toc/Heading'
import HeadingVue from './Heading.vue'
import Link from '../ui/Link.vue'
import Li from '../ui/Li.vue'
import Ul from '../ui/Ul.vue'

const props = defineProps({
  heading: {
    type: Heading,
    required: true
  }
})

const link = computed(() => {
  return (
    window.location.origin +
    window.location.pathname +
    window.location.search +
    `#${props.heading.id}`
  )
})
</script>
