import { defineStore } from 'pinia'

const isDebug = process.env.NODE_ENV === 'development'
const verbose = false

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
                console.log('🔧 FeatureStore: disableEdit')
            }
            this.editable = false
            this.updateNonce()
        },

        disableTable() {
            if (verbose) {
                console.log('🔧 FeatureStore: disableTable')
            }
            this.tableEnabled = false
            this.updateNonce()
        },

        disableDraw() {
            if (verbose) {
                console.log('🔧 FeatureStore: disableDraw')
            }
            this.drawEnabled = false
            this.updateNonce()
        },

        disableFloatingMenu() {
            if (verbose) {
                console.log('🔧 FeatureStore: disableFloatingMenu')
            }
            this.floatingMenuVisible = false
            this.updateNonce()
        },

        disableBubbleMenu() {
            if (verbose) {
                console.log('🔧 FeatureStore: disableBubbleMenu')
            }
            this.bubbleMenuVisible = false
            this.updateNonce()
        },

        disableFloatingMenuAndBubbleMenu() {
            if (verbose) {
                console.log('🔧 FeatureStore: disableFloatingMenuAndBubbleMenu')
            }
            this.floatingMenuVisible = false
            this.bubbleMenuVisible = false
            this.updateNonce()
        },

        disableContextMenu() {
            if (verbose) {
                console.log('🔧 FeatureStore: disableContextMenu')
            }
            this.contextMenu = false
            this.updateNonce()
        },

        enableDraw() {
            if (verbose) {
                console.log('🔧 FeatureStore: enableDraw')
            }
            this.drawEnabled = true
            this.updateNonce()
        },

        enableTable() {
            if (verbose) {
                console.log('🔧 FeatureStore: enableTable')
            }
            this.tableEnabled = true
            this.updateNonce()
        },

        enableContextMenu() {
            if (verbose) {
                console.log('🔧 FeatureStore: enableContextMenu')
            }
            this.contextMenu = true
            this.updateNonce()
        },

        enableEdit() {
            if (verbose) {
                console.log('🔧 FeatureStore: enableEdit')
            }
            this.editable = true
        },

        enableBubbleMenu() {
            if (verbose) {
                console.log('🔧 FeatureStore: enableBubbleMenu')
            }
            this.bubbleMenuVisible = true
            this.updateNonce()
        },

        enableFloatingMenu() {
            if (verbose) {
                console.log('🔧 FeatureStore: enableFloatingMenu')
            }
            this.floatingMenuVisible = true
            this.updateNonce()
        },

        hideFloatingMenu() {
            if (verbose) {
                console.log('🔧 FeatureStore: hideFloatingMenu')
            }
            this.floatingMenuVisible = false
            this.updateNonce()
        },

        hideToolbar() {
            if (verbose) {
                console.log('🔧 FeatureStore: hideToolbar')
            }
            this.toolbarVisible = false
            this.updateNonce()
        },

        hideBubbleMenu() {
            if (verbose) {
                console.log('🔧 FeatureStore: hideBubbleMenu')
            }
            this.bubbleMenuVisible = false
            this.updateNonce()
        },

        hideEditor() {
            if (verbose) {
                console.log('🔧 FeatureStore: hideEditor')
            }
            this.editorVisible = false
        },

        showToolbar() {
            if (verbose) {
                console.log('🔧 FeatureStore: showToolbar')
            }
            this.toolbarVisible = true
            this.updateNonce()
        },

        showEditor() {
            if (verbose) {
                console.log('🔧 FeatureStore: showEditor')
            }
            this.editorVisible = true
        },

        showEditorAndEnableEdit() {
            if (verbose) {
                console.log('🔧 FeatureStore: showEditorAndEnableEdit')
            }
            this.showEditor()
            this.enableEdit()
        },

        showBubbleMenu() {
            if (verbose) {
                console.log('🔧 FeatureStore: showBubbleMenu')
            }
            this.bubbleMenuVisible = true
            this.updateNonce()
        },

        showFloatingMenu() {
            if (verbose) {
                console.log('🔧 FeatureStore: showFloatingMenu')
            }
            this.floatingMenuVisible = true
            this.updateNonce()
        },

        toggleFloatingMenu() {
            if (verbose) {
                console.log('🔧 FeatureStore: toggleFloatingMenu')
            }
            this.floatingMenuVisible = !this.floatingMenuVisible
            this.updateNonce()
        },

        updateNonce() {
            this.nonce = Date.now().toString() + Math.random().toString()
        }
    },
})