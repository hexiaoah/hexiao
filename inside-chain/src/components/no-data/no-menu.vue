<script>
    /**
     -- zeqi@2dfire

     @props:
     type：类型

     无菜单数据时的展示条
     */

    export default {
        props: ["text"],
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
<div class="no-data">
    <img class="no-menu" src="https://assets.2dfire.com/frontend/3be21e322d74bc5d4977a43380e79daf.png" alt="">

    {{text}}
</div>
</template>

<style lang="scss" scoped>
    .no-data {
        text-align: center;
        padding: 15px 10px;

        font-size: 12px;
        color: #999999;
    }

    .no-menu {
        display: block;
        width: 138px;
        height: 83px;
        margin: 27px auto;
    }

</style>

