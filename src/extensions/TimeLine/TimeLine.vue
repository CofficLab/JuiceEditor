<template>
  <node-view-wrapper class="toc hidden lg:flex">
    <section class="body-font fixed left-24 top-20 text-gray-600">
      <div class="mx-auto flex flex-wrap px-5 py-24">
        <div v-for="(heading, index) in headings" class="relative mx-auto flex sm:items-center md:w-2/3">
          <div class="absolute inset-0 flex h-full w-6 items-center justify-center">
            <div class="pointer-events-none h-full w-1 bg-gray-200"></div>
          </div>
          <div class="title-font relative z-10 mt-10 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-medium text-white sm:mt-0">
            {{ index + 1 }}
          </div>
          <div class="flex flex-grow flex-col items-start sm:flex-row sm:items-center">
            <div class="flex-grow">
              <h6 class="title-font mb-1 text-xl font-medium text-gray-900">
                <a :href="`#${heading.id}`" class="py-2 px-4 no-underline">
                  {{ heading.text }}
                </a>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  </node-view-wrapper>
</template>

<script>
import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-3";
import DynamicPadding from "../components/DynamicPadding.vue";

export default {
  components: {
    NodeViewWrapper,
    DynamicPadding,
  },
  props: nodeViewProps,
  data() {
    return {
      headings: [],
    };
  },

  methods: {
    handleUpdate() {
      // console.log("toc handle update");
      const headings = [];
      const transaction = this.editor.state.tr;

      this.editor.state.doc.descendants((node, pos) => {
        if (node.type.name === "timeLineTitle") {
          const id = `heading-${headings.length + 1}`;
          const className = "bg-red-300";

          if (node.attrs.id !== id) {
            transaction.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              id,
              className,
            });
          }

          headings.push({
            level: node.attrs.level,
            text: node.textContent,
            id,
          });
        }
      });

      transaction.setMeta("addToHistory", false);
      transaction.setMeta("preventUpdate", true);

      this.editor.view.dispatch(transaction);
      this.headings = headings;
    },
  },

  mounted() {
    console.log("TimeLine: mounted");
    this.editor.on("update", this.handleUpdate);
    this.$nextTick(this.handleUpdate);

    // 监听滚动的距离以高亮toc菜单
    window.addEventListener("scroll", function (e) {
      if (!e.target) return;

      // 已经滚动了多少距离
      var scrollTop = e.target.scrollTop;
      // 正文DOM
      var proseDom = document.getElementsByClassName("prose").item(0);
      // 正文里的标题
      var titleDoms = proseDom?.querySelectorAll("h2,h3,h4");

      if (!titleDoms) return;

      for (var i = 0; i < titleDoms.length; i++) {
        var title = titleDoms.item(i);
        if (!title) return;

        // 当前标题离顶部的距离
        var offsetTop = title.offsetTop;
        if (scrollTop - offsetTop > 0 && scrollTop - offsetTop < 20) {
          var aDoms = document.getElementsByClassName("toc").item(0)?.getElementsByTagName("a");
          if (!aDoms) return;

          for (var j = 0; j < aDoms.length; j++) {
            var a = aDoms.item(j);
            if (a != null && a.attributes["href"].nodeValue == "#" + title?.id) {
              a.classList.add("bg-sky-300/30");
            } else {
              a?.classList.remove("bg-sky-300/30");
            }
          }
        }
      }
    });
  },
};
</script>
