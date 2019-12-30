<template>
    <div>
        <CrumbBar>
            <Crumb></Crumb>
        </CrumbBar>

        <!--  -->
        <div class="history-wrap">
            <BaseCard class="mb-20px">
                <!--下发状态-->
                <DistStatus
                    @cancel="cancelPublish"
                    @retry="retryPublish"
                    :canretry="taskInfo.chainPublishTaskContent.canRetry"
                    :type="taskInfo.status"
                    :datetime="publishDateTime"
                    :errormsg="publishError">
                </DistStatus>
            </BaseCard>

            <!--chainMenu 连锁菜单下发-->
            <MenuInfo :task-info="taskInfo" :task-setting="taskSetting" v-if="showModule === 'chainMenu'"></MenuInfo>
            <!--payKind 付款方式下发-->
            <PayInfo :task-info="taskInfo" :task-setting="taskSetting" v-if="showModule === 'payKind'"></PayInfo>
            <!--pass 连锁传菜方案下发-->
            <PassInfo :task-info="taskInfo" :task-setting="taskSetting" v-if="showModule === 'pass'"></PassInfo>

            <!--可通用的下发门店模块-->
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

            <Tip>{{publishTip}}</Tip>
        </div>

    </div>
</template>

<script>
    import CrumbBar from '@/components/layout/crumb-bar'
    import Crumb from '@/components/layout/crumb'
    import BaseCard from '@/components/layout/base-card'
    import BaseBCard from '@/components/layout/base-borderCard'
    import BaseTitle from '@/components/layout/base-title'
    import BaseBlock from '@/components/layout/base-block'
    import Tip from '@/components/tip/tip'

    import DistStatus from '../components/dist-status'
    import DistShop from '../components/dist-shop'

//    菜单下发详情
    import MenuInfo from '../components/menu-dist-info'
//    付款方式详情
    import PayInfo from '../components/pay-dist-info'
//    传菜方案详情
    import PassInfo from '../components/pass-dist-info'

    //    下发模块类型map
    import ModuleType from '@/const/emu-moduleType'

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
                taskInfo: 'distCenter/taskInfo'
            }),
            publishError() {
                return this.taskInfo.chainPublishTaskContent.failureReason || ''
            },
            publishDate(){
                let self = this;
                return DateFormat.dateFormat(new Date(self.taskInfo.publishStartTime),'yyyy-MM-dd')
            },
            publishTime(){
                let self = this;
                return DateFormat.dateFormat(new Date(self.taskInfo.publishStartTime),'hh:mm')
            },
            publishDateTime() {
              let self = this;
                return DateFormat.dateFormat(new Date(self.taskInfo.publishStartTime),'yyyy年MM月dd日 hh:mm')

            },
            publishCount() {
                let self = this;

                return self.taskInfo.chainPublishTaskContent.shopList.length || 0
            },
            timeType(){
                let self = this;
                return self.taskInfo.timeType === 1 ? "立即下发" : "定时下发"
            },
            publishType(){
                let self = this;
                return self.taskInfo.publishType === 1 ? "完全替换" : "合并覆盖"
            },
            publishTip(){
                let self = this;
                return self.taskInfo.status === 2 ? "提示：下发失败可点击重新下发，重新下发仅对失败的门店生效。若多次下发失败，请联系客服。" : "提示：下发完成后，请通知门店立即将数据更新。如门店同时在使用副收银，请确保主副收银版本一致，并将数据更新。"
            },
            taskSetting() {
                let self = this;

                let tmp = {
                    publishType: self.publishType,
                    timeType: self.timeType,
                    publishTime: self.publishTime,
                    publishDate: self.publishDate,
                }

                return tmp
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
            Tip,
            MenuInfo,
            PayInfo,
            PassInfo
        },
        methods: {
            ...mapActions({
                cancelTask: 'distCenter/cancelTask',
                getTaskInfo: 'distCenter/getTaskInfo'
            }),
//            取消下发
            cancelPublish(){
//                取消、确定
                let self = this;
                self.$Modal.confirm({
                    title: '请注意',
                    content: '下发任务即将开始，确定要取消本次下发任务吗？',
//                    点击确定的操作
                    onOk: () => {
                        self.cancelTask(self.pageParams)

                    },
//                    点击取消的操作
                    onCancel: () => {
                    }
                });
            },
//            重新下发
            retryPublish(){
                let self = this;
                self.$router.push({
                    path: '/dist_manage_retry',
                    query: self.$route.query
                })
            }
        },
        created() {
            let self = this;
            self.$store.dispatch("leftNav/setNav", 12);
            self.pageParams.taskId= self.$route.query.taskId;

            self.getTaskInfo(self.pageParams)
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
</style>
