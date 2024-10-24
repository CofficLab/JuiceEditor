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
        // Before the view is created.
        console.log('onBeforeCreate')
    },

    onCreate() {
        // The editor is ready.
        console.log('onCreate')
    },
    onUpdate() {
        // The content has changed.
        console.log('onUpdate')
    },
    onSelectionUpdate() {
        // The selection has changed.
        console.log('onSelectionUpdate')
    },
    onTransaction() {
        // The editor state has changed.
        console.log('onTransaction')
    },
    onFocus() {
        // The editor is focused.
        console.log('onFocus')
    },
    onBlur() {
        // The editor isn’t focused anymore.
        console.log('onBlur')
    },
    onDestroy() {
        // The editor is being destroyed.
        console.log('onDestroy')
    },
    onPaste(event: ClipboardEvent, slice: Slice) {
        // The editor is being pasted into.
        console.log('onPaste', event, slice)
    },
    onDrop(event: DragEvent, slice: Slice, moved: boolean) {
        // The editor is being pasted into.
        console.log('onDrop', event, slice, moved)
    },
    onContentError({ editor, error, disableCollaboration }: { editor: Editor; error: Error; disableCollaboration: () => void }) {
        // The editor content does not match the schema.
        console.log('onContentError', editor, error, disableCollaboration)
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
