import Plugin from "../contract/Plugin";
import EditorData from "../model/EditorData";
import TreeNode from "src/model/TreeNode";
import PageMode from "../model/PageMode";

class APIApp implements Plugin {
    forPages: PageMode[] = [PageMode.NODE]

    onSelectionTypeChange(type: string): void {
    }

    onLoading(reason: string): void {
    }

    onConfigChanged(): void {
    }

    onDocUpdated(doc: EditorData): void {
        // window.api.node.sendHtmlByRequest(doc.html)
    }

    onDocUpdatedWithNode(doc: EditorData, node: TreeNode): void {
    }

    onDocsUpdated(data: EditorData[]): void {

    }

    onCurrentDocUUIDUpdated(uuid: string): void {

    }

    onReady() {
    }

    runCode(code: string, lan: string, callback: (result: string) => void) {
    }

    onDownloadImage(src: string, name: string) {
    }

    onMessage(message: string) {
    }
}

export default APIApp

