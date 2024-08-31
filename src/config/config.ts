import LocalApp from "../plugins/LocalApp"
import WebKit from "../plugins/WebKit"
import Plugin from "../contract/Plugin";
import EventPlugin from "../plugins/EventPlugin";

interface ConfigType {
    editorLabel: string;
    isDebug: boolean;
    drawLink: string;
    monacoLink: string;
    plugins: Plugin[];
    focusClassName: string;
}

const isDebug = process.env.NODE_ENV === 'development'
const hasWebkit = 'webkit' in window

export const Config: ConfigType = {
    'editorLabel': 'juice-editor',
    'isDebug': isDebug,
    'drawLink': isDebug
        ? '/drawio/webapp/index.html?'
        : '/drawio/index.html?',
    'monacoLink': isDebug
        ? '/monaco/index.html'
        : '/editor/monaco/index.html',
    'plugins': [
        hasWebkit ? new WebKit() : new LocalApp(),
        new EventPlugin()
    ],
    'focusClassName': 'focused'
}

export default Config