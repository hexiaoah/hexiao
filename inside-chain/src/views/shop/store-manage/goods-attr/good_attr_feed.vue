<template>
    <div>
        <div class="searchBar">
            <Button class="pull-right" type="primary" @click="alertAddFeedType(true)">添加加料分类</Button>
            <div class="fl-clear"></div>
            <br>
        </div>

        <baseModal :show="goodAttrAddFeedType.show" :okText="goodAttrAddFeedType.okText"
                   :cancelText="goodAttrAddFeedType.cancelText" :header="goodAttrAddFeedType.header"
                   @on-ok="confirmAddFeedType" @on-cancel="cancelAddFeedType">
            <Form :label-width="80">
                <FormItem label="加料分类">
                    <Input v-model="goodAttrAddFeedType.formData.name" placeholder=""
                           style="width: 370px;margin: 0 10px"></Input>
                    <Verify :need="goodAttrAddFeedType.need" type="1" :value="goodAttrAddFeedType.formData.name"
                            :max="20"
                            @verify="verifyAdditionTypeName"></Verify>
                </FormItem>
            </Form>
        </baseModal>

        <baseModal :show="goodAttrAddFeedSubType.show" :okText="goodAttrAddFeedSubType.okText"
                   :cancelText="goodAttrAddFeedSubType.cancelText" :header="goodAttrAddFeedSubType.header"
                   @on-ok="confirmAddFeedSubType" @on-cancel="cancelAddFeedSubType">
            <Form :label-width="80">
                <FormItem label="加料分类">
                    <Select v-model="goodAttrAddFeedSubType.formData.name" style="width: 370px;margin: 0 10px"
                            placeholder="">
                        <Option v-for="item in feedTypeList" :value="item.value" :key="item.value+'_'+item.label">
                            {{ item.label }}
                        </Option>
                    </Select>
                    <Verify :need="goodAttrAddFeedSubType.need" :value="goodAttrAddFeedSubType.formData.name"
                            @verify="verifySubFeedType($event,'name')"></Verify>
                </FormItem>
                <FormItem label="加料名称">
                    <Input v-model="goodAttrAddFeedSubType.formData.content" placeholder=""
                           style="width: 370px;margin: 0 10px"></Input>
                    <Verify :need="goodAttrAddFeedSubType.need" type="1"
                            :value="goodAttrAddFeedSubType.formData.content"
                            :max="20" @verify="verifySubFeedType($event,'content')"></Verify>
                </FormItem>
                <FormItem label="加价 (元)">
                    <Input v-model="goodAttrAddFeedSubType.formData.price" placeholder=""
                           style="width: 370px;margin: 0 10px"></Input>
                    <Verify :need="goodAttrAddFeedSubType.need" type="2" :value="goodAttrAddFeedSubType.formData.price"
                            :max="100000" @verify="verifySubFeedType($event,'price')"></Verify>
                </FormItem>
            </Form>
        </baseModal>
        <multiLevelList :thead="goodFeeds.thead" :tbody="goodFeeds.tbody"
                        :disableType="goodFeeds.disableType"
                        @on-operate="listOprates" v-if="!noData"></multiLevelList>
        <NoData v-show="noData" text="未添加加料"></NoData>


        <br>
        <br>
    </div>
</template>

<script>
    /**
     * 功能：商品做法
     * @param res
     * @author
     *
     */
    import multiLevelList from '@/components/goods-attr/multi-level-list';
    import baseModal from '@/components/modal/base-modal';
    import {mapGetters} from "vuex";
    import NoData from '@/components/no-data/no-table';
    import Verify from '@/components/verify/base-verify'

    let theData = {
        goodAttrAddFeedType: {
            show: false,
            need: false,
            header: '添加加料分类',
            okText: '保存',
            cancelText: '取消',
            inputVerify: true,//表单有效性验证
            formData: {
                name: '',
            },
        },
        //添加子分类
        goodAttrAddFeedSubType: {
            show: false,
            need: false,
            header: '添加新料',
            okText: '保存',
            cancelText: '取消',
            inputVerifyName: true,//表单有效性验证
            inputVerifyContent: true,//表单有效性验证
            inputVerifyPrice: true,
            formData: {
                name: '',
                content: '',
                price: ''
            },
        },
        isAdd: true,//新增父类还是编辑 false：编辑  true:新增
        isParent: true,
        editId: {},
        pageParams: {
            opEntityId: '',
            plateEntityId: ''
        }
    }
    export default {
        name: "goodFeed",
        data() {
            return theData
        },
        components: {
            multiLevelList: multiLevelList,
            baseModal: baseModal,
            // multiInput:multiInput,
            NoData: NoData,
            Verify,
        },
        computed: {
            ...mapGetters({
                goodFeeds: "goods/formattedGoodFeedSingle",
                goodFeedTypeList: 'goods/goodFeedTypeListSingle'
            }),
            noData() {
                let self = this;
                return (self.goodFeeds && self.goodFeeds.tbody && self.goodFeeds.tbody.length > 0) ? false : true
            },
            feedTypeList() {
                let opts = [];
                this.goodFeedTypeList.map(item => {
                    opts.push({
                        value: item.id,
                        label: item.name
                    })
                })
                return opts
            },
            addFeedDataVerify() {
                if (this.goodAttrAddFeedType.inputVerify) return true;
                return false;
            },
            addSubFeedDataVerify() {
                if (this.goodAttrAddFeedSubType.inputVerifyName && this.goodAttrAddFeedSubType.inputVerifyContent && this.goodAttrAddFeedSubType.inputVerifyPrice) return true;
                return false;
            },
        },

        methods: {
            verifySubFeedType(e, type) {
                if (type == 'name') {
                    this.goodAttrAddFeedSubType.inputVerifyName = e
                } else if (type == 'content') {
                    this.goodAttrAddFeedSubType.inputVerifyContent = e
                } else {
                    this.goodAttrAddFeedSubType.inputVerifyPrice = e
                }
            },
            verifyAdditionTypeName(e) {
                this.goodAttrAddFeedType.inputVerify = e
            },
            clearAdditionTypeInfo() {
                this.goodAttrAddFeedType.need = false;
                this.goodAttrAddFeedType.inputVerify = true
                this.goodAttrAddFeedType.formData.name = ''
            },
            clearAdditionInfo() {
                this.goodAttrAddFeedSubType.need = false;
                this.goodAttrAddFeedType.inputVerifyName = true
                this.goodAttrAddFeedType.inputVerifyContent = true
                this.goodAttrAddFeedType.inputVerifyPrice = true
                this.goodAttrAddFeedSubType.formData.name = ''
                this.goodAttrAddFeedSubType.formData.content = ''
                this.goodAttrAddFeedSubType.formData.price = ''
            },
            listOprates(data) {
                // if (data.optId == 11) {//添加子类
                //     this.alertAddFeedSubType(data);
                // } else if (data.optId == 12) {//编辑父类名称
                //     this.alertAddFeedType(false, data)
                // } else if (data.optId == 13) {//删除父类
                //     this.alertDelDialog(data)
                // } else {//删除子类
                //     this.alertDelDialog(data)
                // }
                if (data.optId == 11 && data.isParent ) {//添加子类
                    this.alertAddFeedSubType(true,data);
                } else if (data.optId == 12 && data.isParent ) {//编辑父类名称
                    this.alertAddFeedType(false, data)
                } else if (data.optId == 13 && data.isParent ) {//删除父类
                    this.alertDelDialog(data)
                } else if ( data.optId == 14 && !data.isParent ) {//删除子类
                    this.alertDelDialog(data)
                } else if ( data.optId == 12 && !data.isParent ) {//编辑子类
                    this.alertAddFeedSubType(false,data)
                }
            },
            alertAddFeedType(isAdd, data) {
                if (!!isAdd) {
                    this.goodAttrAddFeedType.header = '添加加料分类'
                    this.isAdd = true
                    this.goodAttrAddFeedType.formData.name = ''
                } else {
                    this.goodAttrAddFeedType.header = '编辑加料分类'
                    this.isAdd = false
                    this.editId = data.item
                    this.goodAttrAddFeedType.formData.name = data.item.parent.contents[1].content;
                }
                this.goodAttrAddFeedType.show = true;
            },
            confirmAddFeedType() {
                let self = this;
                let params = {
                    name: '',
                    id: '',
                    entityId: ''
                };
                Object.assign(params, self.pageParams)
                if (self.addFeedDataVerify && self.goodAttrAddFeedType.formData.name) {
                    params.name = self.goodAttrAddFeedType.formData.name
                    if (self.isAdd) {
                        self.$store.dispatch('goods/saveFoodFeedType', params)
                    } else {
                        params.id = self.editId.id;
                        params.entityId = self.editId.entityId;
                        self.$store.dispatch('goods/saveFoodFeedType', params)
                    }
                    this.clearAdditionTypeInfo();
                    this.goodAttrAddFeedType.show = false;
                } else {
                    this.goodAttrAddFeedType.need = true;
                }
            },
            cancelAddFeedType() {
                this.clearAdditionTypeInfo();
                this.goodAttrAddFeedType.show = false;
            },
            alertAddFeedSubType(isAdd,data) {
                // this.goodAttrAddFeedSubType.formData.name = data.item.id;
                // this.goodAttrAddFeedSubType.formData.content = '';
                // this.goodAttrAddFeedSubType.formData.price = '';
                // this.goodAttrAddFeedSubType.show = true
                if(isAdd){
                    this.goodAttrAddFeedSubType.formData.name = data.item.id;
                    this.goodAttrAddFeedSubType.formData.content = '';
                    this.goodAttrAddFeedSubType.formData.price = '';
                    this.editId = {}
                    this.goodAttrAddFeedSubType.header = '添加新料'
                }else{
                    this.goodAttrAddFeedSubType.formData.name = data.parent.id;
                    this.goodAttrAddFeedSubType.formData.content = data.item.contents[1].content;
                    this.goodAttrAddFeedSubType.formData.price = data.item.contents[2].content;
                    this.editId = data.item
                    this.goodAttrAddFeedSubType.header = '编辑新料'
                }
                this.isAdd = isAdd
                this.goodAttrAddFeedSubType.show = true
            },
            confirmAddFeedSubType() {
                let self = this;

                if (this.addSubFeedDataVerify && this.goodAttrAddFeedSubType.formData.name && this.goodAttrAddFeedSubType.formData.content && this.goodAttrAddFeedSubType.formData.price) {
                    let parentId = this.goodAttrAddFeedSubType.formData.name
                    let name = this.goodAttrAddFeedSubType.formData.content
                    let price = this.goodAttrAddFeedSubType.formData.price
                    let params = {
                        name: name,
                        price: price,
                        additionKindId: parentId,//分类ID
                    }
                    Object.assign(params, self.pageParams)
                    if(self.isAdd){
                        this.$store.dispatch('goods/addGoodFeed', params)
                    }else{
                        params.id = self.editId.id
                        this.$store.dispatch('goods/addGoodFeed', params)
                    }
                    // this.$store.dispatch('goods/addGoodFeed', params)
                    this.clearAdditionInfo()
                    this.goodAttrAddFeedSubType.show = false;
                } else {
                    this.goodAttrAddFeedSubType.need = true;
                }

            },
            cancelAddFeedSubType() {
                this.clearAdditionInfo()
                this.goodAttrAddFeedSubType.show = false;
            },

            alertDelDialog(data) {
                let name
                if (!!data.isParent) {
                    name = data.item.parent.contents[1].content;
                } else {
                    name = data.item.contents[1].content;
                }
                let self = this;
                let params = {
                    id: data.item.id
                }
                Object.assign(params, self.pageParams)
                self.$Modal.confirm({
                    title: '请注意',
                    content: '删除加料后，用到此加料的所有商品将会全部取消关联，请慎重操作！',
//                    点击确定的操作
                    onOk: () => {

                        if (!!data.isParent) {
                            setTimeout(() => {
                                this.$store.dispatch('goods/deleteFeedType', params)
                            }, 500)

                        } else {
                            setTimeout(() => {
                                this.$store.dispatch('goods/deleteFeed', params)
                            }, 500)
                        }
                    },
//                    点击取消的操作
                    onCancel: () => {
                    }
                });
            },
            emitVerifyGoodAttrAddFeedType(e) {
                this.goodAttrAddFeedType.inputVerify = e;
            },
            emitVerifyGoodAttrAddSubFeedType(e) {
                this.goodAttrAddFeedSubType.inputVerify = e;
            }
        },
        created() {
            let self = this;
            self.pageParams.opEntityId = self.$route.query.entityId;
            self.pageParams.plateEntityId = self.$route.query.plateEntityId;
            self.$store.dispatch('goods/getGoodFeed', self.pageParams)
            self.$store.dispatch('goods/getFeedTypeList', self.pageParams)
        }
    }
</script>

<style scoped>

</style>
