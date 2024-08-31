import EditorDoc from "../model/EditorDoc"
import TreeNode from "../model/TreeNode"
import Sample from "../model/Sample"

const tableNode = new TreeNode({
  uuid: 'tableNode',
}).setTitle("表格")

const tableDoc = new EditorDoc()
  .setUuid('tableDoc')
  .setContent(`
    <h1>测试内容</h1>
    <h2>表格 SmartTable</h2>
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
    <h2>表格 Table</h2>
    <p>记得开启表格功能</p>
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
    <p></p>
  `)

export default new Sample(tableNode, tableDoc)
