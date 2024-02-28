import EditorData from "../entities/EditorData";
import TreeNode from "../entities/TreeNode";

export default class LocalStore {
    static saveData(data: EditorData) {
        localStorage.setItem('data', JSON.stringify(data))
    }

    static getData(): TreeNode {
        return JSON.parse(localStorage.getItem('data') || '{}')
    }
}