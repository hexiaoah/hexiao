<template>
    <div>
        <div>
            <!--<crumbBar>-->
                <!--<Crumb></Crumb>-->
            <!--</crumbBar>-->
            <div class="content">
                <!--<crumbBar class="mb-20px second-level">-->
                    <!--<Tabs></Tabs>-->
                <!--</crumbBar>-->

                <crumbBar class="mb-20px ">
                    <settingTabs :tab-data="tabData"></settingTabs>
                </crumbBar>

                <div class="forth-level">
                    <Breadcrumb class="break">
                        <BreadcrumbItem :to="suitManageRoute">套餐管理</BreadcrumbItem>
                        <BreadcrumbItem to="">编辑套餐</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div>
                    <baseSteps :current="current"
                               class="mb-20px mt-20px base-step">
                        <baseStep>1.设置套餐基本信息</baseStep>
                        <baseStep>2.设置套餐商品</baseStep>
                        <baseStep>3.完成</baseStep>
                    </baseSteps>

                    <div class="suit-group">
                        <div class="top">
                            <a href="javascript:void(0)"
                               class="btn-add-suit-group pull-right"
                               @click="addSuitGroup">
                                添加套餐分组
                            </a>
                        </div>

                        <div v-for="(items, $index) in suitGroups" :key="$index">
                            <table-group-list :max-num="items.num"
                                              :name="items.name"
                                              :suit-index="items.suitIndex"
                                              :is-required="items.isRequired"
                                              :table-data="items.itemList"
                                              v-show="items.isValid"
                                              @edit-suit-group="editSuitGroup"
                                              @delete-suit-group="deleteSuitGroup"
                                              @remove-table-data="removeTableData"
                                              @change-goods-price="changeGoodsPrice"
                                              @change-goods-limitnum="changeGoodsLimitNum"
                                              @change-goods-spec="changeGoodsSpec"
                                              @add-goods="addGoods">
                            </table-group-list>
                        </div>
                    </div>

                    <div class="bottom">
                        <router-link :to="preRouterPath" class="btn-pre">
                            返回上一步
                        </router-link>
                        <a href="javascript:void(0)" class="btn-next" @click="completeSet">
                            下一步，完成设置
                        </a>
                    </div>

                    <Modal :title="modelType === 'edit' ? '编辑套餐分组' : '添加套餐分组'"
                           class="modal"
                           width="450"
                           :loading="loading"
                           :value="showAddSuitGroupModal"
                           :mask-closable="false"
                           :closable="false"
                           okText="保存"
                           @on-ok="addSuitGroupOk"
                           @on-cancel="addSuitGroupCancel">
                        <Form label-position="right" ref="formCustom" :label-width="90" :model="addSuitGroupModal" :rules="ruleValidate">
                            <FormItem label="分组名称" prop="name">
                                <Input v-model="addSuitGroupModal.name" placeholder="分组名称"></Input>
                            </FormItem>
                            <FormItem label="点单方式">
                                <Select v-model="requireType" :disabled="modelType === 'edit'">
                                    <Option value="允许顾客自选">允许顾客自选</Option>
                                    <Option value="必须全部选择">必须全部选择</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="允许点的数量" v-show="addSuitGroupModal.isRequired === 0">
                                <Select v-model="addSuitGroupModal.num" :disabled="modelType === 'edit'">
                                    <Option :value="item" v-for="item in 100" :key="item">{{item}}</Option>
                                </Select>
                            </FormItem>
                        </Form>
                    </Modal>

                    <modal-add-suit-goods class="add-suit-goods"
                                          :is-show="addSuitGoodsModel"
                                          :choosed-goods-id-or-spec-id="choosedGoodsIdOrSpecId"
                                          @change-visible="changeVisible"
                                          @choosed-goods="choosedGoods">
                    </modal-add-suit-goods>

                    <base-modal :show="showBaseModal"
                                :okText="'确定'"
                                :cancelText="'取消'"
                                :width="388"
                                :header="'删除商品'"
                                @on-ok="confirmBaseModal"
                                @on-cancel="cancelBaseModal">
                        <p class="delete-group-content">是否删除此商品</p>
                    </base-modal>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from '@/components/layout/crumb'
    import Tabs from "@/components/tabs/tabs"
    import settingTabs from "@/components/tabs/third-tab"
    import baseStep from "@/components/step/base-step"
    import baseSteps from "@/components/step/base-steps"
    import TableGroupList from '@/components/table/table-group-list'
    import ModalAddSuitGoods from '@/components/modal/modal-add-suit-goods.vue'
    import emuGoodsTabs from "@/const/emu-goods-lib.js"
    import BaseModal from '@/components/modal/base-modal.vue'

    import settingModule from "@/store/modules/setting/index"
    import goodsModule from "@/store/modules/goods/index"
    import { mapActions } from "vuex"

    export default {
        data() {
            return {
                tabData: emuGoodsTabs,
                current: 2,
                isRequired: 0, // 点击新增商品时候去区分当前这个套餐的点单方式，用于显示select的默认值
                deleteGoodsIndex: 0, // 要删除的商品的索引
                loading: true,
                // 套餐数据
                suitGroups: [],
                // 当前选中的套餐索引, 这个是为了后续查找操作的是那个套餐
                suitIndex: 0,
                // 已经被选中的商品或者规格，这里因为商品id和规格id不唯一，所以保存的是商品id + 规格id
                choosedGoodsIdOrSpecId: [],
                // 添加套餐分组的模块框内容
                addSuitGroupModal: {
                    name: '',     //分组名称
                    num: 1,        //允许点的份数
                    isRequired: 0   //点单方式
                },
                showAddSuitGroupModal: false,
                addSuitGoodsModel: false,
                showBaseModal: false,
                modelType: 'add', // 套餐分组模块框是新增还是编辑
                ruleValidate: {
                    name: [
                        {
                            required: true,
                            trigger: 'change',
                            validator(rule, val, callback){
                                let hasSpace = val.indexOf(' ') >= 0
                                if(hasSpace){
                                    callback('不能输入空格')
                                }
                                else if (!val || val.length < 1) {
                                    callback('必填项，不能为空')
                                }
                                else if (val.length > 20) {
                                    callback('输入错误！至多输入20个字符')
                                }
                                else {
                                    callback()
                                }
                            }
                        }
                    ],
                }
            }
        },
        computed: {
            requireType: {
                get: function () {
                    let arr = ['允许顾客自选', '必须全部选择']
                    return arr[this.addSuitGroupModal.isRequired]
                },
                set: function (newval) {
                    let arr = ['允许顾客自选', '必须全部选择']
                    let index = arr.findIndex(item => item === newval)
                    this.addSuitGroupModal.isRequired = index
                }
            },
            preRouterPath(){
                let crumbName = this.$route.query.crumbName
                let entityId = this.$route.query["entityId"] || ""
                let itemId = this.$route.query["itemId"]
                return {path: 'single_suit_edit_first_step', query: {crumbName, entityId, itemId}}
            },
            nextRouterPath(){
                let crumbName = this.$route.query.crumbName
                let entityId = this.$route.query["entityId"] || ""
                return {path: 'shop_manage_library_suit_manage', query: {crumbName, entityId}}
            },
            suitManageRoute(){
                let crumbName = this.$route.query.crumbName
                let entityId = this.$route.query["entityId"] || ""
                return {path: 'shop_manage_library_suit_manage', query: {crumbName, entityId}}
            }
        },
        mounted() {
//            this.setNav(2)
            this.$store.dispatch("leftNav/showShopNav", 3);

            let self = this
            let { entityId, itemId } = this.$route.query
            this._getSuitGroupList({opEntityId: entityId, suitId: itemId, callback(data){
                // 这里是接口返回的内容
                for (let i = 0; i < data.length; i++) {
                    let keys = Object.keys(data[i])
                    if (keys.indexOf('suitIndex') < 0) {
                        data[i].suitIndex = i
                    }
                    data[i].itemList && data[i].itemList.map(item => {
                        if (item.num === 0) {
                            item.num = '不限制'
                        }
                        return item
                    })
                }
                self.suitGroups = data
            }})
        },
        methods: {
            ...mapActions({
                setNav: "leftNav/setNav",
                _getSuitGroupList: 'setting/getSuitGroupList',
                _saveSuitGroupList: 'setting/saveSuitGroupList'
            }),
            addSuitGroup(){
                this.addSuitGroupModal = {
                    name: '',
                    isRequired: 0,
                    num: 1
                }
                this.showAddSuitGroupModal = true
                this.modelType = 'add'
            },
            // 点击编辑显示新增/编辑套组的模态框
            editSuitGroup(index){
                let {name, isRequired, num} = this.suitGroups[index]
                this.addSuitGroupModal = {
                    name,
                    isRequired,
                    num
                }
                this.showAddSuitGroupModal = true
                this.suitIndex = index
                this.modelType = 'edit'
            },
            // 点击新增/编辑模块框的确认
            addSuitGroupOk(){
                if (this.addSuitGroupModal.name) {
                    let {name, num, isRequired} = this.addSuitGroupModal
                    let obj = {name, num, isRequired, itemList: [], isValid: 1, suitIndex: this.suitGroups.length}
                    // 新增
                    if (this.modelType === 'add') {
                        this.suitGroups.push(JSON.parse(JSON.stringify(obj)))
                    }
                    else {
                        this.suitGroups[this.suitIndex].name = name
                    }
                    this.showAddSuitGroupModal = false
                    this.$refs['formCustom'].resetFields()
                }
                else {
                    this.$Message.error('请填写分组名称')
                    setTimeout(() => {
                        this.loading = false
                        this.$nextTick(() => {
                            this.loading = true
                        })
                    }, 500)
                }
            },
            // 点击新增/编辑模态框的取消
            addSuitGroupCancel(){
                this.showAddSuitGroupModal = false
                this.$refs['formCustom'].resetFields()
            },
            // 删除套餐
            deleteSuitGroup(index){
                this.suitIndex = index
                let len = this.suitGroups[index].itemList && this.suitGroups[index].itemList.filter(item => {
                        return item.isValid
                    }).length || 0
                if(len){
                    this.$Message.error('当前分组内有商品，不能删除，请先删除该分组下的商品，再删除这个分组')
                }
                else{
                    this.suitGroups[index].isValid = 0
                }
            },
            confirmBaseModal(){
                // 根据有没有id去判断该商品是否是默认从后端传递过来的
                if (this.suitGroups[this.suitIndex].itemList[this.deleteGoodsIndex].id) {
                    this.suitGroups[this.suitIndex].itemList[this.deleteGoodsIndex].isValid = 0
                }
                else {
                    this.suitGroups[this.suitIndex].itemList.splice(this.deleteGoodsIndex, 1)
                }
                this.showBaseModal = false
            },
            cancelBaseModal(){
                this.showBaseModal = false
            },
            // 新增套餐的商品
            addGoods(index, isRequire){
                this.isRequired = isRequire
                this.suitIndex = index
                let itemList = (this.suitGroups[index].itemList || []).filter(item => item.isValid) || []
                // 确定被哪些商品或者规格被选中了，因为后端没有唯一值，目前是通过商品itemId + 规格specId作为唯一值的方式
                this.choosedGoodsIdOrSpecId = itemList.map(item => {
                    if(item.specDetailId){
                        return item.itemId + item.specDetailId
                    }
                    return item.itemId
                })
                this.addSuitGoodsModel = true
            },
            // 切换筛选商品的显示和隐藏
            changeVisible(state){
                this.addSuitGoodsModel = state
            },
            // 套餐内的商品被选中
            choosedGoods(arr){
                for (let i = 0; i < arr.length; i++) {
                    if (!arr[i].discountValue) {
                        arr[i].discountValue = 0
                    }
                    if (!arr[i].num) {
                        !this.isRequired ? arr[i].num = '不限制' : arr[i].num = 1
                    }
                    if (!arr[i].isValid && arr[i].isValid !== 1) {
                        arr[i].isValid = 1
                    }
                }
                this.addSuitGoodsModel = false
                let obj = (this.suitGroups[this.suitIndex].itemList || []).concat(arr)
                this.$set(this.suitGroups[this.suitIndex], 'itemList', obj)
            },
            // 删除套餐内的商品
            removeTableData(suitIndex, $index){
                this.suitIndex = suitIndex
                this.deleteGoodsIndex = $index
                this.showBaseModal = true
            },
            // 修改商品价格
            changeGoodsPrice(val, suitIndex, $index){
                this.suitGroups[suitIndex].itemList[$index].discountValue = Number(val)
            },
            // 修改商品限制点的数量
            changeGoodsLimitNum(val, suitIndex, $index){
                this.suitGroups[suitIndex].itemList[$index].num = val === '不限制' ? val : Number(val)
            },
            // 修改商品规格
            changeGoodsSpec(val, suitIndex, $index){
                this.suitGroups[suitIndex].itemList[$index].specDetailId = val
            },
            completeSet(){
                let filterGroupList = this.suitGroups.filter(item => (item.isValid || item.id)) || []
                let groupList = filterGroupList.map(item => {
                    if (item.itemList && item.itemList.length) {
                        item.itemList.map(data => {
                            if (data.num === '不限制') {
                                data.num = 0
                            }
                            return data
                        })
                    }
                    return item
                })
                let suitId = this.$route.query.itemId
                let opEntityId = this.$route.query.entityId
                let self = this
                this._saveSuitGroupList({
                    opEntityId,
                    suitId,
                    groupList,
                    callback(){
                        self.$Message.success('编辑成功')
                        setTimeout(() => {
                            self.$router.push(self.nextRouterPath)
                        }, 1000)
                    }
                })
            }
        },
        components: {
            crumbBar,
            Crumb,
            Tabs,
            settingTabs,
            baseStep,
            baseSteps,
            TableGroupList,
            ModalAddSuitGoods,
            BaseModal
        },
        beforeCreate() {
//            动态注册module
            let {setting = {}, goods = {}} = this.$store.state
            if (Object.keys(setting).length <= 0) {
                this.$store.registerModule('setting', settingModule)
            }
            if (Object.keys(goods).length <= 0) {
                this.$store.registerModule('goods', goodsModule)
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .content {
        padding: 30px 30px 50px;

        .third-level {
            min-height: auto;
            height: 50px;
            line-height: 50px;
            padding: 0 0 0 30px;

            .tab-wrap {
                padding: 0;
            }
        }

        .forth-level {
            width: 100%;
            height: 50px;
            line-height: 50px;
            min-height: auto;
            background: #FFFFFF;
            -webkit-box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
            box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06);
            padding: 0 30px 0 0;

            .break {
                &:before {
                    content: "";
                    display: inline-block;
                    width: 3px;
                    height: 20px;
                    background-color: #d83f3f;
                    border-radius: 3px;
                    vertical-align: middle;
                    margin-right: 10px;
                }
            }

            /deep/ span + span > a.ivu-breadcrumb-item-link {
                font-weight: 400;
                color: #151515;
            }
        }

        .card-wrapper {
            margin-left: 0;
            margin-right: 0;
        }

        .bottom {
            width: 100%;
            text-align: center;

            .btn-pre {
                width: 120px;
                height: 44px;
                line-height: 44px;
                display: inline-block;
                border: 1px solid #D83F3F;
                border-radius: 4px;
                font-size: 14px;
                color: #D83F3F;
                letter-spacing: 0;
                margin-right: 10px;
            }

            .btn-next {
                width: 240px;
                height: 44px;
                line-height: 44px;
                background: #D83F3F;
                border-radius: 4px;
                font-size: 14px;
                color: #FFFFFF;
                letter-spacing: 0;
                display: inline-block;
                margin-top: 30px;
                margin-bottom: 68px;
            }
        }
    }

    .suit-group {
        margin: 0;

        .top {
            height: 62px;
            line-height: 62px;
            background: white;

            .btn-add-suit-group {
                width: 88px;
                height: 32px;
                text-align: center;
                line-height: 32px;
                background: #D83F3F;
                border: 1px solid #D83F3F;
                border-radius: 4px;
                margin: 15px;
                font-size: 12px;
                color: #FFFFFF;
                letter-spacing: 0;
            }
        }
    }

    .bottom {
        width: 100%;
        text-align: center;

        .btn-pre {
            width: 120px;
            height: 44px;
            line-height: 44px;
            display: inline-block;
            border: 1px solid #D83F3F;
            border-radius: 4px;
            font-size: 14px;
            color: #D83F3F;
            letter-spacing: 0;
            margin-right: 10px;
        }

        .btn-next {
            width: 240px;
            height: 44px;
            line-height: 44px;
            background: #D83F3F;
            border-radius: 4px;
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: 0;
            display: inline-block;
            margin-top: 30px;
            margin-bottom: 68px;
        }
    }

    .add-suit-group {
        /deep/ .ivu-form-item-label {
            padding-right: 18px;
        }

        /deep/ .ivu-select {
            width: 200px;
        }

        /deep/ .ivu-form-item-content {
            width: 200px;
        }
    }

    .add-suit-goods {

        /deep/ .ivu-modal-content {
            padding: 0 15px;
        }

        /deep/ .ivu-modal-header {
            padding: 0;
            border-bottom: 1px solid #EEEEEE;

            p {
                font-size: 14px;
                color: #333333;
                height: 44px;
                line-height: 44px;
            }
        }

        /deep/ .ivu-modal-footer {
            padding-left: 0;
            padding-right: 0;
        }
    }

    .ivu-form-item {
        width: 300px;
        margin: auto;
        margin-bottom: 15px;

        /deep/ button {
            width: 88px;
            height: 32px;
            border: 1px solid #CCCCCC;
            border-radius: 4px;

            & + button {
                border: none;
            }
        }
    }

    .delete-group-content {

        &:before {
            content: '';
            margin-right: 5px;
            display: inline-block;
            vertical-align: middle;
            width: 36px;
            height: 36px;
            background-image: url(https://assets.2dfire.com/frontend/476f6af6460834ccf909ece304f6a89f.png);
            background-size: contain;
        }
    }
</style>
