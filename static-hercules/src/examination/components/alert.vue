<template>
    <div class="go_beyond_confirm">
        <div class="go_beyond_confirm_background">
            <p class="go_beyond_confirm_title">
                提示
            </p>
            <span class="go_beyond_confirm_copy">
                <slot></slot>
            </span>
            <div class="yes_no">
                <a class="go_beyond_confirm_know" @click="ok">
                    {{ okBtnText || '我知道了'}}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * 确认弹框
 */

    module.exports = {
        props: {
            'okBtnText': {
                type: String,
                default: ''
            }
        },
        methods: {
            ok: function () {
                this.$emit('ok');
            }
        }
    };
</script>

<style lang="scss" scoped>
    .go_beyond_confirm {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }

    .go_beyond_confirm_background {
        position: relative;
        top: 30%;
        margin: 0 auto;
        width: 540px;
        display: block;
        overflow: hidden;
        background: rgba(255,255,255,0.90);
        border-radius: 26px;
        box-sizing: border-box;
    }

    .go_beyond_confirm_title {
        letter-spacing: 0;
        text-align: center;
        margin: 40px auto 20px;
        font-size: 30px;
        color: #333;
        letter-spacing: 0;
        text-align: center;
        line-height: 40px;
        padding:0 30px;
    }

    .go_beyond_confirm_copy {
        font-size: 26px;
        color: #666666;
        letter-spacing: 0;
        text-align: center;
        line-height: 36px;
        display: inline-block;
        padding:0 30px;
        margin: 0 auto 28px;
    }

    .yes_no {
        display: table;
        width: 100%;
    }

    .go_beyond_confirm_no {
        width: 50%;
        border-right: 1px solid #d7d7d7;
        text-align: center;
        font-size: 28px;
        color: #333;
        height: 60px;
        display: table-cell;
        vertical-align: middle;
        padding: 10px 0px;
    }

    .go_beyond_confirm_yes {
        width: 49%;
        height: 60px;
        text-align: center;
        font-size: 28px;
        color: #22b0dd;
        display: table-cell;
        vertical-align: middle;
        padding: 10px 0px;
    }

    .go_beyond_confirm_know {
        width: 100%;
        text-align: center;
        font-size: 30px;
        line-height: 40px;
        color: #0088FF;
        padding: 26px 0px;
        display: block;
        box-sizing: border-box;
        border-top: 1px solid #C8C7CC;

    }

</style>
