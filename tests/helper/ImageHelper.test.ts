import ImageHelper from '../../src/helper/ImageHelper';

describe('ImageHelper', () => {
    describe('getBase64FromBase64Image', () => {
        it('should return the base64 data without the MIME type prefix', () => {
            const base64Image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgAB...';
            const result = ImageHelper.getBase64FromBase64Image(base64Image);
            expect(result).toBe('/9j/4AAQSkZJRgAB...');
        });
    });

    describe('getMimeType', () => {
        it('should extract the MIME type from a base64 image string', () => {
            const base64Image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgAB...';
            const result = ImageHelper.getMimeType(base64Image);
            expect(result).toBe('image/jpeg');
        });

        it('should handle MIME types with spaces', () => {
            const base64Image = 'data: image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';
            const result = ImageHelper.getMimeType(base64Image);
            expect(result).toBe('image/png');
        });

        it('should return an empty string for invalid input', () => {
            const invalidInput = 'not a base64 image';
            const result = ImageHelper.getMimeType(invalidInput);
            expect(result).toBe('');
        });
    });

    describe('getExtension', () => {
        it('should return the correct extension for a known MIME type', () => {
            const base64Image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgAB...';
            const result = ImageHelper.getExtension(base64Image);
            expect(result).toBe('.jpg');
        });

        it('should return .txt for an unknown MIME type', () => {
            const base64Image = 'data:image/unknown;base64,/9j/4AAQSkZJRgAB...';
            const result = ImageHelper.getExtension(base64Image);
            expect(result).toBe('.txt');
        });
    });

    describe('downloadImageFromUrl', () => {
        beforeAll(() => {
            // Mock URL.createObjectURL and URL.revokeObjectURL
            global.URL.createObjectURL = jest.fn(() => 'mock-object-url');
            global.URL.revokeObjectURL = jest.fn();
        });

        afterAll(() => {
            // Clean up mocks
            jest.restoreAllMocks();
        });

        it('should call fetch and create a download link', async () => {
            global.fetch = jest.fn().mockResolvedValue({
                ok: true,
                blob: jest.fn().mockResolvedValue(new Blob(['mock image data'], { type: 'image/jpeg' }))
            });

            const createElementSpy = jest.spyOn(document, 'createElement');
            const appendChildSpy = jest.spyOn(document.body, 'appendChild');
            const removeChildSpy = jest.spyOn(document.body, 'removeChild');

            await ImageHelper.downloadImageFromUrl('https://placehold.co/200x200/6A00F5/white');

            expect(global.fetch).toHaveBeenCalledWith('https://placehold.co/200x200/6A00F5/white');
            expect(createElementSpy).toHaveBeenCalledWith('a');
            expect(appendChildSpy).toHaveBeenCalled();
            expect(removeChildSpy).toHaveBeenCalled();
            expect(global.URL.createObjectURL).toHaveBeenCalled();
            expect(global.URL.revokeObjectURL).toHaveBeenCalled();

            createElementSpy.mockRestore();
            appendChildSpy.mockRestore();
            removeChildSpy.mockRestore();
        });

        it('should handle fetch errors', async () => {
            global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
            console.error = jest.fn();

            await ImageHelper.downloadImageFromUrl('https://example.com/image.jpg');

            expect(console.error).toHaveBeenCalledWith('Failed to download image:', expect.any(Error));
        });
    });

    describe('downloadBase64', () => {
        it('should create a download link for a base64 image', () => {
            const base64Image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgAB...';
            const createElementSpy = jest.spyOn(document, 'createElement');
            const appendChildSpy = jest.spyOn(document.body, 'appendChild');
            const removeChildSpy = jest.spyOn(document.body, 'removeChild');

            ImageHelper.downloadBase64(base64Image);

            expect(createElementSpy).toHaveBeenCalledWith('a');
            expect(appendChildSpy).toHaveBeenCalled();
            expect(removeChildSpy).toHaveBeenCalled();

            createElementSpy.mockRestore();
            appendChildSpy.mockRestore();
            removeChildSpy.mockRestore();
        });
    });
});
