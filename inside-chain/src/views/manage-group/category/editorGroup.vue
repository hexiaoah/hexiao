<template>
    <div class="editorModal">
        <Modal 
        :value="modal" 
        width='480' 
        :transfer="transfer"  
        @on-ok="ok"
        @on-cancel="canter" >
                <div class="modalTitle">{{title}}</div>
                <div class="modelContent">
                    <span class="contentName"><span style="color:red">*</span>类别名称</span>
                    <div class="inputwarp">
                        <input v-model="className"   @input="handleInputChane" class="inputVal" type="text">
                    </div>
                    <div>
                        <span class="warning">{{mes}}</span>
                    </div>
                </div>
                <div slot="footer">
                    <Button @click="canter">取消</Button>
                    <Button type="primary" @click="ok">保存</Button>
                </div>
        </Modal>
    </div>
</template>
<script>
export default {
    props:{
        modal:{
            type:Boolean,
            defalut:false,
        },
        value:{
            type:String,
            defalut:''
        },
        type:{
            type:Boolean,
            defalut:false
        }

    },
    data() {
        return {
            transfer:false,
            mes:'',
            className:''
        }
    },
    watch: {
        value(val){
            this.className = val
        }
    },
    computed: {
        title(){
            return this.type?'编辑类别':'添加类别'
        },
        
    },
    methods: {
        canter(e){
            this.mes = ''
            this.$emit('center')
        },
        ok(){
            this.mes = ''
            if(this.className.length > 5){
                this.mes = '不得超过5个字符'
            }else if(this.className.length === 0){
                this.mes = '必填项，不能为空'
            }else{
                 this.$emit('ok',this.className)
            }
        },
        handleInputChane(e){
            this.checkValue(e.target.value)
            this.$emit('change',e.target.value)
        },
        checkValue(value){
            this.mes = ''
            if(value.length > 5){
                this.mes = '不得超过5个字符'
            }else if(value.length === 0){
                this.mes = '必填项，不能为空'
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.editorModal{

    .inputwarp{
        display: inline-block;
        width: 200px;
        height: 32px;
        border-radius: 5px;
        border: 1px solid #333;
        overflow: hidden;
        vertical-align: middle;
        line-height: 30px;
        padding: 0 10px;
        margin-bottom: 2px;
        .inputVal{
            outline: none;
            border: none;
            width: 100%;
        }
    }
    .modelContent{
        margin-left: 50px;
        .contentName{
            display: inline-block;
            width: 60px;
        }
        .warning{
            font-size: 12px;
            color: #d83f3f;
            margin-left: 65px;
        }
    }
    .modalTitle{
        font-size: 14px;
        text-align: left;
        font-weight: bold;
        margin-bottom: 30px;
    }
    /deep/ .ivu-modal{
        top: 30%;
        .ivu-modal-close{
            display: none;
        }
        .ivu-modal-body{
            height: 125px;
        }
        .ivu-modal-footer{
            border: none;
        }
    }
}

</style>


