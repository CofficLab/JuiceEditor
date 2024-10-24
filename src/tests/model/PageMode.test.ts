import PageMode from '../../model/PageMode';

describe('PageMode', () => {
    it('should have the correct enum values', () => {
        expect(PageMode.NODE_TYPE).toBe('node');
        expect(PageMode.SLOT_TYPE).toBe('slot');
        expect(PageMode.BASIC_TYPE).toBe('basic');
        expect(PageMode.FEATURES_TYPE).toBe('features');
    });

    it('should create instances with correct types', () => {
        expect(PageMode.NODE.type).toBe(PageMode.NODE_TYPE);
        expect(PageMode.SLOT.type).toBe(PageMode.SLOT_TYPE);
        expect(PageMode.BASIC.type).toBe(PageMode.BASIC_TYPE);
        expect(PageMode.FEATURES.type).toBe(PageMode.FEATURES_TYPE);
    });

    it('should create a new PageMode instance with getPageMode', () => {
        const customMode = PageMode.getPageMode('custom');
        expect(customMode).toBeInstanceOf(PageMode);
        expect(customMode.type).toBe('custom');
    });

    it('should correctly identify slot type', () => {
        expect(PageMode.SLOT.isSlot()).toBe(true);
        expect(PageMode.NODE.isSlot()).toBe(false);
        expect(PageMode.BASIC.isSlot()).toBe(false);
        expect(PageMode.FEATURES.isSlot()).toBe(false);
    });

    it('should correctly identify non-slot types', () => {
        expect(PageMode.NODE.isSlot()).toBe(false);
        expect(PageMode.BASIC.isSlot()).toBe(false);
        expect(PageMode.FEATURES.isSlot()).toBe(false);
        expect(PageMode.getPageMode('custom').isSlot()).toBe(false);
    });

    it('should correctly identify basic types', () => {
        expect(PageMode.NODE.isBasic()).toBe(false);
        expect(PageMode.SLOT.isBasic()).toBe(false);
        expect(PageMode.BASIC.isBasic()).toBe(true);
        expect(PageMode.FEATURES.isBasic()).toBe(false);
        expect(PageMode.getPageMode('custom').isBasic()).toBe(false);
    });

    it('should correctly compare PageMode instances', () => {
        expect(PageMode.NODE.equals(PageMode.NODE)).toBe(true);
        expect(PageMode.SLOT.equals(PageMode.SLOT)).toBe(true);
        expect(PageMode.NODE.equals(PageMode.SLOT)).toBe(false);
        expect(PageMode.BASIC.equals(PageMode.FEATURES)).toBe(false);
    });

    it('should not allow adding new static properties', () => {
        expect(() => {
            (PageMode as any).NEW_TYPE = 'new';
        }).toThrow();
    });

    it('should not allow modifying existing static properties', () => {
        expect(() => {
            (PageMode as any).NODE_TYPE = 'modified';
        }).toThrow();
    });

    test('NODE_TYPE should be read-only', () => {
        expect(() => {
            // @ts-ignore
            PageMode.NODE_TYPE = 'modified';
        }).toThrow(TypeError);
    });
});
