import TreeNode from '../model/TreeNode';
import { ModeStore } from '../store/ModeStore';


let title = "💻 ModeAPI"

export default class ModeApi {
    public modeStore: ModeStore

    constructor(modeStore: ModeStore) {
        let verbose = false

        if (verbose) {
            console.log(title, '初始化')
        }

        this.modeStore = modeStore
    }

    public setMode(mode: string) {
        this.modeStore.setMode(mode, 'ModeApi.setMode')
    }
}