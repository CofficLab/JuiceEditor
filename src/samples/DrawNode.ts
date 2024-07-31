import TreeNode from "../model/TreeNode"
import { sampleImgSrc1, sampleImgSrc2 } from "./Images"

const drawNode = new TreeNode({
  uuid: 'drawNode',
  content: `
    <h2>画图1</h2>
    <img draw src="${sampleImgSrc1}"></img>
    <h2>链接</h2>
    <a href="https://www.baidu.com">百度</a>与谷歌的竞争
    <h2>图片</h2>
    <p>下面是一张图</p>
    <img src="${sampleImgSrc2}"></img>
    <h2>画图2</h2>
    <draw src="${sampleImgSrc1}"></draw>
    <h2>待办列表</h2>
    <ul data-type="taskList">
      <li data-type="taskItem" data-checked="true">A list item</li>
      <li data-type="taskItem" data-checked="false">And another one</li>
    </ul>
    <toc></toc>
  `
})

export default drawNode
