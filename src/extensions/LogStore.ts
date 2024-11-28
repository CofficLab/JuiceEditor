import { Extension } from '@tiptap/core'
import SmartHeading from './SmartHeading'
import SmartLog from '../model/SmartLog'
import { priorityOfNodeStore } from '../model/TiptapGroup'

export interface LogStoreStorage {
    verbose: boolean,
    title: string,
    logs: SmartLog[],
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        logStore: {
            enableLogStoreVerbose: () => ReturnType
            disableLogStoreVerbose: () => ReturnType
            appendLog: (channel: string, message: string) => ReturnType
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

            appendLog: (channel: string, message: string) => () => {
                this.storage.logs.push(new SmartLog(channel, message))
                return true
            },
        }
    },
})

export default LogStore
