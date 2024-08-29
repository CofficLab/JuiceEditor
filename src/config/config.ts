import LocalApp from "../plugins/LocalApp"
import WebKit from "../plugins/WebKit"
import Plugin from "../contract/Plugin";

interface ConfigType {
    isDebug: boolean;
    drawLink: string;
    monacoLink: string;
    plugins: Plugin[];
}

const isDebug = process.env.NODE_ENV === 'development'

export const Config: ConfigType = {
    'isDebug': isDebug,
    'drawLink': isDebug
        ? '/drawio/webapp/index.html?'
        : '/drawio/index.html?',
    'monacoLink': isDebug
        ? '/monaco/index.html'
        : '/editor/monaco/index.html',
    'plugins': [
        new WebKit(),
        new LocalApp()
    ]
}

export default Config