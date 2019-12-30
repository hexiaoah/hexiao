<script>
    /**
     -- zeqi@2dfire

     @props:
     title：左侧label，
     desc：右侧文字，也可以插入slot任意行内元素，元素垂直对齐：top

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
        // margin-top: 30px;
        font-size: 12px;
        line-height: 24px;
        color: #666666;
        // width: 100%;
    }

    .left {
        display: inline-block;
        width: 70px;
        text-align: left;
    }

    .right {
        display: inline-block;
        max-width: calc(100% - 80px);
        vertical-align: top;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;

    }
</style>

