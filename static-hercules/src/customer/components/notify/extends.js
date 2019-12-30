import Notification from './notify.vue'

export default {
    extends: Notification,
    data() {
        return {
            autoClose: 2000,
            visible: false
        }
    },
    mounted() {
        this.createTimer()
    },
    methods: {
        createTimer() {
            if(this.autoClose) {
                this.timer = setTimeout(() => {
                    this.visible = false
                }, this.autoClose)
            }
        },
        clearTimer() {
            if(this.timer) {
                clearTimeout(this.timer)
            }
        },
    },
    beforeDestory() {
        this.clearTimer()
    },
}
