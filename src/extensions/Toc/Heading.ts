import { Editor } from "@tiptap/core"

class Heading {
    level: number = 0
    text: string = ""
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

    appendChild(heading: Heading): Heading {
        this.children.push(heading)
        return this
    }

    getLastNodeOfLevel(level: number): Heading | null {
        if (this.level == level) {
            return this
        }

        if (this.children.length == 0) {
            return null
        }

        return this.children[this.children.length - 1].getLastNodeOfLevel(level)
    }

    static makeTree(headings: Heading[]): Heading {
        var root = new Heading()
        var current = root

        headings.forEach((heading) => {
            if (heading.level == 1) {
                root = heading
            } else {
                current.appendChild(heading)
            }
        })

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

        // editor.view.dispatch(transaction)

        return headings
    }
}

export default Heading