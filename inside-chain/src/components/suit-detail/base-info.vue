<template>
    <div class="base clearfix">
        <div class="content">
            <Form class="pull-left left-form" ref="formInline" :model="baseInfo" :rules="ruleValidate" :label-width="165">
                <FormItem label="套餐分类" class="category" prop="kindMenuId">
                    <Select v-model="baseInfo.kindMenuId"
                            placeholder="选择套餐分类"
                            @on-change="change('kindMenuId', $event)">
                        <Option v-for="(item, $index) in cateList"
                                :value="item && item.id"
                                :key="$index">
                            {{item.name}}
                        </Option>
                    </Select>
                    <a class="refresh" href="javascript:void(0)" @click="getSuitLabelList">刷新</a>
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
                            v-if="item.name !== '不设定'"
                            :key="$index">
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </FormItem>

                <FormItem label="套餐名称" prop="suitName">
                    <Input v-model="baseInfo.suitName"
                           @on-change="change('suitName', baseInfo.suitName)">
                    </Input>
                </FormItem>

                <FormItem label="单价(¥)" prop="price">
                    <Input v-model="baseInfo.price"
                           @on-focus="getOldVal"
                           @on-keyup="checkPriceRule(baseInfo.price)"
                           @on-change="change('price', baseInfo.price)">
                    </Input>
                </FormItem>

                <FormItem label="会员价(¥)" prop="memberPrice" class="member-price">
                    <Input v-model="baseInfo.memberPrice"
                           placeholder="可不填"
                           @on-keyup="checkMemberPriceRule(baseInfo.memberPrice)"
                           @on-change="change('memberPrice', baseInfo.memberPrice)">
                    </Input>
                </FormItem>

                <FormItem label="结账单位">
                    <Select v-model="baseInfo.account" @on-change="change('account', $event)">
                        <Option v-for="(item, $index) in orderUnitSelectList"
                                :value="item && item.unitDesc"
                                :key="$index">
                            {{item.unitDesc}}
                        </Option>
                    </Select>
                </FormItem>

                <FormItem label="套餐编码" class="code">
                    <Input v-model="baseInfo.suitCode"
                           placeholder="非必填"
                           @on-change="change('suitCode', baseInfo.suitCode)">
                    </Input>
                </FormItem>

                <FormItem label="套餐id" class="mt-10px" v-if="baseInfo.suitId">
                    <span>{{baseInfo.suitId}}</span>
                </FormItem>

                <FormItem label="允许商品金额计入优惠门槛" class="mt-10px">
                    <i-switch v-model="baseInfo.discountInclude ===  1" size="default"
                              @on-change="change('discountInclude', $event)">
                    </i-switch>
                </FormItem>
            </Form>
        </div>

        <suit-modal-label-setting class="add-suit-goods"
                                  @change-visible="changeVisible"
                                  @choosed-item-list="getChoosedLableItem"
                                  :is-show="labelModalShow">
        </suit-modal-label-setting>

        <goods-class-add :show="showAddClassModal"
                         :params="showAddClassParams"
                         @cancel="closeAddClassModal"
                         @ok="newClass">
        </goods-class-add>
    </div>
</template>
<script>
    import SuitModalLabelSetting from '@/components/modal/suit-modal-label-setting'
    import GoodsClassAdd from '@/components/goods-class/goods-class-add'
    import {mapState, mapGetters, mapActions} from 'vuex'
    import Tools from '@/base/tools'
    export default {
        props: {
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
        data(){
            return {
                showAddClassModal: false,
                plateEntityId: '',
                opEntityId: '',
                labelModalShow: false,
                defaultPrice: 0,
                choosedLableItemList: [],
                ruleValidate: {
                    kindMenuId: [
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
                    suitName: [
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
        watch: {
            checkForm(newval, oldval){
                if(newval !== oldval){
                    this.$refs['formInline'].validate(valid => {
                        this.$emit('check-base-info', valid)
                    })
                }
            }
        },
        computed: {
            ...mapState({
                orderUnitSelectList(state){
                    return state.setting.common.suit.orderUnitSelectList || []
                },
                categoryList(state){
                    return state.setting.categoryList || []
                }
            }),
            ...mapGetters({
                baseInfo: 'setting/suitDetailToBackBaseInfo'
            }),
            cateList(){
                return Tools.recursion(this.categoryList)
            },
            // 新增分类弹出框的参数
            showAddClassParams(){
                return {
                    plateEntityId: this.plateEntityId,
                    opEntityId: this.opEntityId,
                    isInclude: 1
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
                _changeSuitBaseInfoVal: 'setting/changeSuitBaseInfoVal',
                _getCategoryList: 'setting/getCategoryList',
                _getSuitLableList: 'setting/getSuitLableList'
            }),
            getSuitLabelList(){
                let {plateEntityId, entityId} = this.$route.query
                this._getCategoryList({
                    isInclude: 1,
                    plateEntityId: plateEntityId || '',
                    opEntityId: entityId || ''
                })
            },
            getChoosedLableItem(list){
                this.choosedLableItemList = list
            },
            newCategroy(){
                this.showAddClassModal = true
            },
            showLableModal(){
                this._getSuitLableList({
                    opEntityId: ''
                })
                this.labelModalShow = true
            },
            changeVisible(val){
                this.labelModalShow = val !== 'close'
            },
            change(type, val){
                let value = val
                if (type === 'price') {
                    if (this.type !== 'edit' || (Number(val) === Number(this.baseInfo.memberPrice) || Number(this.defaultPrice) === Number(this.baseInfo.memberPrice))) {
                        this.baseInfo.memberPrice = val
                        this.baseInfo.price = val
                        this.defaultPrice = val
                        this._changeSuitBaseInfoVal({attr: 'memberPrice', val: val})
                        this._changeSuitBaseInfoVal({attr: type, val: value})
                        return
                    }
                }
                if (type === 'memberPrice') {
                    if (this.baseInfo.memberPrice === this.baseInfo.price) {
                        this.defaultPrice = val
                    }
                }
                if(type === 'account'){
                    let index = this.orderUnitSelectList.findIndex(item => item.unitDesc === value)
                    this._changeSuitBaseInfoVal({attr: 'accountId', val: this.orderUnitSelectList[index].id})
                }
                if (Object.prototype.toString.call(val) === '[object Boolean]') {
                    value = Number(val)
                }
                this._changeSuitBaseInfoVal({attr: type, val: value})
            },
            // 获取单价的oldval，因为on-change时候获取的是新值不能和会员价做比较,一个奇葩的需求
            getOldVal(){
                this.defaultPrice = this.baseInfo.price
            },
            closeAddClassModal(){
                this.showAddClassModal = false
            },
            newClass(){
                this.getSuitLabelList()
                this.showAddClassModal = false
            },
            // 单价只能输入2个小数
            checkPriceRule(value){
                let val = value.toString().split('.')[1]
                if(val && val.length > 2){
                    let toFixedVal = this.$ToFixed(value)
                    this.baseInfo.price = Number(toFixedVal)
                    this._changeSuitBaseInfoVal({attr: 'price', val: Number(toFixedVal)})
                    if (this.type !== 'edit' || (Number(this.baseInfo.memberPrice) === Number(this.defaultPrice)) || Number(toFixedVal) === Number(this.baseInfo.memberPrice)) {
                        this.baseInfo.memberPrice = Number(toFixedVal)
                        this.defaultPrice = Number(toFixedVal)
                        this._changeSuitBaseInfoVal({attr: 'memberPrice', val: Number(toFixedVal)})
                    }
                }
            },
            // 会员价只能输入2位小数
            checkMemberPriceRule(value){
                let val = value.toString().split('.')[1]
                if(val && val.length > 2){
                    let toFixedVal = this.$ToFixed(value)
                    this.baseInfo.memberPrice = Number(toFixedVal)
                    this._changeSuitBaseInfoVal({attr: 'memberPrice', val:  Number(toFixedVal)})
                    if( Number(toFixedVal) === Number(this.baseInfo.price)){
                        this.defaultPrice =  Number(toFixedVal)
                    }
                }
            }
        },
        components: {
            SuitModalLabelSetting,
            GoodsClassAdd
        },
    }
</script>
<style lang="scss" type="text/scss" scoped>
    .content {

        .ivu-select-item-selected {
            display: table-cell;
            min-width: 200px;
        }

        .left-form {
            padding-left: 25px;
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
                    padding: 0 10px 0 10px;
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

        .member-price{
            /deep/ label:before{
                content: '';
            }
        }

        .ivu-form-item {

            &.label-setting{
                margin-bottom: 0;
            }

            margin-bottom: 15px;

            /deep/ label {
                padding-right: 18px;
            }

            /deep/ .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
                color: #999;
            }

            &.code {
                margin-bottom: 0;
            }

            /deep/ .ivu-select {
                width: 200px;
            }

            /deep/ .ivu-input-wrapper {
                width: 200px;
            }

            /deep/ .ivu-form-item-content {

                /deep/ .ivu-select {
                    width: 200px;
                    height: 32px;
                    line-height: 32px;
                    box-sizing: border-box;
                }

                /deep/ .ivu-input-wrapper {
                    width: 200px;
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
            }
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
