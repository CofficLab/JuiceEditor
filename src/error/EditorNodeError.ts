import EditorNode from "../model/EditorNode"

class EditorNodeNoParentIdError extends Error {
    block: EditorNode

    constructor(message: string = 'Parent ID is not set', block: EditorNode) {
        super(message)
        this.block = block
    }
}

class EditorNodeNoUUIDError extends Error {
    block: EditorNode

    constructor(message: string = 'UUID is not set', block: EditorNode) {
        super(message)
        this.block = block
    }
}

export {
    EditorNodeNoParentIdError,
    EditorNodeNoUUIDError
}