import { sampleImgSrc1, sampleImgSrc2 } from "./images_db"

const featureDoc = `
    <div data-type="root">
        <h1>JuiceEditor</h1>
        <h2>Instruction</h2>
        <p>JuiceEditor is a powerful and flexible text editor that allows you to create and edit content with ease.</p>
        <h2>Image</h2>
        <img src="https://placehold.co/600x200" class="mx-auto"/>
        <h2>Diagram</h2>
        <image draw=true src="${sampleImgSrc1}" class="ml-8"></image>
        <h2>Link</h2>
        <a href="https://www.baidu.com">百度</a>与谷歌的竞争
        <h2>Task List</h2>
        <ul data-type="taskList">
        <li data-type="taskItem" data-checked="true">A list item</li>
        <li data-type="taskItem" data-checked="false">And another one</li>
        </ul>
        <h2>Table</h2>
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
        <h2>Code</h2>
        <pre><code class="language-js">console.log("ABC 通用文章中的代码")</code></pre>
        <toc></toc>
    </div>
  `
export default featureDoc