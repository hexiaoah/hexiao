<script>
    /**
     -- zeqi@2dfire

     @props:
     value: 输入值
     max: 验证界限
     type:
     1- 长度校验
     value: string 要验证的字符串
     max: number 限制的字符长度
     2- 金额校验
     value: number 要验证的金额
     max: number 限制的金额上限（默认￥100,000）
     3- 数字校验
     value: number 要验证的数字
     max: number 限制的数字上限（默认 1,000,000,000）

     blank: 非空验证

     4- 汉字、英文、数字
     value: string 输入的字符串


     @events:
     verify:

     验证结果返回，
     通过: true
     不通过: false

     @desc:
     校验集合

     */

    import length from './base-length-verify.vue'
    import money from './base-money-verify.vue'
    import unit from './base-unit-verify.vue'
    import blank from './base-blank-verify.vue'
    import needed from './base-needed-verify.vue'
    import reg from './base-reg-verify.vue'
    import verifyRequired from './base-required-verify'

    export default {
        name: "baseVerify",
        props: ["type", "value", "max", "required", "need"],
        data() {
            return {
//                输入合法
                success: true,
                verify: true,
                isBlank: true,
                requiredVerify: false
            }
        },
        components: {
            length,
            money,
            unit,
            blank,
            needed,
            reg,
            verifyRequired
        },
        created() {
            // this.requiredVerify = this.required;
        },
        methods: {
            emitVerify(e) {
                this.verify = e;
                let self = this;
                if (self.isBlank) {
                    this.$emit('verify', e)
                }
            },
            emitBlank(e) {
                let self = this;
                self.isBlank = e
                console.log('blank', e, self.isBlank)
                this.$emit('verify', e)
            },
            emitVerifyRequired(e) {
                this.requiredVerify = e;
                if (!!this.success) {
                    if (!e || !this.requiredVerify) {
                        this.success = false
                        this.$emit('verify', false)
                    }
                } else {
                    if (!!e && !!this.requiredVerify) {
                        this.success = true
                        this.$emit('verify', true)
                    }
                }
            }
        }
    };
</script>

<template>
    <div class="warning">
        <div v-if="isBlank">
            <length v-if="type == 1" :value="value" :max="max" @verify="emitVerify"></length>
            <money v-if="type == 2" :value="value" :max="max" @verify="emitVerify"></money>
            <unit v-if="type == 3" :value="value" :max="max" @verify="emitVerify"></unit>
        </div>
        <blank :value="value" @verify="emitBlank"></blank>
        <needed :value="value" :need="need"></needed>
        <reg v-if="type == 4" :value="value" @verify="emitVerify"></reg>
        <verifyRequired :value="value" :required="required" @verify="emitVerifyRequired"
                        v-if="!!required"></verifyRequired>
    </div>
</template>

<style lang="scss" scoped>
    .warning {
        line-height: 1.5;
        word-break: break-all;
    }
</style>

