import { defineStore } from 'pinia'

const isDebug = process.env.NODE_ENV === 'development'

export const useFeatureStore = defineStore('feature-store', {
    state: () => {
        return {
            nonce: Date.now().toString() + Math.random().toString(),
            editable: isDebug,
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
            console.log('🔧 FeatureStore: disableEdit')
            this.editable = false
            this.updateNonce()
        },

        disableTable() {
            console.log('🔧 FeatureStore: disableTable')
            this.tableEnabled = false
            this.updateNonce()
        },

        disableDraw() {
            console.log('🔧 FeatureStore: disableDraw')
            this.drawEnabled = false
            this.updateNonce()
        },

        disableFloatingMenu() {
            console.log('🔧 FeatureStore: disableFloatingMenu')
            this.floatingMenuVisible = false
            this.updateNonce()
        },

        disableBubbleMenu() {
            console.log('🔧 FeatureStore: disableBubbleMenu')
            this.bubbleMenuVisible = false
            this.updateNonce()
        },

        disableFloatingMenuAndBubbleMenu() {
            console.log('🔧 FeatureStore: disableFloatingMenuAndBubbleMenu')
            this.floatingMenuVisible = false
            this.bubbleMenuVisible = false
            this.updateNonce()
        },

        disableContextMenu() {
            console.log('🔧 FeatureStore: disableContextMenu')
            this.contextMenu = false
            this.updateNonce()
        },

        enableDraw() {
            console.log('🔧 FeatureStore: enableDraw')
            this.drawEnabled = true
            this.updateNonce()
        },

        enableTable() {
            console.log('🔧 FeatureStore: enableTable')
            this.tableEnabled = true
            this.updateNonce()
        },

        enableContextMenu() {
            console.log('🔧 FeatureStore: enableContextMenu')
            this.contextMenu = true
            this.updateNonce()
        },

        enableEdit() {
            console.log('🔧 FeatureStore: enableEdit')
            this.editable = true
        },

        enableBubbleMenu() {
            console.log('🔧 FeatureStore: enableBubbleMenu')
            this.bubbleMenuVisible = true
            this.updateNonce()
        },

        enableFloatingMenu() {
            console.log('🔧 FeatureStore: enableFloatingMenu')
            this.floatingMenuVisible = true
            this.updateNonce()
        },

        hideFloatingMenu() {
            console.log('🔧 FeatureStore: hideFloatingMenu')
            this.floatingMenuVisible = false
            this.updateNonce()
        },

        hideToolbar() {
            console.log('🔧 FeatureStore: hideToolbar')
            this.toolbarVisible = false
            this.updateNonce()
        },

        hideBubbleMenu() {
            console.log('🔧 FeatureStore: hideBubbleMenu')
            this.bubbleMenuVisible = false
            this.updateNonce()
        },

        hideEditor() {
            console.log('🔧 FeatureStore: hideEditor')
            this.editorVisible = false
        },

        showToolbar() {
            console.log('🔧 FeatureStore: showToolbar')
            this.toolbarVisible = true
            this.updateNonce()
        },

        showEditor() {
            console.log('🔧 FeatureStore: showEditor')
            this.editorVisible = true
        },

        showEditorAndEnableEdit() {
            console.log('🔧 FeatureStore: showEditorAndEnableEdit')
            this.showEditor()
            this.enableEdit()
        },

        showBubbleMenu() {
            console.log('🔧 FeatureStore: showBubbleMenu')
            this.bubbleMenuVisible = true
            this.updateNonce()
        },

        showFloatingMenu() {
            console.log('🔧 FeatureStore: showFloatingMenu')
            this.floatingMenuVisible = true
            this.updateNonce()
        },

        toggleFloatingMenu() {
            console.log('🔧 FeatureStore: toggleFloatingMenu')
            this.floatingMenuVisible = !this.floatingMenuVisible
            this.updateNonce()
        },

        updateNonce() {
            this.nonce = Date.now().toString() + Math.random().toString()
        }
    },
})