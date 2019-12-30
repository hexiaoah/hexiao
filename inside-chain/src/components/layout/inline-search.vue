<script>
    /**
     -- zeqi@2dfire

     @props:
     label：左侧文案

     @slot:
     右侧区域放入任意组件，右侧宽度固定为 150px

     基本左右分筛选栏内form
     */

    export default {
        props: ["label"],
        data() {
            return {}
        },
        computed: {},
        created() {

        }
    }
</script>

<template>
    <div class="inline-search">
        <div class="label">
            {{label}}
        </div>
        <div class="form">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .inline-search {
        margin-right: 20px;
        display: inline-block;
    }

    .label {
        display: inline-block;
        font-size: 12px;
        color: #333333;
        margin-right: 15px;
    }

    .form {
        display: inline-block;
        width: 150px;
    }
</style>

