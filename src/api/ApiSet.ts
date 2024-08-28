import EventManager from '../event/EventManager';
import { Store } from 'pinia';
import Helper from '../helper/Helper';
import TreeNode from '../model/TreeNode';

let title = "🍎 ApiSet"

export default function setApi(app: Store<any, any, any, any>, feature: Store<any, any, any, any>) {
    window.api = {
        app: app,
        event: new EventManager(),
        feature: feature,

        // 设置当前节点的子uuid和content，其中content传递一个通过base64编码的字符
        setUUIDAndContent: function (uuid: string, content: string) {
            let verbose = false;
            app.loading = true
            if (verbose) {
                console.log(title, 'setUUIDAndContent')
            }

            let newNode = app.node
            newNode.uuid = uuid

            try {
                newNode.content = JSON.stringify(JSON.parse(atob(content)))
            } catch {
                newNode.content = content
            }

            if (verbose) {
                console.log(title, 'setUUIDAndContent', newNode.content)
            }

            // 会触发编辑器的更新
            app.node = newNode

            app.loading = false

            Helper.toTop()
        },

        setTreeNode: function (treeNodeInBase64: string) {
            let node = new TreeNode(JSON.parse(atob(treeNodeInBase64)))
            app.node = node

            Helper.toTop()
        }
    }
}