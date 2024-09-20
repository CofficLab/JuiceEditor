import { Editor } from "@tiptap/core"

const title = '🌳 SmartHeading'

class SmartHeading {
    level: number = 0
    text: string = "ROOT"
    id: string = ""
    children: SmartHeading[] = []

    setLevel(level: number): SmartHeading {
        this.level = level
        return this
    }

    setText(text: string): SmartHeading {
        this.text = text
        return this
    }

    setId(id: string): SmartHeading {
        this.id = id
        return this
    }

    firstChild(): SmartHeading {
        return this.children[0]
    }

    appendChild(heading: SmartHeading): SmartHeading {
        this.children.push(heading)
        return this
    }

    updateLastChild(heading: SmartHeading): SmartHeading {
        this.children[this.children.length - 1] = heading
        return this
    }

    getLastChild(): SmartHeading {
        return this.children[this.children.length - 1]
    }

    appendNode(node: SmartHeading): SmartHeading {
        if (this.level >= node.level) {
            throw new Error("不能将" + node.level + "级标题插入到" + this.level + "级标题中，append " + node.text + " -> " + this.text)
        }

        if (this.level == node.level - 1) {
            return this.appendChild(node)
        }

        if (this.children.length == 0) {
            return this.appendChild(node)
        }

        if (this.getLastChild().level >= node.level) {
            return this.appendChild(node)
        }

        // 让最后一个child接收
        return this.updateLastChild(this.children[this.children.length - 1].appendNode(node))
    }

    static makeTree(editor: Editor): SmartHeading {
        let headings = SmartHeading.getHeadings(editor)

        //console.log("makeTree with", headings)
        var root = new SmartHeading()

        headings.forEach((heading) => {
            //console.log("appendNode", heading)
            root = root.appendNode(heading)
        })

        //console.log("makeTree result", root)
        return root
    }

    static getHeadings(editor: Editor): SmartHeading[] {
        let verbose = false
        if (verbose) {
            console.log(title, '查找 Headings')
        }
        var headings: SmartHeading[] = []

        const transaction = editor.state.tr

        editor.state.doc.descendants((node: any, pos: any) => {
            if (['heading'].includes(node.type.name)) {
                const id = `heading-${headings.length + 1}`

                // console.log("take", node.type.name, node.textContent, id)

                if (node.attrs.id !== id) {
                    transaction.setNodeMarkup(pos, undefined, { ...node.attrs, id })
                }

                headings.push(new SmartHeading()
                    .setId(id)
                    .setText(node.textContent)
                    .setLevel(node.attrs.level)
                )
            }
        })

        transaction.setMeta('addToHistory', false)
        transaction.setMeta('preventUpdate', true)

        editor.view.dispatch(transaction)

        return headings
    }
}

export default SmartHeading