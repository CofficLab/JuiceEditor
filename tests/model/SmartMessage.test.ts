import SmartMessage from '../../src/model/SmartMessage';

describe('SmartMessage', () => {
    test('constructor initializes properties correctly', () => {
        const message = new SmartMessage('Test message', 'debug');
        expect(message.text).toBe('Test message');
        expect(message.type).toBe('debug');
        expect(message.uuid).toBeDefined();
    });

    test('empty() creates an empty message', () => {
        const emptyMessage = SmartMessage.empty();
        expect(emptyMessage.text).toBe('');
        expect(emptyMessage.type).toBe('tips');
    });

    test('isTips() returns correct boolean', () => {
        const tipsMessage = new SmartMessage('Tip');
        const debugMessage = new SmartMessage('Debug', 'debug');
        expect(tipsMessage.isTips()).toBe(true);
        expect(debugMessage.isTips()).toBe(false);
    });

    test('isDebug() returns correct boolean', () => {
        const tipsMessage = new SmartMessage('Tip');
        const debugMessage = new SmartMessage('Debug', 'debug');
        expect(tipsMessage.isDebug()).toBe(false);
        expect(debugMessage.isDebug()).toBe(true);
    });
});
