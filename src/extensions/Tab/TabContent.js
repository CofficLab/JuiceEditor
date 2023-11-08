import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import TabContent from "./TabContent.vue";
import { Plugin, PluginKey } from "@tiptap/pm/state";

export default Node.create({
  name: "tabContent",
  group: "block",
  // draggable: true,
  // 子元素都是什么类型
  content: "inline*",

  // 将什么样的HTML转化成tab
  // 这样的：<tab-content></tab-content>
  parseHTML() {
    return [{ tag: "tab-content" }];
  },

  addAttributes() {
    return {
      class: {
        default: "bg-green-300",
      },
      index: {
        default: 0,
      },
    };
  },

  addNodeView() {
    return VueNodeViewRenderer(TabContent);
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleKeyDown: (view, event) => {
            /**
             *
             *  1. We are checking if the key pressed is "Delete"
             *  2. If it is, we are getting the element that has the focus class
             *  3. We are getting the length of the text in that element
             *  4. We are getting the cursor position in that element
             *  5. If the cursor position is at the end of the text,
             *  6. We are disabling editing for 400ms and then enabling it again.
             *  7. This is to prevent deletion of the @CrossButton component when you press delete at the end of a task.
             */
            console.log("handle key down,event is ", event);
            if (event.key == "Delete" || event.key == "Backspace") {
              let element = document.querySelectorAll(".focus");
              console.log(element, element.length);
              if (element.length == 0) {
                throw new ErrorEvent("no .focus element");
              }
              // const textLength = element[1].innerText.length;
              // const cursorPosition = view.state.selection.$anchor.parentOffset;
              // if (textLength == cursorPosition) {
              //   editor.value.setEditable(false);
              //   setTimeout(() => {
              //     editor.value.setEditable(true);
              //   }, 400);
              // }
              // throw new ErrorEvent("not allowed");
            }
          },
        },
        // filterTransaction(transaction, state) {
        //   console.log("filter transaction");
        //   let result = true; // true for keep, false for stop transaction
        //   const replaceSteps = [];
        //   transaction.steps.forEach((step, index) => {
        //     console.log("step is ", step, step.jsonID);
        //     if (step.jsonID === "replaceAround") {
        //       replaceSteps.push(index);
        //     }
        //   });

        //   replaceSteps.forEach((index) => {
        //     const map = transaction.mapping.maps[index];
        //     const oldStart = map.ranges[0];
        //     const oldEnd = map.ranges[0] + map.ranges[1];
        //     state.doc.nodesBetween(oldStart, oldEnd, (node) => {
        //       console.log("filter node", node);
        //       if (node.type.name === "tabContent") {
        //         result = false;
        //       }
        //     });
        //   });

        //   console.log(result);
        //   return result;
        // },
      }),
    ];
  },

  // 将数据转换成HTML
  renderHTML({ HTMLAttributes, node }) {
    // 第一个参数是HTML标签的名字
    // 第二个参数如果是object，将会被当成标签的属性
    // 后面的参数都是标签的子元素
    return ["tab-content", HTMLAttributes, 0];
  },
});
