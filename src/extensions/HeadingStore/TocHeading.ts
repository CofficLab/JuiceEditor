import { TiptapEditor } from "../../model/TiptapGroup"
import { HeadingStoreStorage } from "./HeadingStore"

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

    /**
     * 将node插入到当前heading中
     * @param node 
     * @returns TocHeading
     * @throws Error
     */
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

    flatten(): TocHeading[] {
        return this.children.flatMap((child) => [this, ...child.flatten()])
    }
}

export default TocHeading