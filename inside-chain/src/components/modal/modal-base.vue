<template>
    <Modal
        :class="['modal', {'big': size === 'big'}]"
        :value="isShow"
        width="width"
        :closable="false"
        title="选择需要加入的菜单"
        okText="保存"
        @on-ok="ok"
        @on-cancel="cancel">
        <slot></slot>
    </Modal>
</template>

<script>
    export default {
        name: 'modal-base',
        props: {
            title: {
                type: String,
                defautl: ''
            },
            width: {
                type: Number,
                default: 450
            },
            isShow: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: 'default'
            }
        },
        data(){
            return {
                showModal: this.isShow
            }
        },
        methods: {
            ok(){
                this.$emit('ok')
            },
            cancel(){
                this.$emit('cancel')
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    .modal{

        /deep/ .ivu-modal{
            width: 450px !important;
        }

        /deep/ .ivu-modal-body{
            padding-left: 0;
            margin-left: 25px;
            padding-bottom: 0;
        }

        /deep/ .ivu-modal-footer{
            padding-right: 16px;
            border: none;
            border-top: 1px solid #E5E5E5;
        }

        /deep/ button{
            width: 88px;
            height: 32px;
            border: 1px solid #CCCCCC;
            border-radius: 4px;

            & + button{
                border: none;
            }
        }
    }
</style>

