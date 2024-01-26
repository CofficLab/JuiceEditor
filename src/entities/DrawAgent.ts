import SmartTool from "./SmartTool"

let isDebug = process.env.NODE_ENV === 'development'

export default class DrawAgent {
    static getLink() {
        const query = SmartTool.httpBuildQuery({
            dev: isDebug ? '1' : '0',
        })
        return isDebug
            ? 'http://localhost:5173/drawio/src/main/webapp/index.html?' + query
            : 'http://localhost:49493/draw/index.html?' + query
    }
}