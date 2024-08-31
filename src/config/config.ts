import LocalApp from "../plugins/LocalApp"
import WebKit from "../plugins/WebKit"
import Plugin from "../contract/Plugin";
import EventPlugin from "../plugins/EventPlugin";
import UrlListener from "../guard/UrlListener";
import EventListener from "../guard/EventListener";
import SlotListener from "../guard/SlotListener";

interface ConfigType {
    editorLabel: string;
    isDebug: boolean;
    drawLink: string;
    monacoLink: string;
    plugins: Plugin[];
    listeners: Listener[];
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
    listeners: [
        new UrlListener(),
        new EventListener(),
        new SlotListener()
    ],
    'focusClassName': 'focused'
}

export default Config