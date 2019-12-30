## 提供调用网关api的必要参数

因网关方面要求，现请求时网关接口时需要多传递9个和业务无关的参数。为了调用网关接口更加方便，api配置更加简洁，减少重复劳动而写了这个js。

功能：取浏览器UA中浏览器及其版本号、操作系统及其版本号，api版本等`网关要求`的请求必须参数，并返回一个字符串，包含所有与业务无关的参数键值对。

具体使用方法见文档，另附赠前端API网关调用文档。

git: [http://git.2dfire-inc.com/zeqi/2dfire-gw-params](http://git.2dfire-inc.com/zeqi/2dfire-gw-params)

### Installation

    $ npm i @2dfire/gw-params --save-dev


### Usage

    import { GW } from '@2dfire/gw-params'
    
### Intro

    该js会返回网关请求所需要的相关参数，是必须参数。
    为方便其他同事调用API，免去重复劳动之苦，特增加该文件，以备不时之需。
    
    GW的可能值示例
    GW = s_os=Mac%20OS&s_osv=10.12.6&s_ep=Chrome&s_epv=65.0.3325.181&s_sc=1280*324&timestamp=1523176879447&s_web=1&v=1.0&format=json

### 返回的参数释义

| 名称 | 类型 |是否必须|参数来源| 描述 |
|---|---|---|---|---|
|s_web|	string|	Y|	GET	|web端参数开关，1为开启|
|s_os |string|Y|GET	|系统名称  mac / windows /| 
|s_osv|string|Y|GET	|系统版本  10.1|
|s_epv	|string|Y|GET	|浏览器版本|
|s_ep	|string|Y|GET|	浏览器型号: chrome|
|s_sc|	string|Y|GET	|屏幕尺寸(800x600)|
|format|string|Y|GET|返回格式,目前只支持json|
|v	|String|	Y	|GET	|API协议版本，可选值：1.0|
|timestamp|	String|	Y|	GET	|时间戳|


---

## API网关调用文档

### api网关调用规范

原有的公共参数
		
| 名称 | 类型 |是否必须|参数来源| 描述 |
|---|---|---|---|---|
|app_key|string|Y|GET|api分配给每个应用的key，新应用需要申请|
| method |string|Y|GET|api接口名称，需要请求的接口|
|env|string|Y|HEAD|环境，放在header中（daily、pre、publish、变更中有单独生成）|
|token|string|N|HEAD|登陆后获得，除登陆外接口需要带上这个参数|
|lang|string|Y|HEAD|国际化需要，语言（en_US 英文/zh_CN中文(简体)/zh_TW中文(繁體)）|
|s_web|	string|	Y|	GET	|PC参数开关，1为开启|
|s_os |string|Y|GET	|系统名称  mac / windows /| 
|s_osv|string|Y|GET	|系统版本  10.1|
|s_epv	|string|Y|GET	|浏览器版本|
|s_ep	|string|Y|GET|	浏览器型号:chrome|
|s_sc|	string|Y|GET	|屏幕尺寸(800x600)|
|format|string|Y|GET|返回格式,目前只支持json|
|v	|String|	Y	|GET	|API协议版本，可选值：1.0|
|timestamp|	String|	Y|	GET	|时间戳|


**注意：env/token/lang参数必须放入`Header`中，其余参数(例如:app_key)不要放入`Header`中，否则会导致请求失败，不能通过option请求。

更多参数要求及说明，请点击访问：[API网关规范](http://k.2dfire.net/pages/viewpage.action?pageId=233374194)，第二部分-PC端参数

#### api调用地址

api调用时使用的地址：

日常环境：http://gateway.2dfire-daily.com

预发环境：http://gateway.2dfire-pre.com/

线上环境：https://gateway.2dfire.com

#### 配置后台（登录账号密码同yoyo）

登录后台后可以看到接口的出入参数或测试接口。

日常环境：http://console.gateway.2dfire-daily.com  

预发环境：http://console.gateway.pre.2dfire.net

线上环境：http://console.gateway.2dfire.net 

#### 调用示例

示例为一个简单的ajax请求，注意`url`参数，此请求为`日常环境`的请求。


    建议请求url组成：
        http://gateway.2dfire-daily.com?  +  (请求网关地址，域名应依环境改变)
        'method=xxx' +   (请求方法，每一个请求都不同)
        '& appkey=xxx' + (应用密钥)
        '&' + GW         (网关请求必要参数)
        
---

``` JavaScript
import {GW} from '@2dfire/gw-params'

$.getJSON({
        url: 'http://gateway.2dfire-daily.com?method=com.dfire.simple.getInfo&app_key=200006' + GW,
        dataType: "json",
        data: {
            id: id
        },
        type: "get",
        beforeSend: function (request) {       
	        request.setRequestHeader("env","dev");
	        request.setRequestHeader("token","token");
        },
        success: function (res) {
            // 成功
        },
        error: function (data) {
            // 失败
        }

    })

```

#### 返回格式 ResultMsp

请求错误返回

	{
		"code":0,
		"errorCode":"1000",
		"message":"您输入的用户名或密码有误"
	}
		
请求正确返回

	 {
	 	"code":1,
	 	"data":[{"sendTimeStr":"2015-01-22 16:59:16","_id":82}]
	 }
	 
	 或
	 
	 {
	 	"code":1,
	 	"data":{total:100,list:[{name:'Tom'}]}
	 }
	 
`常见的成功返回`——实际项目开发中，业务soa处理完后，通过网关返回数据，前端获取到的数据，经常会包裹一层data返回：


	 {
	 	"code":1,
	 	"data":{
	 		"data":{
	 			// 实际返回的数据
	 		}
	 	}
	 }

### 常见的错误

#### 配置的错误

网关接口可以跨域调用，
	
#### 常见错误码
	
以下是web端请求网关接口时，比较常见的错误码：

	ERR_PUB 开头的错误码，都是网关报错。
	
|编码|中文|错误释义|
|---|---|---|
|ERR_PUB200001|访问令牌为空|请求头中没有找到token|
|ERR_PUB200002|无效的访问令牌|常在当前用户被登出或token编码错误时出现|
|ERR_PUB200003|访问令牌已过期|token过期|
|ERR_PUB200004|接口未授权|网关接口需要授权，请向对接的后端同事请求帮助|
|ERR_PUB300021|缺少环境参数env|日常环境请求网关接口时，需要在请求头中添加env参数，在预发和正式环境不需要env|
| ERR_PUB300022 |缺少系统请求参数|网关未过滤接口，需要在请求时传多个不需要的参数|

遇到错误时，请大胆的寻求后端同事、网关同事的帮助，可以快速解决问题。

其它错误码请点击：[所有网关错误码](http://k.2dfire.net/pages/viewpage.action?pageId=280002723)

	 
### 参考文档

以下为本文档书写时的参考文档：

 api网关规范：
 http://k.2dfire.net/pages/viewpage.action?pageId=233374194
 
 网关错误码：
 http://k.2dfire.net/pages/viewpage.action?pageId=280002723
 
 
### 备注

此文档将会日渐丰富完善，或跟随网关的更新而更新，如有错误或过时的内容，还请钉钉联系@泽漆，谢谢。

