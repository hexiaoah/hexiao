<template>
    <transition name="fade" @after-leave="afterLeave" @after-enter="afterEnter">
        <div class="notification-box"
             v-show="visible">
            <div class="content">
                {{content}}
            </div>

        </div>
    </transition>
</template>

<script>
    export default {
        name: 'Notification',
        props: {
            content: {
                type: String,
                required: true
            },
        },
        data() {
            return {
                visible: true
            }
        },
        methods: {
            afterLeave() {
                this.$emit('closed')
            },
            afterEnter() {
            },
            clearTimer() {
            },
            createTimer() {
            }
        }
    }
</script>

<style lang="scss" scoped>
    .notification-box {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        width: 100vw;
        height: 100vh;
    }
    .content {
        position: relative;
        top: 50%;
        left: 50%;
        z-index: 101;
        width: max-content;
        transform: translate(-50%, -50%);
        max-width: 200px;
        font-size: 14px;
        line-height: 20px;
        padding: 15px 12px;
        background-color: rgba(0, 0, 0, .5);
        color: #fff;
        border-radius: 5px;
        transition: all .3s;
        text-align: center;
    }

</style>


