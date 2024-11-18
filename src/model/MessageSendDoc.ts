import EditorNode from "./EditorNode"

class MessageSendDoc {
    channel: string = "updateDoc"
    node: EditorNode = EditorNode.empty()

    public setNode(node: EditorNode): MessageSendDoc {
        this.node = node
        return this
    }
}

export default MessageSendDoc