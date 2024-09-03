import EditorDoc from "../model/EditorDoc"
import TreeNode from "../model/TreeNode"

interface Plugin {
    onPageLoaded(): void
    onMessage(message: string): void
    onSelectionTypeChange(type: string): void
    onDocUpdated(data: EditorDoc): void
    onDocUpdatedWithNode(data: EditorDoc, node: TreeNode): void
    onDocsUpdated(data: EditorDoc[]): void
    onDownloadImage(src: string, name: string): void
}

export default Plugin