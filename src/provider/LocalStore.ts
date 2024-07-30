import EditorData from "../model/EditorData";
import TreeNode from "../model/TreeNode";

export default class LocalStore {
    static saveData(data: EditorData) {
        localStorage.setItem('data', JSON.stringify(data))
    }

    static getData(): TreeNode {
        return JSON.parse(localStorage.getItem('data') || '{}')
    }
}