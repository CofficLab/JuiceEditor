const title = "🔧 Helper"

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
        if (Helper.isTheLastNode(props)) {
            Helper.newLine(props)
        }
    }

    static getShadowRoot(shadowHostSelector = 'juice-editor'): ShadowRoot | null {
        // 获取 Shadow DOM 的宿主元素
        const shadowHost = document.querySelector(shadowHostSelector)
        if (!shadowHost) {
            console.error('Shadow host not found')
            return null
        }

        // 访问 Shadow DOM
        const shadowRoot = shadowHost.shadowRoot
        if (!shadowRoot) {
            console.error('Shadow root not found')
            return null
        }

        return shadowRoot
    }

    static findElement(id: string, shadowHostSelector: string = 'juice-editor'): HTMLElement | null {
        // 从document中找
        let element = document.getElementById(id)
        if (element) {
            return element
        }

        // 访问 Shadow DOM
        const shadowRoot = Helper.getShadowRoot(shadowHostSelector)
        if (!shadowRoot) {
            console.error('Shadow root not found')
            return null
        }

        return shadowRoot.getElementById(id)
    }

    static toTop() {
        let verbose = false;
        if (verbose) {
            console.log(title, '滚动到顶部')
        }
        window.scrollTo(0, 0)
    }
}

export default Helper