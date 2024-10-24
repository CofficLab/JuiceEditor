import { v4 as uuidv4 } from 'uuid';
import NoUUIDError from '../error/NoUUIDError';

interface TreeNodeParams {
    uuid?: string;
    title?: string;
    isBook?: boolean;
    priority?: number;
    children?: Object[]
}

export default class TreeNode {
    public uuid: string = ""
    public title: string = ""
    public priority: number = 0
    public isBook: boolean = false
    public children: TreeNode[] = []

    static makeDefaultNode(): TreeNode {
        let treeNode = new TreeNode({
            uuid: uuidv4(),
            title: '',
        })

        return treeNode
    }

    static fromBase64(base64: string): TreeNode {
        let jsonString = atob(base64)

        try {
            let object = JSON.parse(jsonString)
            return new TreeNode(object)
        } catch (error) {
            console.error('🍋 SmartDraw: 解析树节点失败', error)
            throw new Error('🍋 SmartDraw: 解析树节点失败')
        }
    }

    static fromJSON(json: string): TreeNode {
        let object = JSON.parse(json)
        return new TreeNode(object)
    }

    constructor(params: TreeNodeParams) {
        if (params.uuid == null) {
            throw new NoUUIDError('uuid is empty')
        }

        this.uuid = params.uuid
        this.title = params.title || ""
        this.priority = params.priority || 0
        this.isBook = params.isBook || false
        this.children = []

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
        this.children = []
        if (params.children) {
            params.children.forEach((element: Object) => {
                this.children.push(new TreeNode(element))
            });
        }

        return this
    }

    setId(id: string): this {
        this.uuid = id
        return this
    }

    setTitle(title: string): this {
        this.title = title
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

    toJSONString(): string {
        return JSON.stringify(this)
    }

    sameWith(node: TreeNode): boolean {
        return JSON.stringify(this.toJSONString()) == JSON.stringify(node.toJSONString())
    }
}