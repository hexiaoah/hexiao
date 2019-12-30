<script>
    /**
     -- zeqi@2dfire

     @props:
     value: string 要验证的字符串
     max: number 限制的字符长度（默认20）

     @events:
     verify:

     验证长度，在临界值增减的时候触发
     验证超过max时，例如从20增长到21，返回false；
     验证小于max时，例如从21减少到20，true；
     在界限内外增加(例如10->11或 21->22)或减少字符长度(例如11->10或 22->21)，不会触发方法

     @desc:
     字符长度检查组件，超过max长度后，显示提示信息
     //     不在ASCII码中的字符判断为两个字符，中文占两个字符
     不在ASCII码中的字符判断为两个字符，中文占一个字符

     */


    export default {
        name: "baseLengthVerify",
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
                if (self.max == undefined) {
                    return 20
                } else {
                    return self.max
                }
            },
            computedByteLen() {
                let self = this;
//                获取传入字符串的字符长度
//                中文占两个字符
//                let inputLength = self.value.replace(/[^\x00-\xff]/g, '01').length
//                中文占一个字符
//                 console.log('value computedByteLen:',self.value)
//
                let inputLength = 0;
                if (self.value) {
                    inputLength = self.value.length
                }
//                判断是否超出界限max
                if (inputLength > 0 && self.currentMax > 0 && self.currentMax < inputLength) {
                    if (self.success) {
                        self.$emit('verify', false)
                        self.success = false
                    }
                    return '输入错误！至多输入' + self.currentMax + '个字符'
                } else {
//                输入持续非法的情况下，不触发改动和冒泡犯法
                    if (!self.success) {
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
    <div class="length-verify" v-show="computedByteLen">
        <p class="warning-text">
            {{computedByteLen}}
        </p>
    </div>
</template>

<style lang="scss" scoped>
    .length-verify {
        width: 100%;
        padding: 10px 0 0;
    }

    .warning-text {
        height: 20px;
        line-height: 20px;
        color: #d83f3f;
    }
</style>

