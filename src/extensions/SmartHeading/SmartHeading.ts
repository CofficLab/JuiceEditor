import { VueNodeViewRenderer } from "@tiptap/vue-3";
import SmartHeadingVue from "./SmartHeading.vue";
import Heading from "@tiptap/extension-heading";

const SmartHeading = Heading.extend({
    // addNodeView() {
    //     return VueNodeViewRenderer(SmartHeadingVue, {
    //         update: ({ oldNode, newNode, updateProps }) => {
    //             if (newNode.type.name !== this.name) return false
    //             // Make sure to redraw node as the vue renderer will not show the updated children
    //             if (newNode.attrs !== oldNode.attrs) return false
    //             updateProps()
    //             return true
    //         },
    //     })
    // },
})

export default SmartHeading