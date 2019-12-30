<template>
    <div class="service-wrapper">
        <Form :label-width="80" class="service-fee">
            <FormItem label="收取服务费">
                <i-switch v-model="isShowService"
                          size="default"
                          @on-change="changeServiceFeeModeState">
                </i-switch>
            </FormItem>
            <div class="service-input-wrapper" v-show="isShowService">
                <Select v-model="serviceFeeMode"
                        placeholder="商品价格百分比"
                        @on-change="changeServiceFeeMode"
                        class="pull-left">
                    <Option :value="item.key"
                            :key="$index"
                            v-for="(item, $index) in serviceFeeList">
                        {{item.text}}
                    </Option>
                </Select>
                <Input v-model="serviceFee"
                       @on-change="changeServiceFee"
                       class="pull-left"
                       placeholder="设置金额">
                </Input>
                <div class="percentage" v-show="serviceFeeMode == 2">%</div>
            </div>
        </Form>

        <Form :label-width="150" class="sale-fee">
            <FormItem label="销售提成">
                <i-switch v-model="isDeductSale" size="default" @on-change="changeDeductState"></i-switch>
            </FormItem>
            <div class="sale-input-wrapper" v-show="isDeductSale">
                <Select v-model="deductKind"
                        placeholder="按比例"
                        @on-change="changeDeductKind"
                        class="pull-left">
                    <Option :value="item.key"
                            :key="$index"
                            v-for="(item, $index) in saleFeeList">
                        {{item.text}}
                    </Option>
                </Select>
                <Input v-model="deduct"
                       class="pull-left"
                       placeholder="设置金额"
                       @on-change="changeDeduct">
                </Input>
                <div class="percentage" v-show="deductKind == 2">%</div>
            </div>
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
            }
        },
        data () {
            return {
                isShowService: false,
                isDeductSale: false,
                serviceFeeMode: 0,
                serviceFee: 0,
                deductKind: 0,
                deduct: 0,
                serviceFeeList: [
                    {
                        key: 1,
                        text: '固定费用'
                    },
                    {
                        key: 2,
                        text: '商品价格百分比'
                    }
                ],
                saleFeeList: [
                    {
                        key: 2,
                        text: '按比例'
                    },
                    {
                        key: 3,
                        text: '按固定金额'
                    }
                ],
            }
        },
        computed: {
            ...mapGetters({
                goodsDetailFromBackServiceFee: "setting/goodsDetailFromBackServiceFee",
            }),
        },
        watch: {
            goodsDetailFromBackServiceFee(newval){
                let {deduct, deductKind, serviceFeeMode, serviceFee} = newval
                this.isShowService = serviceFeeMode > 0
                this.isDeductSale = deductKind > 0
                this.serviceFeeMode = serviceFeeMode
                this.deduct = deduct || 0
                this.deductKind = deductKind
                this.serviceFee = serviceFee || 0
            },
            checkForm(newval, oldval){
                if(newval !== oldval){
                    let isdeductlegal = false
                    let isserviceFeelegal = false
                    if (!this.deduct && this.deduct !== 0) {
                        isdeductlegal = false
                    }
                    else if (this.deductKind === 2 && Number(this.deduct) > 100) {
                        isdeductlegal = false
                    }
                    else if (this.deductKind === 3 && Number(this.deduct) > 100000) {
                        isdeductlegal = false
                    }
                    else{
                        isdeductlegal = true
                    }

                    if (!this.serviceFee && this.serviceFee !== 0) {
                        isserviceFeelegal = false
                    }
                    else if (this.serviceFeeMode === 2 && this.serviceFee > 100) {
                        isserviceFeelegal = false
                    }
                    else if (this.serviceFeeMode === 1 && this.serviceFee > 100000) {
                        isserviceFeelegal = false
                    }
                    else{
                        isserviceFeelegal = true
                    }

                    if(!isdeductlegal || !isserviceFeelegal){
                        this.$Message.error('服务费和提成输入框有误')
                    }
                    this.$emit('check-service-fee', (isdeductlegal && isserviceFeelegal))
                }
            }
        },
        methods: {
            ...mapActions({
                _changeGoodsItemVal: 'setting/changeGoodsItemVal'
            }),
            changeServiceFeeModeState(val){
                if (!!val) {
                    this.serviceFeeMode = 2
                    this._changeGoodsItemVal({attr: 'serviceFeeMode', val: 2})
                }
                else {
                    this.serviceFeeMode = 0
                    this.serviceFee = 0
                    this._changeGoodsItemVal({attr: 'serviceFeeMode', val: 0})
                }
            },
            changeServiceFeeMode(val){
                let value = !val ? 0 : val
                if (val === 2) {
                    if (this.serviceFee > 100) {
                        this.serviceFee = 100
                    }
                }
                this._changeGoodsItemVal({attr: 'serviceFeeMode', val: value})
                this._changeGoodsItemVal({attr: 'serviceFee', val: Number(this.serviceFee)})
            },
            changeServiceFee(){
                if (!this.serviceFee && this.serviceFee !== 0) {
                    this.$Message.error('必填项，不能为空')
                    return
                }
                if (this.serviceFeeMode === 2 && this.serviceFee > 100) {
                    this.$Message.error('输入错误！至多输入100')
                    return
                }
                if (this.serviceFeeMode === 1 && this.serviceFee > 100000) {
                    this.$Message.error('输入错误！至多输入100000')
                    return
                }
                this._changeGoodsItemVal({attr: 'serviceFee', val: Number(this.serviceFee)})
            },
            changeDeductState(val){
                if (!!val) {
                    this.deductKind = 2
                    this._changeGoodsItemVal({attr: 'deductKind', val: 2})
                }
                else {
                    this.deductKind = 0
                    this.deduct = 0
                    this._changeGoodsItemVal({attr: 'deductKind', val: 1})
                }
            },
            changeDeductKind(val){
                let value = !val ? 0 : val
                if (val === 2) {
                    if (this.deduct > 100) {
                        this.deduct = 100
                    }
                }
                this._changeGoodsItemVal({attr: 'deductKind', val: value})
                this._changeGoodsItemVal({attr: 'deduct', val: Number(this.deduct)})
            },
            changeDeduct(){
                if (!this.deduct && this.deduct !== 0) {
                    this.$Message.error('必填项，不能为空')
                    return
                }
                if (this.deductKind === 2 && Number(this.deduct) > 100) {
                    this.$Message.error('输入错误！至多输入100')
                    return
                }
                if (this.deductKind === 3 && Number(this.deduct) > 100000) {
                    this.$Message.error('输入错误！至多输入100000')
                    return
                }
                this._changeGoodsItemVal({attr: 'deduct', val: Number(this.deduct)})
            }
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>

    .service-wrapper {
        padding-left: 138px;
        overflow: hidden;

        .service-fee, .sale-fee {
            width: 50%;
            float: left;
        }

        .ivu-form-item {
            margin-bottom: 10px;

            /deep/ label {
                padding-right: 18px;
            }
        }

        /deep/ .ivu-select {
            width: 200px;
            margin-right: 10px;
            display: inline-block;
        }

        /deep/ .ivu-input-wrapper {
            width: 88px;
            display: inline-block;
        }
    }

    .service-input-wrapper {
        padding-left: 80px;
    }

    .sale-input-wrapper {
        padding-left: 150px;
    }

    .percentage {
        padding-top: 7px;
        margin-left: 5px;
    }
</style>
