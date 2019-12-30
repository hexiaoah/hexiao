<!-- 下发中心 -->
<template>
    <div>

        <div class="dist-wrap">
            <CrumbBar class="mb-20px">
                <DistTabs></DistTabs>
            </CrumbBar>

            <BaseCard class="mb-20px">
                <InlineSearch label="任务状态">
                    <Select v-model="pageState.taskStatus">
                        <Option v-for="item in pageData.taskStatus" :value="item.value" :key="item.value">{{ item.name }}</Option>
                    </Select>
                </InlineSearch>
                <InlineSearch label="下发品牌">
                    <Select v-model="pageState.brandId">
                        <Option value="all">全部</Option>
                        <Option v-for="item in brandList" :value="item.entityId" :key="item.entityId" :disabled="!item.canManage">{{ item.name }}</Option>
                    </Select>
                </InlineSearch>
                <InlineSearch label="下发时间">
                    <Select v-model="pageState.date">
                        <Option v-for="item in pageData.taskDates" :value="item.value" :key="item.value">{{ item.name }}</Option>
                    </Select>
                </InlineSearch>
                <Button type="primary" @click="search">查询</Button>
                <!--新建下发暂时隐藏 zeqi 2018-05-22-->
                <!--<Button type="primary" class="pull-right" @click="create">新建下发</Button>-->
            </BaseCard>

            <BaseCard>
                <table class="goods-table mb-10px">
                    <tr>
                        <th>
                            下发任务名称
                        </th>
                        <th>
                            下发品牌
                        </th>
                        <th>
                            任务状态
                        </th>

                        <th>
                            下发门店
                        </th>
                        <th>
                            下发开始时间
                        </th>
                        <th>
                            操作
                        </th>
                    </tr>

                    <tr v-for="item in publishTaskList.tasks">
                        <td>{{item.name}}</td>
                        <td>{{item.plateName}}</td>
                        <td>
                            <TaskStatus :type="item.status"></TaskStatus>
                        </td>
                        <!--<td>{{item.typeShow}}</td>-->
                        <td>{{item.shopCount}}</td>
                        <td>{{item.publishStartTimeStr}}</td>
                        <td>
                            <a class="table-button" @click="goInfo(item)" :disabled="!item.pcCanView">查看详情</a>
                        </td>
                    </tr>
                </table>
                <div class="page-bar">
                    <Page :total="publishTaskList.total" :page-size="20" show-total :current="pageState.pageIndex" @on-change="change"></Page>
                </div>
            </BaseCard>

        </div>
    </div>
</template>
<script>
    import CrumbBar from '@/components/layout/crumb-bar'
    import BaseCard from '@/components/layout/base-card'
    import InlineSearch from '@/components/layout/inline-search'
    import DistTabs from "@/components/tabs/dist-tabs";
    import TaskStatus from "@/components/status/task-status";

    import distCenterModule from "@/store/modules/distCenter/index"

    import {mapGetters, mapActions} from "vuex";

    let pageState = {
        taskStatus: 10,
        date: 0,
        brandId: 'all',
        pageIndex: 1,
    }

    let pageData = {
//任务状态 -1:全部、0:等待下发、2:下发失败、3:下发成功
        taskStatus: [
            {
                name: '全部',
                value: 10
            },
            {
                name: '等待下发',
                value: 0
            },
//            {
//                name: '发布中',
//                value: 1
//            },
            {
                name: '下发失败',
                value: 2
            },
            {
                name: '下发成功',
                value: 3
            },

        ],
        taskDates: [
            {
                name: '全部',
                value: 0
            },
            {
                name: '近7天',
                value: 1
            },
            {
                name: '近30天',
                value: 2
            },
            {
                name: '近半年',
                value: 3
            },
            {
                name: '近一年',
                value: 4
            },
        ]
    }

    export default {
        components: {
            CrumbBar,
            DistTabs,
            BaseCard,
            InlineSearch,
            TaskStatus
        },

        data() {
            return {
                pageState,
                pageData
            }
        },
        computed: mapGetters({
            publishTaskList: "distCenter/publishTaskList",
            brandList: "distCenter/brandList",
        }),
        methods: {
//            ...mapActions({
//               getPublishTaskList: "distCenter/getPublishTaskList",
//               getAllBrands: "distCenter/getAllBrands",
//            }),
            ...mapActions("distCenter",[
                "getPublishTaskList",
                "getAllBrands",
            ]),
            // 按要求查找下发任务
            search() {
                let self = this;
                self.pageState.pageIndex = 1;
                this.getPublishTaskList(self.pageState)
            },
            goInfo(item){
                this.$router.push({
                    path: '/dist_manage_history',
                    query: {
                        taskId: item.id
                    }
                })
            },
            init(){
                let self = this;
                this.getPublishTaskList(self.pageState)
            },
//            分页跳转
            change(e){
                let self = this;
                self.pageState.pageIndex = e;
                self.getPublishTaskList(self.pageState)
            }
        },
        created() {
            this.$store.dispatch("leftNav/setNav", 12);
            this.getAllBrands();
            this.init();
        },
        beforeCreate() {
//            动态注册module
            let { distCenter={} } = this.$store.state

            if(Object.keys(distCenter).length <= 0) {
                this.$store.registerModule('distCenter', distCenterModule)
            }
        }
    };
</script>
<style lang="scss" scoped>
    .dist-wrap {
        padding: 30px;
    }
</style>
