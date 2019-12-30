import Confirm from './index.vue'

const defaults = {
  type: 'alert',
  title: '提示',
  content: '请确定当前操作',
  confirmText: '确定',
  cancelText: '取消',
  confirm: null,
  cancel: null
}
let confirm = {}
confirm.install = Vue => {
  let constructor = Vue.extend(Confirm)
  let instance = new constructor({
    el: document.createElement('div')
  })

  document.body.appendChild(instance.$el)

  Vue.prototype.$confirm = options => {
    if (typeof options === 'string') {
      options = {
        content: options
      }
    }
    Object.assign(instance, defaults, options)
    instance.type = 'confirm'
    instance.visible = true
  }

  Vue.prototype.$alert = options => {
    if (typeof options === 'string') {
      options = {
        content: options
      }
    }
    Object.assign(instance, defaults, options)
    instance.type = 'alert'
    instance.visible = true
  }
}

export default confirm
