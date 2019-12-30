<script>
    /**
     -- zeqi@2dfire

     @props:
     count：可复用菜单条数

     菜品分类 已有X套菜单，可选择'复用'

     @events:
     on-tap:
     return 点击了复用按钮

     */

    export default {
        props: ["count"],
        data() {
            return {

            }
        },
        methods: {
            tap() {
                if(this.count < 1) {
//当前无可复用的菜单
                    this.$Message.info('当前无可复用的菜单')
                }
                else this.$emit('on-tap')
            }
        },
        created() {

        }
    }
</script>

<template>

    <div class="menu-reuse">
        已有{{count}}套菜单，可选择<a class="button-reuse" @click="tap">复用</a>
    </div>

</template>

<style lang="scss" scoped>
    .menu-reuse {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;

        background-color: #F1F1F1;

        font-size: 12px;
        color: #333333;
    }

    .button-reuse {
        font-size: 12px;
        color: #5599FF;

        border: 0;
        outline: 0;
        text-decoration: underline;

    }


</style>

