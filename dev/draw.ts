import { sampleImgSrc1, sampleImgSrc2 } from "./images_db"

const drawDoc = `
    <div data-type="root">
    <h2>画图1</h2>
    <img draw=true src="${sampleImgSrc1}"></img>
    <h2>画图2</h2>
    <draw src="${sampleImgSrc1}"></draw>
    </div>
  `

export default drawDoc
