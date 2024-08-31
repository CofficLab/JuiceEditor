import TreeNode from "../model/TreeNode"

const tocNode = new TreeNode({
  uuid: 'bannerNode',
  content: `
    <h1>Hello World</h1>
    <banner><code>console.log("JS")</code></banner>
    <banner color="blue">hi</banner>
    <banner color="red" type="question">What is going on</banner>
    <h2>二级标题</h2>
    <h3>很长的标题很长的标题场机场很9长的标题场机场toctoc1234434234234234234234234234</h3>
    <h3>三级标题</h3>
    <h4>四级标题1</h4>
    <h5>五级标题1</h5>
    <h4>四级标题2</h4>
    <h5>五级标题1</h5>
    <h6>六级标题1</h6>
    <h6>六级标题2</h6>
    <h6>六级标题3</h6>
    <toc></toc>
  `
})

export default tocNode
