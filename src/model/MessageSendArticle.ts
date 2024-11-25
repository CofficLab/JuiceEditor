import EditorNode from "./EditorNode"

class MessageSendArticle {
    channel: string = "updateArticle"
    node: EditorNode = EditorNode.empty()

    public setNode(node: EditorNode): MessageSendArticle {
        this.node = node
        return this
    }
}

export default MessageSendArticle
