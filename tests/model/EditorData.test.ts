import Heading from '@tiptap/extension-heading';
import EditorData from '../../src/model/EditorData';
import TiptapEditor from '../../src/model/TiptapEditor';

describe('EditorData', () => {
    describe('constructor and default', () => {
        it('should create a default EditorData instance', () => {
            const data = EditorData.default();
            expect(data.title).toBe("");
            expect(data.html).toBe('<div data-type="root" data-uuid="default-root"></div>');
            expect(data.node).toEqual({});
            expect(data.wordCount).toBe(0);
            expect(data.characterCount).toBe(0);
        });

        it('should create an EditorData instance with provided params', () => {
            const params = {
                title: 'Test Title',
                html: '<p>Test content</p>',
                node: { type: 'doc' },
                wordCount: 2,
                characterCount: 12
            };
            const data = new EditorData(params);
            expect(data).toEqual(expect.objectContaining(params));
        });
    });

    describe('fromEditor', () => {
        it('should create an EditorData instance from an Editor', () => {
            const mockEditor = {
                options: { injectNonce: 'test-nonce' },
                storage: {
                    characterCount: {
                        words: jest.fn().mockReturnValue(5),
                        characters: jest.fn().mockReturnValue(25)
                    }
                },
                getHTML: jest.fn().mockReturnValue('<p>Test content</p>'),
                getJSON: jest.fn().mockReturnValue({ type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Test content' }] }] }),
                state: {
                    doc: {
                        content: {
                            forEach: jest.fn((callback) => {
                                callback({ type: { name: Heading.name }, textContent: 'Test Title' });
                            })
                        }
                    }
                }
            } as unknown as TiptapEditor;

            const result = EditorData.fromEditor(mockEditor);
            if (result instanceof Error) {
                throw result;
            }
            expect(result).toBeInstanceOf(EditorData);
            expect(result.title).toBe('Test Title');
            expect(result.html).toBe('<p>Test content</p>');
            expect(result.node).toEqual({ type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Test content' }] }] });
        });

        it('should return an Error if injectNonce is undefined', () => {
            const mockEditor = {
                options: {}
            } as unknown as TiptapEditor;

            const result = EditorData.fromEditor(mockEditor);
            expect(result).toBeInstanceOf(Error);
            expect((result as Error).message).toBe('EditorDoc.fromEditor: injectNonce is undefined');
        });
    });

    describe('setter methods', () => {
        let data: EditorData;

        beforeEach(() => {
            data = EditorData.default();
        });

        it('should set title', () => {
            data.setTitle('New Title');
            expect(data.title).toBe('New Title');
        });

        it('should set html', () => {
            data.setHtml('<div>New HTML</div>');
            expect(data.html).toBe('<div>New HTML</div>');
        });

        it('should set node', () => {
            const newNode = { type: 'paragraph' };
            data.setNode(newNode);
            expect(data.node).toEqual(newNode);
        });

        it('should set wordCount', () => {
            data.setWordCount(10);
            expect(data.wordCount).toBe(10);
        });

        it('should set characterCount', () => {
            data.setCharacterCount(50);
            expect(data.characterCount).toBe(50);
        });
    });

    describe('toJSONString', () => {
        it('should return a JSON string representation of the EditorData', () => {
            const data = new EditorData({
                title: 'Test',
                html: '<p>Content</p>',
                node: { type: 'doc' },
                wordCount: 1,
                characterCount: 7
            });
            const jsonString = data.toJSONString();
            expect(JSON.parse(jsonString)).toEqual({
                title: 'Test',
                html: '<p>Content</p>',
                node: { type: 'doc' },
                wordCount: 1,
                characterCount: 7
            });
        });
    });

    describe('comparison methods', () => {
        it('should correctly compare two equal EditorData instances', () => {
            const data1 = new EditorData({ title: 'Test', html: '<p>Content</p>' });
            const data2 = new EditorData({ title: 'Test', html: '<p>Content</p>' });
            expect(data1.isEqual(data2)).toBe(true);
        });

        it('should correctly compare two different EditorData instances', () => {
            const data1 = new EditorData({ title: 'Test1', html: '<p>Content1</p>' });
            const data2 = new EditorData({ title: 'Test2', html: '<p>Content2</p>' });
            expect(data1.isEqual(data2)).toBe(false);
        });

        it('should correctly compare HTML and title of two EditorData instances', () => {
            const data1 = new EditorData({ title: 'Test', html: '<p>Content</p>' });
            const data2 = new EditorData({ title: 'Test', html: '<p>Content</p>', wordCount: 5 });
            expect(data1.hasSameHtmlAndTitle(data2)).toBe(true);
        });

        it('should correctly identify different HTML or title', () => {
            const data1 = new EditorData({ title: 'Test1', html: '<p>Content</p>' });
            const data2 = new EditorData({ title: 'Test2', html: '<p>Content</p>' });
            expect(data1.hasSameHtmlAndTitle(data2)).toBe(false);
        });
    });
});
