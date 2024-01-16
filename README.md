# Kuaiyizhi_Editor

## draw.io的说明书

### 源码

<https://github.com/jgraph/drawio>

### 参数

通过 `/drawio/src/main/webapp/index.html?lang=zh&dev=1` 显示画板，更多参数说明在这里：

<https://www.drawio.com/doc/faq/supported-url-parameters>

## 对draw.io的改动

- index.html dev 模式下的域名
- index.html 删除初始化时的提示
- index.html 700 行左右删除一批代码来解决弹窗问题：  
  [Dev] Bootstrap script change requires update of CSP

  ```js
  // 往数据库写入画图数据，然后初始化
  initDB(function () {
    ...
  })
  ```
