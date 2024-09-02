import { defineStore } from 'pinia'

const isDebug = process.env.NODE_ENV === 'development'
const verbose = false
const title = '🔧 FeatureStore'

export const useFeatureStore = defineStore('feature-store', {
    state: () => {
        return {
            nonce: Date.now().toString() + Math.random().toString(),
            editable: true,
            editorVisible: true,
            toolbarVisible: isDebug,
            bubbleMenuVisible: true,
            floatingMenuVisible: true,
            drawEnabled: true,
            tableEnabled: true,
            contextMenu: true,
            // 代码框中的代码是否开启运行功能
            runCodeEnabled: false,
        }
    },

    actions: {
        disableEdit() {
            if (verbose) {
                console.log(title, 'disableEdit')
            }
            this.editable = false
            this.updateNonce()
        },

        disableTable() {
            if (verbose) {
                console.log(title, 'disableTable')
            }
            this.tableEnabled = false
            this.updateNonce()
        },

        disableDraw() {
            if (verbose) {
                console.log(title, 'disableDraw')
            }
            this.drawEnabled = false
            this.updateNonce()
        },

        disableFloatingMenu() {
            if (verbose) {
                console.log(title, 'disableFloatingMenu')
            }
            this.floatingMenuVisible = false
            this.updateNonce()
        },

        disableBubbleMenu() {
            if (verbose) {
                console.log(title, 'disableBubbleMenu')
            }
            this.bubbleMenuVisible = false
            this.updateNonce()
        },

        disableFloatingMenuAndBubbleMenu() {
            if (verbose) {
                console.log(title, 'disableFloatingMenuAndBubbleMenu')
            }
            this.floatingMenuVisible = false
            this.bubbleMenuVisible = false
            this.updateNonce()
        },

        disableContextMenu() {
            if (verbose) {
                console.log(title, 'disableContextMenu')
            }
            this.contextMenu = false
            this.updateNonce()
        },

        enableDraw() {
            if (verbose) {
                console.log(title, 'enableDraw')
            }
            this.drawEnabled = true
            this.updateNonce()
        },

        enableTable() {
            if (verbose) {
                console.log(title, 'enableTable')
            }
            this.tableEnabled = true
            this.updateNonce()
        },

        enableContextMenu() {
            if (verbose) {
                console.log(title, 'enableContextMenu')
            }
            this.contextMenu = true
            this.updateNonce()
        },

        enableEdit() {
            if (verbose) {
                console.log(title, 'enableEdit')
            }
            this.editable = true
        },

        enableBubbleMenu() {
            if (verbose) {
                console.log(title, 'enableBubbleMenu')
            }
            this.bubbleMenuVisible = true
            this.updateNonce()
        },

        enableFloatingMenu() {
            if (verbose) {
                console.log(title, 'enableFloatingMenu')
            }
            this.floatingMenuVisible = true
            this.updateNonce()
        },

        hideFloatingMenu() {
            if (verbose) {
                console.log(title, 'hideFloatingMenu')
            }
            this.floatingMenuVisible = false
            this.updateNonce()
        },

        hideToolbar() {
            if (verbose) {
                console.log(title, 'hideToolbar')
            }
            this.toolbarVisible = false
            this.updateNonce()
        },

        hideBubbleMenu() {
            if (verbose) {
                console.log(title, 'hideBubbleMenu')
            }
            this.bubbleMenuVisible = false
            this.updateNonce()
        },

        hideEditor() {
            if (verbose) {
                console.log(title, 'hideEditor')
            }
            this.editorVisible = false
        },

        showToolbar() {
            if (verbose) {
                console.log(title, 'showToolbar')
            }
            this.toolbarVisible = true
            this.updateNonce()
        },

        showEditor() {
            if (verbose) {
                console.log(title, 'showEditor')
            }
            this.editorVisible = true
        },

        showEditorAndEnableEdit() {
            if (verbose) {
                console.log(title, 'showEditorAndEnableEdit')
            }
            this.showEditor()
            this.enableEdit()
        },

        showBubbleMenu() {
            if (verbose) {
                console.log(title, 'showBubbleMenu')
            }
            this.bubbleMenuVisible = true
            this.updateNonce()
        },

        showFloatingMenu() {
            if (verbose) {
                console.log(title, 'showFloatingMenu')
            }
            this.floatingMenuVisible = true
            this.updateNonce()
        },

        toggleFloatingMenu() {
            if (verbose) {
                console.log(title, 'toggleFloatingMenu')
            }
            this.floatingMenuVisible = !this.floatingMenuVisible
            this.updateNonce()
        },

        updateNonce() {
            this.nonce = Date.now().toString() + Math.random().toString()
        }
    },
})

export type FeatureStore = ReturnType<typeof useFeatureStore>
