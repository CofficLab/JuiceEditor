import TreeNode from "./TreeNode"

const sampleImgSrc1 = 'data:image/png;base64,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'
const sampleImgSrc2 = 'data:image/png;base64,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'

const sampleNode = new TreeNode({
  uuid: 'sampleNode',
  content: `
    <h1>测试内容</h1>
    <pre><code>console.log("ABC 通用文章")</code></pre>
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
    <h2>图片</h2>
    <p>下面是一张图</p>
    <img src="${sampleImgSrc1}"></img>
    <h2>画图</h2>
    <draw src="${sampleImgSrc1}"></draw>
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

const liteNode = new TreeNode({
  uuid: 'liteNode',
  content: `
    <h1>测试内容</h1>
    <h2>链接</h2>
  `
})

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

const nodeWithChildren = new TreeNode({
  uuid: "nodeWithChildren",
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

const bigNode = new TreeNode({
  uuid: 'bigNode',
  content: `
    <h1>很长的测试内容</h1>
    <pre><code>console.log("超长文章 bigNode xxxxx")</code></pre>
    <h2>表格</h2>
    <pre><code>console.log("超长文章 bigNode yyyyyy")</code></pre>
    <h2>图片</h2>
    <p>下面是一张图</p>
    <img src="${sampleImgSrc1}"></img>
    <h2>画图</h2>
    <draw src="${sampleImgSrc2}"></draw>
    <h2>链接</h2>
    <a href="https://www.baidu.com">百度</a>与谷歌的竞争
    <h2>待办列表</h2>
    <ul data-type="taskList">
      <li data-type="taskItem" data-checked="true">A list item</li>
      <li data-type="taskItem" data-checked="false">And another one</li>
    </ul>
    <h2>待办列表</h2>
    <p>春江花月夜认识计算机</p>
    <p>计算机有三个重要的组成部分：</p>
    <p>CPU：做计算</p>
    <h3>标题</h3>
    <p>内存：读写速度极快，存储数据，提供给 CPU</p>
    <p>硬盘：读写速度慢，长期存储数据</p>
    <p>认识程序</p>
    <h3>标题</h3>
    <p>现在，我们需要往numbers.txt文件中写入数字 1 到 10，用程序来做：</p>
    <p>上面这段一般称为：伪代码</p>
    <p>计算机的三个重要组成部分分工是怎么样的呢？</p>
    <p>CPU：做计算，在这里主要是：x = x + 1</p>
    <p>内存：存储临时数据，在这里主要是存储 x 的值</p>
    <p>硬盘：长期存储数据，numbers.txt 就存储在硬盘中</p>
    <p>认识编程语言</p>
    <h3>标题</h3>
    <p>上面的那段程序，计算机是看不懂的，所以我们需要编程语言的帮助。</p>
    <p>编程语言是一个中间语言，连接了人类语言和计算机语言。</p>
    <p>用各种编程语言翻译一下上面的程序（为了方便演示，写入硬盘改为输出）：</p>
    <p>编程语言的区别</p>
    <p>主流编程语言的语法都有某种程度的相似，因为它们都在用简洁的语法来阐述人的思想。</p>
    <p>那么为什么要有这么多编程语言呢？因为有不同的应用领域：</p>
    <p>有些适合做网站开发，如：PHP；</p>
    <h2>标题</h2>
    <p>有些适合做数据处理，如：Python；</p>
    <h2>标题</h2>
    <p>有些适合做大型软件，如：Java、Golang；</p>
    <h2>标题</h2>
    <h2>标题</h2>
    <h2>标题</h2>
    <h2>标题</h2>
    <h2>标题</h2>
    <p>有些适合做用户交互，如：JavaScript。</p>
    <p>通过对比，可以看出 Golang 的语法稍显复杂，不过这并不影响它的流行。</p>
    <h2>标题</h2>
    <p>掌握了一门编程语言之后，再学另一门会有如鱼得水的感觉，因此请多学几门。</p>
    <h2>标题</h2>
    <p>编程的本质</p>
    <h3>标题</h3>
    <p>编程的本质就是指挥计算机操作 CPU、内存、硬盘。</p>
    <p>作为本次课程的指挥家，在接下来的学习中，我们不仅要学习编程的语法，更要了解如何充分的使用 CPU、内存、硬盘。</p>
    <p>程序的好与坏</p>
    <p>完成同一个目标，有人写的程序能在 0.1 内运行完毕，有的人的却需要 10 秒。</p>
    <p>造成这种差异的原因，大多是因为算法的差异。</p>
    <p>有个最著名的例子：</p>
    <p>请计算出 1 + 2 + 3 ... + n 的值。</p>
    <p>可以这样做：</p>
    <p>sum = 0</p>
    <h2>标题</h2>
    <p>current = 1</p>
    <h3>标题</h3>
    <p>循环执行直到current=n</p>
    <p>sum = sum + current</p>
    <p>输出sum</p>
    <h3>标题</h3>
    <p>显然，这段程序最主要的、最耗时的操作是：sum = sum + current，由 CPU 负责计算。</p>
    <p>假设每次计算，CPU 需要的时间是 1 秒，要计算 n 次，那么这种做法需要的时间约等于：n 秒。</p>
    <p>还可以这样做：</p>
    <h2>标题</h2>
    <p>sum = (1 + n) * (n / 2)</p>
    <p>输出sum</p>
    <p>注意，编程语言一般用/来表示除号</p>
    <p>CPU 只做了一件事：(1 + n) \* (n / 2)，看起来要比 sum = sum + current复杂一点点，假设需要 1.5 秒，那么整个程序需要的大概时间是：1.5 秒。</p>
    <p>可以看出，不管 n 有多大，这段程序需要的时间是固定的。</p>
    <p>而第一种做法，随着 n 的增加，时间也随之线性增加，当 n 大到一定程度时，其耗时是不能被人类接受的。</p>
    <p>算法</p>
    <h2>标题</h2>
    <p>一件问题的解决办法，称为算法。有些算法特别慢，有些算法特别快。</p>
    <p>找出问题的最佳算法，充分利用计算机资源，才是编程的最高境界。</p>
    <toc></toc>
  `
})

const drawNode = new TreeNode({
  uuid: 'drawNode',
  content: `
    <h2>画图1</h2>
    <draw src="${sampleImgSrc1}"></draw>
    <h2>链接</h2>
    <a href="https://www.baidu.com">百度</a>与谷歌的竞争
    <h2>待办列表</h2>
    <h2>画图2</h2>
    <draw src="${sampleImgSrc2}"></draw>
    <ul data-type="taskList">
      <li data-type="taskItem" data-checked="true">A list item</li>
      <li data-type="taskItem" data-checked="false">And another one</li>
    </ul>
    <toc></toc>
  `
})

const codeNode = new TreeNode({
  uuid: 'drawNode',
  content: `
    <h1>Hello World</h1>
    <p>=========</p>
    <pre><code>console.log("JS")</code></pre>
    <p>=========</p>
    <pre><code>echo("PHP")</code></pre>
    <p>=========</p>
    <pre><code>print("Python")</code></pre>
    <p>=========</p>
    <pre><code>fmt.Println("Golang")</code></pre>
    <p>=========</p>
  `
})

const Sample = {
  sampleNode,
  drawNode,
  liteNode,
  tableNode,
  nodeWithChildren,
  bigNode,
  codeNode,
}

export default Sample
