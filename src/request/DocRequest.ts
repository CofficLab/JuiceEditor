import EditorData from "../model/EditorData";
import axios from 'axios';

export default class DocRequest {

    public baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    async getDoc(id: string): Promise<EditorData> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/doc/${id}`);
            return new EditorData(response.data);
        } catch (error) {
            throw error;
        }
    }
}