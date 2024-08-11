const SmartEditorProps = {
    uuid: {
        type: String,
        required: true,
        default: ''
    },
    drawLink: {
        type: String,
        default: '',
        required: true
    },
    content: {
        type: String,
        default: ''
    },
    editable: {
        type: Boolean,
        default: false
    },
    drawEnable: {
        required: true,
        type: Boolean,
        default: false
    },
    tableEnable: {
        type: Boolean,
        default: false,
        required: true
    },
    bubbleMenusEnable: {
        type: Boolean,
        default: true,
        required: true
    },
    floatingMenusEnable: {
        type: Boolean,
        default: true,
        required: true
    },
    onCreate: {
        type: Function,
        default: () => { }
    },
    onUpdate: {
        type: Function,
        default: () => { }
    },
    onSelectionUpdate: {
        type: Function,
        default: () => { }
    },
    onMessage: {
        type: Function,
        default: () => { }
    }
}

export default SmartEditorProps;