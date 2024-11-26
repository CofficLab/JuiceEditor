class DocHasNoContentError extends Error {
    constructor(message: string) {
        super(message)
    }
}

class DocHasNoArticleError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export { DocHasNoContentError, DocHasNoArticleError }