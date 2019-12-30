<template>
    <h3 class="sub-title">
        <slot>
        </slot>
    </h3>
</template>

<script>
    export default {
        name: "sub-title"
    }
</script>

<style lang="scss" scoped>
    .sub-title {
        color: #333;
        background-color: #fff;
        font-size: 30px;
        padding: 24px 30px;
    }
</style>