import { v4 as uuidv4 } from 'uuid';

export default class UUIDHelper {
    static generate(): string {
        return uuidv4();
    }
}