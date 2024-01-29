import { editor } from "monaco-editor";
import * as monaco from "monaco-editor"
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { SmartLanguage } from "../../entities/SmartLanguage";

window.MonacoEnvironment = {
    getWorker(_, label) {
        switch (label) {
            case 'json':
                return new jsonWorker();
            case 'css':
            case 'scss':
            case 'less':
                return new cssWorker();
            case 'html':
                return new htmlWorker();
            case 'typescript':
            case 'javascript':
                return new tsWorker();
            default:
                return new editorWorker();
        }
    },
};

export interface CreateEditorOptions {
    name?: string;
    uuid: string;
    target: HTMLDivElement;
    content: string;
    language: SmartLanguage;
    readOnly?: boolean;
    showLineNumbers?: boolean;
    onCreated?: (editor: MonacoBox) => void;
    onContentChanged?: (editor: MonacoBox) => void;
    onRunnableChanged?: (value: boolean) => void;
    onLanguageChanged?: (editor: MonacoBox) => void;
}

class MonacoBox {
    static disposeAll() {
        console.log('🗑️ 💼 MonacoBox: disposeAll')

        monaco.editor.getModels().forEach((model) => {
            model.dispose()
        })
    }

    static printCount() {
        let count = monaco.editor.getModels().length
        console.log('🍋 💼 MonacoBox: 现在有', count, '个 Monaco')
    }

    public editor: editor.IStandaloneCodeEditor;
    public index;
    public name;
    public runnableChangedCallback: Function;

    public constructor(editor: any, index: any, name = "未命名Monaco编辑器") {
        this.editor = editor;
        this.index = index;
        this.name = name
        this.runnableChangedCallback = () => { }

        this.onContentChanged((editorBox: MonacoBox) => {
            this.setHeight()
        });
    }

    public getContent() {
        // 使用 this.editor.getValue() 会导致整个界面卡住
        // https://github.com/microsoft/monaco-editor/issues/2439
        return monaco.editor.getModels()[this.index.toString()].getValue()
    }

    public getHeight() {
        return this.editor.getDomNode()!.style.height
    }

    // 所有的行合起来的高度
    public getLinesHeight() {
        let lineCount = this.editor.getModel()!.getLineCount();
        let lineHeight = this.editor.getOption(monaco.editor.EditorOption.lineHeight);
        let padding = this.editor.getOption(monaco.editor.EditorOption.padding);

        return lineCount * lineHeight + padding.top + padding.bottom;
    }

    public getModel() {
        return monaco.editor.getModels()[this.index.toString()]
    }

    public getLanguage(): SmartLanguage {
        console.log("💼 MonacoBox: 获取 monaco editor 的语言", this.editor.getModel()!.getLanguageId());

        let id = this.editor.getModel()!.getLanguageId();

        return SmartLanguage.fromString(id)
    }

    public getParentDomNode(): HTMLElement | null | undefined {
        let domNode = this.editor.getDomNode()

        return domNode?.parentElement
    }

    public setContent(content: string) {
        // console.log('设置monaco content', content)

        if (content == this.getContent()) return

        // 使用 this.editor.setValue() 会导致整个界面卡住
        // https://github.com/microsoft/monaco-editor/issues/2439
        return monaco.editor.getModels()[this.index.toString()].setValue(content)
    }

    public setHeight() {
        let height = this.getLinesHeight();

        // console.log("MonacoBox: 设置 monaco editor 的高度", height);

        this.editor.getDomNode()!.style.height = height + "px";
    }

    public setLanguage(language: SmartLanguage) {
        if (this.editor == undefined) {
            return console.log("editor尚未实例化，不能设置language");
        }

        if (language == this.getLanguage()) {
            console.log('放弃设置monaco language，因为没有变化', language)

            return
        }

        console.log("🍋 💼 MonacoBox: 设置Monaco Editor的Language为", language.getTitle());
        monaco.editor.setModelLanguage(this.getModel(), language.getMonacoLanguage());
    }

    public onContentChanged(callback: (arg0: any) => void) {
        this.editor.getModel()!.onDidChangeContent(() => { callback(this) });
        return this;
    }

    public onLanguageChanged(callback: (arg0: any) => void) {
        this.editor.getModel()?.onDidChangeLanguage(() => {
            console.log('🍋 💼 MonacoBox: monaco editor language changed, call the callback function', this.editor.getModel()?.getLanguageId());
            callback(this)
        });
        return this
    }

    public onRunnableChanged(callback: (arg0: any) => void): MonacoBox {
        this.runnableChangedCallback = callback

        return this
    }

    static createEditor(box: MonacoBox, options: CreateEditorOptions) {
        console.log('🍋 💼 MonacoBox: 创建 Monaco，名字及UUID', options.name, options.uuid)

        // console.log('创建 Monaco，配置是', options)
        const editor = monaco.editor.create(options.target, {
            value: options.content,
            language: options.language.getMonacoLanguage(),
            readOnly: options.readOnly,
            theme: "hc-black",
            fontSize: 14,
            lineNumbers: options.showLineNumbers ? "on" : "off",
            automaticLayout: true,
            scrollBeyondLastLine: false,
            contextmenu: false,
            tabSize: 4,
            roundedSelection: false,
            renderLineHighlight: "none",
            formatOnPaste: true,
            scrollbar: {
                vertical: "hidden",
                horizontal: "hidden",
                alwaysConsumeMouseWheel: false,
            },
            overviewRulerBorder: false,
            overviewRulerLanes: 0,
            domReadOnly: false,
            stickyScroll: {
                enabled: false,
            },
            padding: {
                top: options.readOnly ? 10 : 10,
                bottom: options.readOnly ? 10 : 10,
            },
            minimap: { enabled: false },
        });

        MonacoBox.printCount()

        // editor.focus();

        box = new MonacoBox(editor, monaco.editor.getModels().length - 1, options.name);

        box.setHeight()
        if (options?.onCreated != undefined) {
            options.onCreated(box)
        }
        if (options?.onContentChanged != undefined) box.onContentChanged(options.onContentChanged);
        if (options?.onLanguageChanged != undefined) box.onLanguageChanged(options.onLanguageChanged);
        if (options?.onRunnableChanged != undefined) box.onRunnableChanged(options.onRunnableChanged);
    }
}

export default MonacoBox