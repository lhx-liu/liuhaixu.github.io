## 钉钉H5微应用授权登录详细说明

### 项目地址
- GitHub: [MultipleDeviceLogin](https://github.com/lhx-liu/MultipleDeviceLogin)

### 页面路径
- `pages/DingDingH5/DingDingH5.vue`

### 功能描述
该页面实现了钉钉H5微应用的授权登录功能，用户进入页面后会自动触发钉钉授权逻辑，获取`authCode`用于后续登录操作，并支持钉钉JSAPI鉴权、获取地理位置和选择聊天会话等功能。

### 文件结构
- **DingDingH5.vue**: 主页面文件，包含钉钉H5授权登录和JSAPI鉴权的逻辑。
- **钉钉H5微应用授权登录.md**: 说明文档，详细描述功能和实现步骤。

### 核心功能
1. **自动触发登录**
   - 页面加载时自动调用钉钉的`requestAuthCode`接口获取授权码。

2. **钉钉JSAPI鉴权**
   - 使用`dd.config`进行钉钉JSAPI的鉴权配置。

3. **获取地理位置**
   - 使用`dd.getLocation`接口获取用户的地理位置信息。

4. **选择聊天会话**
   - 使用`dd.chooseChat`接口选择聊天会话。

### 代码解析

#### DingDingH5.vue
##### 页面模板
```vue
<template>
	<view>
		code为：{{code}}
	</view>
</template>
```
- **显示授权码**: 页面显示获取到的`authCode`。

##### 页面逻辑
###### onLoad方法
```javascript
onLoad() {
	if (dd.env.platform === "notInDingTalk") {
		uni.showToast({
			icon: 'none',
			title: '请在钉钉应用中打开'
		});
		return;
	}
	this._autoLogin();
}
```
- **功能**: 判断是否在钉钉环境中，非钉钉环境提示错误。

###### _autoLogin方法
```javascript
_autoLogin() {
	const that = this;
	dd.requestAuthCode({
		corpId: 'dinge7f2890a997ec0c5f2c783f7214b6d69',
		clientId: 'dingqisx24r48bmgmb3t',
		onSuccess: function (result) {
			that.ddconfig();
			that.code = result.code;
		},
		onFail: function (err) {
			that.code = JSON.stringify(err);
		},
	});
}
```
- **功能**: 调用`requestAuthCode`获取授权码。
- **逻辑**:
  - 成功时调用`ddconfig`方法进行钉钉JSAPI鉴权。
  - 失败时记录错误信息。

###### ddconfig方法
```javascript
ddconfig() {
	uni.showToast({
		icon: 'none',
		title: '开始配置dd.config'
	});
	dd.config({
		agentId: '4045610093',
		corpId: 'dinge7f2890a997ec0c5f2c783f7214b6d69',
		timeStamp: '1761804057',
		nonceStr: '123456',
		signature: '789320d45372deec14640492cb9c99701d31763a5680a674dc09222c0193d7c6',
		type: 0,
		jsApiList: [
			'device.geolocation.get',
			'chooseChat',
			'biz.contact.choose'
		]
	});
	dd.error(function (err) {
		alert('dd error: ' + JSON.stringify(err));
	});
	this.jsApiTest();
}
```
- **功能**: 配置钉钉JSAPI。
- **逻辑**:
  - 配置完成后调用`jsApiTest`方法测试JSAPI功能。

###### jsApiTest方法
```javascript
jsApiTest() {
	const that = this;
	// 获取当前位置
	dd.getLocation({
		type: 1,
		useCache: true,
		coordinate: '1',
		cacheTimeout: 20,
		withReGeocode: true,
		targetAccuracy: '200',
		success: (res) => {
			console.log('地理位置', res);
		},
		fail: (e) => {
			console.log('获取位置失败', e);
		},
	});
	// 选择聊天会话
	dd.chooseChat({
		corpId: 'dinge7f2890a997ec0c5f2c783f7214b6d69',
		isAllowCreateGroup: true,
		filterNotOwnerGroup: true,
		success: (res) => {
			console.log('选择的会话', res);
		},
		fail: (e) => {
			console.error('选择会话失败', e);
		},
	});
}
```
- **功能**: 测试钉钉JSAPI功能。
- **逻辑**:
  - 调用`getLocation`获取地理位置。
  - 调用`chooseChat`选择聊天会话。

### 签名计算脚本

#### getDingDingSign.py
该脚本用于计算钉钉H5微应用的签名参数`signature`，以便在`dd.config`中使用。
在运行py脚本之前，请把自己的`agentId`、`corpId`、`timeStamp`、`nonceStr`、`signature`、`type`、`jsApiList`替换为实际值。
最后执行完脚本之后，把计算得到的`signature`和`timeStamp`替换到`dd.config`中。


### 总结
通过以上实现，用户可以在钉钉H5微应用中完成授权登录、JSAPI鉴权、地理位置获取和聊天会话选择等功能，逻辑清晰，适合快速集成到项目中。通过`getDingDingSign.py`脚本，开发者可以方便地计算钉钉JSAPI所需的签名参数。