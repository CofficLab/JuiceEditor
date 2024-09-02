import { v4 as uuidv4 } from 'uuid'

export default class SmartMessage {
    public uuid: string = uuidv4()
    public text: string = ""

    constructor(text: string) {
        this.text = text
    }
}