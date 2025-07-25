此篇主要是记录下webpack构建react项目的过程。

*前言：为什么想起来通过webpack去构建react的项目呢？现在可以通过cra或者vite或其他脚手架去构建比较省事。主要还是想要了解下webpack相关的知识，如果对webpack构建以不敢兴趣可以等后续笔者发布关于TSX的相关知识*

## 1、webpack、webpack-cli

既然通过webpack构建项目，首先离不开两个包*webpack webpack-cli*

webpack 是一个JS程序静态模块化打包工具。通过一个或多个入口点，将所有模块打包成一个或多个 bundle。它本身可以通过插件或者loader支持所熟知的react、vue、Angular等。

webpack-cli是webpack的命令行工具，它支持在命令行中操作webpack。

他们两个都可以通过npm或yarn命令安装。

## 2、起步

初始化package.json文件

```
yarn init -y
```

*其中-y参数是跳过初始化json文件时需要手动输入的项*

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c14eb230aef4e40b3c10472a1484932~tplv-k3u1fbpfcp-zoom-1.image)

安装webpack webpack-cli

```
yarn add -D webpack webpack-cli
```

## 3、webpack.config.js

在跟目录下创建webpack.config.js文件，该文件用于配置webpack。一份基础的webpack配置文件如下：

```
module.exports = {
    mode: 'production',
    entry: './src/index.js', //规定打包入口文件
    output: {               //打包出口
        path: __dirname + '/dist',
        // [contenthash:8] - hash值 会根据内容生成hash值，对应版本更新
        // 如果内容无变化 两次编译的js文件是一样的
        filename: '[name]-[contenthash:8].js',
        // 编译前清除目录
        clean: true,
    },
    module: {
        rules: [],      //loader集合
    },
    plugins: [],      //插件
};
```

如果对于以上webpack中的概念不太了解，建议先查阅​[​webpack概念​](https://www.webpackjs.com/concepts/)​

## 4、支持react、配置react环境

首先支持react我们需要将安装react react-dom

```
yarn add react react-dom
```

安装完react后需要安装react配置包

1.  **babel-loader**
1.  **@babel/core**
1.  **@babel/preset-env**
1.  **@babel/preset-react**
1.  **@babel/plugin-transform-runtime**

**@babel/core** 是 Babel 的核心模块，它提供了 Babel 的转换引擎和 API，负责将代码转换成兼容多种浏览器的 JavaScript 代码。开发者需要通过配置 @babel/core 模块，来使用 Babel 完成对 JavaScript 代码的转换。

**@babel/preset-env** 是一个智能的预设，它根据你的目标环境自动确定需要的转换和插件，从而将最新的 JavaScript 语法转换为向后兼容的代码。它可以根据你的设置，自动检测目标浏览器或 Node.js 版本，并将代码转换为兼容这些环境的代码。这使得开发者可以使用最新的 ECMAScript 语法，同时兼容多个浏览器和环境，而不必担心兼容性问题。

**@babel/preset-react** 则是用于将 React 代码转换为兼容多种浏览器的 JavaScript 代码，其中包括支持 JSX 语法、React 的新特性等。它可以将 JSX 语法转换为普通的 JavaScript 代码，从而使得浏览器可以正确地解析和渲染 React 组件。

*注意：@babel/preset-env** 和 **@babel/preset-react **的功能不同，前者是用于转换 JavaScript 语法，后者是用于转换 React 代码。在配置 Babel 时，一般需要同时使用这两个预设来完成对 JavaScript 和 React 的转换*

**@babel/plugin-transform-runtime** 是一个 Babel 插件，它用于在编译过程中，将代码中的公共部分提取到一个单独的模块中，从而避免在每个模块中重复引入相同的代码。该插件可以减小编译后文件的体积，并提高代码的运行效率。

该插件会自动将代码中需要的辅助函数注入到单独的模块中，从而避免在每个模块中重复定义辅助函数。同时，它还会使用 @babel/runtime 模块中提供的 polyfill 来兼容一些新的 ECMAScript 特性，例如 Promise 和 Symbol 等。

**安装：**

```
yarn add -D babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime
```

**配置：**

修改webpack.config.js 增加使用babel-loader对js或jsx转义

```
{
    test: /.(js|jsx)$/,
    use: 'babel-loader',
},
```

**.babelrc**

在项目跟目录下增加**.babelrc**配置文件

```
{
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ],
    "plugins": [
      [
        "@babel/plugin-transform-runtime",
        {
          //"regenerator"是.babelrc中的一个配置项，它指定了是否将async/await语法转换为ES5代码。
          // async/await是ES7中的新语法，它使异步编程变得更加容易和直观。
          // 然而，这种语法在旧版的浏览器和Node.js中并不支持，因此需要使用Babel将代码转换为向后兼容的代码。
          "regenerator": true 
        }
      ]
    ]
}
```

*提示：.babelrc是一个用于配置Babel编译器的文件，它可以帮助开发者将现代JavaScript代码转换为可在旧版浏览器或环境中运行的向后兼容代码。 Babel是一个JavaScript编译器，它可以将新的JavaScript语法转换为旧的语法，以便在旧版浏览器中运行。例如，如果你想使用ES6的箭头函数，但某些浏览器不支持它，你可以使用Babel将代码转换为ES5语法。 .babelrc文件是一个JSON格式的配置文件，它包含了Babel编译器的配置选项，包括预设和插件。预设（presets）是一组插件的集合，它们一起工作以转换代码，而插件（plugins）是单个功能的小组件，它们可以添加到编译器中以提供额外的功能。*

**index.jsx：**

在项目中增加src目录，并在该目录下新建index.jsx文件

```
import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <div>Hello word</div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));
```

修改webpack.config.js中入口为index.jsx如下：

```
module.exports = {
    mode: 'production',
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/dist',
        // [contenthash:8] - hash值 对应版本更新
        filename: '[name]-[contenthash:8].js',
        // 编译前清除目录
        clean: true,
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                use: 'babel-loader',
            },
        ],
    },
    plugins: [],
};
```

**测试打包：**

在package.json中增加script对象如下：

```
"scripts": {
    "build": "webpack"
  },
```

运行yarn run build 可以看到在dist下面已经将包打出来了

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/38a4739558f744dbbb62cfbca4d81040~tplv-k3u1fbpfcp-zoom-1.image)

至此，一个支持打包jsx的webpack可以正常进行了。

## 5、webpack-dev服务

*前面四个模块就实现了webpack支持jsx打包。但是开发过程中，不能每次修改之后重现编译在，再在浏览器进行刷新查看，影响效率。*

**引入webpack-dev**

```
yarn add -D webpack-dev-server
```

*Webpack-dev是Webpack的一个开发服务器，它提供了一些特殊的功能，比如：*

*自动重载、Hot Module Replacement(HMR)、代理服务器、Source Map*

*使用Webpack-dev，可以提高开发效率，节省开发时间。*

在**package.json**中增加如下：

```
"scripts": {
    "start": "webpack serve", //增加start
    "build": "webpack"
  },
```

在webpack.config.js中配置webpack-dev配置项

```
devServer: {
    //是否启用 HTML5 历史记录模式，默认为 false。
    // 如果启用，所有请求都会返回 index.html 页面，适用于单页应用
    // 也可以用Object针对特定的路由返回设定的html页面
    historyApiFallback: true,
    open: true, // 自动打开页面
    hot: true,  // 是否启用热更新 默认为false
    // 是否开启代码压缩
    compress: false,
    // 启动的端口
    port: 8888,
    proxy: {
        '/api': 'http://localhost:3000',
      },
    client: {
        overlay: false, //当出现编译错误或警告时，在浏览器中显示全屏覆盖。
        progress: true, //在浏览器中以百分比显示编译进度。
    },
},
```

devServer更多配置详见​[​此处​](https://webpack.docschina.org/configuration/dev-server/)​

*前面在index.js中挂在所需的root节点还未提供。需要新增index.html文件*

**index.html**

在项目根目录下新增public文件夹，并新增index.html文件

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>myapp</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

正常运行项目 yarn start

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be96988a4000421faa8ff33ddb7786fb~tplv-k3u1fbpfcp-zoom-1.image)

  


发现页面是空白的，这是引入我们的js文件没有在html中引入。那如何让webpack自动将相关资源挂载到html中呢？

**html-webpack-plugin**

**介绍：**

*它可以将生成的js文件自动注入到html文件中，生成一个包含所有资源的html文件。*

*使用HTML webpack插件可以避免手动管理生成的HTML文件和打包后的JS文件之间的关系，同时也可以自定义生成的HTML文件，例如添加自定义的meta信息、favicon图标等。*

  


**安装:**

```
yarn add -D html-webpack-plugin
```

**配置：**

```
// 顶部引入
const htmlWebpackPlugin = require('html-webpack-plugin');

plugins: [
    // htmlWebpackPlugin 插件会将相关资源自动挂在到html中
    new htmlWebpackPlugin({
        filename: 'index.html', //生成的html文件名
        // 根据指定模板生成
        template: path.resolve(__dirname, './public/index.html'),
    }),
],
```

**运行测试：**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46bb5ff4c86047e58ec712926db2d949~tplv-k3u1fbpfcp-zoom-1.image)

**打包测试:**

打包后发现dist下多了index.html 并且改文件中自动引入了js文件

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb66c9c567254c6f9e2c33e6d3e94d38~tplv-k3u1fbpfcp-zoom-1.image)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/040d29d8e064466c83f5c88ad5ff8c46~tplv-k3u1fbpfcp-zoom-1.image)

  


至此，一基础的个可运行、可编译的jsx的react项目就完成后。

## 6、CSS、LESS

**安装：**

```
yarn add -D style-loader css-loader less-loader less
```

-   style-loader： 把 CSS 插入到 DOM 中。
-   css-loader： 会对 @import 和 url() 进行处理。将css打包到js中
-   less-lodaer: 将.less文件转换为CSS文件

**在webpack.config.js中配置：**

```
{
    test: /.(le|c)ss$/,
    use: [
        'style-loader',
        'css-loader',
        'less-loader'
    ],
},
```

新建index.less文件。在index.jsx中引入该样式文件。运行之后

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b711ebc46914421b8b7743eb292e351c~tplv-k3u1fbpfcp-zoom-1.image)

  


**后续还会在配置css优化、字体引入、tsx、js打包优化等等。敬请关注哟，谢谢！**