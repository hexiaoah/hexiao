import Vue from 'vue'
import Component from './extends'

const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1

const removeInstance = (instance) => {
    if(!instance) return
    const index = instances.findIndex(inst => instance.id === inst.id)
    instances.splice(index, 1)
}

const notify = (options) => {
    // 如果是服务端渲染，直接返回
    if(Vue.prototype.$isServer) return
    
    const { autoClose, ...rest } = options
    const instance = new NotificationConstructor({
        propsData: {
            ...rest
        },
        data: {
            autoClose: autoClose === undefined ? 2000 : autoClose
        }
    })
    
    const id = `notification_${seed++}`
    instance.id = id
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    instance.vm.visible = true
    
    instances.push(instance)
    instance.vm.$on('closed', () => {
        removeInstance(instance)
        document.body.removeChild(instance.vm.$el)
        instance.vm.$destroy()
    })
    instance.vm.$on('close', () => {
        instance.vm.visible = false
    })
    return instance.vm
}

export default notify
