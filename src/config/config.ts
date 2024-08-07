const isDebug = process.env.NODE_ENV === 'development'

export const Config = {
    'isDebug': isDebug,
    'drawLink': isDebug
        ? '/drawio/webapp/index.html?'
        : '/drawio/index.html?',
    'monacoLink': isDebug
        ? '/monaco/index.html'
        : '/editor/monaco/index.html'
}

export default Config