import { v4 as uuidv4 } from 'uuid'

export default class SmartMessage {
    public uuid: string = uuidv4()
    public text: string = ""
    public type: "tips" | "message" = "tips"

    constructor(text: string, type: "tips" | "message" = "tips") {
        this.text = text
        this.type = type
    }

    static empty() {
        return new SmartMessage('')
    }

    isMessage() {
        return this.type === "message"
    }

    isTips() {
        return this.type === "tips"
    }


}