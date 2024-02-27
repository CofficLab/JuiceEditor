<template>
    <li v-if="heading.children.length == 0 && heading.level != 0" class="whitespace-normal">
        <a :href="link" class="break-all">{{ heading.text }}</a>
    </li>
    <li v-else  class="whitespace-normal">
        <a :href="link" class="break-all">{{ heading.text }}</a>
        <ul>
            <HeadingVue :heading="child" v-for="child in heading.children"></HeadingVue>
        </ul>
    </li>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Heading from '../extensions/Toc/Heading';
import HeadingVue from './Heading.vue';

const props = defineProps({
    heading: {
        type: Heading,
        required: true
    },
})

const link = computed(() => {
    return window.location.origin + window.location.pathname + window.location.search + `#${props.heading.id}`
})
</script>