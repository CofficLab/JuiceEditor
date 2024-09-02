import LocalApp from "../plugins/LocalNodeApp"
import WebKit from "../plugins/WebKit"
import Plugin from "../contract/Plugin";
import EventPlugin from "../plugins/EventPlugin";
import UrlListener from "../listeners/UrlListener";
import EventListener from "../listeners/EventListener";
import SlotListener from "../listeners/SlotListener";
import NodePlugin from "../plugins/NodePlugin";

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
        new WebKit(),
        new LocalApp(),
        new EventPlugin(),
        new NodePlugin()
    ],
    listeners: [
        new UrlListener(),
        new EventListener(),
        new SlotListener()
    ],
    'focusClassName': 'focused'
}

export default Config