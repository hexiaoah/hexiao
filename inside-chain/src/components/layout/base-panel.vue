<script>
    /**
     -- zeqi@2dfire

     @props:
     header: header显示文字内容

     @event:
     on-ok: 右侧确定按钮 点击事件
     on-cancel: 左侧取消按钮 点击事件

     基础弹窗容器，只提供背景遮罩和白色内容框
     */


    export default {
        name: "baseModal",
        props: ["show", "header", "okText", "cancelText", "width"],
        data() {
            return {}
        },
        methods: {},
        computed: {},
        created() {

        }
    };
</script>

<template>
    <div class="base-panel">
        <div class="header">
            <slot name="header">

            </slot>
        </div>
        <div class="body">

            <slot name="body">

            </slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .base-panel {
        width: 100%;
        height: auto;

        color: #333333;
        font-size: 12px;

        border: 1px solid #E6E6E6;
    }

    .header {
        background-color: #F1F1F1;

        width: 100%;
        min-height: 30px;
        line-height: 30px;

        padding: 0 10px;
    }

    .body {
        background-color: #ffffff;
        padding: 10px 10px;

        /*max-height: 398px;*/
        /*overflow-y: auto;*/
    }
</style>

