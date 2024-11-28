<script setup lang="ts">
import { onMounted, nextTick, ref, onBeforeUnmount } from 'vue'
import TocHeading from '../HeadingStore/TocHeading'
import HeadingTree from './HeadingTree.vue'
import { HeadingStoreStorage } from '../HeadingStore/HeadingStore'
import { TiptapEditor } from '../../model/TiptapGroup';
import { SmartTocStorage } from './SmartToc';

const props = defineProps({
	editor: {
		type: TiptapEditor,
		required: true
	}
})

let headingTree = ref(new TocHeading())
const smartToc = props.editor.storage.smartToc as SmartTocStorage

function handleUpdate() {
	if (smartToc.verbose) {
		props.editor.commands.appendLog(smartToc.title, '🔄 handleUpdate')
	}

	headingTree.value = (props.editor.storage.headingStore as HeadingStoreStorage).tree
}

onMounted(() => {
	if (smartToc.verbose) {
		props.editor.commands.appendLog(smartToc.title, '🔄 mounted')
	}

	props.editor.on('update', handleUpdate)

	nextTick(() => handleUpdate())

	// 监听滚动的距离以高亮toc菜单
	// document.addEventListener('scroll', function (e) {
	//   // 已经滚动了多少距离
	//   // console.log(document.querySelector('h1'))
	//   var scrollTop = (document.querySelector('h1') as HTMLElement).scrollTop
	//   // console.log('已滚动' + scrollTop)
	//   // 正文DOM
	//   var proseDom = document.getElementsByClassName('prose').item(0)
	//   // 正文里的标题
	//   var titleDoms = proseDom?.querySelectorAll('h2,h3,h4')

	//   if (!titleDoms) return

	//   for (var i = 0; i < titleDoms.length; i++) {
	//     var title = titleDoms.item(i)
	//     if (!title) return

	//     // 当前标题离顶部的距离
	//     var offsetTop = (title as HTMLElement).offsetTop
	//     if (scrollTop - offsetTop > 0 && scrollTop - offsetTop < 20) {
	//       console.log(title + 'offset= ' + offsetTop)
	//       var aDoms = document.getElementsByClassName('toc').item(0)?.getElementsByTagName('a')
	//       if (!aDoms) {
	//         return
	//       }

	//       for (var j = 0; j < aDoms.length; j++) {
	//         var a = aDoms.item(j)
	//         if (a != null && a.attributes['href'].nodeValue == '#' + title?.id) {
	//           a.classList.add('bg-sky-300/30')
	//         } else {
	//           a?.classList.remove('bg-sky-300/30')
	//         }
	//       }
	//     }
	//   }
	// })
})

onBeforeUnmount(() => {
	props.editor.off('update', handleUpdate)
})
</script>

<template>
	<!-- TOC，和顶部留一些距离，因为WEB项目顶部有导航栏 -->
	<div id="toc" v-if="true" :class="{
		'fixed right-0 top-12 z-30': true,
		'flex-row justify-start hidden h-screen overflow-y-scroll': true,
		'w-48': true,
		'md:w-56 md:flex md:right-1': true,
		'4md:w-48 4md:right-2': true,
		'xl:w-64 4md:right-2': true,
		'2xl:w-88 2xl:right-24': true
	}">
		<div class="w-full p-0 my-12 overflow-y-scroll menu menu-xs">
			<HeadingTree :heading="h" v-for="h in headingTree.children"></HeadingTree>
		</div>
	</div>
</template>
