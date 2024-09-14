import { sampleImgSrc1, sampleImgSrc2 } from "./images_db"

const drawDoc = `
    <div data-type="root">
    <h2>画图1</h2>
    <img draw src="${sampleImgSrc1}"></img>
    <h2>链接</h2>
    <a href="https://www.baidu.com">百度</a>与谷歌的竞争
    <h2>图片</h2>
    <p>下面是一张图</p>
    <img src="${sampleImgSrc2}"></img>
    <h2>画图2</h2>
    <draw src="${sampleImgSrc1}"></draw>
    <p>下面是一张图</p>
    <img src="${sampleImgSrc2}"></img>
    <toc></toc>
    </div>
  `

export default drawDoc
