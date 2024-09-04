import { v4 as uuidv4 } from 'uuid';

export default class UUIDHelper {
    static generate(): string {
        return uuidv4();
    }

    static isUUID(uuid: string): boolean {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
    }
}