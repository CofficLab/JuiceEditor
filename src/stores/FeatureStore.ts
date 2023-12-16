import { defineStore } from 'pinia'

const isDebug = process.env.NODE_ENV === 'development'

export const useFeatureStore = defineStore('feature-store', {
    state: () => {
        return {
            updatedAt: Date.now(),
            editable: isDebug,
            editorVisible: true,
            toolbarVisible: isDebug,
            drawEnabled: false,
            tableEnabled: isDebug,
            // 代码框中的代码是否开启运行功能
            runCodeEnabled: false,
        }
    },

    actions: {
        showToolbar() {
            this.toolbarVisible = true
            this.updatedAt = Date.now()
        },

        hideToolbar() {
            this.toolbarVisible = false
            this.updatedAt = Date.now()
        },

        showEditor() {
            this.editorVisible = true
            this.updatedAt = Date.now()
        },

        hideEditor() {
            this.editorVisible = false
            this.updatedAt = Date.now()
        },

        enableEdit() {
            this.editable = true
            this.updatedAt = Date.now()
        },

        disableEdit() {
            this.editable = false
            this.updatedAt = Date.now()
        },

        showEditorAndEnableEdit() {
            this.showEditor()
            this.enableEdit()
            this.updatedAt = Date.now()
        },

        enableDraw() {
            this.drawEnabled = true
            this.updatedAt = Date.now()
        },

        disableDraw() {
            this.drawEnabled = false
            this.updatedAt = Date.now()
        },

        enableTable() {
            this.tableEnabled = true
            this.updatedAt = Date.now()
        },

        disableTable() {
            this.tableEnabled = false
            this.updatedAt = Date.now()
        }
    },
})