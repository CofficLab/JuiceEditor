import baseDoc from '../dev/base';
import bigDoc from '../dev/big';
import imageDoc from '../dev/image';

export default function dev() {
    const div = document.createElement('div');
    div.style.cssText = 'position: fixed; margin:0; padding:0; display: flex; justify-content: center; z-index: 500; width: 100%; background-color: purple;';

    const buttons = [
        { text: '基础', onclick: () => window.api.doc.setContent(baseDoc) },
        { text: '大型', onclick: () => window.api.doc.setContent(bigDoc) },
        { text: '图片', onclick: () => window.api.doc.setContent(imageDoc) },
    ];

    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.textContent = button.text;
        btn.onclick = button.onclick;
        div.appendChild(btn);
    });

    document.body.insertBefore(div, document.body.firstChild);

    console.log('开发脚本已加载');
}