import PageMode from "./PageMode"

export const AppProps = {
    drawio: {
        type: String,
        required: true
    },
    readonly: {
        type: Boolean,
        default: false
    },
    mode: {
        type: String,
        required: false,
        default: PageMode.BASIC_TYPE
    }
}