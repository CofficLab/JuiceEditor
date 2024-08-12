import { VueNodeViewRenderer } from "@tiptap/vue-3";
import SmartHeadingVue from "./SmartHeading.vue";
import Heading from "@tiptap/extension-heading";

const SmartHeading1 = makeExtension(1);

const SmartHeading2 = makeExtension(2);

const SmartHeading3 = makeExtension(3);

const SmartHeading4 = makeExtension(4);

const SmartHeading5 = makeExtension(5);

const SmartHeading6 = makeExtension(6);

function makeExtension(level: number) {
    return Heading.extend({
        name: 'h' + level,
        parseHTML() {
            return [{
                'tag': 'h' + level,
            }]
        },
        addAttributes() {
            return {
                level: {
                    default: level,
                    rendered: false,
                },
            }
        },
        addNodeView: () => VueNodeViewRenderer(SmartHeadingVue),
        addCommands() {
            return {
                setHeading: attributes => ({ commands }) => {
                    if (!this.options.levels.includes(attributes.level)) {
                        return false
                    }

                    return commands.setNode(this.name, attributes)
                },
                toggleHeading: attributes => ({ commands }) => {
                    if (!this.options.levels.includes(attributes.level)) {
                        return false
                    }

                    return commands.toggleNode('h' + attributes.level, 'paragraph', attributes)
                },
            }
        },
    });
}

export {
    SmartHeading1,
    SmartHeading2,
    SmartHeading3,
    SmartHeading4,
    SmartHeading5,
    SmartHeading6
};
