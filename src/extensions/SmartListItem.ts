import { ListItemExtension } from '../model/TiptapGroup';
import UUIDHelper from '../helper/UUIDHelper';

const SmartListItem = ListItemExtension.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: '',
            },
            uuid: {
                default: UUIDHelper.generate(),
                parseHTML: (element) => {
                    return element.getAttribute('data-uuid') || UUIDHelper.generate()
                }
            }
        }
    },
});

export default SmartListItem;
