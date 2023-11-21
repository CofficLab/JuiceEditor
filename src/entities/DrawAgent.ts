import SmartTool from "./SmartTool"

let isDebug = process.env.NODE_ENV === 'development'

export default class DrawAgent {
    static getLink() {
        const query = SmartTool.httpBuildQuery({
            embed: '1',
            ui: 'min',
            spin: '1',
            modified: 'unsavedChanges',
            proto: 'json',
            lang: 'zh',
            'hide-pages': '1',
            lightbox: '0',
            browser: '0',
            gapi: '0',
            db: '0',
            od: '0',
            tr: '0',
            gh: '0',
            gl: '0',
            noSaveBtn: '0',
            noExitBtn: '1',
            saveAndExit: '0',
            dev: isDebug ? '1' : '0'
        })
        return isDebug
            ? 'http://localhost:5173/drawio/src/main/webapp/index.html?' + query
            : 'http://localhost:49493/dist/draw/index.html?' + query
    }
}