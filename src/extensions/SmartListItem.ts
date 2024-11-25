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
                default: UUIDHelper.generate("SmartListItem"),
                parseHTML: (element) => {
                    return element.getAttribute('data-uuid')
                }
            }
        }
    },
});

export default SmartListItem;
