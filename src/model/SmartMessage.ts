import { v4 as uuidv4 } from 'uuid'

export default class SmartMessage {
    public uuid: string = uuidv4()
    public text: string = ""
    public type: string = "tips"

    constructor(text: string) {
        this.text = text
    }

    static empty() {
        return new SmartMessage('')
    }
}