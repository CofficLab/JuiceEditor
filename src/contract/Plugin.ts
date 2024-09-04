import EditorDoc from "../model/EditorDoc"
import TreeNode from "../model/TreeNode"
import PageMode from "../model/PageMode"
interface Plugin {
    forPages: PageMode[]
    onPageLoaded(): void
    onMessage(message: string): void
    onSelectionTypeChange(type: string): void
    onDocUpdated(data: EditorDoc): void
    onDocUpdatedWithNode(data: EditorDoc, node: TreeNode): void
    onDocsUpdated(data: EditorDoc[]): void
    onDownloadImage(src: string, name: string): void
    onCurrentDocUUIDUpdated(uuid: string): void
}

export default Plugin