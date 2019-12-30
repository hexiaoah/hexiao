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
                    <BreadcrumbItem to="">修改</BreadcrumbItem>
                </Breadcrumb>
            </div>

            <BaseCard class="mt-20px">
                <Form ref="editPayKind" :model="editableInfo"
                      :rules="ruleValidate"
                      :label-width="pageState.labelWidth">
                    <FormItem label="支付类型" prop="kind">
                        <Select class="payKind-input" v-model="editableInfo.kind" placeholder="请选择" disabled>
                            <Option v-for="item in selectPayKind" v-model="item.kind" :key="item.kind">
                                {{item.kindName}}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem label="付款方式名称" prop="name">
                        <Input class="payKind-input" v-model="editableInfo.name" placeholder=""
                               :disabled="isSystem"></Input>
                    </FormItem>
                    <FormItem label="是否计入实收" prop="isInclude" v-show="!isSystem">
                        <i-switch :true-value="1" :false-value="0" v-model="editableInfo.isInclude"
                                  :disabled="isSystem"></i-switch>
                        <Tip class="isInclude-tip">开关打开后，此付款方式的金额将会计入实收金额</Tip>
                    </FormItem>
                    <FormItem label="付款完成后自动打开钱箱" prop="isOpenCashDrawer" v-show="!isSystem">
                        <i-switch :true-value="1" :false-value="0" v-model="editableInfo.isOpenCashDrawer"
                                  :disabled="isSystem"></i-switch>
                    </FormItem>

                    <!--直连店铺修改支付宝支付类型时显示-->
                    <FormItem label="支付宝扫码点餐时享受支付宝优惠" v-show="!isAlipayEdit.alipayIsOurAccount && editableInfo.thirdType === 1">
                        <i-switch v-model="isAlipayEdit.alipayIsEnjoyPreferential"></i-switch>
                        <Tip class="isInclude-tip">打开此开关，顾客端用支付宝扫码点餐时，既享受店家设置的优惠券、优惠活动等优惠，同时也享受店家在支付宝端（比如口碑）设置过的优惠。
                        </Tip>
                    </FormItem>
                </Form>


                <div v-show="showCouponList">
                    <Form :label-width="pageState.labelWidth">
                        <FormItem label="代金券面额" prop="name">
                            <ButtonAdd class="add-btn" @on-tap="showAddCoupon">添加新面额</ButtonAdd>
                        </FormItem>
                    </Form>
                    <table class="goods-table coupon-table" v-show="couponCount">
                        <thead>
                        <tr>
                            <th>代金券面额</th>
                            <th>代金券售价</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item,index in editableInfo.voucherVos" v-show="item.isValid !== 0">
                            <td>{{item.amount | number}}</td>
                            <td>{{item.sellPrice | number}}</td>
                            <td><a class="table-button" @click="delCoupon(item,index)">删除</a></td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </BaseCard>
            <ButtonHuge center class="mt-25px" @on-tap="submitPayKind" v-if="editableInfo.thirdType !== 1 &&editableInfo.thirdType !== 9 ">保存</ButtonHuge>
            <ButtonHuge center class="mt-25px" @on-tap="updateAlipay" v-if="editableInfo.thirdType">保存</ButtonHuge>

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
    import BaseModal from '@/components/modal/base-modal'
    import ButtonHuge from '@/components/button/button-huge'
    import ButtonAdd from '@/components/button/button-add'
    import Tip from '@/components/tip/tip'
    import Num from '@2dfire/utils/number'
    import Obj from '@2dfire/utils/object'


    import settingTabs from "@/components/tabs/third-tab"
    import Tabs from "@/components/tabs/tabs"
    import emuGoodsTabs from "@/const/emu-cash-setting"

    import {mapGetters, mapActions} from "vuex";
    import payKindModule from '@/store/modules/payKind'

    let couponInfo = {
        worth: '',
        price: ''
    };
    let pageState = {
        modalShow: false,
        labelWidth: 210,
        payKindId: ''
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
                payKindInfo: "payKind/payKindInfoSingle",
                selectPayKind: "payKind/selectPayKind",
                isAlipay: "payKind/isAlipay",
            }),
            editableInfo() {
                let self = this;
                return self.payKindInfo

            },
            showCouponList() {
                let self = this;
                return self.editableInfo.kind === 10
            },
            shopPayKindRoute() {
                let crumbName = this.$route.query.crumbName;
                let entityId = this.$route.query.entityId || "";
                return {path: 'shop_pay_kind_manage', query: {crumbName, entityId}}
            },
            isSystem() {
                let self = this;
                return self.payKindInfo.thirdType === 1 || self.payKindInfo.thirdType === 9
            },
            isAlipayEdit() {
                let self = this;
                return self.isAlipay
            },
            couponCount() {
                let self = this;
                let count = 0;
                if(self.editableInfo.voucherVos && self.editableInfo.voucherVos.length > 0){
                    self.editableInfo.voucherVos.map(item=>{
                        if(item.isValid){
                            count++
                        }
                    })
                }

                return count
            }
        },
        filters: {
            number: function (value) {
                return Num.numberFormat(value)
            }
        },
        methods: {
            ...mapActions({
                setLeftNav: "leftNav/setNav",
//                获取分类用下拉框
                getPayKindListForSelect: "payKind/getPayKindListForSelect",
//                新增付款方式
                saveKindPay: "payKind/saveKindPay",
                checkAlipayPayment: "payKind/checkAlipayPayment",
                getPayKindInfo: "payKind/getPayKindInfo",
                updateAlipayPayment: "payKind/updateAlipayPayment",
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
            useCouponCount() {
                let self = this;
                let count = 0;

                if (self.editableInfo.voucherVos && self.editableInfo.voucherVos.length > 0) {
                    self.editableInfo.voucherVos.map(item => {
                        if (item.isValid) {
                            count++;
                        }
                    })
                }
                return count
            },
            saveCoupon() {
                this.$refs['addCoupon'].validate((valid) => {
                    if (valid) {
                        if (parseFloat(this.couponInfo.price) > parseFloat(this.couponInfo.worth)) {
                            this.$Message.error('代金券售价不能大于面额');
                        } else {
                            console.log('this.couponInfo', this.couponInfo)
                            let newCoupon = {
                                amount: this.couponInfo.worth,
                                sellPrice: this.couponInfo.price,
                                isValid: 1
                            };
                            if (!this.editableInfo.voucherVos)
                                this.editableInfo.voucherVos = []
                            this.editableInfo.voucherVos.unshift(newCoupon)
                            this.cancelModal();
                        }
                    } else {
                        this.$Message.error('您的输入有误，请检查!');
                    }
                })

            },
            delCoupon(item, index) {
                //                删除
                let self = this;
                self.$Modal.confirm({
                    title: '请注意',
                    content: '代金券面额后不可恢复，确认要删除吗？',
//                    点击确定的操作
                    onOk: () => {
                        item.isValid = 0;
//                        已有代金券面额 将isValid设置为0
                        if (item.id) {
                            self.$set(self.editableInfo.voucherVos, index, item)
                        }
//                        新增代金券面额 直接移除
                        else {
                            self.editableInfo.voucherVos.splice(index, 1)
                        }
                    },
//                    点击取消的操作
                    onCancel: () => {
                    }
                });
            },
//            提交付款方式并保存
            submitPayKind() {
                let self = this;
                self.$refs['editPayKind'].validate((valid) => {
                    if (valid) {
                        let params = {
                            opEntityId: self.pageParams.opEntityId,
                            query: {
                                crumbName: self.$route.query.crumbName,
                                entityId: self.$route.query.entityId,
                            }
                        }
                        if (self.editableInfo.kind === 10) {
                            console.log('self.useCouponCount()', self.useCouponCount())
                            if (self.useCouponCount() < 1) {
                                self.$Message.warning("至少添加一条新面额才能保存成功")
                            }
//                            代价券 满足条件 提交
                            else {
                                params.voucherForms = JSON.stringify(self.editableInfo.voucherVos)
                                console.log(params)
                                Object.assign(params, self.editableInfo)
                                params.voucherVos = '';
                                self.saveKindPay(params);
                            }
                        }
//                        其他方式 满足条件 提交
                        else {
                            params.voucherVos = '';
                            Object.assign(params, self.editableInfo)
                            params.voucherForms = JSON.stringify([])
                            self.saveKindPay(params);
                        }
                    }
                })
            },
            initEdit() {
                let self = this;
                self.pageParams.opEntityId = self.$route.query.entityId;
                self.pageState.payKindId = self.$route.query.payKindId;
                let params = {
                    id: self.pageState.payKindId,
                    opEntityId: self.pageParams.opEntityId
                }
                self.getPayKindInfo(params)
                self.getPayKindListForSelect()
                self.checkAlipayPayment(params)

            },
            updateAlipay(){
                let self = this;
                let params = {
                    opEntityId: self.pageParams.opEntityId,
                    switchStr: self.isAlipayEdit.alipayIsEnjoyPreferential,
                    query: {
                        crumbName: self.$route.query.crumbName,
                        entityId: self.$route.query.entityId,
                    }
                }
                self.updateAlipayPayment(params)
            }
        },
        created() {
            let self = this;
//            self.setLeftNav(2);
            this.$store.dispatch("leftNav/showShopNav", 5);

            self.initEdit()
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
        margin-left: 210px;
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
