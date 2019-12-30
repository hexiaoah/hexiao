<!--付款方式 下发-->
<template>
    <div>
        <CrumbBar>
            <Crumb></Crumb>
        </CrumbBar>

        <div class="pay-publish">
            <BaseCard class="mb-20px">
                <BaseTitle>1.选择付款方式</BaseTitle>
                <BasePanel class="mt-20px">
                    <div slot="header">
                        <Checkbox @on-change="selectAllPayKind" :value="allSelected">全选</Checkbox>
                    </div>
                    <div slot="body">
                        <Row class="mt-10px">
                            <Col :md="6" class="block" v-for="(item,index) in allPayKindList" :key="index">
                            <BaseBlock :type="1">
                        <span slot="left">
                             <Checkbox @on-change="changeSelect(item)" :value="item.selected">{{item.name}}</Checkbox>
                        </span>
                                <span slot="right">{{item.remarkRight}}</span>
                            </BaseBlock>
                            </Col>
                        </Row>
                    </div>
                </BasePanel>
            </BaseCard>
            <BaseCard class="mb-20px">
                <BaseTitle>2.下发设置</BaseTitle>
                <!--一个表单-->
                <Form :label-width="80" inline :model="pageState" class="mt-20px">
                    <FormItem :label-width="182" label="下发任务名称">
                        <Input style="width:200px" type="text" v-model="pageState.distName" :maxlength="20">
                        </Input>
                        <Verify :need="pageState.need" type="1" :value="pageState.distName" :max="20"
                                @verify="verifyTaskName"></Verify>
                    </FormItem>
                    <br>
                    <FormItem :label-width="182" label="下发时间设置">
                        <Select style="width:200px" v-model="pageState.distType">
                            <!--<Option :value="1">定时下发</Option>-->
                            <!--<Option :value="2">立即下发</Option>-->
                            <Option v-for="item,index in publishTimeType" :value="item.type" :key="index">
                                {{item.name}}
                            </Option>
                        </Select>
                    </FormItem>
                    <div class="inline-block" v-show="showTimeSelect">
                        <FormItem label="开始日期" prop="date">
                            <DatePicker type="date" :options="dateOption"
                                        v-model="pageState.distDate"
                                        :clearable="false"
                                        format="yyyy-MM-dd"></DatePicker>
                        </FormItem>
                        <FormItem label="开始时间" prop="time">
                            <TimePicker type="time"
                                        v-model="pageState.distTime"
                                        format="HH:mm"
                                        :clearable="false"
                                        :steps="[0, 60]"></TimePicker>
                        </FormItem>
                    </div>
                    <br>
                </Form>

            </BaseCard>
            <BaseCard>
                <BaseTitle>3.下发门店</BaseTitle>
                <!--门店-->
                <!--门店操作栏-->
                <ButtonAdd class="pull-left mt-10px" @on-tap="showShopsModal">选择门店</ButtonAdd>
                <span class="pull-left mt-20px">已选择下列门店：共{{shopList.length}}家</span>
                <Button class="pull-right mt-10px" type="ghost" shape="circle" icon="trash-a" @click="clearAll">清空
                </Button>
                <div class="fl-clear"></div>
                <!--门店数-->
                <BaseBCard class="mt-10px">
                    <Row>
                        <Col :md="6" class="block" v-for="(item,index) in shopList" :key="index">
                        <SelectBlock :item="item" @on-tap="select" @on-cancel="delOne($event, index)" :key="index">
                        </SelectBlock>
                        </Col>
                    </Row>
                </BaseBCard>

            </BaseCard>

            <Tip>提示：下发完成后，请通知门店立即将数据更新。如门店同时在使用副收银，请确保主副收银版本一致，并将数据更新。</Tip>

            <ButtonHuge center class="mt-10px" @on-tap="submitDist">保存</ButtonHuge>
        </div>

        <ShopSelect v-if="pageState.showShopSelect"
                    @on-cancel="pageState.showShopSelect = false"
                    @on-ok="saveShops"></ShopSelect>
    </div>
</template>

<script>
    //    公用组件
    import BaseCard from '@/components/layout/base-card'
    import BaseBCard from '@/components/layout/base-borderCard'
    import BaseTitle from '@/components/layout/base-title'
    import BaseBlock from '@/components/layout/base-block'
    import BasePanel from '@/components/layout/base-panel'
    import ButtonAdd from '@/components/button/button-add'
    import ButtonHuge from '@/components/button/button-huge'
    import CrumbBar from '@/components/layout/crumb-bar'
    import Crumb from '@/components/layout/crumb'
    import SelectBlock from '@/components/layout/select-block'
    import ShopSelect from '@/components/shop-select/shop-select'
    import Tip from '@/components/tip/tip'
    import Verify from '@/components/verify/base-verify'


    //    日期工具类
    import DateFormat from '@2dfire/utils/date'

    //    vuex map方法
    import {mapGetters, mapActions} from "vuex";
    import Checkbox from "../../../../../node_modules/iview/src/components/checkbox/checkbox.vue";

    import distCenterModule from "@/store/modules/distCenter/index"
    import shopSelectModule from "@/store/modules/components/shop-select"
    import payKindModule from '@/store/modules/payKind'

    //    页面state
    let pageState = {
//        必填校验
        need: true,
        validTaskName: true,
//        是否展示门店选择模态框
        showShopSelect: false,
//        默认任务名称 次日日期+下发
        distName: DateFormat.dateFormat(new Date(Date.now() + 86400000), 'MM月dd日') + '下发',
//        下发类型 0：定时，1：立即
        distType: 0,
//        开始日期，不可早于今日
        distDate: DateFormat.dateFormat(new Date(Date.now() + 86400000), 'yyyy-MM-dd'),
//        下发时间，不可早于当前时间(提交时校验)
        distTime: '00:00',
    }

    //    表单验证
    let ruleValidate = {
        task: [
            {required: true, message: '必须输入下发任务名称', trigger: 'blur'}
        ]
    }

    export default {
        name: "payKindPublish",
        components: {
            Checkbox,
            BaseCard,
            BaseBCard,
            BasePanel,
            BaseTitle,
            BaseBlock,
            ButtonAdd,
            ButtonHuge,
            CrumbBar,
            Crumb,
            SelectBlock,
            ShopSelect,
            Tip,
            Verify
        },
        data() {
            return {
//                不可选日期 今日之前
                dateOption: {
                    disabledDate(date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },
                pageState,
                ruleValidate
            }
        },
        computed: {
//            获取store中的数据
            ...mapGetters({
                allPayKindList: "payKind/allPayKindList",
                publishTimeType: "distCenter/publishTimeType",
                shopList: 'shopSelect/shopList',
                allShops: "shopSelect/shops"
            }),
            selectedCount() {
                let s_count = 0;
                this.allPayKindList.map(item => {
                    if (item.selected) {
                        s_count++;
                    }
                })
                return s_count
            },
            allSelected() {
                let count = this.allPayKindList.length;
                let s_count = this.selectedCount;

                return count === s_count
            },
            showTimeSelect() {
                let self = this;
                return self.pageState.distType === 0
            },
//            选中的下发时间时间戳
            formatDateTime() {
                let self = this;
                let selectedDate = DateFormat.dateFormat(self.pageState.distDate, 'yyyy-MM-dd') + " " + self.pageState.distTime;
                return new Date(selectedDate).getTime()
            }
        },
        methods: {
//            获取action方法
            ...mapActions({

//                获取所有待下发的付款方式
                getAllPayKindList: "payKind/getAllPayKindList",
//                选择付款方式
                selectOne: 'payKind/selectOne',
                selectAll: 'payKind/selectAll',
//                门店选择
                cancelShop: 'shopSelect/cancelShop',
                clearShops: "shopSelect/clearShops",
                joinShop: 'shopSelect/joinShop',
                selectShop: 'shopSelect/selectShop',
                //                获取下发时间设置
                getPublishTimeType: "distCenter/getPublishTimeType",
                //                下发付款方式
                publishPayKind: "distCenter/publishPayKind",
            }),

            selectAllPayKind(e) {
                let self = this;
                self.selectAll(e);
            },

            verifyTaskName(e) {
                let self = this;
                self.pageState.validTaskName = e

            },

            verifyForm() {
//                验证下发任务名称
                let self = this;

                let errorCount = 0;

                if (self.selectedCount < 1) {
                    errorCount++;
                    self.$Message.info('请注意，您还未选择下发付款方式！')
                }

                if (!self.pageState.distName) {
                    errorCount++;

                    self.$Message.info('请注意，您还未输入下发任务名称！')
                }
//                如果选择定时下发，需要验证时间
                if (self.pageState.distType === 0) {
                    //                选中的下发时间-时间戳
                    let publish = self.formatDateTime;
                    //                当前时间-时间戳
                    let now = new Date().getTime();

                    console.log(publish, now);
                    if (publish < now) {
                        errorCount++;
                        self.$Message.info('请注意，您的定时下发时间不能早于当前时间！')
                    }
                }

                if (self.shopList.length < 1) {
                    errorCount++;

                    self.$Message.info('请注意，您还未选择下发门店！')
                }
                return (errorCount <= 0)
            },

//            保存门店选择组件内选择的门店
            saveShops() {
                let self = this;
                self.joinShop(self.allShops);
//                关闭模态框
                self.pageState.showShopSelect = false
            },
//            打开门店选择组件
            showShopsModal() {
                let self = this;
                self.pageState.showShopSelect = true;
            },
//            选中一个门店，使其变得可以删除
            select(item) {
                this.selectShop(item)
            },
//            删除一个选中的门店
            delOne(item, index) {
                this.cancelShop({item, index})
            },
//            选中一个付款方式，单选
            changeSelect(item) {
                this.selectOne(item)
            },
//            清楚所有选择的门店
            clearAll() {
                this.clearShops()
            },
//            提交下发设置
            submitDist() {
                let self = this;
                if (self.verifyForm()) {
//                    下发的付款方式
                    let payKindList = [];
                    self.allPayKindList.map(item =>{
                        if(item.selected) {
                            payKindList.push(item.moduleId)
                        }
                    })
//                    下发参数
                    let params = {
                        payKindList: payKindList,
                        name: self.pageState.distName,
                        publishTime: self.formatDateTime,
                        timeType: self.pageState.distType,
                        shops: self.shopList,
//                    不是下发中心到的重发

                        isRepublish: false
                    }

//                    调用下发中心下发函数
                    this.publishPayKind(params);
                }
            },

//            重置表单
            resetAll() {
                let self = this;
                self.pageState.need = true;
                self.pageState.validTaskName = true;
//        是否展示门店选择模态框
                self.pageState.showShopSelect = false;
//        默认任务名称 次日日期+下发
                self.pageState.distName = DateFormat.dateFormat(new Date(Date.now() + 86400000), 'MM月dd日') + '下发';
//        下发类型 0：定时，1：立即
                self.pageState.distType = 0;
//        开始日期，不可早于今日
                self.pageState.distDate = DateFormat.dateFormat(new Date(Date.now() + 86400000), 'yyyy-MM-dd');
//        下发时间，不可早于当前时间(提交时校验)
                self.pageState.distTime = '00:00';
//                清空已选择的门店
                self.clearShops()
            }

        },
        created() {
            let self = this;
            self.$store.dispatch("leftNav/setNav", 9);

//            进入时，重置表单
            self.resetAll()
//            获取所有支付类型
            this.getAllPayKindList();
//            获取下发时间类型
            this.getPublishTimeType();
        },
        beforeCreate() {
//            动态注册module
            let { distCenter={}, shopSelect={}, payKind={} } = this.$store.state

            if(Object.keys(distCenter).length <= 0) {
                this.$store.registerModule('distCenter', distCenterModule)
            }
            if(Object.keys(shopSelect).length <= 0) {
                this.$store.registerModule('shopSelect', shopSelectModule)
            }
            if(Object.keys(payKind).length <= 0) {
                this.$store.registerModule('payKind', payKindModule)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pay-publish {
        padding: 30px;
    }

    .block {
        margin-bottom: 5px;
        padding: 0 5px;
    }

    .inline-block {
        display: inline-block;
    }

    .pl-5px {
        padding-left: 5px;
    }
</style>
