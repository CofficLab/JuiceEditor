# 快速开始

该项目目前仍处于开发阶段，尚不稳定，请勿用于生产环境。

## 构建

```shell
pnpm i
pnpm run build
```

## 使用

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <script type="module" crossorigin src="./juice-editor/assets/index-23e26c6d.js"></script>
</head>

<body>
  <juice-editor>
    <h1>Say Hello to JuiceEditor</h1>
    <pre><code>console.log("ABC")</code></pre>
  </juice-editor>
</body>

</html>
```