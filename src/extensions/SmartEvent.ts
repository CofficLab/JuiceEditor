import { Extension } from '@tiptap/core'
import { Editor } from '@tiptap/core'
import SmartParagraph from './SmartParagraph'

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
