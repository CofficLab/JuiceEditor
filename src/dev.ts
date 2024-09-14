import baseDoc from '../dev/base';
import bigDoc from '../dev/big';
import imageDoc from '../dev/image';
import drawDoc from '../dev/draw';
import docs from '../dev/docs';

export default function dev() {
    const div = document.createElement('div');
    div.style.cssText = 'position: fixed; margin:0; padding:0; display: flex; justify-content: center; z-index: 500; width: 100%; background-color: purple;';

    const buttons = [
        { text: '文档组', onclick: () => window.api.doc.setHTML(docs) },
        { text: '基础', onclick: () => window.api.doc.setHTML(baseDoc) },
        { text: '大型', onclick: () => window.api.doc.setHTML(bigDoc) },
        { text: '图片', onclick: () => window.api.doc.setHTML(imageDoc) },
        { text: '画图', onclick: () => window.api.doc.setHTML(drawDoc) },
    ];

    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.textContent = button.text;
        btn.onclick = button.onclick;
        div.appendChild(btn);
    });

    document.body.insertBefore(div, document.body.firstChild);
}