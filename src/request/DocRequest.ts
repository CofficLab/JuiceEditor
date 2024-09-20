import EditorData from "../model/EditorData";
import axios from 'axios';

export default class DocRequest {

    public baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    async getHtml(id: string): Promise<string> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/html/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}