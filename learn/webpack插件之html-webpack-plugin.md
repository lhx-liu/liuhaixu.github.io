# webpack插件

今天给大家介绍的webpack插件是html-webpack-plugin；

## 介绍

htmlWebpackPlugin 是一个 webpack 插件，用于自动生成 HTML 文件，并将打包后的 JS、CSS 文件自动引入 HTML 中。使用 htmlWebpackPlugin 可以方便地生成多个 HTML 文件，支持自定义模板，自动注入打包后的资源等功能。

## 安装

在项目中使用 htmlWebpackPlugin 需要先安装它：

```
npm install html-webpack-plugin --save-dev

or

yarn add html-webpack-plugin -D
```

## 配置

在 webpack 配置文件中引入 htmlWebpackPlugin，并添加到 plugins 数组中：

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //...
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: 'src/index.html'
        })
    ]
}
```

上面的配置会自动生成一个名为 index.html 的文件，使用 src/index.html 作为模板，并将打包后的 JS、CSS 文件自动引入到 HTML 中。

## 常用配置项：

**title**：HTML 文件的标题，默认为 Webpack App。 **filename**：生成的 HTML 文件名，默认为 index.html。 **template**：模板文件路径，支持 ejs、pug 等模板引擎，默认为 src/index.html。 **inject**：自动注入打包后的资源，支持 true、false、'head'、'body' 四个选项，默认为 true。 **favicon**：生成的 HTML 文件的 favicon 图标路径，默认为 false。 **minify**：压缩 HTML 文件，支持 true、false 和一个包含压缩选项的对象，默认为 false。 **chunks**：指定需要引入的 chunk 名称，默认为全部 chunk。

示例:

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        app: './src/app.js',
        vendor: './src/vendor.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: 'src/index.html',
            inject: 'body',
            favicon: 'src/assets/favicon.ico',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
            chunks: ['app']
        })
    ]
}
```

上面的配置将生成一个名为 index.html 的文件，使用 src/index.html 作为模板，将打包后的 app.js 文件自动引入到 HTML 的 body 中，并压缩 HTML 文件。