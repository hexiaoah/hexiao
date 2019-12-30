# 通用工具库

通用工具库(文档待完善)

## Installation

```shell
$ npm i @2dfire/utils --save-dev
```

*@2dfire为私库前缀，请参考[npm私库使用办法](http://npm.2dfire.net:4000/2017/04/25/plibrary_use/)*

## Usage

```js
// 引入所有
import Utils, { object, localStorage } from "@2dfire/utils"; // 打包 utils 所有文件进来

Utils.object.clone({ foo: 1 });
object.clone({ foo: 1 });

// 引入utils/object
import object, { clone } from "@2dfire/utils/object"; // 只会打包 object.js进来

object.clone({ foo: 1 });
clone({ foo: 1 });
```

*小程序打包兼容代码设置办法*

在业务中依然用`@2dfire/utils`，在业务的`webpack`添加`alias`如下:
```js
module.exports = {
  resolve: {
    alias: {
      "@2dfire/utils": "@2dfire/utils/wxApp"
    }
  }
};
```

## 目录说明

```
    src             开发目录
    build           webpack打包相关
    test            测试相关
```

## 内容说明

### 一级工具目录说明

| 工具集         | 说明                         | 备注           |
|:---------------|:-----------------------------|:---------------|
| index          | 所有工具集合/ main           | 包括小程序版本 |
| array          | 数组类型相关方法             |                |
| date           | 日期类型相关方法             |                |
| object         | object和其他所有类型相关方法 |                |
| string         | 字符串类型相关方法           |                |
| number         | 数字类型相关方法             |                |
| route          | 路由相关方法                 | 包括小程序版本 |
| qs             | url参数获取相关方法          | 包括小程序版本 |
| url            | URL相关方法                  | 包括小程序版本 |
| validate       | 验证相关方法                 |                |
| seesionStorage | seesionStorage相关方法       | 包括小程序版本 |
| localStorage   | localStorage相关方法         | 包括小程序版本 |
| cookie         | cookie相关方法               | 包括小程序版本 |

`storage & cookie`说明一起都在下方，其它辅助方法文档可以访问[这里](http://10.1.6.28:2233/fed/static/doc/@2dfire/utils/0.0.4/global.html)

### storage & cookie

#### apis

各平台的storage & cookie都实现这六个方法：

-   `set(name, value, [attributes]`): 将属性设置到Storage,设置前JSON.stringify。*无返回*
-   `setItem(name, value, [attributes])`: 将属性设置到storage。*无返回*
-   `get(name)`: 从storage获取属性，并且JSON.parse。*返回取到的值进行JSON.parse()转化后的值*
-   `getItem(name)`: 从storage获取属性。*返回取到的值*
-   `removeItem(name, [attributes])`: 从storage移除属性。*无返回*
-   `clear([attributes])`: 清空storage。*无返回*

*参数说明*

-   name: String 设置名称,会被转换为字符串
-   value
    -   setItem: String,其余类型值会被转为String
    -   set: Any 值,全部JSON.stringify
-   attributes: cookie属性
    -   expires: 过期时间 单位天
    -   path: 地址如'/shop/page'
    -   domain: 域
    -   secure: 是否需要https

*attributes实际上只有在web下起作用，小程序环境下cookie是假的，保存在内存中，如果需要长久存储，请选择localStorage*

**推荐：在已知类型情况下**，使用`set`和`get`。如果未知类型，可能其它地方设置了，
请使用`setItem`、`getItem`，来设置获取字符串。


#### 各平台下api实际实现情况说明

| 类型           | 平台   | 实现                    |
|:---------------|:-------|:------------------------|
| seesionStorage | web    | 正常                    |
| localStorage   | web    | 正常                    |
| cookie         | web    | 正常, 使用 js-cookie 库 |
| seesionStorage | 小程序 | 保存在内存中            |
| localStorage   | 小程序 | wx的Storage             |
| cookie         | 小程序 | 保存在内存中            |

#### example

```js
import storage from '@2dfire/utils/localStorage';

storage.set('coolName', { a: 'booo' }); // values: { a: '"booo"'}
// 和原生Storage(e.g. localStorage) getItem一致
storage.getItem('coolName'); // String: '{"a":"booo"}'
// 将通过JSON.parse转化为对象,如果回去到的值不为JSON字符串，则throw Uncaught SyntaxError
storage.get('coolName'); // Object: { a: 'booo' }

storage.setItem('coolName', { a: 'booo' }); // 和原生Storage(e.g. localStorage) setItem一致
storage.getItem('coolName'); // String: '[object Object]'
storage.get('coolName'); // throw Uncaught SyntaxError

storage.getItem('unsetName'); // null 这里和原生Storage的getItem一致，原生返回null
```

## TODOs

## 功能

-   globalBasePage
-   analytics

### 单元测试

> cover: 97.41% Statements 113/116 92.31% Branches 48/52 96.67% Functions 29/30 97.41% Lines 113/116

-   [x] base
    -   [x] array.js
    -   [x] date.js
    -   [x] object.js
    -   [x] qs.js
    -   [x] string.js
    -   [x] number.js
    -   [x] url.js
    -   [x] validate.js
-   [x] utils
    -   [x] createStorage.js
-   [ ] platforms
    -   [ ] web
        -   [ ] ajax.js
        -   [ ] analytics.js
        -   [x] cookie.js
        -   [x] promise.js
        -   [ ] globalBasePage.js
        -   [x] localStorage.js
        -   [x] location.js
        -   [x] sessionStorage.js
        -   [ ] window.js
    -   [ ] wxApp 暂时没有办法单元测试
        -   [ ] ajax.js
        -   [ ] analytics.js
        -   [ ] cookie.js
        -   [x] promise.js
        -   [ ] globalBasePage.js
        -   [ ] localStorage.js
        -   [ ] location.js
        -   [ ] query.js
        -   [ ] sessionStorage.js
-   [x] router.js
-   [ ] fetch.js
