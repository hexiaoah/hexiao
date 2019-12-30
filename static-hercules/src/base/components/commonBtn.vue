<script>
    module.exports = {
        props: {
//            TODO: 封装组件时的写法, 建议只在封装组件的时候才使用
            text: {
                type: String,
                required: true,
                default: function () {
                    return "这是一个btn"
                }
            }
        },
        methods: {
            submit: function () {
                this.$dispatch("btnSubmit", this.text)
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

<style lang="scss" scoped>
    .btn {
        height: 60px;
        width: 200px;
        background-color: rgba(0, 168, 154, 0.6);
        border-radius: 5PX;
    }
</style>