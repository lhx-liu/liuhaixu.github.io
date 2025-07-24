# unv-calendar

## 描述

```bash
封装日历组件，可以在日历上进行预约或签到。
1、一款自定义封装的日历组件
2、可以用于门票预约、签到等场景
3、目前最多只放开当前月份和下一个月的日期，如果需要更多的日期，需要自己进行扩展
```

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
端：只测试过H5、微信小程序，其他端未测试
框架：vue2、vue3

```


## USE

```javascript
<template>
	<view class="test-box">
		<view class="text">
			日历使用示例
		</view>
		<view class="text1">1、预约示例</view>
		<view class="calendar-box">
			<unv-calendar :selected="openDays1" @changeDay="changeDay" :monthCanChange="true"></unv-calendar>
		</view>
		<view class="text1">2、签到示例</view>
		<view class="calendar-box">
			<unv-calendar :selected="openDays2" :title="false" @changeDay="changeDay" :monthCanChange="true"></unv-calendar>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				openDays1: [
					{
						date: '2025-04-21',
						disable: true,
						info: '已约完'
					},
					{
						date: '2025-04-22',
						disable: false,	
						info: '可预约'
					},
					{
						date: '2025-04-23',
						disable: false,	
						info: '可预约'
					},
					{
						date: '2025-04-24',
						disable: false,	
						info: '可预约'
					},
					{
						date: '2025-04-25',
						disable: true,	
						info: '未开放'
					},
					{
						date: '2025-04-26',
						disable: true,	
						info: '未开放'
					}
				],
				openDays2: [
					{
						date: '2025-04-19',
						showDot: true,
						disable: true,
						info: '已签到'
					},
					{
						date: '2025-04-20',
						showDot: false,
						info: '补签'
					},
					{
						date: '2025-04-21',
						showDot: false,
						info: '签到'
					}
				]
			}
		},
		methods: {
			changeDay(date, day) {
				console.log('date', date);
				console.log('day', day);
			},
		}
	}
</script>

```

## Props

### 属性
说明：

* @property {Array[dateObj]} selected 打点数组，dateObj为日期对象，date为日期，disable为是否禁用，info为提示信息，showDot为是否显示圆点，默认false
* @property {Boolean} monthCanChange 是否可以切换月份，默认false
* @property {Boolean} title 是否显示标题，默认true
* 如果需要支持更多属性，请自行fork代码，进行扩展

### 事件
说明：changeDay为日期点击事件，date为日期，day为日期对象，包含date、disable、info、showDot属性

## Author

```bash
liuhaixu
```

## V1.0.0

updata log,

```bash
V1.0.0
日历组件
```


