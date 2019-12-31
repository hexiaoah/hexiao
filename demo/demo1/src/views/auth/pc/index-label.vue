<script>
    /**
     授权信息页面 zeqi at 2017/11/16

     @params: pre: 左侧标题 text: 展示文案

     */

    export default {
        props: ['pre', 'text'],
        methods: {},
        created() {
        }
    }
</script>
<template>
    <div class="open-label">
        <div class="pre">{{pre}}</div>
        <div class="text">{{text}}</div>
        <div class="fl-clear"></div>
    </div>
</template>

<style lang="scss" scoped>

    .open-label {
        width: 100%;
        height: 42px;

        border: 1px solid #DEDEDE;

        border-radius: 5px;

        line-height: 42px;
    }

    .pre {
        height: 100%;
        width: 86px;

        background: #FCFCFC;
        border-right: 1px solid #DEDEDE;

        float: left;

        border-radius: 5px 0 0 5px;
        font-size: 14px;
        color: #333333;
    }

    .text {
        height: 100%;
        width: 332px;

        float: left;

        border-radius: 0 5px 5px 0;

        font-size: 12px;
        color: #333333;
        text-align: left;
        padding: 0 12px;

    }
</style>


