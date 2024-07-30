import TreeNode from "../model/TreeNode"

const childrenNode = new TreeNode({
  uuid: "childrenNode",
  content: `
    <h1>带有子节点</h1>
  `,
  children: [
    new TreeNode({
      title: '子节点',
      content: `
        <h1>子节点</h1>
      `
    }),
    new TreeNode({
      title: '子节点',
      content: `
        <h1>子节点</h1>
      `
    })
  ]
})

export default childrenNode
