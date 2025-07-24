# phone-login

## 描述

```bash
将手机号快捷登录弹窗、用户隐私协议进行统一封装。
1、通过show属性控制显隐
2、组件支持高度自定义，弹窗高度、背景颜色、圆角支持自定义
3、登录按钮支持样式自定义
4、隐私协议和用户服务协议提示语支持自定义
5、组件依赖官方uni-popup  uni-popup属性均对外放开
```

## 更新日志

```bash
更新 1.0.0版本
初始版本
```

## 安装

```bash
请在uniapp插件市场安装

注意：此组件依赖官方uni-popup弹窗 请先安装uni-popup
```

## 引入

```bash
本组件符合easycom组件规范,直接在页面中使用
```
## 兼容性

```bash
端：只微信小程序
vue2 vue3 支持

```


## USE

```javascript
<template>
	<view class="phoneLogin-box">
		<view class="text">
			手机快捷登录弹窗示例
		</view>
		<view class="btn" @click="openLogin">
			打开弹窗
		</view>
		<phone-login
			:show="show"
			privacyUrl="/pages/login/privacy"
			userAgreementUrl="/pages/login/userAgreement"
			@maskClick="maskClick"
			@loginSuccessFun="loginSuccessFun">
		</phone-login>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false
			}
		},
		methods: {
			openLogin() {
				this.show = true;
			},
			maskClick() {
				this.show = false;
			},
			loginSuccessFun(code) {
				this.show = false;
				uni.showToast({
					icon: 'none',
					duration: 10000,
					title:'获取手机code==>' + code
				});
			}
		}
	}
</script>

```

## Props

### 属性
说明：

* @property {Boolean} show 登录弹窗是否展示
* @property {Boolean} safeArea 是否启用底部安全区域
* @property {String} openType 登录弹窗弹出位置 默认bottom 可选位置 同uni-popup官方
* @property {String} title 弹窗标题
* @property {String} btnTip 登录按钮提示
* @property {String} btnCustomStyle 登录按钮自定义样式
* @property {String} backColor 弹窗背景颜色
* @property {String} height 弹窗高度
* @property {String} borderRadius 弹窗圆角
* @property {String} showPrivacy 是否展示隐私协议 为true时privacyUrl、userAgreementUrl必传
* @property {String} agreeTip 隐私协议提示语
* @property {String} privacyName 隐私协议名称
* @property {String} privacyUrl 隐私协议跳转页面url
* @property {String} userAgreementName 用户服务协议名称
* @property {String} userAgreementUrl 用户服务协议url
* @event {Function} loginSuccessFun 获取手机号code成功的回调，e=code
* @event {Function} maskClick 点击遮罩触发


## Author

```bash
liuhaixu
```

## V1.0.0

updata log,

```bash
V1.0.0
手机号快捷登录弹窗
```


