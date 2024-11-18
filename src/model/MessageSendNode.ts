import EditorNode from "./EditorNode"

class MessageSendNode {
    channel: string = "updateNode"
    node: EditorNode = EditorNode.empty()

    public setNode(node: EditorNode): MessageSendNode {
        this.node = node
        return this
    }
}

export default MessageSendNode