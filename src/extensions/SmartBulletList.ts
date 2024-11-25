import BulletList from "@tiptap/extension-bullet-list";
import UUIDHelper from '../helper/UUIDHelper';

const SmartBulletList = BulletList.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: '',
            },
            uuid: {
                default: UUIDHelper.generate("SmartBulletList"),
                parseHTML: (element) => {
                    return element.getAttribute('data-uuid') || UUIDHelper.generate("SmartBulletList")
                }
            }
        }
    },
});

export default SmartBulletList;
