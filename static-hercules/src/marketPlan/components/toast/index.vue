<template>
<transition :name="slideFade">
    <div class="toast text-center" v-if="show" :class="position">
        <transition>
            <div class="box" v-show="show">
                <div class="text ft-15">{{text}}</div>
            </div>
        </transition>
    </div>
</transition>
</template>

<script>
export default {
    name: "toast",
    props: {
        text: {
            type: String,
            default: 'toast'
        },
        show: {
            type: Boolean,
            default: false
        },
        position: {
            type: String,
            default: 'center', //top center bottom
        },
        duration: {
            type: Number,
            default: 2500,
        },
        transition: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            timeout: ''
        }
    },
    computed: {
        top() {

        },
        slideFade() { // 同上
            if (!this.transition) {
                return ''
            }

            switch (this.position) {
                case 'top':
                    return 'slide-fade-top'
                case 'bottom':
                    return 'slide-fade-bottom'
                case 'right':
                    return 'slide-fade-right'
                case 'left':
                    return 'slide-fade-left'
                default:
                    return 'slide-fade'
            }
        }
    },
    methods: {
        start() {
            let self = this;
            if (this.timeout) this.clear()
            this.timeout = setTimeout(() => {
                self.show = false
                this.clear()
            }, self.duration)
        },
        clear() {
            clearTimeout(this.timeout)
            this.timeout = ''
        }
    },
    destroyed() {
        this.clear()
    }
}
</script>

<style scoped>
.toast {
    position: fixed;
    z-index: 4999;
    /*border: 5px solid #ff0033;*/
    left: 50%;
    margin-left: -180px;
}

.box {
    display: inline-block;
    /*position: fixed;*/
    width: 380px;
    padding: 24px 36px;
    border-radius: 20px;
    background: rgba(0, 0, 0, .7);
    text-align: center;
    color: #fff;
}

.slide-fade-enter-active {
    transition: all .3s ease;
}

.slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to {
    opacity: 0;
}

/*  position  top   */

.toast.top {
    top: 20px;
}

.toast.bottom {
    bottom: 20px;
}

.toast.center {
    top: 50%;
    transform: translateY(-50%);
}

.slide-fade-top-enter-active {
    transition: all .3s ease;
}

.slide-fade-top-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-top-enter,
.slide-fade-top-leave-to {
    transform: translateY(20px);
    opacity: 0;
}

.slide-fade-center-enter-active {
    transition: all .3s ease;
}

.slide-fade-center-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-center-enter,
.slide-fade-center-leave-to {
    /*transform: translateY(-20px);*/
    opacity: 0;
}

.slide-fade-bottom-enter-active {
    transition: all .3s ease;
}

.slide-fade-bottom-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-bottom-enter,
.slide-fade-bottom-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>
