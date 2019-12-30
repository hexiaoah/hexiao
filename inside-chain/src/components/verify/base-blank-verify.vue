<script>
    /**
     -- zeqi@2dfire

     @props:
     value: number 要验证的内容

     @events:
     verify:
     验证触发事件


     @desc:
     正则校验，输入内容不能包含空格

     */


    export default {
        name: "baseBlankVerify",
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
//            /^[0-9]+(.[0-9]{1,2})?$/
//            正则判断输入金额是否合法——正数、允许1、2位小数
                let reg = new RegExp(/\s+/g);
                let pass = reg.test(self.value)
//                1、判断是否有输入
//                2、判断是否符合最多小数点后两位
//                3、判断是否超出预设最大值
                if(self.value && pass){
                    if(self.success){
                        self.$emit('verify', false)
                        self.success = false
                    }
                    return '不能输入空格'
                }
                else {
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
    <div class="blank-verify" v-show="computedByReg">
        <p class="warning-text">
            {{computedByReg}}
        </p>
    </div>
</template>

<style lang="scss" scoped>
    .blank-verify {
        width: 100%;
        padding: 5px 0;
    }
    .warning-text {
        color: #d83f3f;
    }
</style>

