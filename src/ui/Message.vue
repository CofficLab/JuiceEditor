<template>
    <!-- The button to open modal -->
    <label for="message" id="messageTrigger" class="btn hidden">open modal</label>

    <input type="checkbox" id="message" class="modal-toggle" />
    <div class="modal" role="dialog">
        <div class="modal-box flex flex-col justify-center items-center w-56 p-0">
            <div class="font-bold text-lg m-0 mt-4">提示</div>
            <!-- <p class="text-center text-xs">画图要求的最小宽度：1000</p> -->
            <div class="stats shadow-3xl bg-blue-100/50 w-full mt-4 rounded-none">
                <div class="stat">
                    <div class="stat-title text-center">{{ message }}</div>
                    <!-- <div class="stat-value text-center">{{ message }}</div> -->
                </div>
            </div>
        </div>
        <label class="modal-backdrop" for="message">Close</label>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps({
  message: {
    type: String,
    required: true
    },
})
</script>