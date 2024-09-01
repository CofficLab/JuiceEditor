import { Store } from 'pinia';

let title = "🍎 ApiBase"

export default class ApiBase {
    public getBase64Object(base64: string): object {
        return JSON.parse(atob(base64))
    }

    public getBase64ObjectArray(base64: string): object[] {
        return JSON.parse(atob(base64))
    }
}