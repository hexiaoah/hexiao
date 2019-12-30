<script>
    /**
     -- zeqi@2dfire

     小字提示组件, 灰色字，当前组件仅提供字体颜色大小与上下内间距15px

     */

    export default {
        props: [],
        data() {
            return {
            }
        },
        methods: {

        },
        created() {

        }
    }
</script>

<template>

    <div class="tip">
        <slot></slot>
    </div>

</template>

<style lang="scss" scoped>
    .tip {
        color: #999999;
        font-size: 12px;
        padding: 15px 0;
    }
</style>

