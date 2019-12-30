<template>
    <div class="cashier-b clearfix">
        <Form :model="formItem" :label-width="175" :rules="ruleValidate" ref="formInline">
            <FormItem label="允许收银员在收银时打折">
                <i-switch v-model="formItem.isRatio !== 0" size="default"
                          @on-change="changeCashierSetVal('isRatio', $event)"></i-switch>
            </FormItem>
            <FormItem label="允许收银员在收银时修改价格">
                <i-switch v-model="formItem.isChangePrice !== 0" size="default"
                          @on-change="changeCashierSetVal('isChangePrice', $event)"></i-switch>
            </FormItem>
            <FormItem label="退菜时需要权限验证">
                <i-switch v-model="formItem.isBackAuth !== 0" size="default"
                          @on-change="changeCashierSetVal('isBackAuth', $event)"></i-switch>
            </FormItem>
            <FormItem label="可作为赠菜">
                <i-switch v-model="formItem.isGive !== 0" size="default"
                          @on-change="changeCashierSetVal('isGive', $event)"></i-switch>
            </FormItem>
            <FormItem label="加工耗时" class="mb-0" prop="consume">
                <Input placeholder="0" v-model="formItem.consume"
                       @on-change="changeCashierSetVal('consume', formItem.consume)"></Input>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from "vuex";
    export default {
        props: {
            checkForm: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                formItem: {
                    isRatio: 1,
                    isChangePrice: 0,
                    isBackAuth: 1,
                    isGive: 0,
                    consume: ''
                },
                ruleValidate: {
                    consume: [
                        {
                            required: true,
                            trigger: 'change',
                            validator(rule, val, callback){
                                if (val && val < 0) {
                                    callback('输入错误！至少输入1')
                                }
                                else if (val && (isNaN(val) || val < 0)) {
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
        computed: {
            ...mapGetters({
                goodsDetailToBackCashierSet: "setting/goodsDetailToBackCashierSet",
            })
        },
        watch: {
            goodsDetailToBackCashierSet(newval){
                let {isRatio, isChangePrice, isBackAuth, isGive, consume} = newval
                this.formItem = {
                    isRatio,
                    isChangePrice,
                    isBackAuth,
                    isGive,
                    consume
                }
            },
            checkForm(newval, oldval){
                if (newval !== oldval) {
                    this.$refs['formInline'].validate(valid => {
                        this.$emit('check-cashier-set', valid)
                    })
                }
            }
        },
        methods: {
            ...mapActions({
                _changeGoodsItemVal: 'setting/changeGoodsItemVal'
            }),
            changeCashierSetVal(type, val){
                let value = val
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
        width: 50%;
        float: left;
        padding-left: 42px;
        margin-bottom: 10px;

        /deep/ label {
            padding-right: 18px;
        }

        /deep/ input {
            width: 200px;
        }
    }
</style>
