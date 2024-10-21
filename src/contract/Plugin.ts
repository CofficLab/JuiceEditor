import EditorData from "../model/EditorData"
import TreeNode from "../model/TreeNode"
import PageMode from "../model/PageMode"
interface Plugin {
    forPages: PageMode[]
    onLoading(reason: string): void
    onReady(): void
    onConfigChanged(): void
    onMessage(message: string): void
    onSelectionTypeChange(type: string): void
    onDocUpdated(data: EditorData | null): void
    onDocUpdatedWithNode(data: EditorData | null, node: TreeNode): void
    onDocsUpdated(data: EditorData[]): void
    onDownloadImage(src: string, name: string): void
    onCurrentDocUUIDUpdated(uuid: string): void
}

export default Plugin