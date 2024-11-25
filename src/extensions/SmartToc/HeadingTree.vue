<script lang="ts" setup>
import { computed } from 'vue'
import TocHeading from './TocHeading'
import Link from '../../ui/Link.vue'
import Li from '../../ui/Li.vue'
import Ul from '../../ui/Ul.vue'

const props = defineProps({
  heading: {
    type: TocHeading,
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

<template>
  <div class="backdrop-blur-sm backdrop-filter not-prose">
    <Li>
      <Link :href="link">{{ heading.text }}</Link>

      <Ul v-if="heading.children.length > 0">
        <HeadingTree :heading="child" v-for="child in heading.children"></HeadingTree>
      </Ul>
    </Li>
  </div>
</template>
