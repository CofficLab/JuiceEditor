import TreeNode from "../model/TreeNode"
import { sampleImgSrc1, sampleImgSrc2 } from "./Images"

const baseNode = new TreeNode({
  uuid: 'baseNode',
  content: `
    <h1>测试内容</h1>
    <pre><code>console.log("ABC 通用文章中的代码")</code></pre>
    <h2>表格</h2>
    <p>记得开启表格功能</p>
    <smart-table>
    <table>
      <tr>
        <th>1</th>
        <th>2</th>
      </tr>
      <tr>
        <td>3</td>
        <td>4</td>
      </tr>
      <tr>
        <td>5</td>
        <td>6</td>
      </tr>
    </table>
    </smart-table>
    <h3>很长的标题很长的标题场机场很9长的标题场机场机场很9长的标题场机场123456</h3>
    <h2>图片</h2>
    <p>下面是一张图</p>
    <img src="${sampleImgSrc2}"></img>
    <h2>画图 draw标签</h2>
    <draw src="${sampleImgSrc1}"></draw>
    <h2>画图 img标签</h2>
    <img draw="true" src="${sampleImgSrc1}"></img>
    <h2>链接</h2>
    <a href="https://www.baidu.com">百度</a>与谷歌的竞争
    <h2>待办列表</h2>
    <ul data-type="taskList">
      <li data-type="taskItem" data-checked="true">A list item</li>
      <li data-type="taskItem" data-checked="false">And another one</li>
    </ul>
    <toc></toc>
  `
})

export default baseNode
