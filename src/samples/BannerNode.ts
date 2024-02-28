import TreeNode from '../entities/TreeNode'

const bannerNode = new TreeNode({
    uuid: 'bannerNode',
    content: `
    <h1>Hello World</h1>
    <banner><code>console.log("JS")</code></banner>
    <banner color="blue">hi</banner>
    <banner color="red" type="question">What is going on</banner>
  `
})

export default bannerNode
