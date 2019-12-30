<template>
    <div class="fire-title">
        <div class="title fl-left">{{title}}</div>
        <i class="icon-x fl-left" @click="handleClose"></i>
    </div>
</template>

<script>
    export default {
        name: "fire-title",
        props: ['title'],
        methods: {
            handleClose() {
                this.$emit('close')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .fire-title {
        height: 88px;
        line-height: 88px;
        border-bottom: 1PX solid #ccc;
        background-color: #fff;
        text-align: center;
        overflow: hidden;
        .title {
            width: 100%;
            padding-left: 176px;
            margin-left: -88px;
            font-weight: bold;
        }
        .icon-x {
            display: inline-block;
            width: 88px;
            height: 88px;
            background: url("https://assets.2dfire.com/frontend/e37aa2b9ad645208b707fbce7c740745.png") no-repeat;
            background-size: 24px 24px;
            background-position: center;
        }
    }
</style>
