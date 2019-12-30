<template>
    <div class="cashier-b clearfix">
        <Form :model="formItem" ref="formInline" :label-width="140" :rules="ruleValidate">
            <FormItem label="起点份数" class="order-num" prop="startNum">
                <Input :max="20"
                       :min="1"
                       v-model="formItem.startNum"
                       @on-change="changeGoodsShowVal('startNum', formItem.startNum)">
                </Input>
            </FormItem>
            <FormItem label="此商品仅在套餐里显示" class="show-in-category">
                <i-switch v-model="formItem.mealOnly ===  1" size="default"
                          @on-change="changeGoodsShowVal('mealOnly', $event)"></i-switch>
            </FormItem>
            <FormItem label="最小累加单位" class="min" prop="stepLength">
                <Select v-model="formItem.stepLength"  @on-change="changeGoodsShowVal('stepLength', formItem.stepLength)">
                    <Option v-for="item in scope" :value="item" :key="item">{{ item }}</Option>
                </Select>
                <!--<span class="qusetion">什么是最小累计单位？</span>-->
            </FormItem>
            <FormItem label="顾客外卖可点此商品">
                <i-switch v-model="formItem.isTakeout === 1" size="default"
                          @on-change="changeGoodsShowVal('isTakeout', $event)"></i-switch>
            </FormItem>
            <FormItem label="请选择餐盒规格" class="spec" v-show="formItem.isTakeout === 1">
                <Select class="pull-left add-spec-label"
                        v-model="formItem.packingBoxName"
                        @on-change="changeGoodsShowVal('packingBoxName', $event)">
                    <Option v-for="(item, $index) in packingBoxList"
                            :value="item.packingBoxName"
                            :key="$index">
                        {{item.packingBoxName}}
                    </Option>
                </Select>
            </FormItem>
            <FormItem label="餐盒数量(个)" class="num" v-show="formItem.isTakeout === 1" prop="packingBoxNum">
                <Input v-model="formItem.packingBoxNum"
                       @on-change="changeGoodsShowVal('packingBoxNum', formItem.packingBoxNum)">
                </Input>
            </FormItem>
            <FormItem label="顾客堂食可点此商品" class="mb-0">
                <i-switch v-model="formItem.isReserve === 1" size="default"
                          @on-change="changeGoodsShowVal('isReserve', $event)">
                </i-switch>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from "vuex"
    export default {
        props: {
            checkForm: {
                type: Boolean,
                default: false
            },
            packingBoxList: {
                type: Array,
                default(){
                    return []
                }
            }
        },
        data () {
            return {
                formItem: {
                    startNum: 1,
                    mealOnly: 0,
                    stepLength: 1,
                    isTakeout: 1,
                    isReserve: 1,
                    packingBoxNum: 0,
                    packingBoxName: ''
                },
                ruleValidate: {
                    startNum: [
                        {
                            required: true,
                            trigger: 'change',
                            validator(rule, val, callback){
                                if (!val && val !== 0) {
                                    callback('必填项，不能为空')
                                }
                                else if (isNaN(val) || val < 0) {
                                    callback('输入错误！至少输入0且不能为非数字')
                                }
                                else if(Math.round(val) !== Number(val)){
                                    callback('起点份数不能输入小数')
                                }
                                else if (val > 20) {
                                    callback('输入错误！至多输入20')
                                }
                                else {
                                    callback()
                                }
                            }
                        }
                    ],
                    stepLength: [
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
                    packingBoxNum: [
                        {
                            required: true,
                            trigger: 'change',
                            validator(rule, val, callback){
                                if (!val && val !== 0) {
                                    callback('必填项，不能为空')
                                }
                                else if (isNaN(val) || val < 0) {
                                    callback('输入错误！至少输入0且不能为非数字')
                                }
                                else if(Math.round(val) !== Number(val)){
                                    callback('餐盒数量不能输入小数')
                                }
                                else if (val > 100) {
                                    callback('输入错误！至多输入100')
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
        computed: {
            ...mapGetters({
                goodsDetailToBackShowSetting: "setting/goodsDetailToBackShowSetting",
            }),
            scope(){
                let arr = []
                for(let i=1; i<21; i++){
                    arr.push(i)
                }
                return arr
            }
        },
        watch: {
            goodsDetailToBackShowSetting(newval){
                let {startNum, mealOnly, stepLength, isTakeout, isReserve, packingBoxNum, packingBoxName, packingBoxId} = newval
                this.formItem = {
                    startNum: startNum || 0,
                    mealOnly,
                    stepLength: stepLength || 1,
                    isTakeout: isTakeout,
                    isReserve,
                    packingBoxNum: packingBoxNum || 0,
                    packingBoxName,
                    packingBoxId
                }
            },
            checkForm(newval, oldval){
                if (newval !== oldval) {
                    this.$refs['formInline'].validate(valid => {
                        this.$emit('check-goods-show', valid)
                    })
                }
            }
        },
        methods: {
            ...mapActions({
                _changeGoodsItemVal: 'setting/changeGoodsItemVal'
            }),
            changeGoodsShowVal(type, val){
                let value = val
                if (type === 'isTakeout') {
                    this.formItem.isTakeout = Number(val)
                }
                if(type === 'packingBoxName'){
                    let item = this.packingBoxList.filter(item => item.packingBoxName === val)[0]
                    console.log(item)
                    this._changeGoodsItemVal({attr: 'packingBoxId', val: item.packingBoxId})
                }
                if (Object.prototype.toString.call(val) === '[object Boolean]') {
                    value = Number(val)
                }
                this._changeGoodsItemVal({attr: type, val: value})
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    .ivu-form-item {
        padding-left: 75px;
        margin-bottom: 15px;

        /deep/ label {
            padding-right: 18px;
        }

        /deep/ input {
            width: 200px;
        }
    }

    .order-num, .show-in-category {
        width: 49%;
        display: inline-block;

    }

    .show-in-category {
        padding-left: 87px;
    }

    .min {
        .ivu-input-wrapper {
            width: auto;
        }

        .qusetion {
            font-size: 12px;
            color: #5599FF;
            margin-left: 10px;
        }
    }

    .spec {
        display: inline-block;
        margin-right: 30px;
        margin-left: 100px;
    }

    .num {
        padding-left: 0;
        display: inline-block;

        /deep/ label {
            width: auto !important;
        }

        /deep/ .ivu-form-item-content {
            margin-left: 100px !important;
        }
    }

    /deep/ .ivu-select {
        width: 200px;
    }
</style>
