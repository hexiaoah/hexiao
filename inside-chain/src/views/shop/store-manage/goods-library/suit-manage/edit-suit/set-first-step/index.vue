<template>
    <div>
        <!--<crumbBar>-->
            <!--<Crumb></Crumb>-->
        <!--</crumbBar>-->
        <div class="content">
            <!--<crumbBar class="mb-20px second-level">-->
                <!--<Tabs></Tabs>-->
            <!--</crumbBar>-->

            <crumbBar class="mb-20px ">
                <settingTabs :tab-data="tabData"></settingTabs>
            </crumbBar>

            <div class="forth-level">
                <Breadcrumb class="break">
                    <BreadcrumbItem :to="suitManageRoute">套餐管理</BreadcrumbItem>
                    <BreadcrumbItem to="">编辑套餐</BreadcrumbItem>
                </Breadcrumb>
            </div>

            <div>
                <baseSteps :current="current"
                           class="mb-20px mt-20px base-step">
                    <baseStep>1.设置套餐基本信息</baseStep>
                    <baseStep>2.设置套餐商品</baseStep>
                    <baseStep>3.完成</baseStep>
                </baseSteps>
                <CardBlock title="基本信息" class="mb-20px">

                    <Row>
                        <Col :sm="24" :md="12">
                        <base-info :cate-gory-path="cateGoryPath"
                                   :check-form="isBaseInfoLegal"
                                   @check-base-info="checkBaseInfo">
                        </base-info>
                        </Col>
                        <Col :sm="24" :md="12" class="upload">
                        <!--<card-block title="商品主图" class="upload">-->
                        <!--<main-img></main-img>-->
                        <suit-img></suit-img>

                        <!--</card-block>-->
                        </Col>
                    </Row>
                </CardBlock>
                <!--<CardBlock title="套餐主图" class="mb-20px upload">-->
                    <!--<suit-img></suit-img>-->
                <!--</CardBlock>-->
                <CardBlock title="详情图和视频" class="mb-20px upload">
                    <detail-img></detail-img>
                </CardBlock>
                <CardBlock title="收银设置" class="mb-20px">
                    <cashier-set></cashier-set>
                </CardBlock>
                <CardBlock title="套餐展示设置" class="mb-20px">
                    <suit-show :check-form="isSuitShowLegal"
                               @check-suit-show="checkSuitShow">
                    </suit-show>
                </CardBlock>
                <CardBlock title="套餐状态" :sub-title="subTitle" class="mb-20px">
                    <suit-state></suit-state>
                </CardBlock>
                <div class="fixed-save">

                <a href="javascript:void(0)" class="btn-next" @click="nextPath">
                    下一步，设置套餐商品
                </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from '@/components/layout/crumb'
    import settingTabs from "@/components/tabs/third-tab"
    import Tabs from "@/components/tabs/tabs"
    import emuGoodsTabs from "@/const/emu-goods-lib.js"
    import CardBlock from '@/components/layout/card-block.vue'
    import baseStep from "@/components/step/base-step";
    import baseSteps from "@/components/step/base-steps";
    import BaseInfo from "@/components/suit-detail/base-info";
    import SuitImg from '@/components/suit-detail/suit-img'
    import DetailImg from "@/components/suit-detail/detail-img.vue";
    import CashierSet from "@/components/suit-detail/cashier-set";
    import SuitShow from "@/components/suit-detail/suit-show.vue";
    import SuitState from '@/components/suit-detail/suit-state.vue'
    import settingModule from "@/store/modules/setting/index"
    import goodsModule from "@/store/modules/goods/index"
    import {mapActions, mapState} from 'vuex'
    export default {
        data() {
            return {
                current: 1,
                tabData: emuGoodsTabs,
                /*校验表单*/
                isBaseInfoLegal: false,
                isSuitShowLegal: false,
                checkResult: {
                    baseInfo: false,
                    suitShow: false
                }
            }
        },
        computed: {
            ...mapState({
                detailBaseInfoToBack(state){
                    return state.setting.common.suit.detailBaseInfoToBack
                }
            }),
            subTitle(){
                if(!this.detailBaseInfoToBack.status){
                    return '下架套餐在收银设备上仍然显示并可点，在其他点菜设备（火小二、火服务生、微信点餐等）上不显示'
                }
                return '在所有可点单的设备上（包括火小二）显示'
            },
            routerPath(){
                let crumbName = this.$route.query.crumbName
                let entityId = this.$route.query["entityId"] || ""
                let itemId = this.$route.query["itemId"]
                return {path: 'single_suit_edit_second_step', query: {crumbName, entityId, itemId}}
            },
            suitManageRoute(){
                let crumbName = this.$route.query.crumbName
                let entityId = this.$route.query["entityId"] || ""
                return {path: 'shop_manage_library_suit_manage', query: {crumbName, entityId}}
            },
            cateGoryPath(){
                let opEntityId = this.$route.query.entityId
                let crumbName = this.$route.query.crumbName
                return {
                    path: '/single_shop_goods_class',
                    query: {
                        opEntityId,
                        crumbName
                    }
                }
            }
        },
        created() {
//            this.setNav(2)
            this.$store.dispatch("leftNav/showShopNav", 3);

            // 初始进来
            let query = this.$route.query
            let {entityId, itemId} = query
            // 获取点菜单位下拉选项框
            let a = this._getOrderUnitSelectList()

            // 获取套餐分类
            let b = this._getCategoryList({
                isInclude: 1,
                plateEntityId: '',
                opEntityId: entityId
            })

            Promise.all([a, b]).then(data => {
                if(data[0] && data[1]){
                    this._getSuitDetail({
                        opEntityId: entityId,
                        plateEntityId: '',
                        suitId: itemId
                    })
                }
            })
        },
        methods: {
            ...mapActions({
                setNav: "leftNav/setNav",
                _getCategoryList: 'setting/getCategoryList',
                _getOrderUnitSelectList: 'setting/getOrderUnitSelectList',
                _getSuitDetail: 'setting/getSuitBaseInfoDetail',
                _clearSuitBaseInfo: 'setting/clearSuitBaseInfo',
                _saveSuitBaseInfo: 'setting/saveSuitBaseInfo'
            }),
            checkBaseInfo(val){
                this.checkResult.baseInfo = val
            },
            checkSuitShow(val){
                this.checkResult.suitShow = val
            },
            nextPath(){
                this.isBaseInfoLegal = !this.isBaseInfoLegal
                this.isSuitShowLegal = !this.isSuitShowLegal
                this.$nextTick(() => {
                    let {baseInfo, suitShow} = this.checkResult
                    if(baseInfo && suitShow){
                        let entityId = this.$route.query.entityId
                        this.detailBaseInfoToBack.plateEntityId = ''
                        this.detailBaseInfoToBack.opEntityId = entityId
                        this.detailBaseInfoToBack.mainPicture = this.detailBaseInfoToBack.mainPicture && this.detailBaseInfoToBack.mainPicture.filter(item => {
                                return (item.id || item.isValid)
                            })
                        this.detailBaseInfoToBack.detailImgList = this.detailBaseInfoToBack.detailImgList && this.detailBaseInfoToBack.detailImgList.filter(item => {
                                return (item.id || item.isValid)
                            })
                        this.detailBaseInfoToBack.callback = () => {
                            this.$router.push(this.routerPath)
                        }
                        this._saveSuitBaseInfo(this.detailBaseInfoToBack)
                    }
                })
            }
        },
        // eslint-disable-next-line
        beforeRouteLeave(to, from, next){
            this._clearSuitBaseInfo()
            next()
        },
        components: {
            crumbBar,
            Crumb,
            settingTabs,
            Tabs,
            emuGoodsTabs,
            CardBlock,
            baseStep,
            baseSteps,
            BaseInfo,
            DetailImg,
            SuitImg,
            CashierSet,
            SuitShow,
            SuitState
        },
        beforeCreate() {
//            动态注册module
            let {setting = {}, goods = {}} = this.$store.state
            if (Object.keys(setting).length <= 0) {
                this.$store.registerModule('setting', settingModule)
            }
            if (Object.keys(goods).length <= 0) {
                this.$store.registerModule('goods', goodsModule)
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .content {
        padding: 30px 30px 50px;

        .third-level {
            min-height: auto;
            height: 50px;
            line-height: 50px;
            padding: 0 0 0 30px;

            .tab-wrap {
                padding: 0;
            }
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

        .card-wrapper {
            margin-left: 0;
            margin-right: 0;
        }

        .btn-next {
            background: #D83F3F;
            border-radius: 4px;
            display: block;
            text-align: center;
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: 0;

            position: absolute;
            width: 180px;
            height: 36px;
            line-height: 36px;
            left: 50%;
            margin-left: -90px;
        }
    }
</style>

