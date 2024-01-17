import SmartTool from "./SmartTool"

let isDebug = process.env.NODE_ENV === 'development'

export default class DrawAgent {
    static getLink() {
        const query = SmartTool.httpBuildQuery({
            browser: '0',
            dark: 'auto',
            // Disables the Dropbox integration
            db: '0',
            dev: isDebug ? '1' : '0',
            embed: '1',
            // Disables the format panel on the right
            format: '0',
            // Disables the GitHub integration
            gh: '0',
            // Disables the Google integration
            gapi: '0',
            // Disables the GitLab integration
            gl: '0',
            lang: 'zh',
            'hide-pages': '1',
            lightbox: '0',
            modified: 'unsavedChanges',
            // Enables folding in chromeless mode
            nav: '1',
            noSaveBtn: '0',
            noExitBtn: '1',
            // Disables the OneDrive integration
            od: '0',
            proto: 'json',
            // Disables the toolbar in chromeless mode
            toolbar: '0',
            // Disables the Trello integration
            tr: '0',
            ui: 'min',
            saveAndExit: '0',
        })
        return isDebug
            ? 'http://localhost:5173/drawio/src/main/webapp/index.html?' + query
            : 'http://localhost:49493/draw/index.html?' + query
    }
}