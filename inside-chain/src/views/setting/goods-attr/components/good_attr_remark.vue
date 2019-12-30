<template>
    <div>
        <div class="searchBar">
            <Button class="pull-right" type="primary" @click="alertAddGoodRemarkDialog(true)">添加备注分类</Button>
            <div class="fl-clear"></div>
            <br>
        </div>

        <baseModal :show="goodAttrAddRemark.show" :okText="goodAttrAddRemark.okText"
                   :cancelText="goodAttrAddRemark.cancelText" :header="goodAttrAddRemark.header"
                   @on-ok="confirmAddRemark" @on-cancel="cancelAddRemark">
            <Form :label-width="80">
                <FormItem label="备注分类">
                    <Input v-model="goodAttrAddRemark.formData.name" placeholder=""
                           style="width: 370px;margin: 0 10px"></Input>
                    <Verify :need="goodAttrAddRemark.need" type="1" :value="goodAttrAddRemark.formData.name" :max="20"
                            @verify="verifyRemarkTypeName"></Verify>
                </FormItem>
            </Form>
        </baseModal>

        <baseModal :show="goodAttrAddSubRemark.show" :okText="goodAttrAddSubRemark.okText"
                   :cancelText="goodAttrAddSubRemark.cancelText" :header="goodAttrAddSubRemark.header"
                   @on-ok="confirmAddSubRemark" @on-cancel="cancelAddSubRemark">
            <Form :label-width="80">
                <FormItem label="备注分类">
                    <Select v-model="goodAttrAddSubRemark.formData.name" style="width: 370px;margin: 0 10px" @on-change="remarkTypeChanged">
                        <Option v-for="(item,index) in goodRemarkTypeList" :value="item.id" :key="item.id+'_'+item.name" :label="item.name">{{ item.name }}</Option>
                    </Select>
                     <Verify :need="goodAttrAddSubRemark.need" :value="goodAttrAddSubRemark.formData.name"  @verify="verifySubRemarkType($event,'name')"></Verify>
                </FormItem>
                <FormItem label="备注内容">
                    <Input v-model="goodAttrAddSubRemark.formData.content" placeholder=""
                           style="width: 370px;margin: 0 10px"></Input>
                    <Verify :need="goodAttrAddSubRemark.need" type="1" :value="goodAttrAddSubRemark.formData.content"
                            :max="20" @verify="verifySubRematkType($event,'content')"></Verify>
                </FormItem>
            </Form>
        </baseModal>

        <multiLevelList :thead="goodSpecifications.thead" :tbody="goodSpecifications.tbody"
                        :disableType="goodSpecifications.disableType"
                        @on-operate="listOprates" v-if="!noData"></multiLevelList>
        <!--noData:{{noData}}-->
        <NoData v-show="noData" text="未添加备注"></NoData>
        <br>
        <br>
    </div>
</template>

<script>
    /**
     *
     * @param res
     * @author
     *
     */
    import multiLevelList from '@/components/goods-attr/multi-level-list';
    import NoData from '@/components/no-data/no-table';
    import baseModal from '@/components/modal/base-modal';
    import {mapGetters} from "vuex";
    import Verify from '@/components/verify/base-verify'

    // const theData =
    export default {
        name: "goodAttrRemark",
        data() {
            return {

                //添加备注类别弹框相关参数
                goodAttrAddRemark: {
                    need: false,
                    show: false,
                    header: '添加备注分类',
                    okText: '保存',
                    cancelText: '取消',
                    inputVerify: true,
                    formData: {
                        name: '',
                    },
                },

                // isAddSub: true,//新增子类还是编辑 false：编辑  true:新增
                isAdd: true,//新增父类还是编辑 false：编辑  true:新增
                editId: -1,
                editSubId:-1,
                //添加子备注类别弹框相关参数
                goodAttrAddSubRemark: {
                    show: false,
                    need: false,
                    header: '添加备注',
                    okText: '保存',
                    cancelText: '取消',
                    inputVerifyName: true,
                    inputVerifyContent: true,
                    formData: {
                        name: '',
                        content: '',
                    },
                },
                subRemarkFormName:'',
                pageParams: {
                    plateEntityId: ''
                }
            }
        },
        components: {
            multiLevelList: multiLevelList,
            baseModal: baseModal,
            // multiInput: multiInput,
            NoData,
            Verify
        },
        computed: {
            ...mapGetters({
                goodSpecifications: 'goods/formattedGoodRemark',
                goodRemarkTypeList: 'goods/goodRemarkTypeList'
            }),
            noData() {
                let self = this;
                return (self.goodSpecifications && self.goodSpecifications.tbody && self.goodSpecifications.tbody.length > 0) ? false : true
            },
            addRemarkDataVerify() {
                if (this.goodAttrAddRemark.inputVerify) return true;
                return false;
            },
            addSubRemarkDataVerify() {
                if (this.goodAttrAddSubRemark.inputVerifyName && this.goodAttrAddSubRemark.inputVerifyContent) return true;
                return false;
            },
        },
        methods: {
            remarkTypeChanged(value){
                this.goodAttrAddSubRemark.formData.name = value;
            },
            //验证备注名称
            verifyRemarkTypeName(e) {
                this.goodAttrAddRemark.inputVerify = e
            },
            verifySubRemarkType(e, type) {
                if (type == 'name') {
                    this.goodAttrAddSubRemark.inputVerifyName = e
                } else {
                    this.goodAttrAddSubRemark.inputVerifyContent = e
                }
            },
            listOprates(data) {
                // if (data.optId == 11) {
                //     //新增子类备注
                //     this.alertAddGoodSubRemarkDialog(data);
                // } else if (data.optId == 12) {//编辑父类备注
                //     this.alertAddGoodRemarkDialog(false, data)
                // } else if (data.optId == 14) {//子类删除
                //     this.alertDelDialog(data)
                // } else if (data.optId) {//父类删除
                //     this.alertDelDialog(data)
                // }
                if (data.optId == 11 && data.isParent ) {//添加子类
                    this.alertAddGoodSubRemarkDialog(true,data);
                } else if (data.optId == 12 && data.isParent ) {//编辑父类名称
                    this.alertAddGoodRemarkDialog(false, data)
                } else if (data.optId == 13 && data.isParent ) {//删除父类
                    this.alertDelDialog(data)
                } else if ( data.optId == 14 && !data.isParent ) {//删除子类
                    this.alertDelDialog(data)
                } else if ( data.optId == 12 && !data.isParent ) {//编辑子类
                    this.alertAddGoodSubRemarkDialog(false,data)
                }
            },
            //清空添加备注表单
            clearAddRemarkData() {
                this.goodAttrAddRemark = {
                    need: false,
                    show: false,
                    header: '添加备注分类',
                    okText: '保存',
                    cancelText: '取消',
                    inputVerify: true,
                    formData: {
                        name: '',
                    },
                }
            },
            clearAddSubRemarkData() {
                this.goodAttrAddSubRemark = {
                    show: false,
                    need: false,
                    header: '添加备注',
                    okText: '保存',
                    cancelText: '取消',
                    inputVerifyName: true,
                    inputVerifyContent: true,
                    formData: {
                        name: '',
                        content: '',
                    },
                }
            },

            //添加备注
            confirmAddRemark() {
                let self = this;
                let params = {
                    name: '',
                    id: ''
                }
                Object.assign(params, self.pageParams)
                if (this.addRemarkDataVerify && this.goodAttrAddRemark.formData.name) {
                    if (self.isAdd) {//添加
                        params.name = self.goodAttrAddRemark.formData.name;
                        self.$store.dispatch('goods/saveFoodRemarkType', params)
                    } else {//编辑
                        params.name = self.goodAttrAddRemark.formData.name;
                        params.id = self.editId
                        this.$store.dispatch('goods/saveFoodRemarkType', params)
                    }
                    this.clearAddRemarkData()
                    this.goodAttrAddRemark.show = false
                } else {
                    this.goodAttrAddRemark.need = true
                }
            },
            cancelAddRemark() {
                this.clearAddRemarkData()
                this.goodAttrAddRemark.show = false
            },

            //添加备注
            confirmAddSubRemark() {
                let self = this;
                if (self.addSubRemarkDataVerify && this.goodAttrAddSubRemark.formData.name && this.goodAttrAddSubRemark.formData.content) {
                    let params = {
                        name: self.goodAttrAddSubRemark.formData.content,
                        kindTasteId: self.goodAttrAddSubRemark.formData.name
                    }
                    Object.assign(params, self.pageParams)
                    if(self.isAdd){
                        self.$store.dispatch('goods/addGoodRemark', params)
                    }else{
                        params.id = self.editId
                        self.$store.dispatch('goods/addGoodRemark', params)
                    }
                    this.clearAddSubRemarkData()
                    this.goodAttrAddSubRemark.show = false
                } else {
                    this.goodAttrAddSubRemark.need = true
                }
            },
            cancelAddSubRemark() {
                this.clearAddSubRemarkData()
                this.goodAttrAddSubRemark.show = false
            },
            alertAddGoodRemarkDialog(isAdd, data) {
                //input内容情况
                if (!!isAdd) {
                    this.goodAttrAddRemark.header = '添加备注分类'
                    this.isAdd = true
                } else {
                    this.goodAttrAddRemark.header = '编辑备注分类'
                    this.goodAttrAddRemark.formData.name = data.item.parent.contents[1].content;
                    this.isAdd = false
                    this.editId = data.item.id
                }
                this.goodAttrAddRemark.show = true
            },
            //增加备注子分类
            alertAddGoodSubRemarkDialog(isAdd,data) {
                if(isAdd){
                    this.editId = data.item.id;
                    this.goodAttrAddSubRemark.formData.name = data.item.id;
                    this.subRemarkFormName = data.item.parent.contents['1'].content;
                    this.goodAttrAddSubRemark.formData.content = '';
                    this.goodAttrAddSubRemark.header = '添加备注'
                }else{
                    this.editId = data.item.id;
                    this.goodAttrAddSubRemark.formData.name = data.parent.id;
                    this.subRemarkFormName = data.item.contents['1'].content;
                    this.goodAttrAddSubRemark.formData.content = data.item.contents['1'].content;
                    this.goodAttrAddSubRemark.header = '编辑备注'
                }
                this.isAdd = isAdd
                this.goodAttrAddSubRemark.show = true
            },

            alertDelDialog(data) {
                let self = this;
                let name;
                if (data.isParent) {
                    name = data.item.parent.contents[1].content;
                } else {
                    name = data.item.contents[1].content;
                }
                let params = {
                    id: data.item.id
                }
                Object.assign(params, self.pageParams)
                self.$Modal.confirm({
                    title: '请注意',
                    content: '删除备注后，用到此备注的所有商品将会全部取消关联，请慎重操作！',
//                    点击确定的操作
                    onOk: () => {
                        if (data.isParent) {
                            setTimeout(()=>{
                                this.$store.dispatch('goods/deleteRemarkType', params)
                            },500)

                        } else {
                            setTimeout(()=>{
                                this.$store.dispatch('goods/deleteRemark', params)
                            },500)
                        }
                    },
//                    点击取消的操作
                    onCancel: () => {
                    }
                });
            },
        },
        created() {
            let self = this;
            self.pageParams.plateEntityId = self.$route.query.plateEntityId;
            self.$store.dispatch('goods/getGoodRemark', self.pageParams)
            self.$store.dispatch('goods/getRemarkTypeList', self.pageParams)
        }
    }
</script>

<style scoped>
    select{
        height: 32px;
        line-height: 1.5;
        padding: 4px 7px;
        font-size: 12px;
        border: 1px solid #dddee1;
        border-radius: 4px;
        color: #495060;

    }
    select option{
        height: 32px;
        line-height: 1.5;
        border: 1px solid #dddee1;
    }
</style>
