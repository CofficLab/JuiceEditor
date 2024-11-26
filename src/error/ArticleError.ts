class ArticleFormatError extends Error {
    constructor(message: string) {
        super(message)
    }
}

class ArticleContentError extends Error {
    constructor(message: string) {
        super(message)
    }
}

class ArticleHasNoUUIDError extends Error {
    constructor(message: string) {
        super(message)
    }
}

class ArticleHasNoHTMLError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export { ArticleFormatError, ArticleContentError, ArticleHasNoUUIDError, ArticleHasNoHTMLError }