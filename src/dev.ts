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
import editor from './main'

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
    { text: '功能', onclick: () => window.api.node.setHTML(featureDoc) },
    { text: '小型', onclick: () => window.api.node.setHTML(miniDoc) },
    { text: '文档组', onclick: () => window.api.node.setHTML(docs) },
    { text: '混合', onclick: () => window.api.node.setHTML(baseDoc) },
    { text: '大型', onclick: () => window.api.node.setHTML(bigDoc) },
    { text: '图片', onclick: () => window.api.node.setHTML(imageDoc) },
    { text: '表格', onclick: () => window.api.node.setHTML(tableDoc) },
    { text: '画图', onclick: () => window.api.node.setHTML(drawDoc) },
    { text: '段落', onclick: () => window.api.node.setHTML(pDoc) },
    { text: '链接', onclick: () => window.api.node.setHTML(aDoc) },
    { text: '目录', onclick: () => window.api.node.setHTML(tocDoc) },
    { text: '列表', onclick: () => window.api.node.setHTML(bulletListDoc) },
    { text: 'TOC', onclick: () => window.api.node.toggleToc() },
    { text: '只读/编辑', onclick: () => window.api.node.toggleReadOnly() },
];

buttons.forEach(button => {
    const btn = document.createElement('button');
    btn.textContent = button.text;
    btn.onclick = button.onclick;
    div.appendChild(btn);
});

document.body.insertBefore(div, document.body.firstChild);

const title = "⛰️ Dev"
editor.on('create', () => {
    console.log(title, 'create')
})

// init all providers

// let apiProvider: ApiProvider | null = null
// let listenerProvider: ListenerProvider | null = null
// let pluginProvider: PluginProvider | null = null

// // collect events from every store
// watch(() => app.ready, () => {
//     if (app.ready) {
//         pluginProvider!.onReady(modeStore.mode)
//     } else {
//         pluginProvider!.onLoading(app.loadingReason)
//     }
// })

// // collect message from every store
// watch(() => app.message.uuid, () => messageStore.setMessage(app.message))

// // collect error from every store
// watch(() => app.error, () => messageStore.setError(app.error))


// window.addEventListener('downloadImage', ((event: CustomEvent) => {
//     pluginProvider!.plugins.forEach(plugin => {
//         plugin.onDownloadImage(event.detail.src, event.detail.name)
//     })
// }) as EventListener);

// function bootProviders(editor: EditorVue) {
//     apiProvider = new ApiProvider({
//         featureProvider: feature,
//         modeProvider: modeStore,
//         requestProvider: requestStore,
//         editor: editor,
//         configProvider: config
//     })
//     listenerProvider = new ListenerProvider(config.listeners)
//     pluginProvider = new PluginProvider(config.plugins)
// }