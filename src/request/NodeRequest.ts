import EditorData from "../model/EditorData";
import axios from 'axios';

export default class NodeRequest {

    public baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    async getHtml(id: string): Promise<string> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/node/${id}/html`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}