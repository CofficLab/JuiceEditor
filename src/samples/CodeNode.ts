import TreeNode from "../model/TreeNode"

const codeNode = new TreeNode({
    uuid: 'codeNode',
    content: `
    <h1 id="heading-1">代码块</h1><p>现在，我们需要往<code class="my-custom-class">numbers.txt</code>文件中写入数字 1 到 10，用程序来做：</p><pre height="0" uuid="4c284b1a-cefd-410a-9944-77714d2256ad"><code class="language-text">x = 1
如果 x &lt;= 10,循环执行
    x的值写入 numbers.txt
    x = x + 1
结束
</code></pre><blockquote class="my-custom-class"><p>上面这段一般称为：伪代码</p></blockquote>

<p>计算机的三个重要组成部分分工是怎么样的呢？</p><ul class="my-custom-class"><li class="my-custom-class"><p>CPU：做计算，在这里主要是：<code class="my-custom-class">x = x + 1</code></p></li><li class="my-custom-class"><p>内存：存储临时数据，在这里主要是存储&nbsp;<code class="my-custom-class">x</code>&nbsp;的值</p></li><li class="my-custom-class"><p>硬盘：长期存储数据，<code class="my-custom-class">numbers.txt</code>&nbsp;就存储在硬盘中</p></li></ul><h2 id="heading-2">认识编程语言</h2><p>上面的那段程序，计算机是看不懂的，所以我们需要编程语言的帮助。</p><p>编程语言是一个中间语言，连接了人类语言和计算机语言。</p><p>用各种编程语言翻译一下上面的程序（<em class="my-custom-class">为了方便演示，写入硬盘改为输出</em>）：</p>

<h3 id="heading-4">JavaScript</h3>

<pre height="0" uuid="332849a1-7434-4433-965f-7309a8de0132">
<code class="language-javascript">x = 1;
while (x &lt;= 10) {
    console.log(x)
    x = x + 1;
}</code></pre>

<h3 id="heading-5">PHP</h3>

<pre height="0" uuid="a5944566-26dd-4167-8d9f-a2ca9a20728c"><code class="language-php">$x = 1;
while ($x &lt;= 10) {
    echo $x.PHP_EOL;
    $x = $x + 1;
}</code></pre>

<h3 id="heading-6">Java</h3>

<pre height="0" uuid="a8bd8964-a312-4c12-897b-6393ce9c5aac">
<code class="language-java">package main
import "fmt"

func main() {
    for x := 1; x &lt;= 10; x = x + 1 {
        fmt.Println(x)
    }
}
</code></pre>

<h3 id="heading-7">Golang</h3>

<pre height="0" uuid="462f83e9-f0c9-4665-8047-884ac248bd03">
<code class="language-go">package main
import "fmt"

func main() {
    for x := 1; x &lt;= 10; x = x + 1 {
        fmt.Println(x)
    }
}
</code></pre><h2 id="heading-8">编程语言的区别</h2><p>主流编程语言的语法都有某种程度的相似，因为它们都在用简洁的语法来阐述人的思想。</p><p>那么为什么要有这么多编程语言呢？因为有不同的应用领域：</p><ul class="my-custom-class"><li class="my-custom-class"><p>有些适合做网站开发，如：PHP；</p></li><li class="my-custom-class"><p>有些适合做数据处理，如：Python；</p></li><li class="my-custom-class"><p>有些适合做大型软件，如：Java、Golang；</p></li><li class="my-custom-class"><p>有些适合做用户交互，如：JavaScript。</p></li></ul><banner color="blue" type="info">通过对比，可以看出 Python 的语法是其中最简洁的。</banner><p>对于无任何编程经验的初学者，我建议首先学习 Python。</p><p>掌握了一门编程语言之后，再学另一门会有如鱼得水的感觉，因此请多学几门。</p><h2 id="heading-9">编程的本质</h2><p>编程的本质就是指挥计算机操作 CPU、内存、硬盘。</p><p>作为本次课程的指挥家，在接下来的学习中，我们不仅要学习编程的语法，更要了解如何充分的使用 CPU、内存、硬盘。</p>

<toc></toc>`
})

export default codeNode
