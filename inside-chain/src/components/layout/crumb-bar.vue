<script>
    /**
     -- zeqi@2dfire

     @props:
     type：类型

     放置面包屑导航的白色长条
     */

    export default {
        props: [""],
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
<div class="right-top">
    <slot></slot>
</div>
</template>

<style lang="scss" scoped>
    .right-top {
        width: 100%;
        min-height: 60px;
        background: #FFFFFF;
        box-shadow: 0 1px 0 0 rgba(0,0,0,0.06);

        padding:20px 30px;
    }

</style>

