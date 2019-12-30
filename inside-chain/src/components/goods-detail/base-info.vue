<template>
    <div class="baseinfo-wrapper clearfix">
        <div class="content">
            <Form class="left-form" ref="formInline" :model="FormItem" :rules="ruleValidate" :label-width="165">
                <FormItem label="商品分类" class="category" prop="kindId">
                    <Select v-model="FormItem.kindId"
                            placeholder="选择商品分类"
                            @on-change="changeBaseInfoVal('kindId', $event)">
                        <Option v-for="(item, $index) in cateList"
                                :value="item && item.id"
                                :key="$index">
                            {{item.name}}
                        </Option>
                    </Select>
                    <a class="refresh" href="javascript:void(0)" @click="getGoodsSelectList">刷新</a>
                    <a class="new" href="javascript:void(0)" @click="newCategroy">新建分类</a>
                </FormItem>
                <FormItem label="标签设置" class="label-setting require-label">
                    <a href="javascript:void(0)" class="addlabel" @click="showLableModal">
                        <i class="ivu-icon ivu-icon-plus"></i>
                        <span>设置标签</span>
                    </a>
                    <ul class="label-list">
                        <li v-for="(item, $index) in choosedLableItemList"
                            class="label-list-item"
                            v-if="item.labelName !== '不设定'"
                            :key="$index">
                            <span>{{item.labelName}}</span>
                        </li>
                    </ul>
                </FormItem>

                <FormItem label="商品名称" class="goods-name" prop="name">
                    <Input v-model="FormItem.name"
                           @on-change="changeBaseInfoVal('name', FormItem.name)">
                    </Input>
                </FormItem>

                <FormItem label="单价(¥)" prop="price">
                    <Input v-model="FormItem.price"
                           @on-keyup="checkPriceVal(FormItem.price)"
                           @on-change="changeBaseInfoVal('price', FormItem.price)">
                    </Input>
                </FormItem>

                <FormItem label="会员价(¥)" class="member-price" prop="memberPrice">
                    <Input v-model="FormItem.memberPrice"
                           placeholder="可不填"
                           @on-keyup="checkMemberPriceVal(FormItem.memberPrice)"
                           @on-change="changeBaseInfoVal('memberPrice', FormItem.memberPrice)">
                    </Input>
                </FormItem>

                <FormItem label="结账单位">
                    <Select v-model="FormItem.account" placeholder="份"
                            @on-change="changeBaseInfoVal('account', $event)">
                        <Option v-for="(item, $index) in unitList"
                                :value="item && item.unitDesc"
                                :key="$index">
                            {{item.unitDesc}}
                        </Option>
                    </Select>
                    <Checkbox v-model="FormItem.isTwoAccount !== 0"
                              class="isopenorderunit"
                              @on-change="changeBaseInfoVal('isTwoAccount', $event)">开启点餐单位
                    </Checkbox>
                </FormItem>

                <FormItem label="点餐单位" v-show="FormItem.isTwoAccount !== 0">
                    <Select v-model="FormItem.buyAccount" placeholder="份"
                            @on-change="changeBaseInfoVal('buyAccount', $event)">
                        <Option v-for="(item, $index) in unitList"
                                :value="item && item.unitDesc"
                                :key="$index">
                            {{item.unitDesc}}
                        </Option>
                    </Select>
                    <!--<a class="introduce" href="javascript:void(0)">什么是点菜单位?</a>-->
                </FormItem>

                <FormItem label="商品编码" class="code">
                    <Input v-model="FormItem.code"
                           placeholder="非必填"
                           @on-change="changeBaseInfoVal('code', FormItem.code)">
                    </Input>
                </FormItem>
                <FormItem label="商品id" class="mt-10px" v-if="FormItem.id">
                    <span>{{FormItem.id}}</span>
                </FormItem>
                <FormItem label="允许商品金额计入优惠门槛" class="mt-10px">
                    <i-switch v-model="FormItem.discountInclude ===  1" size="default"
                              @on-change="changeBaseInfoVal('discountInclude', $event)">
                    </i-switch>
                </FormItem>
            </Form>
        </div>
        <goods-modal-label-setting :title="'商品标签设置'"
                                   :default-value="goodsDetailFromBackBaseInfo.label"
                                   :label-list="labelList"
                                   class="add-goods"
                                   @change-visible="changeVisible"
                                   @choosed-item-list="getChoosedLableItem"
                                   :width="720"
                                   :is-show="labelModalShow">
        </goods-modal-label-setting>

        <goods-class-add :show="showAddClassModal"
                         :params="showAddClassParams"
                         @cancel="closeAddClassModal"
                         @ok="newClass">
        </goods-class-add>
    </div>
</template>
<script>
    import GoodsModalLabelSetting from '@/components/modal/goods-modal-label-setting'
    import GoodsClassAdd from '@/components/goods-class/goods-class-add'
    import {mapState, mapActions, mapGetters} from "vuex"
    import Tools from '@/base/tools'

    export default {
        props: {
            kindMenuList: {
                type: Array,
                default(){
                    return []
                }
            },
            unitList: {
                type: Array,
                default(){
                    return []
                }
            },
            cateGoryPath: {
                type: Object,
                default(){
                    return {}
                }
            },
            type: {
                type: String,
                default: 'add'
            },
            checkForm: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapState({
                labelList(state){
                    return state.setting.common.goods.labelList
                }
            }),
            ...mapGetters({
                goodsDetailFromBackBaseInfo: "setting/goodsDetailFromBackBaseInfo",
            }),
            cateList(){
                return Tools.recursion(this.kindMenuList)
            },
            // 新增分类弹出框的参数
            showAddClassParams(){
                return {
                    plateEntityId: this.plateEntityId,
                    opEntityId: this.opEntityId,
                    isInclude: 0
                }
            }
        },
        watch: {
            goodsDetailFromBackBaseInfo(newval){
                let {kindId, name, price, memberPrice, label, account, buyAccount, code, isTwoAccount, id, discountInclude} = newval
                this.FormItem = {
                    kindId,
                    label,
                    name,
                    price: price === 0 ? 0 : (Number(price) || ''),
                    memberPrice: this.type === 'add' ? Number(memberPrice) || '' : (memberPrice === 0 ? 0 : (Number(memberPrice) || '')),
                    account: account || '份',
                    buyAccount: buyAccount || '份',
                    code,
                    id,
                    isTwoAccount: isTwoAccount || 0,
                    discountInclude
                }
                this.openMembers = !!memberPrice
                this.defaultPrice = price
            },
            checkForm(newval, oldval){
                if (newval !== oldval) {
                    this.$refs['formInline'].validate(valid => {
                        this.$emit('check-base-info', valid)
                    })
                }
            }
        },
        data(){
            return {
                // 展示新增分类的弹出框
                showAddClassModal: false,
                plateEntityId: '',
                opEntityId: '',
                FormItem: {
                    kindId: '',
                    name: '',
                    price: undefined,
                    memberPrice: undefined,
                    account: '份',
                    buyAccount: '份',
                    code: '',
                    isTwoAccount: 0,
                    discountInclude: 1
                },
                defaultPrice: 0,
                choosedLableItemList: [],
                openMembers: false,
                labelModalShow: false,
                ruleValidate: {
                    kindId: [
                        {
                            required: true,
                            trigger: 'change',
                            validator(rule, val, callback){
                                if (!val) {
                                    callback('必填项，不能为空')
                                }
                                else {
                                    callback()
                                }
                            }
                        }
                    ],
                    name: [
                        {
                            required: true,
                            trigger: 'change',
                            validator(rule, val, callback){
                                let hasSpace = val.indexOf(' ') >= 0
                                if(hasSpace){
                                    callback('不能输入空格')
                                }
                                if (!val || val.length < 1) {
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
                    price: [
                        {
                            required: true,
                            trigger: 'change',
                            validator(rule, val, callback){
                                if (!val && val !== 0) {
                                    callback('必填项，不能为空')
                                }
                                else if (isNaN(val) || val < 0) {
                                    callback('请输入正数字')
                                }
                                else if (val > 100000) {
                                    callback('输入错误！至多输入100000')
                                }
                                else {
                                    callback()
                                }
                            }
                        }
                    ],
                    memberPrice: [
                        {
                            required: true,
                            trigger: 'change',
                            validator(rule, val, callback){
                                if (isNaN(val) || val < 0) {
                                    callback('请输入正数字')
                                }
                                else if (val > 100000) {
                                    callback('输入错误！至多输入100000')
                                }
                                else {
                                    callback()
                                }
                            }
                        }
                    ]
                }
            }
        },
        created(){
            let {plateEntityId, entityId} = this.$route.query
            this.plateEntityId = plateEntityId || ''
            this.opEntityId = entityId || ''
        },
        methods: {
            ...mapActions({
                _getGoodsSelectList: 'setting/getGoodsSelectList',
                _getGoodsLableList: 'setting/getGoodsLableList',
                _changeGoodsItemVal: 'setting/changeGoodsItemVal'
            }),
            getGoodsLableList(){
                this._getGoodsLableList({
                    opEntityId: this.opEntityId,
                    plateEntityId: this.plateEntityId
                })
            },
            showLableModal(){
                this.getGoodsLableList()
                this.labelModalShow = true
            },
            changeVisible(val){
                this.labelModalShow = val !== 'close'
            },
            newCategroy(){
                this.showAddClassModal = true
            },
            // 修改store里面要传给后端的参数值
            changeBaseInfoVal(type, val){
                let value = val
                if (type === 'price') {
                    if (this.type !== 'edit' || (Number(this.FormItem.memberPrice) === Number(this.defaultPrice)) || Number(val) === Number(this.FormItem.memberPrice)) {
                        this.FormItem.memberPrice = val
                        this.defaultPrice = val
                        this._changeGoodsItemVal({attr: 'memberPrice', val: val})
                        this._changeGoodsItemVal({attr: type, val: value})
                        return
                    }
                }
                if (type === 'memberPrice') {
                    if (this.FormItem.memberPrice === this.FormItem.price) {
                        this.defaultPrice = val
                    }
                }
                if (type === 'isTwoAccount') {
                    this.FormItem.isTwoAccount = Number(val)
                }
                if(type === 'account'){
                    let index = this.unitList.findIndex(item => item.unitDesc === value)
                    this._changeGoodsItemVal({attr: 'accountId', val: this.unitList[index].id})
                }
                if(type === 'buyAccount'){
                    let index = this.unitList.findIndex(item => item.unitDesc === value)
                    this._changeGoodsItemVal({attr: 'buyAccountId', val: this.unitList[index].id})
                }
                if (Object.prototype.toString.call(val) === '[object Boolean]') {
                    value = Number(val)
                }
                this._changeGoodsItemVal({attr: type, val: value})
            },
            getChoosedLableItem(list){
                this.choosedLableItemList = list
            },
            closeAddClassModal(){
                this.showAddClassModal = false
            },
            newClass(){
                let itemId = this.$route.query.itemId || ''
                this._getGoodsSelectList({opEntityId: this.opEntityId, plateEntityId: this.plateEntityId, itemId})
                this.showAddClassModal = false
            },
            getGoodsSelectList(){
                let itemId = this.$route.query.itemId || ''
                this._getGoodsSelectList({opEntityId: this.opEntityId, plateEntityId: this.plateEntityId, itemId})
            },
            // 只能输入2位小数
            checkPriceVal(value){
                let val = value.toString().split('.')[1]
                if(val && val.length > 2){
                    let toFixedVal = this.$ToFixed(value)
                    this.FormItem.price = toFixedVal
                    this._changeGoodsItemVal({attr: 'price', val: Number(toFixedVal)})
                    if (this.type !== 'edit' || (Number(this.FormItem.memberPrice) === Number(this.defaultPrice)) || Number(toFixedVal) === Number(this.FormItem.memberPrice)) {
                        this.FormItem.memberPrice = Number(toFixedVal)
                        this.defaultPrice = Number(toFixedVal)
                        this._changeGoodsItemVal({attr: 'memberPrice', val: Number(toFixedVal)})
                    }
                }
            },
            // 会员价只能输入2位小数
            checkMemberPriceVal(value){
                let val = value.toString().split('.')[1]
                if(val && val.length > 2){
                    let toFixedVal = this.$ToFixed(value)
                    this.FormItem.memberPrice =  Number(toFixedVal)
                    this._changeGoodsItemVal({attr: 'memberPrice', val:  Number(toFixedVal)})
                    if( Number(toFixedVal) === Number(this.FormItem.price)){
                        this.defaultPrice =  Number(toFixedVal)
                    }
                }
            }
        },
        components: {
            GoodsModalLabelSetting,
            GoodsClassAdd
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    .content {

        .ivu-select-item-selected {
            display: table-cell;
            min-width: 200px;
        }

        .left-form {
            padding-left: 0;
            box-sizing: border-box;

            .addlabel {
                border: 1px solid #D83F3F;
                border-radius: 100px;
                display: inline-block;
                width: 90px;
                height: 30px;
                line-height: 30px;
                cursor: pointer;
                background: white;
                color: #D83F3F;
                text-align: center;
            }

            .label-list {
                width: 250px;
                margin-top: 10px;

                .label-list-item {
                    margin-bottom: 5px;
                    background: #F1F1F1;
                    border-radius: 100px;
                    font-size: 12px;
                    color: #333333;
                    display: inline-block;
                    float: left;
                    min-width: 70px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    margin-right: 10px;

                    .closelable {
                        color: #999999;
                        cursor: pointer;
                    }
                }
            }

            .label-setting {
                margin-bottom: 0;
            }

            .isopenmember, .isopenorderunit {
                display: inline-block;
                margin-left: 10px;
                font-size: 12px;
                color: #333333;
            }

            .introduce {
                font-size: 12px;
                color: #5599FF;
                margin-left: 10px;
            }
        }

        .ivu-form-item {
            margin-bottom: 15px;

            &.code {
                margin-bottom: 0;
            }

            .refresh {
                color: #5599FF;
                border-right: 1px solid #3F3F3F;
                padding-right: 10px;
                margin-left: 10px;
                font-size: 12px;
            }

            .new {
                color: #5599FF;
                padding-left: 8px;
                font-size: 12px;
            }

            /deep/ label {
                padding-right: 18px;
            }

            /deep/ .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
                color: #999;
                width: 200px;
            }

            /deep/ .ivu-select, /deep/ .ivu-input-wrapper {
                width: 200px;
            }
        }
    }

    .goods-name {
        margin-top: 5px;
    }

    .member-price {
        /deep/ label::before {
            display: none;
        }
    }

    .require-label /deep/ label:before {
        content: '*';
        display: inline-block;
        margin-right: 4px;
        line-height: 1;
        font-family: SimSun;
        font-size: 12px;
        color: #ed3f14;
    }
</style>
