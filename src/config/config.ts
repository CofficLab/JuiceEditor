const isDebug = process.env.NODE_ENV === 'development'

export const Config = {
    'isDebug': isDebug,
    'drawLink': isDebug
        ? 'http://localhost:5173/drawio/webapp/index.html?'
        : 'http://localhost:49493/draw/index.html?'
}

export default Config