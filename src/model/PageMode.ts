export default class PageMode {
    static NODE_TYPE = 'node'
    static SLOT_TYPE = 'slot'
    static BASIC_TYPE = 'basic'
    static FEATURES_TYPE = 'features'

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
        return this.type === PageMode.SLOT_TYPE
    }

    isBasic(): boolean {
        return this.type === PageMode.BASIC_TYPE
    }
}