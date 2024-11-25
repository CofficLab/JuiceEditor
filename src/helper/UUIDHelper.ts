import { v4 as uuidv4 } from 'uuid';

export default class UUIDHelper {
    static generate(reason: string): string {

        if (!reason) {
            throw new Error("UUIDHelper.generate: reason is required")
        }

        // console.log("generate uuid", reason)

        return uuidv4({});
    }

    static isUUID(uuid: string): boolean {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
    }
}