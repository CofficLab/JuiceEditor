import * as monaco from "monaco-editor"
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { SmartLanguage } from "./SmartLanguage";

export interface CreateEditorOptions {
    target: HTMLDivElement;
    content: string;
    language: SmartLanguage;
    readOnly?: boolean;
    showLineNumbers?: boolean;
    onCreated?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
    onContentChanged?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
    onRunnableChanged?: (value: boolean) => void;
    onLanguageChanged?: (lan: SmartLanguage) => void;
    verbose: boolean
}

const title = '💼 MonacoFactory'

class MonacoFactory {
    static boot() {
        //  https://github.com/microsoft/monaco-editor#faq
        // ❓ I see the warning "Could not create web worker".What should I do?
        //   HTML5 does not allow pages loaded on file:// to create web workers. Please load the editor with a web server on http:// or https:// schemes.
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
    }

    static getLanguage(editor: monaco.editor.IStandaloneCodeEditor): SmartLanguage {
        // console.log("💼 MonacoBox: 获取 monaco editor 的语言", editor.getModel()!.getLanguageId());

        let id = editor.getModel()!.getLanguageId();

        return SmartLanguage.fromString(id)
    }

    static setLanguage(editor: monaco.editor.IStandaloneCodeEditor, language: SmartLanguage) {
        // console.log("💼 MonacoBox: 设置 monaco editor 的语言", language.getMonacoLanguage());

        monaco.editor.setModelLanguage(editor.getModel()!, language.getMonacoLanguage());
    }

    // 所有的行合起来的高度
    static getLinesHeight(editor: monaco.editor.IStandaloneCodeEditor) {
        let lineCount = editor.getModel()!.getLineCount();
        let lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
        let padding = editor.getOption(monaco.editor.EditorOption.padding);

        // console.log("MonacoBox: 设置 monaco editor 的高度, 行数", lineCount);
        // console.log("MonacoBox: 设置 monaco editor 的高度, 行高", lineHeight);
        // console.log("MonacoBox: 设置 monaco editor 的高度, 行间距", padding);

        return lineCount * lineHeight + padding.top + padding.bottom;
    }

    static setHeightOfEditor(editor: monaco.editor.IStandaloneCodeEditor, verbose: boolean) {
        let height = MonacoFactory.getLinesHeight(editor);

        if (verbose) {
            console.log(title, "set height to", height);
        }

        editor.getDomNode()!.style.height = height + "px";
    }

    static createEditor(options: CreateEditorOptions): monaco.editor.IStandaloneCodeEditor {
        // console.log('💼 MonacoBox: 创建')
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
            // 当只有1行代码时，右上角的语言标签和右下角的运行按钮离得很近
            padding: {
                top: options.readOnly ? 15 : 15,
                bottom: options.readOnly ? 15 : 15,
            },
            minimap: { enabled: false },
        });

        editor.getModel()?.onDidChangeLanguage(() => {
            console.log('🍋 💼 MonacoBox: monaco editor language changed, language id ->', editor.getModel()?.getLanguageId());
            options.onLanguageChanged?.(MonacoFactory.getLanguage(editor));
        });

        editor.getModel()!.onDidChangeContent(() => {
            if (options.verbose) {
                console.log('💼 MonacoBox: monaco content changed');
            }

            options.onContentChanged?.(editor);
            MonacoFactory.setHeightOfEditor(editor, options.verbose)
        });

        MonacoFactory.setHeightOfEditor(editor, options.verbose)

        options.onCreated?.(editor);

        return editor
    }
}

export default MonacoFactory
