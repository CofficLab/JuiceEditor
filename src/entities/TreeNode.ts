interface TreeNodeParams {
    id?: string;
    title?: string;
    isBook?: boolean;
    priority?: number;
    content?: string;
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

    constructor(public params: TreeNodeParams) {
        this.id = params.id || ""
        this.title = params.title || ""
        this.priority = params.priority || 0
        this.content = params.content || ""
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
}