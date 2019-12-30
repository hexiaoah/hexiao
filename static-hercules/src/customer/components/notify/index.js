// 公共组件 通知弹窗 2秒消失
/*

————————————————————————————
|       2秒后此弹窗消失      |
|———————————————————————————

使用方法：
mian.js中引入此文件，并使用Vue.use(XXX)挂载
在需要弹窗的组件中使用this.$notify({})进行调用
传参：{
    content // 提醒内容 String
    autoClose // 几秒钟后关闭
}
*/
import Notification from './notify.vue'
import notify from './instance'

export default (Vue) => {
    Vue.component(Notification.name, Notification)
    Vue.prototype.$notify = notify
}
