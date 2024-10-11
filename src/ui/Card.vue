<template>
	<div class="relative flex flex-col justify-center items-center w-full bg-slate-200 rounded-lg shadow-2xl p-0">
		<button @click="handleClose" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 hover:ring"
			v-if="props.onClose">
			<span class="sr-only">关闭</span>
			<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd"
					d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
					clip-rule="evenodd" />
			</svg>
		</button>

		<div class="font-bold text-lg m-0 mt-4 p-4">
			{{ props.title }}
		</div>
		<p class="text-center text-xs">{{ props.subTitle }}</p>

		<div class="shadow-3xl w-full mt-4 text-center py-4 rounded-bl-lg rounded-br-lg" :class="{
			'bg-blue-200/50': props.bodyColor === 'blue',
			'bg-green-200/50': props.bodyColor === 'green',
			'bg-red-200/50': props.bodyColor === 'red'
		}">
			<div v-if="props.line1 || props.line2" class="px-2">
				<p class="text-center break-words break-all">{{ props.line1 }}</p>
				<p class="text-center break-words break-all">{{ props.line2 }}</p>
			</div>

			<span class="loading loading-ring loading-lg" v-if="props.showLoading"></span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

const props = defineProps({
	title: {
		type: String,
		default: 'Card Title',
		required: true
	},
	subTitle: {
		type: String,
		default: '',
		required: false
	},
	showLoading: {
		type: Boolean,
		default: false
	},
	line1: {
		type: String,
		default: ''
	},
	line2: {
		type: String,
		default: ''
	},
	onClose: {
		type: Function,
		default: null
	},
	bodyColor: {
		type: String as PropType<'blue' | 'green' | 'red'>,
		default: 'blue',
		validator: (value: string) => ['blue', 'green', 'red'].includes(value)
	}
})

const handleClose = (event: MouseEvent) => {
	props.onClose(event)
}
</script>
