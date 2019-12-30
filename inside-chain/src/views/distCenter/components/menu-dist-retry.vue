<template>
    <div>
            <BaseCard class="mb-20px">
                <BaseTitle>1.选择菜单</BaseTitle>
                <Row class="mt-20px">
                    <Col :md="12" class="block">
                    <BaseBlock :type="1">
                        <span slot="left">
                            {{taskInfo.menuInfo.menuName}}
                        </span>
                        <span slot="right">
                            共{{taskInfo.menuInfo.menuCount}}个商品
                        </span>
                    </BaseBlock>
                    </Col>
                </Row>

            </BaseCard>
            <BaseCard class="mb-20px">
                <BaseTitle>2.下发设置</BaseTitle>
                <!--一个表单-->
                <Form :label-width="80" inline :model="pageState" class="mt-20px">
                    <FormItem :label-width="182" label="下发任务名称">
                        <Input style="width:200px" type="text" v-model="taskName" :maxlength="20">
                        </Input>
                        <Verify :need="pageState.need" type="1" :value="taskName" :max="20"
                                @verify="verifyTaskName"></Verify>
                    </FormItem>
                    <br>
                    <FormItem :label-width="182" label="下发时间设置">
                        <Select style="width:200px" v-model="timeType">
                            <Option v-for="item,index in publishTimeType" :value="item.type" :key="index">
                                {{item.name}}
                            </Option>
                        </Select>
                    </FormItem>
                    <div class="inline-block" v-show="timeType === 0">
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

                    <FormItem :label-width="182" label="下发方式">
                        <span>{{publishType}}</span>
                    </FormItem>
                </Form>

            </BaseCard>

        </div>

</template>

<script>
    import BaseCard from '@/components/layout/base-card'
    import BaseTitle from '@/components/layout/base-title'
    import BaseBlock from '@/components/layout/base-block'
    import Tip from '@/components/tip/tip'
    import Verify from '@/components/verify/base-verify'

    import DateFormat from '@2dfire/utils/date'

    import {mapGetters, mapActions} from "vuex";

    let pageParams = {
        taskId: ''
    }

    //    页面state
    let pageState = {
//        必填校验
        need: true,
        validTaskName: true,
//        选中的商品id
        menuId: '',
//        是否展示门店选择模态框
        showShopSelect: false,
//        默认任务名称 次日日期+下发
        distName: DateFormat.dateFormat(new Date(Date.now() + 86400000), 'MMdd') + '下发',
//        下发类型 0：定时，1：立即
        distType: 0,
//        开始日期，不可早于今日
        distDate: DateFormat.dateFormat(new Date(Date.now() + 86400000), 'yyyy-MM-dd'),
//        下发时间，不可早于当前时间(提交时校验)
        distTime: '00:00',
    }
    export default {
        name: "distHistory",
        data() {
            return {
                pageParams,
                pageState,
                dateOption: {
                    disabledDate(date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                }
            }
        },
        computed: {
            ...mapGetters({
                taskInfo: 'distCenter/taskInfo',
                publishTimeType: "distCenter/publishTimeType",
            }),

            taskName: {
                get () {
                    return this.taskInfo.name
                },
                set (value) {
                    this.setTaskName(value)
                }
            },

            timeType: {
                get () {
                    let self = this;
                    return self.taskInfo.timeType
                },
                set (value) {
                    this.setTimeType(value)
                }

            },
            publishCount() {
                let self = this;

                return self.taskInfo.chainPublishTaskContent.shopList.length || 0
            },
            publishType(){
                let self = this;
                return self.taskInfo.publishType === 1 ? "完全替换" : "合并覆盖"
            },
//            选中的下发时间时间戳
            formatDateTime() {
                let self = this;
                let selectedDate = DateFormat.dateFormat(self.pageState.distDate, 'yyyy-MM-dd') + " " + self.pageState.distTime;
                return new Date(selectedDate).getTime()
            }
        },
        components: {
            BaseCard,
            BaseTitle,
            BaseBlock,
            Verify,
            Tip
        },
        methods: {
            ...mapActions({
                publishMenu: "distCenter/publishMenu",
                setTaskName: "distCenter/setTaskName",
                setTimeType: "distCenter/setTimeType",
            }),

            verifyTaskName(e) {
                let self = this;
                self.pageState.validTaskName = e

            },

            verifyForm() {
//                验证下发任务名称
                let self = this;

                let errorCount = 0;

                if (!self.pageState.distName) {
                    errorCount++;

                    self.$Message.info('请注意，您还未输入下发任务名称！')
                }
//                如果选择定时下发，需要验证时间
                if (self.timeType === 0) {
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

                return (errorCount <= 0)
            },
//
//            重新下发
            submitDist(){
                let self = this;
//                设置下发的菜单id
                self.pageState.menuId = self.taskInfo.menuInfo.menuId;
                self.pageState.plateEntityId = self.taskInfo.plateEntityId;

                if (self.verifyForm()) {
                    let params = {
                        plateEntityId: self.pageState.plateEntityId, //ok
                        menuId: self.pageState.menuId, //ok
                        oldTaskId: self.pageParams.taskId, //ok

                        name: self.taskName, //ok
                        publishTime: self.formatDateTime,
                        timeType: self.timeType,
                        publishType: self.taskInfo.publishType, //ok
                        shops: self.taskInfo.chainPublishTaskContent.shopList //ok
                    }

                    this.publishMenu(params)
                }
            }
        },
        created() {
            let self = this;
            self.pageParams.taskId= self.$route.query.taskId;
        }
    }
</script>

<style lang="scss" scoped>

    .block {
        margin-bottom: 5px;
        padding: 0 5px;
    }

    .inline-block {
        display: inline-block;
    }
</style>
