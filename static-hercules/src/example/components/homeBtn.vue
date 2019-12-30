<script>
    module.exports = {
        props: ['text'],
        methods: {
            submit: function () {
                this.$dispatch("go-submit", this.text)
            }
        }
    }
</script>

<template>
    <div class="head-tab">
        <button class="btn" @click="submit">
            {{ text }}
        </button>
    </div>
</template>
<!-- 组件样式要用 scoped 防止全局污染-->
<style lang="scss" scoped>
    .btn {
        height: 60px;
        width: 200px;
        background-color: rgba(0, 168, 154, 0.6);
        border-radius: 5PX;
    }
</style>