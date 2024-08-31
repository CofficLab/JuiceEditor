import UpdateData from "../model/UpdateData";
import Plugin from "../contract/Plugin";
import TreeNode from "../model/TreeNode";
import EditorDoc from "../model/EditorDoc";

const title = "🍎 EventPlugin"
const apiEvent = "apiEvent";
const operators = {
    contextMenuWillOpen: 'contextMenuWillOpen',
    insertDraw: 'insertDraw',
    insertImage: 'insertImage',
    insertTable: 'insertTable',
    insertCodeBlock: 'insertCodeBlock',
    insertTodo: 'insertTodo',
    setHeading1: 'setHeading1',
    setHeading2: 'setHeading2',
    setHeading3: 'setHeading3',
    setHeading4: 'setHeading4',
    setHeading5: 'setHeading5',
    setHeading6: 'setHeading6',
    setParagraph: 'setParagraph',
    toggleBanner: 'toggleBanner',
    toggleBold: 'toggleBold',
    toggleBulletList: 'toggleBulletList',
    toggleCode: 'toggleCode',
    toggleCodeBlock: 'toggleCodeBlock',
    toggleItalic: 'toggleItalic',
    toggleLink: 'toggleLink',
    toggleTOC: 'toggleTOC',
    toggleTaskList: 'toggleTaskList',
}

function emit(operator: keyof typeof operators) {
    window.dispatchEvent(new CustomEvent(apiEvent, {
        detail: {
            operator
        }
    }));
}

class EventPlugin implements Plugin {
    onDownloadImage(src: string, name: string): void {
        console.log(title, 'download image')
    }

    onMessage(message: string): void {

    }

    onPageLoaded(): void {
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