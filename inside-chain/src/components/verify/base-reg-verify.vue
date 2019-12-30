<script>
    /**
     -- zeqi@2dfire

     @props:
     value: number 要验证的金额

     @events:
     verify:

     验证结果返回，在临界值增减的时候触发

     @desc:
     正则校验，只能包含中文、英文、数字

     */


    export default {
        name: "baseMoneyVerify",
        props: ["value"],
        data() {
            return {
//                输入合法
                success: true
            }
        },
        computed: {
            computedByReg() {
                let self = this;
                let reg = new RegExp(/^[A-Za-z0-9\u4e00-\u9fa5]+$/g);
                let pass = reg.test(self.value)
//                1、判断是否有输入
//                2、判断是否符合最多小数点后两位
//                3、判断是否超出预设最大值
                if(self.value && !pass){
                    if(self.success){
                        self.$emit('verify', false)
                        self.success = false
                    }
                    return '输入错误！您的输入只能是汉字、英文或数字'
                }else {
//                输入持续非法的情况下，不触发改动和冒泡犯法
                    if(!self.success){
                        self.$emit('verify', true)
                        self.success = true
                    }
                    return ''
                }
            }
        }
    };
</script>

<template>
    <div class="money-verify" v-show="computedByReg">
        <p class="warning-text">
            {{computedByReg}}
        </p>
    </div>
</template>

<style lang="scss" scoped>
    .money-verify {
        width: 100%;
        padding: 5px 0;
    }
    .warning-text {
        color: #d83f3f;
    }
</style>

