<script lang="ts" setup>
import { RiBold, RiItalic, RiUnderline, RiStrikethrough, RiInformation2Line, RiH1, RiH2, RiH3, RiLink, RiText } from '@remixicon/vue';
import SampleImage from '../assets/sample.jpeg';
import html2canvas from 'html2canvas';
import DomHelper from '../helper/DomHelper';


const colorClass = [
    'bg-red-500',
    'bg-green-500 ring-4',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-purple-500',
]

const shapeClass = [
    'mask mask-heart bg-blue-500/80 ',
    'mask mask-squircle bg-blue-500/80',
    'mask mask-decagon bg-blue-500/80',
    'mask mask-pentagon bg-blue-500/80',
    'mask mask-diamond bg-blue-500/80',
]

const languages = [
    '汉语',
    '英语',
    '日语',
]

const menuClass = 'bg-slate-100 px-4 py-2 h-10 flex flex-row shadow gap-2 justify-center items-center rounded-2xl'
const activeMenuClass = 'bg-slate-200 justify-center items-center rounded-2xl p-1'

const iconSize = '24px'

function downloadAsImage() {
    const element = DomHelper.findElement('box');
    if (element) {
        html2canvas(element, {
            scale: 2,
            useCORS: false,
            logging: false,
            backgroundColor: null,
        }).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'hero.png';
            link.click();
        });
    }
}
</script>


<template>
    <div class="h-full min-h-screen w-full bg-gray-500/20 mt-24 p-4 glass">
        <div class="flex flex-row justify-center mb-8">
            <button @click="downloadAsImage" class="mt-4 p-2 bg-blue-500 text-white rounded">Download as Image</button>
        </div>

        <div id="box" class="max-w-4xl mx-auto p-8">
            <div id="section1" class="bg-indigo-500/10 rounded-2xl p-4 shadow-2xl">
                <div :class="menuClass" class="w-36 ml-24">
                    <RiH1 :size="iconSize" color="primary" />
                    <RiH2 :size="iconSize" color="primary" />
                    <RiH3 :size="iconSize" color="primary" />
                    <div :class="activeMenuClass">
                        <RiBold :size="iconSize"></RiBold>
                    </div>
                </div>
                <p class="mt-2 ring-1 rounded-2xl p-2 self-end ">
                    灵活又优雅，<b>简洁</b>而强大。
                </p>
                <div :class="menuClass" class="w-48 mb-1 mt-12">
                    <div v-for="color in colorClass" class="w-7 h-7 flex items-center justify-center rounded-full p-1"
                        :key="color">
                        <div :class="color" class="w-5 h-5 rounded-full p-1">
                        </div>
                    </div>
                </div>
                <p class="bg-green-500/30 rounded-lg p-2 mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                </p>
            </div>

            <div id="section2" class="flex flex-row bg-indigo-500/0 mt-4 rounded-2xl gap-2 justify-between">
                <div id="image" class="rounded-xl bg-rose-400/30 p-4 shadow-2xl">
                    <div :class="menuClass" class="rounded-box z-50 shadow w-40 ml-40 mb-1 flex flex-row gap-2">
                        <div :class="shape" v-for="shape in shapeClass" class="w-5 h-5 rounded-full p-1"></div>
                    </div>
                    <div :class="menuClass" class="mt-1 w-40 ring-1 ml-8">
                        <RiBold color="primary" />
                        <RiItalic color="primary" />
                        <RiUnderline color="primary" />
                        <RiStrikethrough color="primary" />
                        <div :class="activeMenuClass">
                            <RiInformation2Line :size="iconSize" color="primary" />
                        </div>
                    </div>
                    <div class="flex justify-start pr-24 ml-4 mt-2">
                        <img :src="SampleImage"
                            class="rounded-md w-48 h-48 mt-1 self-end items-end flex justify-self-end ring-2">
                    </div>
                </div>

                <div id="link-list" class="flex flex-col gap-2 justify-between">
                    <div id="link" class="rounded-xl p-4 bg-orange-300/40 shadow-2xl">
                        <div :class="menuClass" class="w-72 ml-24">
                            <RiLink color="primary" />
                            <input type="text" value="https://cofficlab.github.io"
                                class="w-48 rounded-none input ring-1 input-sm" />
                            <RiText color="primary" />
                        </div>
                        <div class="flex justify-start pr-24 ml-0 mt-2">
                            <p>Create softwares with love by <b class="ring-1 rounded-2xl p-1">CofficLab</b></p>
                        </div>
                    </div>
                    <div id="list" class="mt-8 rounded-xl p-4 bg-cyan-500/30 shadow-2xl">
                        <div :class="menuClass" class="w-48">
                            <RiText color="secondary" />
                            <div v-for="language in languages" class="text-xs w-12 rounded-full p-1">{{ language }}
                            </div>
                        </div>
                        <p class="mt-2"><span class="ring-1 rounded-2xl p-1">有何特别</span></p>
                        <ul class="list-disc list-inside ml-2 text-sm">
                            <li>优雅简洁的界面</li>
                            <li>丰富强大的 API</li>
                            <li>多平台、多框架的支持</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
