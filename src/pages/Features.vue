<script lang="ts" setup>
import IconBold from '../ui/icons/IconBold.vue';
import IconItalic from '../ui/icons/IconItalic.vue';
import IconStrike from '../ui/icons/IconStrike.vue';
import IconLink from '../ui/icons/IconLink.vue';
import IconCode from '../ui/icons/IconCode.vue';
import IconInfo from '../ui/icons/IconInfo.vue';
import SampleImage from '../assets/sample.jpeg';
import IconDownload from '../ui/icons/IconDownload.vue';
import IconEdit from '../ui/icons/IconEdit.vue';
import IconRight from '../ui/icons/IconRight.vue';
import IconLeft from '../ui/icons/IconLeft.vue';
import IconOpen from '../ui/icons/IconOpen.vue';
import IconNoLink from '../ui/icons/IconNoLink.vue';
import IconH1 from '../ui/icons/IconH1.vue';
import IconH2 from '../ui/icons/IconH2.vue';
import IconH3 from '../ui/icons/IconH3.vue';


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

const menuClass = 'bg-slate-100 px-4 py-2 h-8 flex flex-row shadow gap-2 justify-center items-center rounded-2xl'
</script>


<template>
    <div class="h-full w-full bg-cyan-500/10 mt-24 py-8 glass">
        <div
            class="max-w-4xl mx-auto bg-gradient-to-r from-indigo-500/10 to-green-100/90 glass rounded-xl shadow-2xl p-4">
            <div id="section1" class="bg-indigo-500/10 rounded-2xl p-4 glass bg-blend-darken">

                <div :class="menuClass" class="w-36 ml-24">
                    <IconH1 color="primary" size="sm" />
                    <IconH2 color="primary" size="sm" />
                    <IconH3 color="primary" size="sm" />
                    <div class="ring-2 rounded-full h-6 w-6 bg-gray-600/10 flex items-center justify-center ">
                        <IconBold color="primary" size="sm" />
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
                <div id="image" class="rounded-xl bg-rose-400/30 p-4 glass">
                    <div :class="menuClass" class="rounded-box z-50 shadow w-40 ml-40 mb-1 flex flex-row gap-2">
                        <div :class="shape" v-for="shape in shapeClass" class="w-5 h-5 rounded-full p-1"></div>
                    </div>
                    <div :class="menuClass" class="mt-1 w-40 ring-1 ml-8">
                        <IconDownload size="sm" color="primary" />
                        <IconEdit size="sm" color="primary" />
                        <IconLeft size="sm" color="primary" />
                        <IconRight size="sm" color="primary" />
                        <div class="ring-2 rounded-full h-6 w-6 bg-gray-600/10 flex items-center justify-center ">
                            <IconInfo color="primary" />
                        </div>
                    </div>
                    <div class="flex justify-start pr-24 ml-4 mt-2">
                        <img :src="SampleImage"
                            class="rounded-md w-48 h-48 mt-1 self-end items-end flex justify-self-end ring-2">
                    </div>
                </div>

                <div id="link-list" class="flex flex-col gap-2 justify-between">
                    <div id="link" class="rounded-xl p-4 bg-orange-300/40 glass">
                        <div :class="menuClass" class="w-72 ml-24">
                            <IconOpen size="sm" color="primary" />
                            <input type="text" value="https://cofficlab.github.io"
                                class="w-48 rounded-none input ring-1 input-sm" />
                            <IconNoLink color="primary" size="sm" />
                        </div>
                        <div class="flex justify-start pr-24 ml-0 mt-2">
                            <p>Create softwares with love by <b class="ring-1 rounded-2xl p-1">CofficLab</b></p>
                        </div>
                    </div>
                    <div id="list" class="mt-8 rounded-xl p-4 bg-cyan-500/30 glass">
                        <div :class="menuClass" class="w-48">
                            <IconNoLink color="secondary" size="sm" />
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
