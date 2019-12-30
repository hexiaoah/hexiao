<template>
    <div class="go_beyond_confirm">
        <div class="go_beyond_confirm_background">
            <div class="content">
                <p class="go_beyond_confirm_title">
                    {{title}}
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
            },
            'title':{
                type:String,
                default:''
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
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 100;
    }

    .go_beyond_confirm_background {
        position: relative;
        top: 30%;
        margin: 0 auto;
        width: 540px;
        border-radius: 26px;
        display: block;
        overflow: hidden;
        background-color: #FFF;
    }

    .go_beyond_confirm_title {
        font-size: 30px;
        text-align: center;
        font-weight: 600;
        display: block;
        color: #000!important;
    }

    .go_beyond_confirm_copy {
        font-size: 28px;
        display: block;
        margin:30px;
        color: #666!important;
        line-height: 36px;
    }

    .yes_no {
        border-top: 1px solid #d7d7d7;
        display: table;
        width: 100%;
        background: #FFF;
    }

    .go_beyond_confirm_no {
        width: 50%;
        border-right: 1px solid #d7d7d7;
        text-align: center;
        font-size: 28px;
        color: #0088CC;
        padding: 10px 0;
        display: table-cell;
        line-height: 80px;
        vertical-align: middle;
    }

    .go_beyond_confirm_yes {
        width: 49%;
        line-height: 80px;
        text-align: center;
        font-size: 28px;
        color: #0088CC;
        display: table-cell;
        vertical-align: middle;
    }

</style>
