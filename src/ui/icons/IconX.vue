<template>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        :class="class">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
    class: {
        type: String,
        default: "h-6 w-6",
    },
});
</script>

