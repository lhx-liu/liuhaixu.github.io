# unv-progress

## 更新日志

```bash
更新 1.0.0版本
初始版本
```

## 安装

```bash
请在uniapp插件市场安装
```

## 引入

```bash
本组件符合easycom组件规范,直接在页面中使用
```
## 兼容性

```bash
端：H5 微信小程序 支持；其他也均支持 未测试。
vue2 vue3 支持

```


## USE

```javascript
<template>
	<view class="content">
		<unv-progress :img="img" :ratio="80"></unv-progress>
		{/* //其它代码 */}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img: 'http://192.168.0.102:4010/img/index.png'
			}
		}
	}
</script>

```

## Props

### 属性
说明：

| props    | desc                           |
| -------- | ------------------------------ |
| img       | 进度条末端图片URL或base64             |
| ratio   | 进度条比例                       |
| progressHeight | 进度条高度                       |
| backColor  | 进度条背景颜色                   |
| innerColor     | 进度条内部颜色                   |
| imgWidth     | 图片宽度 没有放开图片高度是因为高度是根据进度条的高度自动计算的 |


## Author

```bash
liuhaixu
```

## V1.0.0

updata log,

```bash
V1.0.0
带图片的进度条组件
```


