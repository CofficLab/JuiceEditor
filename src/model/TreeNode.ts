import { JSONContent } from "@tiptap/core";
import EditorDoc from './EditorDoc';
import { v4 as uuidv4 } from 'uuid';

interface TreeNodeParams {
    uuid?: string;
    title?: string;
    isBook?: boolean;
    priority?: number;
    content?: string;
    json?: string;
    jsonContent?: JSONContent;
    characterCount?: number;
    wordCount?: number;
    lastSyncedAt?: string;
    children?: Object[]
    docs?: EditorDoc[]
}

export default class TreeNode {
    public uuid: string = ""
    public title: string = ""
    public priority: number = 0
    public isBook: boolean = false
    public content: string = ""
    public json: string = ""
    public characterCount: number = 0
    public wordCount: number = 0
    public lastSyncedAt: string = ""
    public children: TreeNode[] = []
    public jsonContent: JSONContent = {};
    public docs: EditorDoc[] = []
    public currentDocUUID: string = ""

    static makeDefaultNode(): TreeNode {
        let treeNode = new TreeNode({
            uuid: uuidv4(),
            title: '',
            content: '',
            characterCount: 0,
            wordCount: 0,
        }).setDocs([EditorDoc.makeDefaultDoc()])

        console.log(treeNode)

        return treeNode
    }

    constructor(public params: TreeNodeParams) {
        this.uuid = params.uuid || uuidv4()
        this.title = params.title || ""
        this.priority = params.priority || 0
        this.content = params.content || ""
        this.jsonContent = params.jsonContent || {}
        this.characterCount = params.characterCount || 0
        this.wordCount = params.wordCount || 0
        this.lastSyncedAt = params.lastSyncedAt || ""
        this.isBook = params.isBook || false
        this.children = []
        this.docs = params.docs?.map(doc => EditorDoc.fromObject(doc)) || []

        if (params.children) {
            params.children.forEach((element: TreeNodeParams) => {
                return this.children.push(new TreeNode(element));
            });
        }
    }

    update(params: TreeNodeParams): this {
        this.uuid = params.uuid || this.uuid
        this.title = params.title || this.title
        this.priority = params.priority || this.priority
        this.isBook = params.isBook || this.isBook
        this.content = params.content || this.content
        this.characterCount = params.characterCount || this.characterCount
        this.wordCount = params.wordCount || this.wordCount
        this.lastSyncedAt = params.lastSyncedAt || this.lastSyncedAt
        this.children = []
        if (params.children) {
            params.children.forEach((element: Object) => {
                this.children.push(new TreeNode(element))
            });
        }

        return this
    }

    getCurrentDoc(): EditorDoc {
        if (!this.currentDocUUID) {
            this.currentDocUUID = this.docs[0].uuid
        }

        return this.docs.find(doc => doc.uuid === this.currentDocUUID)
    }

    setId(id: string): this {
        this.uuid = id
        return this
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

    setDocs(docs: EditorDoc[]): this {
        this.docs = docs
        this.currentDocUUID = docs[0].uuid
        return this
    }

    toJSON(): Object {
        return {
            uuid: this.uuid,
            title: this.title,
            isBook: this.isBook,
            priority: this.priority,
            content: this.content,
            jsonContent: this.jsonContent,
            characterCount: this.characterCount,
            wordCount: this.wordCount,
            lastSyncedAt: this.lastSyncedAt,
            children: this.children,
            docs: this.docs,
            currentDocUUID: this.currentDocUUID
        }
    }

    toJSONString(): string {
        return JSON.stringify(this.toJSON())
    }

    sameWith(node: TreeNode): boolean {
        return JSON.stringify(this.toJSON()) == JSON.stringify(node.toJSON())
    }

    updateDoc(doc: EditorDoc): this {
        this.docs = this.docs.map((element: EditorDoc) => {
            if (element.uuid === doc.uuid) {
                return doc
            } else {
                return element
            }
        })

        return this
    }
}