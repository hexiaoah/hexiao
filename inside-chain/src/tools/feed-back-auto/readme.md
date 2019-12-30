# feed-back-auto

提供各种姿势召唤弹框`api`接口方案。
[设计稿参考](http://git.2dfire-inc.com/static/npm-feed-back/raw/7c8c1aa34ccd6298c06a51d37f6c459bf95f894a/doc/%E8%AE%BE%E8%AE%A1%E7%A8%BF/preview/%E5%BC%B9%E7%AA%97%E6%A0%B7%E5%BC%8F-%E5%BC%B9%E7%AA%97%E8%A7%84%E8%8C%83.png)

## Description

各类弹框的集合`api`，主要意义如下两点
    1. 提供各弹框参数约定以及实现要求
    2. 提供各弹框`api`调用方法，然后分发给具体实现方案

## Usage

### 1. 引入提醒弹框实现部分

#### 1) 微信小程序

现在完整的实现有官方接口和模板实现, 引入方法分别如下

官方接口实现

```js
// 官方接口实现，有局限性，但是使用官方api，性能较好
// 依赖官方接口: wx.showModal wx.showToast wx.hideToast
import mountFeedBackImpl, { unmount } from '@2dfire/feed-back-auto-impl-wxapp';

mountFeedBackImpl(); // 只需要全局挂载一次

// unmount(); // 可以在需要的时候卸载
```

模板实现

```js
// 推荐，实现完整，ui定制性高
// 参考static-light-template，需要拷贝components/dui/feed-back到项目目录
import './components/dui/feed-back/auto'; // 只需要全局引入一次,推荐在app.js
```

```html
<!-- 需要在每个page.wxml都挂载 -->
<include src="/components/dui/feed-back/auto.wxml"/>
```

#### 2) web

现在完整的实现只有`jQuery`, 引入方法如下，引入前需要全局绑定`$`

```js
import mountFeedBackImpl, { unmount } from '@2dfire/feed-back-auto-impl-jquery';

mountFeedBackImpl(); // 只需要全局挂载一次

// unmount(); // 可以在需要的时候卸载
```

### 2. api使用

```js
import toast from '@2dfire/feed-back-auto/toast';
import alert from '@2dfire/feed-back-auto/alert';
import modal from '@2dfire/feed-back-auto/modal';
import message from '@2dfire/feed-back-auto/message';

// 最简单的调用
toast.loading('加载中'); // 提醒弹窗类型.级别(内容|参数, 回调)

// 回调使用
modal.info('确认', function(res) {
    // res: 用户交互的结果
    if (res.ok) {
        toast.success('保存成功');
    } else if (res.cancel) {
        toast.success('已经取消');
    }
});

// 等同于
modal.info({
    content: '确认',
    callback: function(res) {
        // res: 用户交互的结果
        if (res.ok) {
            toast.success('保存成功');
        } else if (res.cancel) {
            toast.success('已经取消');
            // 不允许，弹窗继续
            return false;
        }
    }
});

// 隐藏弹框 message toast alert modal 都支持
message.hide();
toast.hide();

```

支持的级别说明

- `info`: 提示
- `warning`: 警告
- `error`: 错误
- `success`: 成功
- `loading`: loading

## 各弹框参数说明

### alert

![alert](http://git.2dfire-inc.com/static/npm-feed-back/raw/master/packages/feed-back-auto/images/alert.png)

| 名字      | 说明                   | 类型     | 默认值 | 必须实现 | 实现备注                 |
|:----------|:-----------------------|:---------|:-------|:---------|:-------------------------|
| title     | 标题                   | String   | ''     | 否       | 没有表示不显示           |
| closeText | 关闭按钮文案           | String   | '确认' | 是       | 没有表示不显示           |
| duration  | 延迟时间，单位毫秒     | Number   | -1     | 是       | 设定时间后自动隐藏       |
| showIcon  | 是否需要显示icon       | Boolean  | true   | 否       |                          |
| iconImage | icon图片地址           | String   | ''     | 否       |                          |
| content   | 内容                   | String   | ''     | 是       |                          |
| callback  | 回调                   | Function | null   | 是       | 如果有则回调，详细见下文 |
| level     | 级别，success、error.. | String   | 'info' | 否       | 根据此产生不同样式弹框   |
| mask      | 背景蒙层               | Boolean  | true   | 是       |                          |
| visible   | 是否显示               | Boolean  | false  | 是       |                          |

### toast

![toast](http://git.2dfire-inc.com/static/npm-feed-back/raw/master/packages/feed-back-auto/images/toast.png)

| 名字      | 说明                   | 类型     | 默认值 | 必须实现 | 实现备注                 |
|:----------|:-----------------------|:---------|:-------|:---------|:-------------------------|
| duration  | 延迟时间，单位毫秒     | Number   | -1     | 是       | 设定时间后自动隐藏       |
| iconImage | icon图片地址           | String   | ''     | 否       |                          |
| content   | 内容                   | String   | ''     | 是       |                          |
| callback  | 回调                   | Function | null   | 是       | 如果有则回调，详细见下文 |
| level     | 级别，success、error.. | String   | 'info' | 否       | 根据此产生不同样式弹框   |
| mask      | 背景蒙层               | Boolean  | true   | 是       |                          |
| visible   | 是否显示               | Boolean  | false  | 是       |                          |

### message

![message](http://git.2dfire-inc.com/static/npm-feed-back/raw/master/packages/feed-back-auto/images/message.png)

| 名字      | 说明                   | 类型     | 默认值 | 必须实现 | 实现备注                 |
|:----------|:-----------------------|:---------|:-------|:---------|:-------------------------|
| duration  | 延迟时间，单位毫秒     | Number   | 3000   | 是       | 设定时间后自动隐藏       |
| showIcon  | 是否需要显示icon       | Boolean  | true   | 否       |                          |
| iconImage | icon图片地址           | String   | ''     | 否       |                          |
| content   | 内容                   | String   | ''     | 是       |                          |
| callback  | 回调                   | Function | null   | 是       | 如果有则回调，详细见下文 |
| level     | 级别，success、error.. | String   | 'info' | 否       | 根据此产生不同样式弹框   |
| mask      | 背景蒙层               | Boolean  | false  | 是       |                          |
| visible   | 是否显示               | Boolean  | false  | 是       |                          |

### Modal

![modal-confirm](http://git.2dfire-inc.com/static/npm-feed-back/raw/master/packages/feed-back-auto/images/modal.png)

| 名字       | 说明                   | 类型     | 默认值 | 必须实现 | 实现备注                 |
|:-----------|:-----------------------|:---------|:-------|:---------|:-------------------------|
| title      | 标题                   | String   | -1     | 否       | 没有表示不显示           |
| okText     | 确定按钮文案           | String   | '确认' | 是       | 没有表示不显示           |
| cancelText | 取消按钮文案           | String   | '取消' | 是       | 没有表示不显示           |
| showIcon   | 是否需要显示icon       | Boolean  | true   | 否       |                          |
| iconImage  | icon图片地址           | String   | ''     | 否       |                          |
| content    | 内容                   | String   | ''     | 是       |                          |
| callback   | 回调                   | Function | null   | 是       | 如果有则回调，详细见下文 |
| level      | 级别，success、error.. | String   | 'info' | 否       | 根据此产生不同样式弹框   |
| mask       | 背景蒙层               | Boolean  | true   | 是       |                          |
| visible    | 是否显示               | Boolean  | false  | 是       |                          |

## 各端实现要求

### 1. 实现`callback`

考虑业务希望写的代码如下：

```js
model({
    content: '空调开了吗？',
    okText: '开了',
    cancelText: '没开',
    callback: (result) => {
        if (result.ok) {
            log('用户说开了');
        } else if (result.cancel) {
            log('用户说没开');
            // 不允许，弹窗继续
            return false;
        }
    }
})
```

上述代码中对`callback`有如下要求

1. 单一`callback`，传入参数result表示事件情况，回调参数如下结构
    - `Object` result
        - `Boolean` ok 是否是点击ok按钮
        - `Boolean` cancel 是否是点击cancel按钮
2. 如果`callback`返回`false`，表示不关闭弹窗

### 2. 蒙层

1. 蒙层仅仅作为防止用户其它操作的遮挡物
2. 点击蒙层不触发事件
3. 点击蒙层不隐藏弹窗

### 3. 弹窗实现

1. 同一类型的弹窗，全局应该只有一个（消息`message`按情况除外），因此同类型弹窗应
该覆盖原先弹窗，而不是弹出两个同类型弹窗。
2. 弹出同类型弹窗时，应该在原有dom上修改。特别在倒计时类弹窗情况时，需要避免弹窗抖动。
