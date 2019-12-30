 
import Toast from './index.vue'

let toast = {}

toast.install =  (Vue)=>{
    let constructor = Vue.extend(Toast)//实例化一个Toast
    let instance = new constructor({
        el: document.createElement('div')
    });
    document.body.appendChild(instance.$el);

    Vue.prototype.$toast = (options)=>{
        if (typeof options === 'string') {
            instance.text = options
        }
        else if (typeof options === 'object') {
            Object.assign(instance, options)
        }
        instance.show = true
        instance.start()
    }
}
export default toast;
