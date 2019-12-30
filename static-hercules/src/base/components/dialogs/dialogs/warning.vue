<template>
    <div class="graybox" @click.self="close">
        <div class="dialog-wrap" :class="type">
            <img class="dialog-close" src="../images/close.png" v-show="canClose" @click="close" />
            <div class="dialog-icon" :alt="type"></div>
            <slot></slot>
            <div v-show="type=='networkerror'">
                网络错误，请<a class="linkbtn" @click="reflash">刷新</a>页面
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {
    props: ['can-close', 'type'],
    methods: {
        close () {
            if (this.canClose) {
                this.$emit('close');
            }
        },
        reflash () {
            location.reload();
        }
    }
};
</script>
<style lang="scss" scoped>
.graybox {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.85);
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    z-index: 1000;
}

.linkbtn{
    text-decoration: underline;
}

.dialog-wrap {
    width: 480px;
    height: 350px;
    margin: -220px auto 0;
    text-align: center;
    background-color: #fff;
    border-radius: 16px;
    padding: 80px 40px 0;
    position: relative;
    top: 50%;
    font-size: 28px;
    color: #333;

    .dialog-icon {
        height: 120px;
        display: block;
        margin: 0 auto 30px;
        background-size: auto 100%;
        background-position: center;
        background-repeat: no-repeat;
    }

    &.error,
    &.fail,
    &.networkerror {
        .dialog-icon {
            background-image: url(../images/cry.png);
        }
    }

    &.success {
        color: #e02200;
        .dialog-icon {
            background-image: url(../images/success_zan.png);
        }
    }
}

.dialog-close {
    position: absolute;
    right: 15px;
    top: 15px;
    width: 30px;
    height: 30px;
}
</style>
