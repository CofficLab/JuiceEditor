import { TiptapEditor } from "../../model/TiptapGroup"

const title = '🌳 SmartHeading'

class TocHeading {
    level: number = 0
    text: string = "ROOT"
    id: string = ""
    children: TocHeading[] = []

    setLevel(level: number): TocHeading {
        this.level = level
        return this
    }

    setText(text: string): TocHeading {
        this.text = text
        return this
    }

    setId(id: string): TocHeading {
        this.id = id
        return this
    }

    firstChild(): TocHeading {
        return this.children[0]
    }

    appendChild(heading: TocHeading): TocHeading {
        this.children.push(heading)
        return this
    }

    updateLastChild(heading: TocHeading): TocHeading {
        this.children[this.children.length - 1] = heading
        return this
    }

    getLastChild(): TocHeading {
        return this.children[this.children.length - 1]
    }

    appendNode(node: TocHeading): TocHeading {
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

    static makeTree(editor: TiptapEditor): TocHeading {
        let headings: TocHeading[] = editor.storage.article.headings

        //console.log("makeTree with", headings)
        var root = new TocHeading()

        headings.forEach((heading) => {
            //console.log("appendNode", heading)
            root = root.appendNode(heading)
        })

        //console.log("makeTree result", root)
        return root
    }
}

export default TocHeading