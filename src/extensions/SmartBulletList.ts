import BulletList from "@tiptap/extension-bullet-list";

const SmartBulletList = BulletList.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: '',
            },
        }
    },
});

export default SmartBulletList;
