<template>
    <div v-if="!!input">
        <Select v-model="input.value" :placeholder="input.placeholder" :disabled="input.disabled" @on-change="change">
            <Option v-for="opt in input.options" :value="opt.value" :key="opt.value">{{ opt.label }}</Option>
        </Select>
        <VerifyRequired :value="input.value" :required="input.required" @verify="emitVerify"></VerifyRequired>
    </div>

</template>

<script>
    /**
     *
     * @param res
     * @author
     *
     */
    import verifyRequired from './base-required-verify'
    export default {
        name: "base-select",
        props:['input'],
        components:{
            VerifyRequired:verifyRequired,
        },
        methods:{
            emitVerify(e){
                this.$emit('verify',e);
            },
            change(e){
                this.$emit('change',e)
            }
        }

    }
</script>

<style scoped>

</style>
