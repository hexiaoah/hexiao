<template>
<section class="confirm">
    <Shadow :visible="show"></Shadow>
    <div class="container" v-show="show">
        <div class="title">{{title}}</div>
        <div class="content">{{content}}</div>
        <div class="action">
            <a class="btn btn-cancel" v-if="type!=='alert'" :style="{width:'50%'}" @click="handleCancel">{{cancelText}}</a>
            <a class="btn" :style="{width:type==='alert'?'100%':'50%'}" @click="handleConfirm">{{confirmText}} </a>
        </div>
    </div>
</section>
</template>

<script>
import Shadow from '../mask-layer'

export default {
    name: "confirm",
    components: {
        Shadow
    },
    props: {
        type: {
            type: String,
            default () {
                return 'confirm'
            }
        },
        show: {
            type: Boolean,
            default () {
                return false
            }
        },
        title: {
            type: String,
            default () {
                return '提示'
            }
        },
        content: {
            type: String,
            default () {
                return '请确定当前操作！'
            }
        },
        confirmText: {
            type: String,
            default () {
                return '确认'
            }
        },
        cancelText: {
            type: String,
            default () {
                return '取消'
            }
        },
        confirm: Function,
        cancel: Function
    },
    methods: {
        handleConfirm() {
            this.confirm && this.confirm()
            this.close()
        },
        handleCancel() {
            this.cancel && this.cancel()
            this.close()
        },
        close() {
            this.show = false
            this.reset()
        },
        reset() {
            this.type = 'confirm'
            this.title = '提示'
            this.content = '请确定当前操作！'
            this.confirmText = '确认'
            this.cancelText = '取消'
        }
    },
    mounted() {
        window.addEventListener('hashchange', this.close);
    },
    destroyed() {
        window.removeEventListener('hashchange', this.close);
    }
}
</script>

<style lang="scss" scoped>
.confirm {
    .container {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 520px;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 26px;
        font-size: 30px;
        z-index: 1001;
        .title {
            padding: 40px 30px 0;
            text-align: center;
        }
        .content {
            font-size: 26px;
            color: #333333;
            padding: 20px 30px 20px;
        }
        .action {
            overflow: hidden;
            height: 88px;
            border-top: 1PX solid #cccccc;
            .btn {
                display: block;
                height: 88px;
                line-height: 88px;
                color: #0088FF;
                font-size: inherit;
                cursor: pointer;
                background-color: transparent;
                float: left;
                text-align: center;
            }
            .btn-cancel {
                border-right: 1PX solid #cccccc;
            }
        }
    }
}
</style>
