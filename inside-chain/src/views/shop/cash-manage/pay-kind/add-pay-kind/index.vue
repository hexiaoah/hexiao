<!--付款方式 新建-->
<template>
    <div>
        <!--<CrumbBar>-->
            <!--<Crumb></Crumb>-->
        <!--</CrumbBar>-->

        <div class="pay-add">

            <!--<crumbBar class="mb-20px">-->
                <!--<Tabs></Tabs>-->
            <!--</crumbBar>-->

            <crumbBar class="mb-20px">
                <settingTabs :tab-data="tabData"></settingTabs>
            </crumbBar>

            <div class="forth-level">
                <Breadcrumb class="break">
                    <BreadcrumbItem :to="shopPayKindRoute">付款方式</BreadcrumbItem>
                    <BreadcrumbItem to="">添加</BreadcrumbItem>
                </Breadcrumb>
            </div>

            <BaseCard class="mt-20px">
                <Form ref="addPayKind" :model="newPayKind"
                      :rules="ruleValidate"
                      :label-width="pageState.labelWidth">
                    <FormItem label="支付类型" prop="kind">
                        <Select class="payKind-input" v-model="newPayKind.kind" placeholder="请选择">
                            <Option v-for="item in selectPayKind" v-model="item.kind" :key="item.kind">
                                {{item.kindName}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="付款方式名称" prop="name">
                        <Input class="payKind-input" v-model="newPayKind.name" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="是否计入实收" prop="isInclude">
                        <i-switch :true-value="1" :false-value="0" v-model="newPayKind.isInclude"></i-switch>
                        <Tip class="isInclude-tip">开关打开后，此付款方式的金额将会计入实收金额</Tip>
                    </FormItem>
                    <FormItem label="付款完成后自动打开钱箱" prop="isOpenCashDrawer">
                        <i-switch :true-value="1" :false-value="0" v-model="newPayKind.isOpenCashDrawer"></i-switch>
                    </FormItem>
                </Form>


                <div v-if="newPayKind.kind === 10">
                    <Form :label-width="pageState.labelWidth">
                        <FormItem label="代金券面额" prop="name">
                            <ButtonAdd class="add-btn" @on-tap="showAddCoupon">添加新面额</ButtonAdd>
                        </FormItem>
                    </Form>
                    <table class="goods-table coupon-table" v-show="couponList.length > 0">
                        <thead>
                        <tr>
                            <th>代金券面额</th>
                            <th>代金券售价</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item,index in couponList">
                            <td>{{item.worth | number}}</td>
                            <td>{{item.price | number}}</td>
                            <td><a class="table-button" @click="delCoupon(index)">删除</a></td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </BaseCard>
            <ButtonHuge center class="mt-25px" @on-tap="submitPayKind">保存</ButtonHuge>

        </div>

        <BaseModal header="添加新面额" :show="pageState.modalShow" @on-ok="saveCoupon" @on-cancel="cancelModal">
            <Form :label-width="180" ref="addCoupon" :model="couponInfo" :rules="couponValidate">
                <FormItem label="代金券面额" prop="worth">
                    <Input v-model="couponInfo.worth" class="payKind-input"></Input>
                </FormItem>
                <FormItem label="代金券售价" prop="price">
                    <Input v-model="couponInfo.price" class="payKind-input"></Input>
                </FormItem>
            </Form>
            <Tip class="modal-tip">提示：代金券售价小于面额时，使用此代金券支付时，两者的差价会计为账单的优惠金额。</Tip>
        </BaseModal>
    </div>
</template>
<script>
    import CrumbBar from '@/components/layout/crumb-bar'
    import Crumb from '@/components/layout/crumb'
    import BaseCard from '@/components/layout/base-card'
    import SettingTabs from '@/components/tabs/setting-tabs'
    import BaseModal from '@/components/modal/base-modal'
    import ButtonHuge from '@/components/button/button-huge'
    import ButtonAdd from '@/components/button/button-add'
    import Tip from '@/components/tip/tip'
    import Num from '@2dfire/utils/number'

    import settingTabs from "@/components/tabs/third-tab"
    import Tabs from "@/components/tabs/tabs"
    import emuGoodsTabs from "@/const/emu-cash-setting"

    import {mapGetters, mapActions} from "vuex";
    import payKindModule from '@/store/modules/payKind'

    let newPayKind = {
        kind: '',
        name: '',
        isInclude: 1,
        isOpenCashDrawer: 0,
    }

    let couponList = [];

    let couponInfo = {
        worth: '',
        price: ''
    };
    let pageState = {
        modalShow: false,
        labelWidth: 190
    };
    let pageParams = {
        opEntityId: ''
    }

    export default {
        data() {
            //            校验输入的金额，仅能输入 >0 并且<=1000000的数字，最多两位小数
            const validateNum = (rule, value, callback) => {
                let reg = new RegExp(/^[0-9]+(.[0-9]{1,2})?$/);

                if (value === '') {
                    callback(new Error('Please enter your password'));
                } else {
                    if (!reg.test(value)) {
                        callback(new Error('只能输入大于0的金额并且最多输入两位小数'));
                    } else if (value > 100000) {
                        callback(new Error('只能输入小于100,000的金额'));
                    }
                    callback();
                }
            };
            const validateRequired = (rule, value, callback) => {
                console.log('v', value)
                if (value === '') {
                    callback(new Error('请选择一个支付类型'));
                } else {
                    callback();
                }
            };
            return {
                newPayKind,
                ruleValidate: {
                    kind: [
                        {validator: validateRequired, trigger: 'change'}
                    ],
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                        {type: 'string', max: 20, message: '名称不能超过20个字', trigger: 'blur'}
                    ],
                },
                couponValidate: {
                    worth: [
                        {required: true, message: '请输入代金券面额', trigger: 'blur'},
                        {validator: validateNum, trigger: 'blur'}
                    ],
                    price: [
                        {required: true, message: '请输入代金券售价', trigger: 'blur'},
                        {validator: validateNum, trigger: 'blur'}
                    ],
                },
                couponList,
                couponInfo,
                pageState,
                pageParams,
                tabData: emuGoodsTabs
            }
        },
        components: {
            BaseCard,
            CrumbBar,
            Crumb,
            BaseModal,
            ButtonHuge,
            Tip,
            ButtonAdd,
            settingTabs,
            Tabs
        },
        computed: {
            ...mapGetters({
                selectPayKind: "payKind/selectPayKind"
            }),
            shopPayKindRoute() {
                let crumbName = this.$route.query.crumbName;
                let entityId = this.$route.query.entityId || "";
                return {path: 'shop_pay_kind_manage', query: {crumbName, entityId}}
            },
        },
        filters: {
            number: function (value) {
                return Num.numberFormat(value)
            }
        },
        methods: {
            ...mapActions({
                setLeftNav: "leftNav/setNav",
//                获取可新建的付款方式列表
                getPayKindListForSelect: "payKind/getPayKindListForSelect",
//                新增付款方式
                saveKindPay: "payKind/saveKindPay",
            }),
            showAddCoupon() {
                this.couponInfo.worth = '';
                this.couponInfo.price = '';
                this.pageState.modalShow = true
            },
            cancelModal() {
                this.$refs['addCoupon'].resetFields();

                this.pageState.modalShow = false
            },
            saveCoupon() {
                this.$refs['addCoupon'].validate((valid) => {
                    if (valid) {
                        if (parseFloat(this.couponInfo.price) > parseFloat(this.couponInfo.worth)) {
                            this.$Message.error('代金券售价不能大于面额');
                        } else {
                            console.log('this.couponInfo',this.couponInfo)
                            let newCoupon = Object.assign({}, this.couponInfo)
                            this.couponList.unshift(newCoupon)
                            this.cancelModal();
                        }
                    } else {
                        this.$Message.error('您的输入有误，请检查!');
                    }
                })
            },
            delCoupon(index) {
                let self =this;

                self.$Modal.confirm({
                    title: '请注意',
                    content: '代金券面额后不可恢复，确认要删除吗？',
//                    点击确定的操作
                    onOk: () => {
                        self.couponList.splice(index, 1)
                    },
//                    点击取消的操作
                    onCancel: () => {
                    }
                });
            },
//            提交付款方式并保存
            submitPayKind() {
                let self = this;
                self.$refs['addPayKind'].validate((valid) => {
                    if (valid) {
                        let params = {
                            opEntityId: self.pageParams.opEntityId,
                            query: {
                                crumbName: self.$route.query.crumbName,
                                entityId: self.$route.query.entityId,
                            }
                        }
                        console.log(params, self.newPayKind.kind)

                        if (self.newPayKind.kind === 10) {
                            if (self.couponList.length === 0) {
                                self.$Message.warning("至少添加一条新面额才能保存成功")
                            }
//                            代价券 满足条件 提交
                            else {
                                params.voucherForms = [];
                                self.couponList.map(item => {
                                    params.voucherForms.push({
                                        amount: item.worth,
                                        sellPrice: item.price,
                                        isValid: 1
                                    })
                                })
                                params.voucherForms = JSON.stringify(params.voucherForms)
                                console.log(params)
                                Object.assign(params, self.newPayKind)
                                self.saveKindPay(params);
                            }
                        }
//                        其他方式 满足条件 提交
                        else {
                            Object.assign(params, self.newPayKind)
                            params.voucherForms = JSON.stringify([])
                            self.saveKindPay(params);
                        }
                    }
                })
            },
            resetAll (){
                let self = this;
                self.newPayKind.kind= '';
                self.newPayKind.name= '';
                self.newPayKind.isInclude= 1;
                self.newPayKind.isOpenCashDrawer= 0;
                self.couponList = [];
            }
        },
        created() {
            let self = this;
            self.resetAll();
            self.pageParams.opEntityId = self.$route.query.entityId;
//            self.setLeftNav(2);
            this.$store.dispatch("leftNav/showShopNav", 5);

            self.getPayKindListForSelect();

        },
        beforeCreate() {
//            动态注册module
            let { payKind={} } = this.$store.state

            if(Object.keys(payKind).length <= 0) {
                this.$store.registerModule('payKind', payKindModule)
            }
        }
    };
</script>
<style lang="scss" scoped>
    .pay-add {
        padding: 30px;

        /deep/ .add-btn {
            margin: 0;
        }
    }

    .search-select {
        margin-left: 10px;
    }

    .search-input {
        width: 180px;
        margin-left: 10px;
    }

    .payKind-input {
        width: 200px;
    }

    .isInclude-tip {
        margin-top: -15px;
        margin-bottom: -40px;
    }

    .coupon-table {
        max-width: 690px;
        margin-left: 190px;
        margin-top: -10px;
    }

    .modal-tip {
        width: 300px;
        margin: -25px auto 0 auto;
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

</style>
