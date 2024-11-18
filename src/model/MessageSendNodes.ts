import EditorNode from "./EditorNode"

class MessageSendNodes {
    channel: string = "updateNodes"
    nodes: EditorNode[] = []

    public setNodes(nodes: EditorNode[]): MessageSendNodes {
        this.nodes = nodes
        return this
    }
}

export default MessageSendNodes