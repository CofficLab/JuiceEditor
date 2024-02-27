import { Editor } from "@tiptap/core"

class Heading {
    level: number = 0
    text: string = "ROOT"
    id: string = ""
    children: Heading[] = []

    setLevel(level: number): Heading {
        this.level = level
        return this
    }

    setText(text: string): Heading {
        this.text = text
        return this
    }

    setId(id: string): Heading {
        this.id = id
        return this
    }

    firstChild(): Heading {
        return this.children[0]
    }

    appendChild(heading: Heading): Heading {
        this.children.push(heading)
        return this
    }

    updateLastChild(heading: Heading): Heading {
        this.children[this.children.length - 1] = heading
        return this
    }

    getLastChild(): Heading {
        return this.children[this.children.length - 1]
    }

    appendNode(node: Heading): Heading {
        if (this.level >= node.level) {
            throw new Error("不能将" + node.level + "级标题插入到" + this.level + "级标题中，append "+ node.text+" -> " + this.text)
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

    static makeTree(editor: Editor): Heading {
        let headings = Heading.getHeadings(editor)

        //console.log("makeTree with", headings)
        var root = new Heading()

        headings.forEach((heading) => {
            //console.log("appendNode", heading)
            root = root.appendNode(heading)
        })

        //console.log("makeTree result", root)
        return root
    }

    static getHeadings(editor: Editor): Heading[] {
        console.log('🍋 📖 Toc-Heading: 查找 Headings')
        var headings: Heading[] = []

        const transaction = editor.state.tr

        editor.state.doc.descendants((node: any, pos: any) => {
            if (node.type.name === 'heading') {
                const id = `heading-${headings.length + 1}`

                if (node.attrs.id !== id) {
                    transaction.setNodeMarkup(pos, undefined, { ...node.attrs, id })
                }
                
                headings.push(new Heading()
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

export default Heading