import TreeNode from '../../model/TreeNode';
import { v4 as uuidv4 } from 'uuid';
import NoUUIDError from '../../error/NoUUIDError';
jest.mock('uuid');

describe('TreeNode', () => {
    beforeEach(() => {
        (uuidv4 as jest.Mock).mockReturnValue('mocked-uuid');
    });

    test('makeDefaultNode creates a node with default values', () => {
        const node = TreeNode.makeDefaultNode();
        expect(node.uuid).toBe('mocked-uuid');
        expect(node.title).toBe('');
        expect(node.priority).toBe(0);
        expect(node.isBook).toBe(false);
        expect(node.children).toEqual([]);
    });

    test('fromBase64 creates a node from base64 string', () => {
        const base64 = btoa(JSON.stringify({ uuid: 'test-uuid', title: 'Test Node' }));
        const node = TreeNode.fromBase64(base64);
        expect(node.uuid).toBe('test-uuid');
        expect(node.title).toBe('Test Node');
    });

    test('fromJSON creates a node from JSON string', () => {
        const json = JSON.stringify({ uuid: 'test-uuid', title: 'Test Node' });
        const node = TreeNode.fromJSON(json);
        expect(node.uuid).toBe('test-uuid');
        expect(node.title).toBe('Test Node');
    });

    test('constructor throws error if uuid is null', () => {
        expect(() => new TreeNode({})).toThrow(NoUUIDError);
    });

    test('update method updates node properties', () => {
        const node = new TreeNode({ uuid: 'test-uuid' });
        node.update({ title: 'Updated Title', priority: 1, isBook: true });
        expect(node.title).toBe('Updated Title');
        expect(node.priority).toBe(1);
        expect(node.isBook).toBe(true);
    });

    test('setter methods update properties and return this', () => {
        const node = new TreeNode({ uuid: 'test-uuid' });
        expect(node.setTitle('New Title')).toBe(node);
        expect(node.title).toBe('New Title');
        expect(node.setPriority(2)).toBe(node);
        expect(node.priority).toBe(2);
        expect(node.setIsBook(true)).toBe(node);
        expect(node.isBook).toBe(true);
    });

    test('toJSONString returns correct JSON string', () => {
        const node = new TreeNode({ uuid: 'test-uuid', title: 'Test Node' });
        const jsonString = node.toJSONString();
        expect(JSON.parse(jsonString)).toEqual({
            uuid: 'test-uuid',
            title: 'Test Node',
            priority: 0,
            isBook: false,
            children: []
        });
    });

    test('sameWith compares nodes correctly', () => {
        const node1 = new TreeNode({ uuid: 'test-uuid', title: 'Test Node' });
        const node2 = new TreeNode({ uuid: 'test-uuid', title: 'Test Node' });
        const node3 = new TreeNode({ uuid: 'different-uuid', title: 'Different Node' });
        expect(node1.sameWith(node2)).toBe(true);
        expect(node1.sameWith(node3)).toBe(false);
    });
});
