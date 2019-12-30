<template>
    <div class="shop-wrap">
        <crumbBar>
            <Crumb></Crumb>
        </crumbBar>
        <baseSteps :current="current"
                   class="mb-20px base-step">
            <baseStep>1.设置套餐基本信息</baseStep>
            <baseStep>2.设置套餐商品</baseStep>
            <baseStep>3.完成</baseStep>
        </baseSteps>
        <CardBlock title="基本信息" class="mb-20px">
            <!--<base-info :cate-gory-path="cateGoryPath"-->
                       <!--:check-form="isBaseInfoLegal"-->
                       <!--@check-base-info="checkBaseInfo"-->
                       <!--:type="'edit'">-->
            <!--</base-info>-->

            <Row>
                <Col :sm="24" :md="12">
                <base-info :cate-gory-path="cateGoryPath"
                           :check-form="isBaseInfoLegal"
                           @check-base-info="checkBaseInfo"
                           :type="'edit'">
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
        <CardBlock title="详情图和视频" class="mb-20px">
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
        <div class="fixed-save">

        <a href="javascript:void(0)" class="btn-next" @click="nextPath">
            下一步，设置套餐商品
        </a>
        </div>
    </div>
</template>

<script>
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from '@/components/layout/crumb'
    import CardBlock from '@/components/layout/card-block.vue'
    import baseStep from "@/components/step/base-step"
    import baseSteps from "@/components/step/base-steps"
    import BaseInfo from "@/components/suit-detail/base-info"
    import SuitImg from '@/components/suit-detail/suit-img'
    import DetailImg from "@/components/suit-detail/detail-img.vue"
    import CashierSet from "@/components/suit-detail/cashier-set"
    import SuitShow from "@/components/suit-detail/suit-show.vue"
    import settingModule from "@/store/modules/setting/index"
    import goodsModule from "@/store/modules/goods/index"
    import {mapActions, mapState} from "vuex"
    export default {
        name: "combo-base-info",
        data() {
            return {
                current: 1,
                /*校验表单*/
                isBaseInfoLegal: false,
                isSuitShowLegal: false,
                checkResult: {
                    baseInfo: false,
                    suitShow: false
                }
            };
        },
        created(){
            this.setNav(6)
            let query = this.$route.query
            let {plateEntityId, itemId} = query
            // 获取点菜单位下拉选项框
            let a = this._getOrderUnitSelectList()

            // 获取套餐分类
            let b = this._getCategoryList({
                isInclude: 1,
                plateEntityId: plateEntityId,
                opEntityId: ''
            })
            // 这里是一定要先获取到select，要不然就会出现选不中
            Promise.all([a, b]).then(data => {
                if(data[0] && data[1]){
                    this._getSuitBaseInfoDetail({
                        opEntityId: '',
                        plateEntityId: plateEntityId,
                        suitId: itemId
                    })
                }
            })
        },
        computed: {
            ...mapState({
                detailBaseInfoToBack(state){
                    return state.setting.common.suit.detailBaseInfoToBack
                }
            }),
            routerPath(){
                let plateEntityId = this.$route.query.plateEntityId
                let itemId = this.$route.query.itemId
                return {path: '/edit_set_combo_goods', query: {plateEntityId, itemId}}
            },
            cateGoryPath(){
                return {
                    path: '/goods_class',
                    query: {
                        plateEntityId: this.$route.query.plateEntityId
                    }
                }
            }
        },
        methods: {
            ...mapActions({
                setNav: "leftNav/setNav",
                _getCategoryList: 'setting/getCategoryList',
                _getSuitBaseInfoDetail: 'setting/getSuitBaseInfoDetail',
                _getOrderUnitSelectList: 'setting/getOrderUnitSelectList',
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
                    if (baseInfo && suitShow) {
                        let { plateEntityId } = this.$route.query
                        this.detailBaseInfoToBack.plateEntityId = plateEntityId
                        this.detailBaseInfoToBack.opEntityId = ''
                        this.detailBaseInfoToBack.mainPicture = this.detailBaseInfoToBack.mainPicture && this.detailBaseInfoToBack.mainPicture.filter(item => {
                                return (item.id || item.isValid)
                            })
                        this.detailBaseInfoToBack.detailImgList = this.detailBaseInfoToBack.detailImgList && this.detailBaseInfoToBack.detailImgList.filter(item => {
                                return (item.id || item.isValid)
                            })
                        this.detailBaseInfoToBack.callback = () => [
                            this.$router.push(this.routerPath)
                        ]
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
            baseStep,
            baseSteps,
            CardBlock,
            BaseInfo,
            SuitImg,
            DetailImg,
            CashierSet,
            SuitShow
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
    };
</script>

<style lang="scss" type="text/scss" scoped>
    .shop-wrap {
        padding-bottom: 70px;
    }
    .base-step {
        margin: 30px 30px 20px;
    }

    h2 {
        margin-left: 16px;
        margin-top: 20px;
        font-size: 18px;
        color: #3c4144;
        line-height: 25px;
    }

    p {
        display: inline-block;
        height: 17px;
        font-size: 12px;
        color: #333333;
        line-height: 17px;
        margin-right: 18px;
    }

    .blue {
        color: #5599ff;
    }

    span {
        font-size: 12px;
        line-height: 17px;
        margin: 0px 10px;
    }

    i {
        font-size: 12px;
        color: #3f3f3f;
        line-height: 17px;
    }

    .imgText {
        margin-right: 0;
        margin-top: 7px;
        float: left;
    }

    .bottom {
        width: 100%;
        text-align: center;
        button {
            width: 240px;
            height: 44px;
            margin-bottom: 50px;
        }
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

</style>
