class ParamErrorNoUUID extends Error {
    public stage: string

    constructor(message: string, stage: string) {
        super(message)
        this.stage = stage
    }
}

export { ParamErrorNoUUID }