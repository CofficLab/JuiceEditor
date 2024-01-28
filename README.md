# Kuaiyizhi_Editor

## draw.io的说明书

### 源码

<https://github.com/jgraph/drawio>

### 参数

通过 `/drawio/src/main/webapp/index.html?lang=zh&dev=1` 显示画板，也可以修改`src\main\webapp\js\PreConfig.js`，更多参数说明在这里：

<https://www.drawio.com/doc/faq/supported-url-parameters>

### 对draw.io的改动

- index.html dev 模式下的域名

  ```js
  '//test.draw.io/drawio/src/main' -> '/drawio/src/main'
  ```

- index.html 400 行左右，删除初始化时的提示
- `/src/main/webapp/js/diagramly/App.js` 700 行左右删除一批代码来解决弹窗问题：

  ```js
  [Dev] Bootstrap script change requires update of CSP
  ```

### 问题

- 左侧出现了“便签”  
清空浏览器本地存储就消失了

### 参考资料

<https://www.drawio.com/blog/embedding-walkthrough>
<https://www.drawio.com/doc/faq/embed-mode>
