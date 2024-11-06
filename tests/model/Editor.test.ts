import Editor from '../../src/model/Editor';

describe('Editor', () => {
    let editor: Editor;

    beforeEach(() => {
        editor = new Editor({});
    });

    describe('getContent', () => {
        it('should return the current html content', () => {
            expect(editor.getContent()).toBe('');
        });
    });
});
