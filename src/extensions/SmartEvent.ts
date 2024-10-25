import { Extension } from '@tiptap/core'
import { Editor } from '@tiptap/core'
import SmartParagraph from './SmartParagraph'
import { Slice } from 'prosemirror-model'

export enum EditorErrorType {
    ContentError = 'content:error',
}

export enum SmartEventName {
    TranslationError = 'translation:error',
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartEvent: {
            emit: (event: SmartEventName, message: string, isError: boolean) => ReturnType
            emitError: (name: SmartEventName, message: string) => ReturnType
        }
    }
}

const emoji = "🧩 SmartEvent"

export const SmartEvent = Extension.create({
    name: 'smartEvent',

    addOptions() {
        return {
            eventName: 'editor:event'
        }
    },

    addCommands() {
        return {
            emit: (event: SmartEventName, message: string, isError: boolean = false) => ({ }) => {
                window.dispatchEvent(new CustomEvent(this.options.eventName, {
                    detail: {
                        name: event,
                        message: message,
                        isError: isError,
                        debug: getDebugInfos(event, this.editor)
                    }
                }));

                return true;
            },

            emitError: (name: SmartEventName, message: string) => ({ commands }) => {
                commands.emit(name, message, true)
                return true
            }
        }
    },

    onBeforeCreate() {
        let verbose = true

        if (verbose) {
            console.log(emoji, "onBeforeCreate")
        }
    },

    onCreate() {
        let verbose = true

        if (verbose) {
            console.log(emoji, "onCreate")
        }
    },

    onUpdate() {
        let verbose = true

        if (verbose) {
            console.log(emoji, "onUpdate")
        }
    },
    onSelectionUpdate() {
        let verbose = true

        if (verbose) {
            console.log(emoji, "onSelectionUpdate")
        }
    },
    onTransaction() {
        let verbose = true

        if (verbose) {
            console.log(emoji, "onTransaction")
        }
    },
    onFocus() {
        let verbose = true

        if (verbose) {
            console.log(emoji, "onFocus")
        }
    },
    onBlur() {
        let verbose = true

        if (verbose) {
            console.log(emoji, "onBlur")
        }
    },
    onDestroy() {
        let verbose = true

        if (verbose) {
            console.log(emoji, "onDestroy")
        }
    },
    onPaste(event: ClipboardEvent, slice: Slice) {
        let verbose = true

        if (verbose) {
            console.log(emoji, "onPaste", event, slice)
        }
    },
    onDrop(event: DragEvent, slice: Slice, moved: boolean) {
        let verbose = true

        if (verbose) {
            console.log(emoji, "onDrop", event, slice, moved)
        }
    },
    onContentError({ editor, error, disableCollaboration }: { editor: Editor; error: Error; disableCollaboration: () => void }) {
        let verbose = true

        if (verbose) {
            console.log(emoji, "onContentError", editor, error, disableCollaboration)
        }
    },

})

function getDebugInfos(name: SmartEventName, editor: Editor) {
    switch (name) {
        case SmartEventName.TranslationError:
            let translateApi = editor.extensionManager.extensions.find(extension => extension.name === SmartParagraph.name)?.options.translateApi
            return {
                translateApi: translateApi,
                tips: '检查翻译API是否正确配置'
            }
        default:
            return {}
    }
}
