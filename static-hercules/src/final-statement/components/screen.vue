<template>
    <div class="screen-wrap" @click="handleClick">
        筛选
    </div>
</template>

<script>
    export default {
        name: "screen",
        methods: {
            handleClick(e) {
                this.$emit('click', e)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .screen-wrap {
        position: absolute;
        top: 50%;
        right: 0;
        font-size: 30px;
        transform: translateY(-50%);
        padding-left: 92px;
        padding-right: 54px;
        line-height: initial;
        border-left: 1PX solid #ccc;
        background: url("https://assets.2dfire.com/frontend/0b7570c9a5c70d3c6dcacda319eba479.png") no-repeat;
        background-position: 52px center;
        background-size: 30px 32px;
    }
</style>