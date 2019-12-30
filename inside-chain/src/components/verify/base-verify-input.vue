<template>
    <div v-if="!!input">
        <Input v-model="input.value" :placeholder="input.placeholder" :disabled="input.disabled" @on-change="change"/>
        <!--集合校验-长度：-->
        <Verify type="1" :value="input.value" :max="input.max" @verify="emitVerify" v-if="input.verify==1" :required="input.required"></Verify>
        <!--集合校验-金额：-->
        <Verify type="2" :value="input.value" :max="input.max" @verify="emitVerify" v-if="input.verify==2" :required="input.required"></Verify>
        <!--集合校验-输入内容 中英文、数字限定：-->
        <!--<Verify type="4"  :value="input.value"  @verify="emitVerify"></Verify>-->
    </div>
</template>

<script>
    /**
     *
     * @param res
     * @author
     *
     */
    import Verify from '@/components/verify/base-verify';
    import VerifyRequired from '@/components/verify/base-required-verify';
    export default {
        name: "base-verify-input",
        props:['input'],
        components:{
            Verify,
            VerifyRequired
        },
        methods:{
            emitVerify(e){
                this.$emit('verify', e)
            },
            change(e){
                this.$emit('change',e)
            }
        },
        mounted(){

        },

    }
</script>

<style scoped>

</style>
