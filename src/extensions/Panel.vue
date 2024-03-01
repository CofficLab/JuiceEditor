<template>
    <div class="dropdown dropdown-open dropdown-bottom w-full" :id="id">
        <div tabindex="0" role="button" v-bind:class="[
            { 'outline-orange-600 outline-dashed outline-2 outline-offset-1': isSelected },
        ]">
            <slot name="content"></slot>
        </div>

        <div tabindex="0" class="p-0 dropdown-content z-[1] gap-2 flex flex-row" v-show="isSelected"
            contenteditable="false">
            <slot name="operators"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const id = 'panel' + uuidv4()
const isSelected = ref(false)

function onClick(e: Event) {
    let target = e.target as HTMLElement
    isSelected.value = target.closest('#' + id) != null
}

onMounted(() => {
    document.addEventListener('click', onClick)
})

onUnmounted(() => {
    document.removeEventListener('click', onClick)
})
</script>
