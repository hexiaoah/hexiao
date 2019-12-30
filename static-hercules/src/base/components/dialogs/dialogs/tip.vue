<template>
    <div class="prompts">
        <p class="text">
            <slot></slot>
        </p>
    </div>
</template>

<script>
/**
 * tip弹窗组件,支持2秒自动关闭
 */
    module.exports = {
        props: {
            'show': {
                type: Boolean,
                default: false
            },
            // FIXME 为了触发autoHidden函数，tip 序号
            'index': {
                type: Number,
                default: 0
            }
        },
        data: function () {
            return {
                timeoutIndex: null
            };
        },
        watch: {
            index: function () {
                this.autoHidden();
            }
        },
        methods: {
            autoHidden: function () {
                clearTimeout(this.timeoutIndex);
                if (this.show) {
                    this.timeoutIndex = setTimeout(() => {
                        this.$emit('timeout');
                    }, 2000);
                }
            }
        },
        created: function () {
            this.autoHidden();
        },
        destoryed: function () {
            clearTimeout(this.timeoutIndex);
        }
    };
</script>


<style lang="scss" scoped>
    .prompts {
        width: 300px;
        font-size: 24px;
        position: fixed;
        top: 180px;
        left: 50%;
        z-index: 10;
        text-align: center;
        color: #fff;
        margin-left: -140px;
    }

    .text {
        border-radius: 8px;
        padding: 14px;
        background-color: #e02200;
        line-height: 40px;
    }
</style>
