<script>
    /**
     -- zeqi@2dfire

     @props:
     value: number 要验证的数字
     max: number 限制的数字上限（默认1,000,000,000）

     @events:
     verify:

     验证结果返回，在临界值增减的时候触发
        如 max = 20
         验证超过max时，例如从20增长到21，返回false；
         验证小于max时，例如从21减少到20，true；
         在界限内外增加(例如10->11或 21->22)或减少字符长度(例如11->10或 22->21)，不会触发方法

     @desc:
     正则校验，数字为最多带两位小数的数字

     */


    export default {
        name: "baseMoneyVerify",
        props: ["value", "max"],
        data() {
            return {
//                输入合法
                success: true
            }
        },
        computed: {
            currentMax() {
                let self = this;
              if(self.max == undefined){
                  return 1000000000
              }  else {
                  return self.max
              }
            },

            computedByReg() {
                let self = this;
//            /^[0-9]+(.[0-9]{1,2})?$/
//            正则判断输入金额是否合法——正数、允许1、2位小数
                let reg = new RegExp(/^[0-9]+(.[0-9]{1,2})?$/);
                let pass = reg.test(self.value)
//                1、判断是否有输入
//                2、判断是否符合最多小数点后两位
//                3、判断是否超出预设最大值
                if(self.value && (!pass || self.value > self.currentMax)){
                    if(self.success){
                        self.$emit('verify', false)
                        self.success = false
                    }
                    return '输入错误！您输入的数字不能超过' + self.currentMax + '，且最多保留两位小数'
                }
//                判断输入非数字'0'
                else if(self.value != '' && self.value == 0){
                    if(self.success){
                        self.$emit('verify', false)
                        self.success = false
                    }
                    return '输入框内不为0'
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

