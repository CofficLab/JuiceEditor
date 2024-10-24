export default class PageMode {
    static readonly NODE_TYPE = 'node'
    static readonly SLOT_TYPE = 'slot'
    static readonly BASIC_TYPE = 'basic'
    static readonly FEATURES_TYPE = 'features'

    static NODE = new PageMode(PageMode.NODE_TYPE)
    static SLOT = new PageMode(PageMode.SLOT_TYPE)
    static BASIC = new PageMode(PageMode.BASIC_TYPE)
    static FEATURES = new PageMode(PageMode.FEATURES_TYPE)

    public type: string

    constructor(type: string) {
        this.type = type
    }

    static getPageMode(mode: string): PageMode {
        return new PageMode(mode)
    }

    isSlot(): boolean {
        return this.equals(PageMode.SLOT)
    }

    isBasic(): boolean {
        return this.equals(PageMode.BASIC)
    }

    equals(mode: PageMode): boolean {
        return this.type === mode.type
    }
}

Object.freeze(PageMode);
