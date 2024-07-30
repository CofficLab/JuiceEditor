import TreeNode from "../model/TreeNode"

const tableNode = new TreeNode({
  uuid: 'tableNode',
  content: `
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
  `
})

export default tableNode
