<template>
    <div>
        <CrumbBar>
            <Crumb></Crumb>
        </CrumbBar>

        <div class="history-wrap">


            <!--下发菜单 重发-->
            <MenuRetry ref="chainMenu" v-if="showModule === 'chainMenu'"></MenuRetry>
            <!--下发付款方式 重发-->
            <PayRetry ref="payKind" v-if="showModule === 'payKind'"></PayRetry>
            <!--下发传菜方案 重发-->
            <PassRetry ref="pass" v-if="showModule === 'pass'"></PassRetry>

            <BaseCard>
                <BaseTitle>3.下发门店</BaseTitle>
                <!--门店-->

                <!--门店数-->
                <DistShop class="mt-25px" :type="taskInfo.status" :count="publishCount"></DistShop>

                <BaseBCard class="mt-15px">
                    <Row>
                        <Col :md="6" class="block" v-for="(item,index) in taskInfo.chainPublishTaskContent.shopList" :key="index">
                            <BaseBlock :type="2">
                                {{item.name}}
                            </BaseBlock>
                        </Col>
                    </Row>
                </BaseBCard>

            </BaseCard>
            <Tip>提示：下发完成后，请通知门店立即将数据更新。如门店同时在使用副收银，请确保主副收银版本一致，并将数据更新。</Tip>

            <ButtonHuge center class="mt-10px" @on-tap="submitRetry">保存</ButtonHuge>

        </div>

    </div>
</template>

<script>
    import CrumbBar from '@/components/layout/crumb-bar'
    import Crumb from '@/components/layout/crumb'
    import BaseCard from '@/components/layout/base-card'
    import BaseBCard from '@/components/layout/base-borderCard'
    import BaseTitle from '@/components/layout/base-title'
    import ButtonHuge from '@/components/button/button-huge'
    import BaseBlock from '@/components/layout/base-block'
    import Tip from '@/components/tip/tip'
    import Verify from '@/components/verify/base-verify'

//    下发模块类型
    import ModuleType from '@/const/emu-moduleType'

    import DistStatus from '../../components/dist-status'
    import DistShop from '../../components/dist-shop'
    import MenuRetry from '../../components/menu-dist-retry'
    import PayRetry from '../../components/pay-dist-retry'
    import PassRetry from '../../components/pass-dist-retry'

    import DateFormat from '@2dfire/utils/date'

    import {mapGetters, mapActions} from "vuex";

    import distCenterModule from "@/store/modules/distCenter/index"


    let pageParams = {
        taskId: ''
    }

    export default {
        name: "distHistory",
        data() {
            return {
                pageParams,
            }
        },
        computed: {
            ...mapGetters({
                taskInfo: 'distCenter/taskInfo',
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
            },
            showModule() {
                let self = this;
                return ModuleType[self.taskInfo.moduleType]
            }
        },
        components: {
            CrumbBar,
            Crumb,
            DistStatus,
            DistShop,
            BaseCard,
            BaseBCard,
            BaseTitle,
            BaseBlock,
            ButtonHuge,
            Verify,
            Tip,
            MenuRetry,
            PayRetry,
            PassRetry
        },
        methods: {
            ...mapActions({
                getPublishTimeType: "distCenter/getPublishTimeType",
                publishMenu: "distCenter/publishMenu",
                setTaskName: "distCenter/setTaskName",
                setTimeType: "distCenter/setTimeType",
                getTaskInfo: 'distCenter/getTaskInfo'
            }),

//            调用子组件重发
            submitRetry(){
                let self = this;
//                调用当前显示的子组件的重发
                self.$refs[self.showModule].submitDist();
            }
        },
        created() {
            let self = this;
            self.$store.dispatch("leftNav/setNav", 12);
            self.pageParams.taskId= self.$route.query.taskId;

            self.getTaskInfo(self.pageParams)

            //            获取下发时间类型
            self.getPublishTimeType();
        },
        beforeCreate() {
//            动态注册module
            let { distCenter={} } = this.$store.state

            if(Object.keys(distCenter).length <= 0) {
                this.$store.registerModule('distCenter', distCenterModule)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .history-wrap {
        padding: 30px;
    }

    .block {
        margin-bottom: 5px;
        padding: 0 5px;
    }

    .inline-block {
        display: inline-block;
    }
</style>
