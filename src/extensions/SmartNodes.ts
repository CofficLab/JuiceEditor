import { Extension, JSONContent } from "@tiptap/core"
import { Root } from "./Root"
import UUIDHelper from "../helper/UUIDHelper"
import SmartDoc from "./SmartDoc"

function flattenBlock(block: JSONContent): JSONContent[] {
    var newBlock = block

    if (newBlock.attrs == null) {
        newBlock.attrs = {}
    }

    if (newBlock.attrs.uuid == null) {
        newBlock.attrs.uuid = UUIDHelper.generate();
    }

    if (newBlock.type == Root.name) {
        newBlock.attrs.title = getTitle(newBlock)
    }

    var children = newBlock.content || []

    if (children.length > 0) {
        children.map(child => {
            child.attrs = child.attrs || {};

            if (child.type == Text.name) {
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
    if (json.type == Text.name) {
        return json.text ?? ""
    }

    let content = json.content
    if (!content || content.length == 0) {
        return ""
    }

    return getTitle(content[0])
}

export const SmartNodes = Extension.create({
    name: "smartNodes",

    addStorage() {
        return {
            verbose: true,
            enabled: true,
            title: "",
            nodes: [] as JSONContent[],
            emoji: "👫 SmartNodes",
        }
    },

    onCreate() {
        this.storage.title = getTitle(this.editor.getJSON())
        this.storage.nodes = flattenBlock(this.editor.getJSON())
    },

    onUpdate() {
        this.storage.nodes = flattenBlock(this.editor.getJSON())
        this.storage.title = getTitle(this.editor.getJSON())
    },
})
