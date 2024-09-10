import EditorDoc from "../model/EditorDoc";
import axios from 'axios';

export default class DocRequest {

    public baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    async getDoc(id: string): Promise<EditorDoc> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/doc/${id}`);
            return new EditorDoc(response.data);
        } catch (error) {
            throw error;
        }
    }
}