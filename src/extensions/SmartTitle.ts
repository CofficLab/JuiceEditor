import { Extension, JSONContent } from "@tiptap/core"

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartSlot: {
            loadContentFromSlot: () => ReturnType
        }
    }
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

export const SmartTitle = Extension.create({
    name: "smartTitle",

    addStorage() {
        return {
            verbose: true,
            emoji: "👂 TitleListener",
            title: "",
        }
    },

    onCreate() {
        this.storage.title = getTitle(this.editor.getJSON())
    },

    onUpdate() {
        this.storage.title = getTitle(this.editor.getJSON())
    },
})