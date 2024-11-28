import { Extension } from '@tiptap/core'
import SmartHeading from './SmartHeading'
import { priorityOfNodeStore } from '../model/TiptapGroup'
export interface LogStoreStorage {
    verbose: boolean,
    title: string,
    logs: string[],
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        logStore: {
            enableLogStoreVerbose: () => ReturnType
            disableLogStoreVerbose: () => ReturnType
            appendLog: (log: string) => ReturnType
        }
    }
}

const LogStore = Extension.create<{}, LogStoreStorage>({
    name: 'logStore',

    group: 'block',

    priority: priorityOfNodeStore,

    addStorage() {
        return {
            verbose: false,
            title: "🐽 LogStore",
            logs: [],
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: [SmartHeading.name],
                attributes: {
                    id: {
                        default: "0",
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            enableLogStoreVerbose: () => () => {
                this.storage.verbose = true
                return true
            },

            disableLogStoreVerbose: () => () => {
                this.storage.verbose = false
                return true
            },

            appendLog: (log: string) => () => {
                this.storage.logs.push(log)
                return true
            },
        }
    },
})

export default LogStore
