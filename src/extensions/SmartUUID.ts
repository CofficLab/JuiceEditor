import SmartHeading from './SmartHeading'
import SmartParagraph from './SmartParagraph'
import SmartTable from './SmartTable'
import SmartTableRow from './SmartTableRow'
import SmartTableCell from './SmartTableCell'
import SmartTableHeader from './SmartTableHeader'
import SmartTaskItem from './SmartTaskItem'
import SmartTaskList from './SmartTaskList'
import SmartImage from './SmartImage/SmartImage'
import SmartCodeBlock from './SmartCodeBlock/SmartCodeBlock'
import SmartQuote from './SmartQuote'
import { Node } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'
import UUIDHelper from '../helper/UUIDHelper'
import Article from './Article'

export interface SmartUUIDStorage {
    title: string
    verbose: boolean
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        smartUUID: {
            enableSmartUUIDVerbose: () => ReturnType
            disableSmartUUIDVerbose: () => ReturnType
        }
    }
}

const types = {
    [Article.name]: true,
    [SmartHeading.name]: true,
    [SmartParagraph.name]: true,
    [SmartTable.name]: true,
    [SmartTableRow.name]: true,
    [SmartTableCell.name]: true,
    [SmartTableHeader.name]: true,
    [SmartTaskItem.name]: true,
    [SmartTaskList.name]: true,
    [SmartImage.name]: true,
    [SmartCodeBlock.name]: true,
    [SmartQuote.name]: true,
}

const SmartUUID = Node.create({
    name: 'uuid',

    addStorage() {
        return {
            title: "🧱 SmartUUID",
            verbose: false,
        }
    },

    addCommands() {
        return {
            enableSmartUUIDVerbose: () => () => {
                this.storage.verbose = true

                return true
            },

            disableSmartUUIDVerbose: () => () => {
                this.storage.verbose = false

                return true
            },
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: Object.keys(types),
                attributes: {
                    uuid: {
                        default: null,
                        rendered: true,
                        keepOnSplit: false,
                    },
                },
            },
        ]
    },

    addProseMirrorPlugins() {
        let verbose = this.storage.verbose
        let title = this.storage.title

        return [
            new Plugin({
                appendTransaction(transactions, oldState, newState) {


                    // no changes
                    if (newState.doc === oldState.doc) {
                        return
                    }
                    const tr = newState.tr

                    newState.doc.descendants((node, pos, parent) => {
                        if (
                            node.isBlock &&
                            // parent === newState.doc &&
                            !node.attrs.uuid &&
                            types[node.type.name]
                        ) {
                            if (verbose) {
                                console.warn(title, "add uuid for", node.type.name)
                            }

                            tr.setNodeMarkup(pos, undefined, {
                                ...node.attrs,
                                uuid: UUIDHelper.generate("SmartUUID"),
                            })
                        }
                    })

                    return tr
                },
            }),
        ]
    },
})

export default SmartUUID