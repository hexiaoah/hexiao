<template>
    <div class="cashier-b clearfix">
        <Form :model="showSet" :label-width="130"  ref="formInline" :rules="ruleValidate">
            <FormItem label="起点份数" class="order-num" prop="startNum">
                <Input v-model.number="showSet.startNum" @on-change="change('startNum', showSet.startNum)"></Input>
            </FormItem>
            <FormItem label="顾客堂食可点此套餐" class="show-in-category">
                <i-switch v-model="showSet.isReserve === 1" size="default" @on-change="change('isReserve', $event)"></i-switch>
            </FormItem>
            <FormItem label="顾客外卖可点此套餐" class="mt-10px">
                <i-switch v-model="showSet.isTakeout === 1" size="default" @on-change="change('isTakeout', $event)"></i-switch>
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
            }
        },
        data(){
            return {
                ruleValidate: {
                    startNum: [
                        {
                            required: true,
                            trigger: 'change',
                            validator(rule, val, callback){
                                if (isNaN(val) || val < 0) {
                                    callback('输入错误！至少输入0且不能为非数字')
                                }
                                else if (!val && val !== 0) {
                                    callback('必填项，不能为空')
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
                    ]
                }
            }
        },
        watch: {
            checkForm(newval, oldval){
                if(newval !== oldval){
                    this.$refs['formInline'].validate(valid => {
                        this.$emit('check-suit-show', valid)
                    })
                }
            }
        },
        computed: {
            ...mapGetters({
                showSet: "setting/suitDetailToBackShowSet",
            })
        },
        methods: {
            ...mapActions({
                _changeSuitBaseInfoVal: 'setting/changeSuitBaseInfoVal'
            }),
            change(type, val){
                let value = val
                if(Object.prototype.toString.call(val) === '[object Boolean]'){
                    value = Number(val)
                }
                this._changeSuitBaseInfoVal({attr: type, val: value})
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    .ivu-form-item {
        padding-left: 65px;
        margin-bottom: 0;

        /deep/ label {
            padding-right: 18px;
        }

        /deep/ input {
            width: 200px;
        }
    }

    .order-num, .show-in-category {
        width: 49.5%;
        display: inline-block;
    }

    .show-in-category {
        padding-left: 80px;
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
            margin-left: 90px !important;
        }
    }
</style>
