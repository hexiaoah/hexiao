<template>
    <div>
        <div class="modalTitle" v-show="title && title.length">{{title}}</div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100">
            <FormItem label="自定义编码" prop="coutomEncode">
                <Input type="text" v-model.trim="formInline.coutomEncode" ></Input>
            </FormItem>
            <FormItem label="门店简称" prop="shortName">
                <Input type="text" v-model.trim="formInline.shortName" ></Input>
            </FormItem>
            <div class="submitWarp">
                <Button type="primary" @click="handleSubmit('formInline')">保存</Button>
            </div>
        </Form>   
    </div>
</template>
<script>
export default {
    name:'EditForm',
    props:{
        title:{
            type: String,
            default: ''
        },
        formInline:{
            type: Object,
            default:()=>({coutomEncode:'',shortName:''})
        },
        name:{
            type: String,
            default: ''
        },
        visible:{
            type: Boolean,
            default: false
        }
    },
    watch: {
      visible(value){
          if(!value) this.$refs.formInline.resetFields()
      }  
    },
    data () {
        return {
            ruleInline: {
                coutomEncode: [
                    { pattern: /^([A-Z]|[a-z]|[0-9]|[\u4e00-\u9fa5])+$/, message: '不支持小数点等特殊符号', trigger: 'blur' },
                    { type: 'string', max: 10, message: '最多不超过10个字符', trigger: 'blur' },

                ],
                shortName: [
                    { pattern: /^([\u4e00-\u9fa5]|[A-Z]|[a-z]|[0-9])+$/, message: '不支持小数点等特殊符号', trigger: 'blur' },
                    { type: 'string', max: 10, message: '最多不超过10个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$emit('handleOk')
                } else {
                    return
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.modalTitle{
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
}
.submitWarp{
    text-align: center;
}
</style>