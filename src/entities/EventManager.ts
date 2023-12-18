const eventNames = {
    insertDraw: 'insertDraw',
    insertImage: 'insertImage',
    setHeading1:'setHeading1',
    setHeading2:'setHeading2',
    setHeading3:'setHeading3',
    setHeading4:'setHeading4',
    setHeading5:'setHeading5',
    setHeading6:'setHeading6',
    setParagraph: 'setParagraph',
    toggleBanner: 'toggleBanner',
    toggleBold: 'toggleBold',
    toggleBulletList: 'toggleBulletList',
    toggleCode: 'toggleCode',
    toggleCodeBlock: 'toggleCodeBlock',
    toggleItalic: 'toggleItalic',
    toggleLink: 'toggleLink',
    toggleTOC: 'toggleTOC',
}

export default class EventManager {
    toggleBanner() {
        window.dispatchEvent(new CustomEvent(eventNames.toggleBanner));
    }

    toggleToc() {
        window.dispatchEvent(new CustomEvent(eventNames.toggleTOC));
    }

    toggleBold() {
        window.dispatchEvent(new CustomEvent(eventNames.toggleBold));
    }

    toggleBulletList() {
        window.dispatchEvent(new CustomEvent(eventNames.toggleBulletList));
    }

    toggleCode() {
        window.dispatchEvent(new CustomEvent(eventNames.toggleCode));
    }

    toggleCodeBlock() {
        window.dispatchEvent(new CustomEvent(eventNames.toggleCodeBlock));
    }

    toggleItalic() {
        window.dispatchEvent(new CustomEvent(eventNames.toggleItalic));
    }

    toggleLink() {
        window.dispatchEvent(new CustomEvent(eventNames.toggleLink));
    }

    insertDraw() {
        window.dispatchEvent(new CustomEvent(eventNames.insertDraw));
    }

    insertImage() {
        window.dispatchEvent(new CustomEvent(eventNames.insertImage));
    }

    setParagraph() {
        window.dispatchEvent(new CustomEvent(eventNames.setParagraph));
    }

    setHeading1() {
        window.dispatchEvent(new CustomEvent(eventNames.setHeading1));
    }

    setHeading2() {
        window.dispatchEvent(new CustomEvent(eventNames.setHeading2));
    }

    setHeading3() {
        window.dispatchEvent(new CustomEvent(eventNames.setHeading3));
    }

    setHeading4() {
        window.dispatchEvent(new CustomEvent(eventNames.setHeading4));
    }

    setHeading5() {
        window.dispatchEvent(new CustomEvent(eventNames.setHeading5));
    }

    setHeading6() {
        window.dispatchEvent(new CustomEvent(eventNames.setHeading6));
    }

    onToggleBanner(callback: Function) {
        window.addEventListener(eventNames.toggleBanner, () => callback());
    }

    onToggleToc(callback: Function) {
        window.addEventListener(eventNames.toggleTOC, () => callback());
    }

    onToggleBold(callback: Function) {
        window.addEventListener(eventNames.toggleBold, () => callback());
    }

    onToggleBulletList(callback: Function) {
        window.addEventListener(eventNames.toggleBulletList, () => callback());
    }

    onToggleCode(callback: Function) {
        window.addEventListener(eventNames.toggleCode, () => callback());
    }

    onToggleCodeBlock(callback: Function) {
        window.addEventListener(eventNames.toggleCodeBlock, () => callback());
    }

    onInsertDraw(callback: Function) {
        window.addEventListener(eventNames.insertDraw, () => callback());
    }

    onInsertImage(callback: Function) {
        window.addEventListener(eventNames.insertImage, () => callback());
    }

    onToggleItalic(callback: Function) {
        window.addEventListener(eventNames.toggleItalic, () => callback());
    }

    onToggleLink(callback: Function) {
        window.addEventListener(eventNames.toggleLink, () => callback());
    }

    onSetParagraph(callback: Function) {
        window.addEventListener(eventNames.setParagraph, () => callback());
    }

    onSetHeading1(callback: Function) {
        window.addEventListener(eventNames.setHeading1, () => callback());
    }

    onSetHeading2(callback: Function) {
        window.addEventListener(eventNames.setHeading2, () => callback());
    }

    onSetHeading3(callback: Function) {
        window.addEventListener(eventNames.setHeading3, () => callback());
    }

    onSetHeading4(callback: Function) {
        window.addEventListener(eventNames.setHeading4, () => callback());
    }

    onSetHeading5(callback: Function) {
        window.addEventListener(eventNames.setHeading5, () => callback());
    }

    onSetHeading6(callback: Function) {
        window.addEventListener(eventNames.setHeading6, () => callback());
    }
}