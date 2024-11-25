declare global {
    interface Window {
        editor: Editor;
    }
}

import baseDoc from './dev/base';
import bigDoc from './dev/big';
import imageDoc from './dev/image';
import drawDoc from './dev/draw';
import docs from './dev/docs';
import pDoc from './dev/p';
import tocDoc from './dev/toc';
import miniDoc from './dev/mini';
import bulletListDoc from './dev/bulletList';
import aDoc from './dev/a';
import featureDoc from './dev/feature';
import tableDoc from './dev/table';
import { EditorFactory, Editor } from './main'
import codeBlockDoc from './dev/codeBlock';

const title = "⛰️ Dev"
const chatApi = '/proxy/api/chat'

const editor = EditorFactory.register('my-editor', {
    onBeforeCreate: () => {
        console.log(title, '🏭 onBeforeCreate for label my-editor')
    },
    onCreate: (editor: Editor) => {
        console.log(title, '🚩 onCreate for label my-editor')

        editor.enableVerboseMode()

        editor.enableDocVerbose()
        editor.enableLocalStorageVerbose()
        editor.enableWebKitVerbose()

        editor.enableWebKit()
        editor.enableLocalStorage()

        editor.disableWebKitSendNodes()
        editor.disableLocalStorageVerbose()
        editor.disableCodeBlockVerbose()
        editor.disableURLListenerVerbose()
        editor.disableArticleVerbose()

        editor.setChatApi(chatApi)
        editor.setDrawLink('/draw/index.html?')
        editor.setMenuBackgroundColor('orange')

        window.editor = editor
    },
    onMounted: (editor: Editor) => {
        console.log(title, '🖥️ onMounted for label my-editor')
    }
})

const div = document.createElement('div');
div.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        padding: 5px;
        display: flex;
        justify-content: center;
        z-index: 500;
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    `;

// Add dark mode styles
const darkModeStyles = `
        @media (prefers-color-scheme: dark) {
            #dev-toolbar {
                background-color: rgba(50, 50, 50, 0.8) !important;
            }
            #dev-toolbar button {
                background-color: #444;
                color: #fff;
                border: 1px solid #666;
            }
            #dev-toolbar button:hover {
                background-color: #555;
            }
        }
    `;

const styleElement = document.createElement('style');
styleElement.textContent = darkModeStyles;
document.head.appendChild(styleElement);

div.id = 'dev-toolbar';

const buttons = [
    { text: '功能', onclick: () => editor.setHTML(featureDoc) },
    { text: '小型', onclick: () => editor.setHTML(miniDoc) },
    { text: '文档组', onclick: () => editor.setHTML(docs) },
    { text: '混合', onclick: () => editor.setHTML(baseDoc) },
    { text: '大型', onclick: () => editor.setHTML(bigDoc) },
    { text: '图片', onclick: () => editor.setHTML(imageDoc) },
    { text: '表格', onclick: () => editor.setHTML(tableDoc) },
    { text: '画图', onclick: () => editor.setHTML(drawDoc) },
    { text: '段落', onclick: () => editor.setHTML(pDoc) },
    { text: '链接', onclick: () => editor.setHTML(aDoc) },
    { text: '目录', onclick: () => editor.setHTML(tocDoc) },
    { text: '列表', onclick: () => editor.setHTML(bulletListDoc) },
    { text: 'TOC', onclick: () => editor.toggleToc() },
    { text: '只读/编辑', onclick: () => editor.toggleReadOnly() },
    { text: '源码', onclick: () => editor.toggleSourceCode() },
    { text: '代码块', onclick: () => editor.setHTML(codeBlockDoc) },
    { text: '宣传图', onclick: () => editor.setHTML("<h1>宣传图</h1><features-component></features-component>") },
];

buttons.forEach(button => {
    const btn = document.createElement('button');
    btn.textContent = button.text;
    btn.onclick = button.onclick;
    div.appendChild(btn);
});

document.body.insertBefore(div, document.body.firstChild);

