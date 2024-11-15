import { TiptapExtension } from '../model/TiptapGroup'
import { JSONContent } from "@tiptap/core"

import { Root } from "./Root"
import SmartDoc from "./SmartDoc"
import SmartText from "./SmartText"

class UUIDError extends Error {
    block: JSONContent

    constructor(message: string = 'UUID is null', block: JSONContent) {
        super(message);
        this.name = 'UUIDError';
        this.block = block
    }
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        smartNodes: {
            cacheTitleAndNodes: () => ReturnType
            enableSmartNodesVerbose: () => ReturnType
            disableSmartNodesVerbose: () => ReturnType
        }
    }
}

function flattenBlock(block: JSONContent): JSONContent[] {
    var newBlock = block

    if (newBlock.attrs == null) {
        newBlock.attrs = {}
    }

    if (newBlock.attrs.uuid == null && newBlock.type != SmartDoc.name) {
        throw new UUIDError('UUID is null', newBlock);
    }

    if (newBlock.type == Root.name) {
        newBlock.attrs.title = getTitle(newBlock)
    }

    var children = newBlock.content || []

    if (children.length > 0) {
        children.map(child => {
            child.attrs = child.attrs || {};

            if (child.type == SmartText.name) {
                if (newBlock.attrs && newBlock.attrs.uuid) {
                    child.attrs.uuid = "text-" + newBlock.attrs.uuid;
                }
            }

            if (newBlock.type !== SmartDoc.name) {
                child.attrs.parent = newBlock.attrs!.uuid;
            }
        });
    }

    var flattened: JSONContent[] = []

    if (newBlock.type != SmartDoc.name) {
        flattened.push(newBlock)
    }

    if (children.length > 0) {
        children.forEach(content => {
            flattened = flattened.concat(flattenBlock(content))
        })
    }

    const collection = flattened.map(b => {
        const { content, ...rest } = b;
        return rest;
    });

    collection.forEach(b => {
        if (!b.attrs?.uuid) {
            console.warn("uuid is null", b)
        }
    })

    return collection
}

function getTitle(json: JSONContent): string {
    if (json.type == SmartText.name) {
        return json.text ?? ""
    }

    let content = json.content
    if (!content || content.length == 0) {
        return ""
    }

    return getTitle(content[0])
}

export const SmartNodes = TiptapExtension.create({
    name: "smartNodes",

    priority: 1000,

    addStorage() {
        return {
            verbose: false,
            enabled: true,
            title: "",
            nodes: [] as JSONContent[],
            emoji: "👫 SmartNodes",
        }
    },

    onUpdate() {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(this.storage.emoji, "onUpdate")
        }

        try {
            this.storage.nodes = flattenBlock(this.editor.getJSON())
        } catch (e: Error | any) {
            this.editor.commands.showAlert('缺少 UUID', {
                error: e.message,
                block_type: e.block.type,
                block_attrs: e.block.attrs,
                reporter: this.storage.emoji,
                stage: 'onUpdate'
            })
        }
        this.storage.title = getTitle(this.editor.getJSON())

        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(this.storage.emoji, "onUpdate:updateTitle", this.storage.title)
            this.editor.commands.webKitSendDebugMessage(this.storage.emoji + ' Update Title: ' + this.storage.title)
        }
    },

    addCommands() {
        return {
            /**
             * call this after 
             * - editor is mounted(means the host element is ready, not onCreate)
             * - editor content is ready
             */
            cacheTitleAndNodes: () => () => {
                if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
                    console.log(this.storage.emoji, '🚩 cache title and nodes')
                }

                this.storage.title = getTitle(this.editor.getJSON())

                try {
                    this.storage.nodes = flattenBlock(this.editor.getJSON())
                } catch (e: UUIDError | any) {
                    this.editor.commands.showAlert('Error saving title and nodes', {
                        error: e.message,
                        block_type: e.block.type,
                        block_attrs: e.block.attrs,
                        reporter: this.storage.emoji,
                        stage: 'cacheTitleAndNodes',
                        html: this.editor.getHTML()
                    })
                }

                return true
            },

            enableSmartNodesVerbose: () => () => {
                this.storage.verbose = true
                return true
            },

            disableSmartNodesVerbose: () => () => {
                this.storage.verbose = false
                return true
            }
        }
    }
})