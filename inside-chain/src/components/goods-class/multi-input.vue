<template>
    <div>
        <div v-for="item in inputs" :key="item.id" class="table full-width" style="margin-bottom: 10px;">
            <div class="ta-right pr-20px table-cell left-label-wrap">
                {{item.label}}
            </div>
            <div class="pr-20px table-cell">
                <!--<Input v-model="item.value" :placeholder="item.placeholder" v-if="(!item.type) || (item.type=='text')" />-->
                <baseVerifyInput v-if="(!item.type) || (item.type=='text')" :input="item.input" @verify="emitVerify($event,item.id)"></baseVerifyInput>
                <!--<Select v-model="item.value" v-else-if="item.type=='select'" :placeholder="item.placeholder">-->
                <!--<Option v-for="opt in item.options" :value="opt.value" :key="opt.value">{{ opt.label }}</Option>-->
                <!--</Select>-->
                <baseVerifySelect v-else-if="item.type=='select'" :input="item.input" @verify="emitVerify($event,item.id)" :disabled="item.disabled"></baseVerifySelect>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     *
     * @param res
     * @author
     *
     */
    import baseModal from '../modal/base-modal';
    import baseVerifyInput from '../verify/base-verify-input'
    import baseVerifySelect from '../verify/base-verify-select'

    //数据格式如下：
    // inputs: {
    //     1: {
    //         id:1,
    //             label: '加料分类',
    //             // value: '',
    //             type:'text',
    //             input:{
    //             placeholder: '',
    //                 value:'',
    //                 required:true
    //         }
    //     },
    //     2: {
    //         id:2,
    //             label: '加料名称',
    //             value: '',
    //             type:'select',
    //             input:{
    //             value:1,
    //                 options:[
    //                 {
    //                     value:1,
    //                     label:'jialiao1'
    //                 },
    //                 {
    //                     value:2,
    //                     label:'jialiao2'
    //                 }
    //             ],
    //                 placeholder: ''
    //         }
    //
    //     },
    //     3: {
    //         id:3,
    //             label: '加料（元）',
    //             value: '',
    //             input:{
    //             placeholder: '',
    //                 value: '',
    //         }
    //
    //     },
    // },
    // let theData = {
    //     inputVerifyData:{}
    // }
    export default {
        name: "multiInputModal",
        props: ["inputs"],
        // data(){
        //     return theData
        // },
        components:{
            baseModal:baseModal,
            baseVerifyInput:baseVerifyInput,
            baseVerifySelect:baseVerifySelect
        },
        methods:{
            emitVerify(e,id){
                this.inputs[id]['verifyV'] = e // 验证值记录
                this.$emit('verify',this.checkVerify())
            },
            checkVerify(){
                for(let key in this.inputs){
                    if(!this.inputs[key]['verifyV']) {
                        return false;
                    }
                }
                return true;
            }
        },
    }
</script>

<style scoped>
    .left-label-wrap{
        width: 200px;
    }
</style>
