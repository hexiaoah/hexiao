<script>
    /**
     -- zeqi@2dfire

     @props:
     type
     1: 类型1，左右显示
     2: 居中显示

     @event:
     on-tap : 点击事件

     基本灰色块显示，两种样式
     */

    export default {
        props: ["type"],
        data() {
            return {}
        },
        methods: {
            tapOne(){
                this.$emit('on-tap')
            }
        },
        created() {

        }
    }
</script>

<template>
    <div @click="tapOne">
    <span class="block" v-if="type === 1">
        <span class="left">
            <slot name="left"></slot>
        </span>
        <span class="right">
            <slot name="right"></slot>
        </span>
    </span>

    <span class="block" v-if="type === 2">
        <span class="center">
            <slot></slot>
        </span>
    </span>
    </div>
</template>

<style lang="scss" scoped>
    .block {
        display: block;
        width: 100%;
        background-color: #F1F1F1;
        color: #333333;

        height: 40px;
        line-height: 40px;

        overflow: hidden;
        text-overflow:ellipsis;
        padding: 0 10px;
    }

    .center {
        width: 100%;
        display: inline-block;
        text-align: center;

        overflow : hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .left {
        display: inline-block;
        max-width: 70%;
        padding-left: 2px;
        overflow : hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .right {
        color: #666666;
        float: right;
    }
</style>

