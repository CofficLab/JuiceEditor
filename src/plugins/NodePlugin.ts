import Plugin from "../contract/Plugin";
import TreeNode from "../model/TreeNode";
import EditorDoc from "../model/EditorDoc";
import UpdateData from "../model/UpdateData";
import { Store } from 'pinia';

export default class NodePlugin implements Plugin {
    onPageLoaded(): void { }
    onMessage(message: string): void { }
    onSelectionTypeChange(type: string): void { }
    onUpdated(data: UpdateData): void { }
    onNodeUpdated(data: TreeNode): void {
    }
    onDocUpdated(data: EditorDoc): void { }
    onCurrentDocUUIDChange(uuid: string): void { }
    onDownloadImage(src: string, name: string): void { }
}