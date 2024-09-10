import TreeNode from "../model/TreeNode";
import axios from 'axios';

export default class NodeRequest {

    public baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    async getNode(id: string): Promise<TreeNode> {
        try {
            const response = await axios.get(`${this.baseUrl}/api/nodes/${id}`);
            return new TreeNode(response.data);
        } catch (error) {
            throw error;
        }
    }
}