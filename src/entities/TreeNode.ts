import { JSONContent } from "@tiptap/core";

interface TreeNodeParams {
    id?: string;
    title?: string;
    isBook?: boolean;
    priority?: number;
    content?: string;
    jsonContent?: JSONContent;
    characterCount?: number;
    wordCount?: number;
    lastSyncedAt?: string;
    children?: Object[]
}

export default class TreeNode {
    public id: string = ""
    public title: string = ""
    public priority: number = 0
    public isBook: boolean = false
    public content: string = ""
    public characterCount: number = 0
    public wordCount: number = 0
    public lastSyncedAt: string = ""
    public children: TreeNode[] = []
    jsonContent: JSONContent = {};

    constructor(public params: TreeNodeParams) {
        this.id = params.id || ""
        this.title = params.title || ""
        this.priority = params.priority || 0
        this.content = params.content || ""
        this.jsonContent = params.jsonContent || {}
        this.characterCount = params.characterCount || 0
        this.wordCount = params.wordCount || 0
        this.lastSyncedAt = params.lastSyncedAt || ""
        this.isBook = params.isBook || false
        this.children = []

        if (params.children) {
            params.children.forEach((element: Object) => {
                this.children.push(new TreeNode(element))
            });
        }
    }

    setTitle(title: string): this {
        this.title = title
        return this
    }

    setContent(content: string): this {
        this.content = content
        return this
    }

    setJsonContent(jsonContent: JSONContent): this {
        this.jsonContent = jsonContent
        return this
    }

    setCharacterCount(characterCount: number): this {
        this.characterCount = characterCount
        return this
    }

    setWordCount(wordCount: number): this {
        this.wordCount = wordCount
        return this
    }

    setLastSyncedAt(lastSyncedAt: string): this {
        this.lastSyncedAt = lastSyncedAt
        return this
    }

    setPriority(priority: number): this {
        this.priority = priority
        return this
    }

    setIsBook(isBook: boolean): this {
        this.isBook = isBook
        return this
    }

    setChildren(children: TreeNode[]): this {
        this.children = children
        return this
    }

    toJSON(): Object {
        return {
            id: this.id,
            title: this.title,
            isBook: this.isBook,
            priority: this.priority,
            content: this.content,
            jsonContent: this.jsonContent,
            characterCount: this.characterCount,
            wordCount: this.wordCount,
            lastSyncedAt: this.lastSyncedAt,
            children: this.children
        }
    }

    sameWith(node: TreeNode): boolean {
        return JSON.stringify(this.toJSON()) == JSON.stringify(node.toJSON())
    }
}