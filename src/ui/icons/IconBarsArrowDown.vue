<template>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        :class="class">
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
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

