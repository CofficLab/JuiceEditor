import { v4 as uuidv4 } from 'uuid'

export default class SmartMessage {
    public uuid: string = uuidv4()
    public text: string = ""
    public type: "tips" | "debug" = "tips"

    constructor(text: string, type: "tips" | "debug" = "tips") {
        this.text = text
        this.type = type
    }

    static empty() {
        return new SmartMessage('')
    }

    isTips() {
        return this.type === "tips"
    }

    isDebug() {
        return this.type === "debug"
    }
}