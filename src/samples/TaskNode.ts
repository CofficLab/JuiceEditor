import TreeNode from "../model/TreeNode"

const taskNode = new TreeNode({
    uuid: 'baseNode',
    content: `
    <h1>待办列表</h1>
    <ul data-type="taskList">
      <li data-type="taskItem" data-checked="true">A list item</li>
      <li data-type="taskItem" data-checked="false">And another one</li>
    </ul>
  `
})

export default taskNode
