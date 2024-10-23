<script lang="ts" setup>
import { RiBold, RiH1, RiH2, RiH3, RiLink, RiText, RiEdit2Line, RiTriangleLine, RiDownloadLine, RiShapeLine, RiSquareLine, RiCircleLine, RiStarLine, RiHexagonLine } from '@remixicon/vue';
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

const languages = [
    '汉语',
    '英语',
    '日语',
]

const menuClass = 'bg-slate-300/50 px-4 py-2 h-10 flex flex-row shadow gap-2 justify-center items-center rounded-2xl'
const cardClass1 = 'bg-indigo-100/30 rounded-2xl p-4 shadow-xl'
const cardClass2 = 'bg-cyan-100/30 rounded-2xl p-4 shadow-2xl'
const cardClass3 = 'bg-orange-100/30 rounded-2xl p-4 shadow-2xl'
const cardClass4 = 'bg-green-100/30 rounded-2xl p-4 shadow-2xl'

const iconColor = 'indigo'
const iconSize = '24px'

function downloadAsImage() {
    const element = DomHelper.findElement('box');
    if (element) {
        html2canvas(element, {
            scale: 2,
            useCORS: true,
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
    <div class="h-full min-h-screen w-full bg-gray-500/20 mt-24 p-4 text-slate-700">
        <div class="flex flex-row justify-center mb-8">
            <button @click="downloadAsImage" class="mt-4 p-2 bg-blue-500/50 rounded">Download as Image</button>
        </div>

        <div id="box" class="max-w-4xl mx-auto p-0">
            <div id="section1" :class="cardClass1">
                <div :class="menuClass" class="w-36 ml-24">
                    <RiH1 :size="iconSize" :color="iconColor" />
                    <RiH2 :size="iconSize" :color="iconColor" />
                    <RiH3 :size="iconSize" :color="iconColor" />
                    <RiBold :size="iconSize" :color="iconColor" />
                </div>
                <p class="mt-2 rounded-2xl p-2 self-end ">
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
                <div id="image" :class="cardClass2">
                    <div :class="menuClass" class="rounded-box z-50 shadow w-40 ml-40 mb-1 flex flex-row gap-2">
                        <RiSquareLine :color="iconColor" :size="iconSize" />
                        <RiCircleLine :color="iconColor" :size="iconSize" />
                        <RiTriangleLine :color="iconColor" :size="iconSize" />
                        <RiStarLine :color="iconColor" :size="iconSize" />
                        <RiHexagonLine :color="iconColor" :size="iconSize" />
                    </div>
                    <div :class="menuClass" class="mt-1 w-32 ml-16">
                        <RiDownloadLine :color="iconColor" :size="iconSize" />
                        <RiEdit2Line :color="iconColor" :size="iconSize" />
                        <RiShapeLine :color="iconColor" :size="iconSize" />
                    </div>
                    <div class="flex justify-start pr-24 ml-4 mt-2">
                        <img :src="SampleImage"
                            class="rounded-md w-48 h-48 mt-1 self-end items-end flex justify-self-end">
                    </div>
                </div>

                <div id="link-list" class="flex flex-col gap-2 justify-between">
                    <div id="link" :class="cardClass3">
                        <div :class="menuClass" class="w-24 ml-24">
                            <RiLink :color="iconColor" :size="iconSize" />
                            <RiText :color="iconColor" :size="iconSize" />
                        </div>
                        <div class="flex justify-start pr-24 ml-0 mt-2">
                            <p class="text-nowrap">Created by <b class="rounded-2xl p-1">https://cofficlab.github.io</b>
                                with love
                            </p>
                        </div>
                    </div>
                    <div id="list" :class="cardClass4">
                        <div :class="menuClass" class="w-48">
                            <RiText :color="iconColor" :size="iconSize" />
                            <div v-for="language in languages" class="text-xs w-12 rounded-full p-1">{{ language }}
                            </div>
                        </div>
                        <p class="mt-2"><span class="rounded-2xl p-1 font-bold">有何特别</span></p>
                        <ul class="list-disc list-inside ml-2 text-sm mt-1">
                            <li>简单易用</li>
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
