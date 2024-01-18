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

class EventManager {
    public operators = operators
    public listener = (event: Event) => {
        
    }

    setListener(listener: (event: Event) => void) {
        this.listener = listener
        window.addEventListener(apiEvent, this.listener);
    }

    removeListener() {
        window.removeEventListener(apiEvent, this.listener);
    }

    

    contextMenuWillOpen() {
        window.dispatchEvent(new CustomEvent(operators.contextMenuWillOpen));
    }

    toggleBanner() { emit("toggleBanner") }
    toggleToc() { emit("toggleTOC") }

    toggleBold() {
        emit("toggleBold");
    }

    toggleBulletList() {
        emit("toggleBulletList");
    }

    toggleCode() {
        emit("toggleCode");
    }

    toggleCodeBlock() {
        emit("toggleCodeBlock");
    }

    toggleItalic() {
        emit("toggleItalic");
    }

    toggleTaskList() {
        emit("toggleTaskList");
    }

    toggleLink() {
        emit("toggleLink");
    }

    insertDraw() {
        emit("insertDraw");
    }

    insertTable() {
        emit("insertTable");
    }

    insertImage() {
        emit("insertImage");
    }

    setParagraph() {
        emit("setParagraph");
    }

    setHeading1() {
        emit("setHeading1");
    }

    setHeading2() {
        emit("setHeading2");
    }

    setHeading3() {
        emit("setHeading3");
    }

    setHeading4() {
        emit("setHeading4");
    }

    setHeading5() {
        emit("setHeading5");
    }

    setHeading6() {
        emit("setHeading6");
    }

    onToggleBanner(callback: Function) {
        window.addEventListener(operators.toggleBanner, () => callback());
    }

    onToggleToc(callback: Function) {
        window.addEventListener(operators.toggleTOC, () => callback());
    }

    onToggleBold(callback: Function) {
        window.addEventListener(operators.toggleBold, () => callback());
    }

    onToggleBulletList(callback: Function) {
        window.addEventListener(operators.toggleBulletList, () => callback());
    }

    onToggleCode(callback: Function) {
        window.addEventListener(operators.toggleCode, () => callback());
    }

    onToggleCodeBlock(callback: Function) {
        window.addEventListener(operators.toggleCodeBlock, () => callback());
    }

    onInsertDraw(callback: Function) {
        window.addEventListener(operators.insertDraw, () => callback());
    }

    onInsertImage(callback: Function) {
        window.addEventListener(operators.insertImage, () => callback());
    }

    onInsertTable(callback: Function) {
        window.addEventListener(operators.insertTable, () => callback());
    }

    onToggleItalic(callback: Function) {
        window.addEventListener(operators.toggleItalic, () => callback());
    }

    onToggleLink(callback: Function) {
        window.addEventListener(operators.toggleLink, () => callback());
    }

    onToggleTaskList(callback: Function) {
        window.addEventListener(operators.toggleTaskList, () => callback());
    }

    onSetParagraph(callback: Function) {
        window.addEventListener(operators.setParagraph, () => callback());
    }

    onSetHeading1(callback: Function) {
        window.addEventListener(operators.setHeading1, () => callback());
    }

    onSetHeading2(callback: Function) {
        window.addEventListener(operators.setHeading2, () => callback());
    }

    onSetHeading3(callback: Function) {
        window.addEventListener(operators.setHeading3, () => callback());
    }

    onSetHeading4(callback: Function) {
        window.addEventListener(operators.setHeading4, () => callback());
    }

    onSetHeading5(callback: Function) {
        window.addEventListener(operators.setHeading5, () => callback());
    }

    onSetHeading6(callback: Function) {
        window.addEventListener(operators.setHeading6, () => callback());
    }

    onContextMenuWillOpen(callback: Function) {
        window.addEventListener(operators.contextMenuWillOpen, () => callback());
    }
}

export default EventManager