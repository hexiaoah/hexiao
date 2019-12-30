<script>
    /**
     -- zeqi@2dfire

     @props:
     type：类型

     无数据时的展示条
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
    {{text}}
</div>
</template>

<style lang="scss" scoped>
    .no-data {
        text-align: center;
        padding: 15px 10px;

        font-size: 14px;
        color: #333333;
        font-weight: bold;
    }

</style>

