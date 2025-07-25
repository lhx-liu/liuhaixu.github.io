# webpack插件

今天给大家介绍的webpack插件是mini-css-extract-plugin；

## mini-css-extract-plugin

它的作用是将 CSS 代码从 JavaScript 中分离出来，生成单独的 CSS 文件。

使用 mini-css-extract-plugin 可以避免将 CSS 代码打包到 JavaScript 文件中，减少 JavaScript 的体积，同时也可以使得 CSS 文件可以被浏览器缓存，提高页面加载速度。

### 安装

```

yarn add  -D mini-css-extract-plugin
```

### 配置

**在 webpack 配置文件中引入 mini-css-extract-plugin：**

```

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
```

**在 webpack 配置文件的 plugins 数组中添加 MiniCssExtractPlugin 的实例：**

  


```

plugins: [

new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  }),
],
```

其中，filename 是生成的 CSS 文件名，[name] 会被替换为入口文件名，[contenthash] 会根据文件内容生成一个 hash 值，用于版本管理。

**在 webpack 配置文件的 module.rules 数组中添加处理 CSS 文件的规则：**

```

module: {
  rules: [
    {
      test: /.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
      ],
    },
  ],
},
```

### 结果

打包后

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b1f52b884e34066ba5a4df07cd05884~tplv-k3u1fbpfcp-watermark.image?)

