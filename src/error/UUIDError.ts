import { JSONContent } from "@tiptap/core"

class UUIDError extends Error {
    block: JSONContent

    constructor(message: string = 'UUID is null', block: JSONContent) {
        super(message);
        this.name = 'UUIDError';
        this.block = block
    }
}

export default UUIDError