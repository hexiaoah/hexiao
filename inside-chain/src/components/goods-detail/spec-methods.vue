<template>
    <div class="spec-wrapper clearfix">
        <div class="content">
            <Form :label-width="42">
                <FormItem label="规格">
                    <ButtonAdd @on-tap="addSpec" class="btn-add-spec">
                        添加规格
                    </ButtonAdd>
                </FormItem>
                <FormItem label="" v-show="showSpecSelect">
                    <Select class="pull-left add-spec-label"
                            v-model="choosedSpec"
                            @on-change="changeSpec">
                        <Option v-for="(item, $index) in specDetailList"
                                :value="item && item.id"
                                :key="$index">
                            {{item.name}}
                        </Option>
                    </Select>
                </FormItem>
                <div class="table-wrapper" v-show="showSpecData && showSpecData.length">
                    <ul class="table-title">
                        <li>规格名称</li>
                        <li>基准用料(倍)</li>
                        <li>基准价格(倍)</li>
                        <li>默认单价</li>
                        <li class="custom-price-title">自定义单价</li>
                        <li>操作</li>
                    </ul>
                    <ul class="table-body">
                        <li v-for="(item, $tindex) in specData" class="table-li" :key="$tindex"
                            v-if="item.isValid === 1">
                            <div>{{item.name}}</div>
                            <div>{{item.rawScale}}</div>
                            <div>{{item.priceScale}}</div>
                            <div>{{item.defaultPrice}}</div>
                            <Input class="custom-price"
                                   v-model="item.definedPrice"
                                   @on-keyup="checkCustomRule(item.specDetailId, item.definedPrice)"
                                   @on-change="changeDefinedPrice(item.specDetailId, item.definedPrice)">
                            </Input>
                            <a href="javascript:void(0)" class="delete" @click="removeItem(item.specDetailId)">删除</a>
                        </li>
                    </ul>
                </div>
            </Form>

            <Form :label-width="42" class="methods-wrapper">
                <FormItem label="做法">
                    <ButtonAdd @on-tap="addMethods" class="btn-add-methods">
                        添加做法
                    </ButtonAdd>
                </FormItem>
                <FormItem v-show="showMethodSelect">
                    <Select class="pull-left add-spec-label"
                            v-model="choosedMethods"
                            @on-change="changeMethods">
                        <Option v-for="(item, $index) in makeList"
                                :value="item && item.id"
                                :key="$index">
                            {{item.name}}
                        </Option>
                    </Select>
                </FormItem>
                <div class="methods-wrapper" v-show="showMethodsData && showMethodsData.length">
                    <ul class="table-title">
                        <li>做法名称</li>
                        <li>加价模式</li>
                        <li>做法加价</li>
                        <li>操作</li>
                    </ul>
                    <ul class="table-body">
                        <li v-for="(item, $tindex) in showMethodsData"
                            class="table-li"
                            :key="$tindex" v-if="item.isValid === 1">
                            <div>{{item.name}}</div>
                            <div class="select">
                                <Select v-model="item.mode"
                                        @on-change="changeMakePriceMode(item.makeId, item.mode)"
                                        size="default">
                                    <Option v-for="(vdata, $addIndex) in addModel"
                                            :value="vdata"
                                            :key="$addIndex">
                                        {{vdata}}
                                    </Option>
                                </Select>
                            </div>
                            <div class="make-price">
                                <Input v-model="item.makePrice"
                                       size="small"
                                       :disabled="item.makePriceMode === 0"
                                       @on-keyup="checkMakeRule(item.makePrice, item.makeId)"
                                       @on-change="changeMakePrice(item.makePrice, item.makeId)">
                                </Input>
                            </div>
                            <a href="javascript:void(0)" class="delete-methods" @click="removeMethodsItem(item.makeId)">删除</a>
                        </li>
                    </ul>
                </div>
            </Form>
        </div>
    </div>
</template>
<script>
    import ButtonAdd from '@/components/button/button-add'
    import {mapState, mapActions, mapGetters} from "vuex"
    export default {
        props: {
            specDetailList: {
                type: Array,
                default(){
                    return []
                }
            },
            makeList: {
                type: Array,
                default(){
                    return []
                }
            }
        },
        data(){
            return {
                showSpecSelect: false,
                showMethodSelect: false,
                choosedSpec: '',
                choosedMethods: '',
                addModel: ['不加价', '一次性加价', '每购买单位加价', '每结账单位加价'],
                specData: [],
                methodsData: []
            }
        },
        computed: {
            ...mapState({
                price(state){
                    return state.setting.common.goods.detailToBack.price
                }
            }),
            ...mapGetters({
                goodsDetailFromBackSpecAndPractice: "setting/goodsDetailFromBackSpecAndPractice"
            }),
            showSpecData(){
                return this.specData.filter(item => item.isValid === 1)
            },
            showMethodsData(){
                for (let i = 0; i < this.methodsData.length; i++) {
                    this.methodsData[i].mode = this.addModel[this.methodsData[i].makePriceMode || 0]
                }
                return this.methodsData.filter(item => item.isValid === 1)
            }
        },
        watch: {
            price(newval){
                this.specData = this.specData.map(item => {
                    if (item.defaultPrice === item.definedPrice) {
                        item.definedPrice = (newval * item.priceScale).toFixed(2)
                        console.log((newval * item.priceScale).toFixed(2))
                    }
                    item.defaultPrice = (newval * item.priceScale).toFixed(2)
                    this._changeGoodsItemVal({attr: 'specDetailList', val: this.specData})
                    return item
                })
            },
            goodsDetailFromBackSpecAndPractice(newval){
                let {specDetailList, makeList} = newval
                this.specData = JSON.parse(JSON.stringify(specDetailList || []))
                this.methodsData = JSON.parse(JSON.stringify(makeList || []))
            }
        },
        methods: {
            ...mapActions({
                _changeGoodsItemVal: 'setting/changeGoodsItemVal'
            }),
            addSpec(){
                this.showSpecSelect && (this.choosedSpec = '')
                this.showSpecSelect = !this.showSpecSelect
            },
            changeSpec(id){
                if (!id) {
                    return
                }
                let item = this.specDetailList.filter(item => (item.id === id))[0]
                let arr = []
                this.specData.forEach(item => {
                    if (item.isValid === 1) {
                        arr.push(item.specDetailId)
                    }
                })
                let index = arr.indexOf(id)
                if (index >= 0) {
                    this.$Message.error('请勿重复选择')
                    return
                }
                if (this.price) {
                    // 新增商品时候不能返回defaultPrice(需要自己去计算)， 编辑商品时候会返回
                    if (!item.defaultPrice) {
                        item.defaultPrice = (this.price * item.priceScale).toFixed(2)
                    }
                    this.specData.push({
                        name: item.name,
                        definedPrice: item.defaultPrice,
                        isValid: 1,
                        specDetailId: item.id || item.specDetailList,
                        rawScale: item.rawScale,
                        defaultPrice: item.defaultPrice,
                        priceScale: item.priceScale
                    })
                    this._changeGoodsItemVal({attr: 'specDetailList', val: this.specData})
                }
                else {
                    this.choosedSpec = '0'
                    this.$Message.error('请先填写单价')
                }
            },
            changeDefinedPrice(specDetailId, val){
                let index = -1
                for (let i = 0; i < this.specData.length; i++) {
                    if (this.specData[i].isValid && this.specData[i].specDetailId === specDetailId) {
                        index = i
                    }
                }
                this.specData[index].definedPrice = (val[0] == 0 && !isNaN(val) && val[1] != '.') ? parseInt(val) : val
                this._changeGoodsItemVal({attr: 'specDetailList', val: this.specData})
            },
            removeItem(specDetailId){
                let index = -1
                for (let i = 0; i < this.specData.length; i++) {
                    if (this.specData[i].isValid && this.specData[i].specDetailId === specDetailId) {
                        index = i
                    }
                }
                this.specData[index].isValid = 0
                this.choosedSpec = ''
                this._changeGoodsItemVal({attr: 'specDetailList', val: this.specData})
            },
            addMethods(){
                this.showMethodSelect && (this.choosedMethods = '')
                this.showMethodSelect = !this.showMethodSelect
            },
            changeMethods(makeId){
                if (!makeId) {
                    return
                }
                let item = this.makeList.filter(item => item.id === makeId)[0]
                let arr = []
                this.methodsData.forEach(item => {
                    if (item.isValid === 1) {
                        arr.push(item.makeId)
                    }
                })
                let index = arr.indexOf(makeId)
                if (index >= 0) {
                    this.$Message.error('请勿重复选择')
                    return
                }
                this.methodsData.push({
                    isValid: 1,
                    makeId: item.id || item.makeId,
                    makePrice: 0,
                    makePriceMode: 0,
                    name: item.name,
                    mode: '不加价'
                })
                this._changeGoodsItemVal({attr: 'makeList', val: this.methodsData})
            },
            removeMethodsItem(makeId){
                let index = -1
                for (let i = 0; i < this.methodsData.length; i++) {
                    if (this.methodsData[i].isValid && this.methodsData[i].makeId === makeId) {
                        index = i
                        console.log(index)
                    }
                }
                this.methodsData[index].isValid = 0
                this.choosedMethods = ''
                this._changeGoodsItemVal({attr: 'makeList', val: this.methodsData})
            },
            changeMakePrice(val, makeId){
                let index = -1
                for (let i = 0; i < this.methodsData.length; i++) {
                    if (this.methodsData[i].isValid && this.methodsData[i].makeId === makeId) {
                        index = i
                    }
                }
                this.methodsData[index].makePrice = (val[0] == 0 && !isNaN(val) && val[1] != '.' ) ? parseInt(val) : val
                this._changeGoodsItemVal({attr: 'makeList', val: this.methodsData})
            },
            changeMakePriceMode(makeId, val){
                let makePriceMode = this.addModel.indexOf(val)
                let index = -1
                for (let i = 0; i < this.methodsData.length; i++) {
                    if (this.methodsData[i].isValid && this.methodsData[i].makeId === makeId) {
                        index = i
                    }
                }
                if (val === '不加价') {
                    this.methodsData[index].makePrice = 0
                }
                this.methodsData[index].makePriceMode = makePriceMode
                this._changeGoodsItemVal({attr: 'makeList', val: this.methodsData})
            },
            checkMakeRule(val, makeId){
                let index = -1
                let value = val.toString().split('.')[1]
                for (let i = 0; i < this.methodsData.length; i++) {
                    if (this.methodsData[i].isValid && this.methodsData[i].makeId === makeId) {
                        index = i
                    }
                }
                if ((!val && val !== 0) || isNaN(val)) {
                    this.methodsData[index].makePrice = 0
                    this._changeGoodsItemVal({attr: 'makeList', val: this.methodsData})
                    return
                }
                if (value && value.length > 2) {
                    let toFixedVal = this.$ToFixed(val)
                    this.methodsData[index].makePrice = toFixedVal
                    this._changeGoodsItemVal({attr: 'makeList', val: this.methodsData})
                }
            },
            // 输入框不能超过2个小数
            checkCustomRule(specDetailId, value){
                let val = value.toString().split('.')[1]
                let index = -1
                for (let i = 0; i < this.specData.length; i++) {
                    if (this.specData[i].isValid && this.specData[i].specDetailId === specDetailId) {
                        index = i
                    }
                }
                if ((!value && value !== 0) || isNaN(value)) {
                    this.specData[index].definedPrice = 0
                    this._changeGoodsItemVal({attr: 'specDetailList', val: this.specData})
                    return
                }
                if (val && val.length > 2) {
                    let toFixedVal = this.$ToFixed(value)
                    this.specData[index].definedPrice = toFixedVal
                    this._changeGoodsItemVal({attr: 'specDetailList', val: this.specData})
                }
            }
        },
        components: {
            ButtonAdd
        },
    }
</script>
<style lang="scss" type="text/scss" scoped>
    .spec-wrapper {
        margin-left: 175px;

        .btn-add-spec, .btn-add-methods {
            margin-top: 0;
        }

        .add-spec-label {
            width: 200px;
        }

        /deep/ .ivu-input-number {
            width: 65px;
        }

        .ivu-form-item {
            margin-bottom: 10px;

            /deep/ label {
                padding-right: 18px;
            }
        }

        /deep/ .ivu-table-wrapper {
            width: 690px;
            margin-left: 40px;
            font-size: 12px;
            color: #333333;

            th {
                background: #f1f1f1;
                height: 30px;
            }

            td {
                background: white;
                height: 40px;
            }

            input {
                font-size: 12px;
                color: #5599FF;
                width: 64px;
                height: 20px;
            }
        }
    }

    .table-wrapper {
        width: 690px;
        margin-left: 40px;

        .table-title {
            width: 690px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #dddee1;
            background: #F1F1F1;
            overflow: hidden;

            li:first-child {
                padding-left: 20px;
            }

            li {
                width: 115px;
                float: left;
                color: #999;
            }
        }

        .table-body {
            width: 100%;

            .table-li {
                width: 100%;
                overflow: hidden;
                border: 1px solid #dddee1;
                border-top: none;

                & > div:first-child {
                    padding-left: 20px;
                }

                & > div {
                    width: 115px;
                    float: left;
                    box-sizing: border-box;
                    height: 40px;
                    line-height: 40px;
                }
            }
        }

        /deep/ input {
            line-height: 40px !important;
        }

        .custom-price-title {
            width: 95px !important;
        }

        .custom-price {
            margin-top: 5px;
            height: 30px !important;
            width: 75px !important;
            margin-right: 20px;
            line-height: 30px !important;
            /deep/ input {
                width: 64px;
            }
        }

        /deep/ input {
            height: 26px !important;
        }

        .delete {
            color: rgb(85, 153, 255);
            cursor: pointer;
            line-height: 40px;
        }
    }

    .methods-wrapper {
        padding-bottom: 0;
        margin-top: 20px;
        width: 690px;

        .table-title {
            width: 690px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #dddee1;
            background: #F1F1F1;
            overflow: hidden;
            margin-left: 40px;

            li:first-child {
                padding-left: 20px;
            }

            li {
                width: 170px;
                float: left;
                color: #999;
            }
        }

        .delete-methods {
            color: #5599ff;
            cursor: pointer;
            line-height: 40px;
        }

        .table-body {
            width: 100%;
            margin-left: 40px;

            .table-li {
                width: 100%;
                overflow: hidden;
                border: 1px solid #dddee1;
                border-top: none;

                & > div:first-child {
                    padding-left: 20px;
                }

                & > div {
                    width: 170px;
                    float: left;
                    box-sizing: border-box;
                    height: 40px;
                    line-height: 40px;
                }
            }
        }

        /deep/ .select {
            width: 120px !important;
            margin-right: 50px;
        }

        /deep/ input {
            width: 64px;
            margin-right: 30px;
        }

        .make-price {
            width: 170px !important;
        }
    }
</style>
