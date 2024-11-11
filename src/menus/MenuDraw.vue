<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import Button from '../ui/Button.vue'
import { TiptapEditor } from '../model/TiptapGroup'
import ImageHelper from '../helper/ImageHelper'
import {
    RiDownloadLine, RiEditLine, RiShapeLine,
    RiIndentDecrease, RiAlignCenter, RiIndentIncrease, RiDeleteBin7Line
} from '@remixicon/vue'
import { ImageExtension, HeadingExtension } from '../model/TiptapGroup'
import { shouldShowMarginMenu } from '../extensions/SmartMenus'

let props = defineProps({
    editor: {
        type: TiptapEditor,
        required: true
    },
    shape: {
        type: String,
        default: 'rectangle'
    },
    iconSize: {
        type: String,
        default: '24px'
    },
    backgroundClass: {
        type: String,
        required: true,
        default: 'bg-indigo-100/95 dark:bg-indigo-500/95'
    }
})

const getSrc = () => props.editor.getAttributes(Image.name).src

const downloadImage = () => {
    const src = getSrc()
    window.dispatchEvent(new CustomEvent('downloadImage', {
        detail: { src, name: `image-${Date.now()}${ImageHelper.getExtension(src)}` }
    }))
}

let shapeClass = computed(() => {
    return props.editor.options.extensions.find(extension => extension.name === ImageExtension.name)?.options.shapeClass
})
</script>

<template>
    <Button tips="删除" @click="editor.commands.deleteSelectionNode()"
        v-if="!editor.isActive(HeadingExtension.name, { level: 1 })" :shape="shape">
        <RiDeleteBin7Line :size="iconSize"></RiDeleteBin7Line>
    </Button>

    <template v-if="shouldShowMarginMenu(props.editor)">
        <Button tips="左对齐" @click="editor.commands.justifyStart()" :shape="shape">
            <RiIndentDecrease :size="iconSize"></RiIndentDecrease>
        </Button>

        <Button tips="居中对齐" @click="editor.commands.justifyCenter()" :shape="shape">
            <RiAlignCenter :size="iconSize"></RiAlignCenter>
        </Button>

        <Button tips="右对齐" @click="editor.commands.justifyEnd()" :shape="shape">
            <RiIndentIncrease :size="iconSize"></RiIndentIncrease>
        </Button>
    </template>
    <Button @click="downloadImage" tips="下载图片" :shape="shape">
        <RiDownloadLine :size="iconSize"></RiDownloadLine>
    </Button>
    <Button @click="editor.commands.openLoading" tips="打开画图界面" :shape="shape">
        <RiEditLine :size="iconSize"></RiEditLine>
    </Button>
    <Button tips="样式" :shape="shape" :dropdownBackgroundClass="backgroundClass">
        <RiShapeLine :size="iconSize"></RiShapeLine>

        <template #dropdown-item>
            <div class="grid grid-cols-2 z-50 md:grid-cols-4 gap-2 w-32 place-items-center">
                <div v-for="shape in Object.keys(shapeClass)"
                    class="w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-200 ease-in-out hover:bg-indigo-200/90 rounded-full p-1"
                    :key="shape" @click="props.editor.commands.setShape(shape)">
                    <div :class="[
                        shapeClass[shape],
                        'w-5 h-5 p-1',
                        { 'ring-1 scale-90 rounded-full': shape === 'none' },
                        { ' bg-cyan-400': shape !== 'none' }
                    ]"></div>
                </div>
            </div>
        </template>
    </Button>
</template>
