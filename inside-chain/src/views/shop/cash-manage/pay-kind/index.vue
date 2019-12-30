<!--付款方式 管理-->
<template>
    <div>
        <!--<CrumbBar>-->
            <!--<Crumb></Crumb>-->
        <!--</CrumbBar>-->

        <div class="pay-manage">
            <!--<crumbBar class="mb-20px">-->
                <!--<Tabs></Tabs>-->
            <!--</crumbBar>-->

            <crumbBar class="mb-20px">
                <settingTabs :tab-data="tabData"></settingTabs>
            </crumbBar>
            <!-- 选择品牌后再展示内容 -->
            <BaseCard>
                <!--全部（x） 按钮1 按钮2-->
                <!--菜单-->
                <Row>
                    <Col :md="12">
                    <span class="title-total">全部({{payKindList.total}})</span>
                    <Select v-model="searchItems.kind" @on-change="search" class="search-select"
                            style="width: 100px;">
                        <Option value="-1">
                            全部分类
                        </Option>
                        <Option v-for="item in selectPayKind"  v-model="item.kind" :key="item.kind">{{item.kindName}}</Option>

                    </Select>
                    <Input v-model="searchItems.name"
                           class="search-input"
                           icon="ivu-icon ivu-icon-search"
                           @on-click="search"
                           @on-enter="search"
                           placeholder="付款方式名称">
                    </Input>
                    </Col>
                    <Col :md="12">
                    <ButtonBar>
                        <Button type="primary" @click="createPayKind">添加付款方式</Button>
                    </ButtonBar>
                    </Col>
                </Row>

                <table class="goods-table" v-if="noPayKind">
                    <thead>
                    <tr>
                        <th>付款方式名称</th>
                        <th>支付类型</th>
                        <th>是否计入实收</th>
                        <th>付款完成后自动打开钱箱</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in payKindList.list" :key="index + '_pk'">
                        <td>{{item.name}}<Tag color="primary" v-show="item.chain" class="chain-tag">连锁</Tag></td>
                        <td>{{item.kindName}}</td>
                        <td>{{item.isInclude | bool2CN}}</td>
                        <td>{{item.isOpenCashDrawer | bool2CN}}</td>
                        <td>
                            <button class="table-button" @click="editPayKind(item)">修改</button>
                            <!--1支付宝，9微信-->
                            <button class="table-button" @click="deletePayKind(item)" :disabled="item.thirdType === 1|| item.thirdType === 9">删除</button>
                        </td>
                    </tr>
                    </tbody>

                </table>
                <NoPayKind text="未添加付款方式" v-if="!noPayKind && !searched"></NoPayKind>
                <NoPayKind text="未搜索到相应付款方式" v-if="!noPayKind && searched"></NoPayKind>
            </BaseCard>

        </div>
    </div>
</template>
<script>
    import CrumbBar from '@/components/layout/crumb-bar'
    import Crumb from '@/components/layout/crumb'
    import ButtonBar from '@/components/button/button-bar'
    import BaseCard from '@/components/layout/base-card'
    import BaseModal from '@/components/modal/base-modal'
    import NoPayKind from '@/components/no-data/no-menu'

    import settingTabs from "@/components/tabs/third-tab"
    import Tabs from "@/components/tabs/tabs"
    import emuGoodsTabs from "@/const/emu-cash-setting"
    import Filters from "@/const/filter"

    import {mapGetters, mapActions} from "vuex";
    import shopSelectModule from "@/store/modules/components/shop-select"
    import payKindModule from '@/store/modules/payKind'
    let searchItems = {
        name: '',
        kind: '-1',
        opEntityId: ''
    }

    export default {
        data() {
            return {
                searchItems,
                tabData: emuGoodsTabs
            }
        },
        components: {
            BaseCard,
            ButtonBar,
            CrumbBar,
            Crumb,
            BaseModal,
            NoPayKind,
            settingTabs,
            Tabs
        },
        computed: {
            ...mapGetters({
                payKindList: "payKind/payKindListSingle",
                selectPayKind: "payKind/selectPayKind"
            }),
//            是否有pk
            noPayKind() {
                return this.payKindList.total > 0
            },
            searched() {
                let self = this;
                return self.searchItems.kind !=='-1' || self.searchItems.name !== ''
            }

        },
        filters: Filters,
        methods: {
            ...mapActions({
                setLeftNav: "leftNav/setNav",
//                删除菜单
                deletePayKindItem: "payKind/deletePayKind",
//                新建菜单
                createPayKind: "payKind/createPayKind",
//                编辑更新菜单信息
                updatePayKind: "payKind/updatePayKind",

//                获取付款方式、总数
                getPayKindList: "payKind/getPayKindList",
                //                获取筛选框内的分类列表
                getPayKindListForSelect: "payKind/getPayKindListForSelect",

            }),
            search(){
                let self = this;
                self.getPayKindList(self.searchItems)
            },
//            新建付款方式
            createPayKind() {
                let self = this;
                self.$router.push({
                    path: '/shop_pay_kind_add',
                    query: self.$route.query
                })
            },

//            编辑
            editPayKind(item) {
                let self = this;
                let query = self.$route.query;
                query.payKindId = item.id;
                self.$router.push({
                    path: '/shop_pay_kind_edit',
                    query: query
                });
            },
//            删除菜单
            deletePayKind(item) {
//  二次确认
                let self = this;
                let params = {
                    id: item.id,
                    opEntityId: self.searchItems.opEntityId,
                    searchItems: self.searchItems
                }
                self.$Modal.confirm({
                    title: '请注意',
                    content: '付款方式删除后不可恢复。确定需要立即删除吗？',
//                    点击确定的操作
                    onOk: () => {
                        self.deletePayKindItem(params)
                    },
//                    点击取消的操作
                    onCancel: () => {
                    }
                });

            },
//            初始化菜单列表
            initPayKinds() {
                let self = this;
                self.searchItems.opEntityId = self.$route.query.entityId
                self.search();
            }
        },
        created() {
            let self = this;
//            self.setLeftNav(2);
            this.$store.dispatch("leftNav/showShopNav", 5);

            self.initPayKinds();
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
    .pay-manage {
        padding: 30px;
        .third-level {
            min-height: auto;
            height: 50px;
            line-height: 50px;
            padding: 0 0 0 30px;

            .tab-wrap {
                padding: 0;
            }
        }
    }
    .title-total {
        font-weight: bold;
        font-size: 14px;
    }
    .search-select {
        margin-left: 10px;
    }
    .search-input {
        width: 180px;
        margin-left: 10px;
    }

    .chain-tag {
        background-color: #2d8cf0;
        padding: 0 4px;
        margin-left: 5px;
    }


</style>
