import TreeNode from "../model/TreeNode"

const codeNode = new TreeNode({
    uuid: 'codeNode',
    content: `
    <h1 id="heading-1">代码块</h1><p>现在，我们需要往<code class="my-custom-class">numbers.txt</code>文件中写入数字 1 到 10，用程序来做：</p><pre height="0" database="{&quot;items&quot;:[{&quot;title&quot;:&quot;自动生成的代码块&quot;,&quot;content&quot;:&quot;x = 1\n如果 x <= 10,循环执行\n    x的值写入 numbers.txt\n    x = x + 1\n结束\n&quot;,&quot;language&quot;:&quot;JavaScript&quot;,&quot;runVisible&quot;:true}],&quot;activatedIndex&quot;:0}" uuid="4c284b1a-cefd-410a-9944-77714d2256ad"><code>x = 1
如果 x &lt;= 10,循环执行
    x的值写入 numbers.txt
    x = x + 1
结束
</code></pre><blockquote class="my-custom-class"><p>上面这段一般称为：伪代码</p></blockquote><p>计算机的三个重要组成部分分工是怎么样的呢？</p><ul class="my-custom-class"><li class="my-custom-class"><p>CPU：做计算，在这里主要是：<code class="my-custom-class">x = x + 1</code></p></li><li class="my-custom-class"><p>内存：存储临时数据，在这里主要是存储&nbsp;<code class="my-custom-class">x</code>&nbsp;的值</p></li><li class="my-custom-class"><p>硬盘：长期存储数据，<code class="my-custom-class">numbers.txt</code>&nbsp;就存储在硬盘中</p></li></ul><h2 id="heading-2">认识编程语言</h2><p>上面的那段程序，计算机是看不懂的，所以我们需要编程语言的帮助。</p><p>编程语言是一个中间语言，连接了人类语言和计算机语言。</p><p>用各种编程语言翻译一下上面的程序（<em class="my-custom-class">为了方便演示，写入硬盘改为输出</em>）：</p><h3 id="heading-3">Python</h3><h3 id="heading-4">JavaScript</h3><pre height="0" database="{&quot;items&quot;:[{&quot;title&quot;:&quot;自动生成的代码块&quot;,&quot;content&quot;:&quot;x = 1;\nwhile (x <= 10) {\n    console.log(x)\n    x = x + 1;\n}&quot;,&quot;language&quot;:&quot;JavaScript&quot;,&quot;runVisible&quot;:true}],&quot;activatedIndex&quot;:0}" uuid="332849a1-7434-4433-965f-7309a8de0132"><code>x = 1;
while (x &lt;= 10) {
    console.log(x)
    x = x + 1;
}</code></pre><h3 id="heading-5">PHP</h3><pre height="0" database="{&quot;items&quot;:[{&quot;title&quot;:&quot;自动生成的代码块&quot;,&quot;content&quot;:&quot;$x = 1;\nwhile ($x <= 10) {\n    echo $x.PHP_EOL;\n    $x = $x + 1;\n}&quot;,&quot;language&quot;:&quot;PHP&quot;,&quot;runVisible&quot;:true}],&quot;activatedIndex&quot;:0}" uuid="a5944566-26dd-4167-8d9f-a2ca9a20728c"><code>$x = 1;
while ($x &lt;= 10) {
    echo $x.PHP_EOL;
    $x = $x + 1;
}</code></pre><h3 id="heading-6">Java</h3><pre height="0" database="{&quot;items&quot;:[{&quot;title&quot;:&quot;自动生成的代码块&quot;,&quot;content&quot;:&quot;package main\nimport \&quot;fmt\&quot;\n\nfunc main() {\n    for x := 1; x <= 10; x = x + 1 {\n        fmt.Println(x)\n    }\n}\n&quot;,&quot;language&quot;:&quot;Java&quot;,&quot;runVisible&quot;:true}],&quot;activatedIndex&quot;:0}" uuid="a8bd8964-a312-4c12-897b-6393ce9c5aac"><code>package main
import "fmt"

func main() {
    for x := 1; x &lt;= 10; x = x + 1 {
        fmt.Println(x)
    }
}
</code></pre><h3 id="heading-7">Golang</h3><pre height="0" database="{&quot;items&quot;:[{&quot;title&quot;:&quot;自动生成的代码块&quot;,&quot;content&quot;:&quot;package main\nimport \&quot;fmt\&quot;\n\nfunc main() {\n    for x := 1; x <= 10; x = x + 1 {\n        fmt.Println(x)\n    }\n}\n&quot;,&quot;language&quot;:&quot;Go&quot;,&quot;runVisible&quot;:true}],&quot;activatedIndex&quot;:0}" uuid="462f83e9-f0c9-4665-8047-884ac248bd03"><code>package main
import "fmt"

func main() {
    for x := 1; x &lt;= 10; x = x + 1 {
        fmt.Println(x)
    }
}
</code></pre><h2 id="heading-8">编程语言的区别</h2><p>主流编程语言的语法都有某种程度的相似，因为它们都在用简洁的语法来阐述人的思想。</p><p>那么为什么要有这么多编程语言呢？因为有不同的应用领域：</p><ul class="my-custom-class"><li class="my-custom-class"><p>有些适合做网站开发，如：PHP；</p></li><li class="my-custom-class"><p>有些适合做数据处理，如：Python；</p></li><li class="my-custom-class"><p>有些适合做大型软件，如：Java、Golang；</p></li><li class="my-custom-class"><p>有些适合做用户交互，如：JavaScript。</p></li></ul><banner color="blue" type="info">通过对比，可以看出 Python 的语法是其中最简洁的。</banner><p>对于无任何编程经验的初学者，我建议首先学习 Python。</p><p>掌握了一门编程语言之后，再学另一门会有如鱼得水的感觉，因此请多学几门。</p><h2 id="heading-9">编程的本质</h2><p>编程的本质就是指挥计算机操作 CPU、内存、硬盘。</p><p>作为本次课程的指挥家，在接下来的学习中，我们不仅要学习编程的语法，更要了解如何充分的使用 CPU、内存、硬盘。</p><h2 id="heading-10">程序的好与坏</h2><p></p><pre height="0" database="{&quot;items&quot;:[{&quot;title&quot;:&quot;自动生成的代码块&quot;,&quot;content&quot;:&quot;sum = 0\ncurrent = 1\n循环执行直到current=n\n    sum = sum + current\n输出sum&quot;,&quot;language&quot;:&quot;Text&quot;,&quot;runVisible&quot;:true}],&quot;activatedIndex&quot;:0}" uuid="71ac5b9d-a111-4f4f-b1c8-5726ca3d7998"><code>sum = 0
current = 1
循环执行直到current=n
    sum = sum + current
输出sum</code></pre><p>显然，这段程序最主要的、最耗时的操作是：<code class="my-custom-class">sum = sum + current</code>，由 CPU 负责计算。</p><p>假设每次计算，CPU 需要的时间是 1 秒，要计算 n 次，那么这种做法需要的时间约等于：n 秒。</p><p>还可以这样做：</p><pre height="0" database="{&quot;items&quot;:[{&quot;title&quot;:&quot;自动生成的代码块&quot;,&quot;content&quot;:&quot;sum = (1 + n) * (n / 2)\n\n输出sum&quot;,&quot;language&quot;:&quot;Text&quot;,&quot;runVisible&quot;:true}],&quot;activatedIndex&quot;:0}" uuid="2e2900d1-68e3-451e-ae22-cd827db36127"><code>sum = (1 + n) * (n / 2)

输出sum</code></pre><blockquote class="my-custom-class"><p>注意，编程语言一般用<code class="my-custom-class">/</code>来表示除号</p></blockquote><p>CPU 只做了一件事：<code class="my-custom-class">(1 + n) * (n / 2)</code>，看起来要比&nbsp;<code class="my-custom-class">sum = sum + current</code>复杂一点点，假设需要 1.5 秒，那么整个程序需要的大概时间是：1.5 秒。</p><p>可以看出，不管 n 有多大，这段程序需要的时间是固定的。</p><p>而第一种做法，随着 n 的增加，时间也随之线性增加，当 n 大到一定程度时，其耗时是不能被人类接受的。</p><toc></toc>`
})

export default codeNode
