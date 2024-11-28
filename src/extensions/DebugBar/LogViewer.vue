<template>
    <div class="bg-black bg-opacity-50">
        <div class="bg-indigo-100/95 h-full p-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-bold text-gray-900">日志</h3>
                <div class="flex gap-2">
                    <select v-model="selectedChannel" class="select select-sm select-bordered">
                        <option value="">全部频道</option>
                        <option v-for="channel in channels" :key="channel" :value="channel">
                            {{ channel }}
                        </option>
                    </select>
                    <button class="text-gray-500 hover:text-gray-700" @click="$emit('close')">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="bg-slate-800 rounded-lg p-4 text-gray-300 font-mono text-sm h-[calc(100%-4rem)] overflow-auto">
                <div v-for="(log, index) in filteredLogs" :key="index" class="flex gap-2">
                    <span class="text-blue-400 inline-block min-w-[200px]">[{{ log.channel }}]</span>
                    <span>{{ log.message }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import SmartLog from '../../model/SmartLog'

const props = defineProps<{
    logs: SmartLog[]
}>()

defineEmits(['close'])

const selectedChannel = ref('')

const channels = computed(() => {
    return [...new Set(props.logs.map(log => log.channel))]
})

const filteredLogs = computed(() => {
    if (!selectedChannel.value) {
        return props.logs
    }
    return props.logs.filter(log => log.channel === selectedChannel.value)
})
</script>