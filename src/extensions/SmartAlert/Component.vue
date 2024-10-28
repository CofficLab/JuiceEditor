<script lang="ts" setup>
import ErrorIcon from './Error.svg';
import { TiptapEditor } from '../../model/TiptapGroup';

const props = defineProps({
    editor: {
        type: TiptapEditor,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    debugInfo: {
        type: Object,
        required: false,
        default: () => { }
    }
})

function closeMessage() {
    props.editor.commands.closeAlert()
}
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center z-50 max-w-3xl mx-auto prose dark:prose-invert">
        <div class="card glass max-w-3xl shadow-2xl min-w-96">
            <figure class="m-0 p-0">
                <img :src="ErrorIcon" />
            </figure>
            <div class="card-body m-0 pt-0">
                <h2 class="card-title my-0 py-0">错误</h2>
                <p class="my-0 py-0">{{ message }}</p>

                <div v-if="Object.keys(debugInfo).length > 0"
                    class="mt-4 bg-slate-300/60 dark:bg-slate-600/60 p-2 rounded-lg">
                    <table class="w-full text-sm border-collapse m-0 p-0">
                        <tr v-for="([key, value], index) in Object.entries(debugInfo)" :key="key"
                            :class="{ 'border-b border-gray-400': index !== Object.keys(debugInfo).length - 1 }">
                            <td class="font-medium text-primary py-2">{{ key }}:</td>
                            <td class="text-right py-2">{{ value }}</td>
                        </tr>
                    </table>
                </div>

                <div class="card-actions justify-end">
                    <button class="btn btn-primary btn-sm" @click="closeMessage">关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>
