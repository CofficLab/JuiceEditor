import { Editor } from "@tiptap/core";

const operators = {
    contextMenuWillOpen: 'contextMenuWillOpen',
    insertDraw: 'insertDraw',
    insertImage: 'insertImage',
    insertTable: 'insertTable',
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

const apiEvent = "apiEvent";
var theEditor: Editor | null = null
var theOnMessage: (message: string) => void = () => { }

function emit(operator: keyof typeof operators) {
    window.dispatchEvent(new CustomEvent(apiEvent, {
        detail: {
            operator
        }
    }));
}

export default class EventManager {
    setListener(editor: Editor, onMessage: (message: string) => void) {
        theEditor = editor
        theOnMessage = onMessage
        window.addEventListener(apiEvent, this.listener);
    }

    removeListener() {
        window.removeEventListener(apiEvent, this.listener);
    }

    listener(event: Event) {
        let editor = theEditor!
        let onMessage = theOnMessage!

        if (!editor.isEditable) {
            return onMessage('当前为只读模式')
        }

        switch ((event as CustomEvent).detail.operator) {
            case operators.toggleTOC:
                editor.chain().focus().toggleToc().run()
                break;
            case operators.toggleBanner:
                editor.chain().focus().toggleBanner().run()
                break;
            case operators.toggleBold:
                editor.chain().focus().toggleBold().run()
                break;
            case operators.toggleItalic:
                editor.chain().focus().toggleItalic().run()
                break;
            case operators.toggleTaskList:
                editor.chain().focus().toggleTaskList().run()
                break;
            case operators.insertDraw:
                editor.chain().focus().insertDraw().run()
                break;
            case operators.insertTable:
                editor.chain().focus().insertSmartTable().run()
                break;
            case operators.toggleLink:
                editor.chain().focus().toggleLink().run()
                break;
            case operators.setHeading1:
                editor.chain().focus().setHeading({ level: 1 }).run()
                break;
            case operators.setHeading2:
                editor.chain().focus().setHeading({ level: 2 }).run()
                break;
            case operators.setHeading3:
                editor.chain().focus().setHeading({ level: 3 }).run()
                break;
            case operators.setHeading4:
                editor.chain().focus().setHeading({ level: 4 }).run()
                break;
            case operators.setHeading5:
                editor.chain().focus().setHeading({ level: 5 }).run()
                break;
            case operators.setHeading6:
                editor.chain().focus().setHeading({ level: 6 }).run()
                break;
            case operators.setParagraph:
                editor.chain().focus().setParagraph().run()
                break;
        }
    }

    contextMenuWillOpen() {
        emit("contextMenuWillOpen")
    }

    toggleBanner() {
        emit("toggleBanner")
    }

    toggleToc() {
        emit("toggleTOC")
    }

    toggleBold() {
        emit("toggleBold")
    }

    toggleBulletList() {
        emit("toggleBulletList")
    }

    toggleCode() {
        emit("toggleCode")
    }

    toggleCodeBlock() {
        emit("toggleCodeBlock")
    }

    toggleItalic() {
        emit("toggleItalic")
    }

    toggleTaskList() {
        emit("toggleTaskList")
    }

    toggleLink() {
        emit("toggleLink")
    }

    insertDraw() {
        emit("insertDraw")
    }

    insertTable() {
        emit("insertTable")
    }

    insertImage() {
        emit("insertImage")
    }

    setParagraph() {
        emit("setParagraph")
    }

    setHeading1() {
        emit("setHeading1")
    }

    setHeading2() {
        emit("setHeading2")
    }

    setHeading3() {
        emit("setHeading3")
    }

    setHeading4() {
        emit("setHeading4")
    }

    setHeading5() {
        emit("setHeading5")
    }

    setHeading6() {
        emit("setHeading6")
    }
}
