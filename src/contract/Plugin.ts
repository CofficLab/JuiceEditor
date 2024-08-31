import EditorDoc from "../model/EditorDoc"
import TreeNode from "../model/TreeNode"
import UpdateData from "../model/UpdateData"

interface Plugin {
    onPageLoaded(): void
    onMessage(message: string): void
    onSelectionTypeChange(type: string): void
    onUpdated(data: UpdateData): void
    onNodeUpdated(data: TreeNode): void
    onDocUpdated(data: EditorDoc): void
    onCurrentDocUUIDChange(uuid: string): void
    onDownloadImage(src: string, name: string): void
}

export default Plugin