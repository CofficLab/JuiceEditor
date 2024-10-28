import TiptapExtension from '../model/TiptapExtension'
import TiptapEditor from '../model/TiptapEditor'
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

export const SmartEvent = TiptapExtension.create({
    name: 'smartEvent',

    addOptions() {
        return {
            eventName: 'editor:event'
        }
    },

    addStorage() {
        return {
            verbose: false
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
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(emoji, "onBeforeCreate")
        }
    },

    onCreate() {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(emoji, "onCreate")
        }
    },

    onUpdate() {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(emoji, "onUpdate")
        }
    },
    onSelectionUpdate() {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(emoji, "onSelectionUpdate")
        }
    },
    onTransaction() {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(emoji, "onTransaction")
        }
    },
    onFocus() {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(emoji, "onFocus")
        }
    },
    onBlur() {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(emoji, "onBlur")
        }
    },
    onDestroy() {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(emoji, "onDestroy")
        }
    },
    onPaste(event: ClipboardEvent, slice: Slice) {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(emoji, "onPaste", event, slice)
        }
    },
    onDrop(event: DragEvent, slice: Slice, moved: boolean) {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(emoji, "onDrop", event, slice, moved)
        }
    },
    onContentError({ editor, error, disableCollaboration }: { editor: Editor; error: Error; disableCollaboration: () => void }) {
        if (this.storage.verbose && this.editor.storage.smartLog.enabled) {
            console.log(emoji, "onContentError", editor, error, disableCollaboration)
        }
    },

})

function getDebugInfos(name: SmartEventName, editor: TiptapEditor) {
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
