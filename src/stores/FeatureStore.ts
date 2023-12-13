import { defineStore } from 'pinia'

export const useFeatureStore = defineStore('feature-store', {
    state: () => {
        return {
            updatedAt: Date.now(),
            editable: true,
            editorVisible: true,
            drawEnabled: false,
            tableEnabled: false,
        }
    },

    actions: {
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