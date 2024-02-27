class Helper {
    // 获取尾部位置
    static getTailPos(props: { getPos: () => any; node: { nodeSize: any } }): number {
        const start = props.getPos()
        const end = start + props.node.nodeSize

        return end
    }

    // 在本节点的后面插入一行
    static newLine(props: { editor: any; getPos: () => any; node: { nodeSize: any } }) {
        let tail = Helper.getTailPos(props)
        props.editor.commands.insertContentAt(tail, '<p></p>', {
            updateSelection: false,
            parseOptions: {
                preserveWhitespace: 'full'
            }
        })
        props.editor.commands.focus(tail)
    }

    // 是否是整个editor.state.doc.content的最后一个node
    static isTheLastNode(props: { editor: any; getPos: () => any; node: { nodeSize: any } }) {
        return props.node.nodeSize + props.getPos() == props.editor.state.doc.content.size
    }

    // 如果是最后一个节点，在本节点后插入一个空的p，防止光标无法移动到下一个节点
    static insertNewLineIfIsTheLastNode(props: { editor: any; getPos: () => any; node: { nodeSize: any } }) {
        if(Helper.isTheLastNode(props)) {
            Helper.newLine(props)
        }
    }
}

export default Helper