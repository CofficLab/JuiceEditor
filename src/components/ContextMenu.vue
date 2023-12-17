<template>
  <!-- 右键菜单 -->
  <div id="custom-menu">
    <ul>
      <!-- <li class="menu-title">Title</li> -->
      <li><a id="menu-item-1">Item 1</a></li>
      <li><a id="menu-item-2">Item 2</a></li>
      <li><a>Item 3</a></li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.addEventListener('contextmenu', function (event) {
    let nodeName = (event.target as HTMLElement).nodeName
    if (nodeName == 'H2') {
      event.preventDefault()
      var customMenu = document.getElementById('custom-menu')!
      customMenu.style.left = event.pageX + 'px'
      customMenu.style.top = event.pageY + 'px'
      customMenu.style.display = 'block'
    }
  })

  document.addEventListener('click', function (event) {
    var customMenu = document.getElementById('custom-menu')!
    console.log(customMenu)
    customMenu.style.display = 'none'
  })

  document.getElementById('menu-item-1')!.addEventListener('click', function () {
    alert('Custom Item 1 clicked')
  })

  document.getElementById('menu-item-2')!.addEventListener('click', function () {
    alert('Custom Item 2 clicked')
  })
})
</script>

<style lang="postcss">
#custom-menu {
  @apply bg-base-300 rounded-md absolute shadow-lg border border-gray-500/20;

  ul {
    @apply p-1 menu;
  }
  a {
    @apply cursor-default text-sm py-1 rounded;
  }
}
</style>
