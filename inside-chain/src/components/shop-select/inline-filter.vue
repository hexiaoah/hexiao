<script>
    /**
     -- zeqi@2dfire

     @props:
     title: 左侧label，
     slot: 插入slot任意行内元素，元素垂直对齐：top

     行内 "标签: 内容"展示，其中左侧标签宽度固定，右侧占剩余宽度
     */

    export default {
        props: ["title"],
        components: {},
        methods: {},
        created() {

        }
    }
</script>

<template>
    <div class="content-wrap">
        <span class="left">{{title}}</span>
        <span class="right">
            <slot></slot>
        </span>
    </div>
</template>

<style lang="scss" scoped>
    .content-wrap {
        font-size: 12px;
        width: 100%;
    }

    .left {
        display: inline-block;
        min-width: 45px;
        text-align: left;
        color: #666666;
    }

    .right {
        display: inline-block;
        max-width: calc(100% - 90px);
        color: #333333;

        vertical-align: top;
    }
</style>

