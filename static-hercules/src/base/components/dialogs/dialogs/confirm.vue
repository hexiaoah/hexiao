<template>
    <div class="go_beyond_confirm">
        <div class="go_beyond_confirm_background">
            <div class="content">
                <p class="go_beyond_confirm_title">
                    提示
                </p>
                <span :style="styles" class="go_beyond_confirm_copy">
                    <slot></slot>
                </span>
            </div>
            <div class="yes_no">
                <a class="go_beyond_confirm_no" @click="cancle">
                    {{ cancleBtnText || '取消'}}
                </a>
                <a class="go_beyond_confirm_yes" @click="ok">
                    {{ okBtnText || '确认'}}
                </a>
            </div>
        </div>
    </div>

</template>

<script>
/**
 * 确认或取消弹框
 */

    module.exports = {
        props: {
            'styles': {
                type: Object,
                default: null
            },
            'cancleBtnText': {
                type: String,
                default: ''
            },
            'okBtnText': {
                type: String,
                default: ''
            }
        },
        methods: {
            ok: function () {
                this.$emit('ok');
            },
            cancle: function () {
                this.$emit('cancle');
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
        width: 510px;
        border-radius: 6px;
        display: block;
        overflow: hidden;
        background-color: #FFF;
    }

    .go_beyond_confirm_title {
        font-size: 34px;
        text-align: center;
        font-weight: 600;
        padding-top: 20px;
        display: block;
        color: #000!important;
    }

    .go_beyond_confirm_copy {
        font-size: 28px;
        display: block;
        border-bottom: 1px solid #d7d7d7;
        padding: 25px 20px;
        text-align: center;
        color: #000!important;
    }

    .yes_no {
        display: table;
        width: 100%;
        background: #FFF;
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
        font-size: 28px;
        color: #22b0dd;
        padding: 30px 0px;
        display: block;
        box-sizing: border-box;
    }

</style>
