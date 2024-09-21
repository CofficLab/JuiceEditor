import { channel } from "diagnostics_channel";
import Plugin from "../contract/Plugin";
import EditorData from "../model/EditorData";
import { send } from "vite";
import TreeNode from "src/model/TreeNode";
import PageMode from "../model/PageMode";
const title = "🍎 WebKit"

class APIApp implements Plugin {
    forPages: PageMode[] = [PageMode.NODE]

    onSelectionTypeChange(type: string): void {
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

    onPageLoaded() {
    }

    runCode(code: string, lan: string, callback: (result: string) => void) {
    }

    onDownloadImage(src: string, name: string) {
    }

    onMessage(message: string) {
    }
}

export default APIApp

