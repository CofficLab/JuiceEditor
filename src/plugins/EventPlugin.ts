import UpdateData from "../model/UpdateData";
import Plugin from "../contract/Plugin";
import TreeNode from "../model/TreeNode";
import EditorDoc from "../model/EditorDoc";

const title = "🍎 EventPlugin"
const apiEvent = "apiEvent";

function emit(name: string, data: object) {
    window.dispatchEvent(new CustomEvent(apiEvent, {
        detail: {
            name: name,
            data: data
        }
    }));
}

// Send event to browser
class EventPlugin implements Plugin {
    onDownloadImage(src: string, name: string): void {
        console.log(title, 'download image')

        emit('downloadImage', {
            src: src,
            name: name
        })
    }

    onMessage(message: string): void {

    }

    onPageLoaded(): void {
        let verbose = false

        if (verbose) {
            console.log(title, 'page loaded')
        }

        emit('pageLoaded', {})
    }

    onSelectionTypeChange(type: string): void {

    }

    onUpdated(data: UpdateData): void {
    }

    onNodeUpdated(node: TreeNode): void {
    }

    onDocUpdated(data: EditorDoc): void {
    }

    onCurrentDocUUIDChange(uuid: string): void {
    }
}

export default EventPlugin