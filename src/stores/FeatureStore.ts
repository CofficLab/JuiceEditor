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
            drawEnabled: false,
            tableEnabled: isDebug,
            contextMenu: true,
            // 代码框中的代码是否开启运行功能
            runCodeEnabled: false,
        }
    },

    actions: {
        disableEdit() {
            this.editable = false
            this.updateNonce()
        },

        disableTable() {
            this.tableEnabled = false
            this.updateNonce()
        },

        disableDraw() {
            this.drawEnabled = false
            this.updateNonce()
        },

        disableFloatingMenu() {
            this.floatingMenuVisible = false
            this.updateNonce()
        },

        disableBubbleMenu() {
            this.bubbleMenuVisible = false
            this.updateNonce()
        },

        disableFloatingMenuAndBubbleMenu() {
            this.floatingMenuVisible = false
            this.bubbleMenuVisible = false
            this.updateNonce()
        },

        disableContextMenu() {
            this.contextMenu = false
            this.updateNonce()
        },

        enableDraw() {
            this.drawEnabled = true
            this.updateNonce()
        },

        enableTable() {
            this.tableEnabled = true
            this.updateNonce()
        },

        enableContextMenu() {
            this.contextMenu = true
            this.updateNonce()
        },

        enableEdit() {
            this.editable = true
            this.updateNonce()
        },

        hideFloatingMenu() {
            this.floatingMenuVisible = false
            this.updateNonce()
        },

        hideToolbar() {
            this.toolbarVisible = false
            this.updateNonce()
        },

        hideBubbleMenu() {
            this.bubbleMenuVisible = false
            this.updateNonce()
        },

        hideEditor() {
            this.editorVisible = false
        },

        showToolbar() {
            this.toolbarVisible = true
            this.updateNonce()
        },

        showEditor() {
            this.editorVisible = true
        },

        showEditorAndEnableEdit() {
            this.showEditor()
            this.enableEdit()
            this.updateNonce()
        },

        showBubbleMenu() {
            this.bubbleMenuVisible = true
            this.updateNonce()
        },
        
        showFloatingMenu() {
            this.floatingMenuVisible = true
            this.updateNonce()
        },

        updateNonce() {
            this.nonce = Date.now().toString() + Math.random().toString()
        }
    },
})