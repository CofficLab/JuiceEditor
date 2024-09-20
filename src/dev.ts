import baseDoc from '../dev/base';
import bigDoc from '../dev/big';
import imageDoc from '../dev/image';
import drawDoc from '../dev/draw';
import docs from '../dev/docs';
import pDoc from '../dev/p';
import tocDoc from '../dev/toc';
import miniDoc from '../dev/mini';
export default function dev() {
    const div = document.createElement('div');
    div.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; margin: 0 auto; padding: 0; display: flex; justify-content: center; z-index: 500; ';

    const buttons = [
        { text: '小型', onclick: () => window.api.node.setHTML(miniDoc) },
        { text: '文档组', onclick: () => window.api.node.setHTML(docs) },
        { text: '混合', onclick: () => window.api.node.setHTML(baseDoc) },
        { text: '大型', onclick: () => window.api.node.setHTML(bigDoc) },
        { text: '图片', onclick: () => window.api.node.setHTML(imageDoc) },
        { text: '画图', onclick: () => window.api.node.setHTML(drawDoc) },
        { text: '段落', onclick: () => window.api.node.setHTML(pDoc) },
        { text: '目录', onclick: () => window.api.node.setHTML(tocDoc) },
        { text: 'TOC', onclick: () => window.api.node.toggleToc() },
    ];

    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.textContent = button.text;
        btn.onclick = button.onclick;
        div.appendChild(btn);
    });

    document.body.insertBefore(div, document.body.firstChild);
}