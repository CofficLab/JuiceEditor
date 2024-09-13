import { generateJSON, JSONContent } from '@tiptap/core'
import Config from '../config/config'

let title = "🔌 EditorApi"

export default class EditorApi {
    public getJSONFromHTML(html: string): JSONContent {
        return generateJSON(html, Config.extensions)
    }

    public getBlocksFromHTML(html: string): JSONContent[] {
        return flattenBlock(generateJSON(html, Config.extensions))
    }

    public ping(): string {
        return 'pong'
    }
}

function flattenBlock(block: JSONContent): JSONContent[] {
    var flattened: JSONContent[] = [block]
    if (block.content) {
        block.content.forEach(content => {
            flattened = flattened.concat(flattenBlock(content))
        })
    }

    const collection = flattened.map(b => {
        const { content, ...rest } = b;
        return rest;
    });

    console.log(collection)
    return collection
}

