import SmartTool from "./SmartTool"

let isDebug = process.env.NODE_ENV === 'development'

export default class DrawAgent {
    static getLink() {
        const query = SmartTool.httpBuildQuery({
            embed: '1',
            ui: 'min',
            modified: 'unsavedChanges',
            proto: 'json',
            lang: 'zh',
            'hide-pages': '1',
            lightbox: '0',
            browser: '0',
            // Disables the Google integration
            gapi: '0',
            // Disables the Dropbox integration
            db: '0',
            // Disables the OneDrive integration
            od: '0',
            // Disables the Trello integration
            tr: '0',
            // Disables the GitHub integration
            gh: '0',
            // Disables the GitLab integration
            gl: '0',
            noSaveBtn: '0',
            noExitBtn: '1',
            saveAndExit: '0',
            dev: isDebug ? '1' : '0'
        })
        return isDebug
            ? 'http://localhost:5173/drawio/src/main/webapp/index.html?' + query
            : 'http://localhost:49493/draw/index.html?' + query
    }
}