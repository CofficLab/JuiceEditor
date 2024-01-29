# Kuaiyizhi_Editor

## draw.io的说明书

### 源码

<https://github.com/jgraph/drawio>

如果源码有更新，将源码中的`webapp`复制到`drawio`。

- etc

### 原理

无需修改drawio的源码，embed模式下可通过postMessage通信。具体看`SmartDraw`部分的源码。

### 问题

- 左侧出现了“便签”  
清空浏览器本地存储就消失了

### 参考资料

<https://www.drawio.com/blog/embedding-walkthrough>
<https://www.drawio.com/doc/faq/embed-mode>
