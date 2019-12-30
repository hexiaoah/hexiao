<template>
    <div>
        <!--<crumbBar>-->
        <!--<Crumb></Crumb>-->
        <!--</crumbBar>-->
        <div class="content">
            <!--<crumbBar class="mb-20px second-level">-->
            <!--<Tabs></Tabs>-->
            <!--</crumbBar>-->

            <crumbBar class="mb-20px">
                <settingTabs :tab-data="tabData"></settingTabs>
            </crumbBar>

            <div class="forth-level">
                <Breadcrumb class="break">
                    <BreadcrumbItem :to="goodsManageRoute">商品管理</BreadcrumbItem>
                    <BreadcrumbItem to="">编辑商品</BreadcrumbItem>
                </Breadcrumb>
            </div>

            <div>
                <card-block title="基本信息">
                    <Row>
                        <Col :sm="24" :md="12">
                        <base-info :kind-menu-list="allSelectList && allSelectList.kindMenuList"
                                   :unit-list="allSelectList && allSelectList.unitList"
                                   :check-form="isBaseInfoLegal"
                                   @check-base-info="checkBaseInfo"
                                   :type="'edit'"
                                   :cate-gory-path="cateGoryPath">
                        </base-info>
                        </Col>
                        <Col :sm="24" :md="12" class="upload">
                        <!--<card-block title="商品主图" class="upload">-->
                        <main-img></main-img>
                        <!--</card-block>-->
                        </Col>
                    </Row>
                </card-block>
                <!--<card-block title="商品主图" class="upload">-->
                <!--<main-img></main-img>-->
                <!--</card-block>-->
                <card-block title="规格和做法">
                    <spec-methods :make-list="allSelectList && allSelectList.makeList"
                                  :specDetailList="allSelectList && allSelectList.specDetailList">
                    </spec-methods>
                </card-block>
                <card-block title="菜肴份量">
                    <dishes-weight></dishes-weight>
                </card-block>
                <card-block title="收银设置">
                    <cashier-set :check-form="isCashierSetLegal"
                                 @check-cashier-set="checkCashierSet">
                    </cashier-set>
                </card-block>
                <card-block title="服务费和提成">
                    <service-fee :check-form="isServiceFeeLegal"
                                 @check-service-fee="checkServiceFee">
                    </service-fee>
                </card-block>
                <card-block title="商品展示设置">
                    <goods-show :packing-box-list="allSelectList && allSelectList.packingBoxList"
                                @check-goods-show="checkGoodsShow"
                                :check-form="isGoodsShowLegal">
                    </goods-show>
                </card-block>
                <card-block title="详情图和视频">
                    <detail-img :check-form="isDetailFormLegal" @check-detail-img="checkDetailImg"></detail-img>
                </card-block>
                <card-block title="商品状态" :sub-title="subTitle">
                    <goods-state></goods-state>
                </card-block>
                <div class="fixed-save">

                <Button type="primary"
                        class="save-btn"
                        @click="save">
                    保存
                </Button>
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
    import BaseInfo from '@/components/goods-detail/base-info.vue'
    import MainImg from '@/components/goods-detail/main-img.vue'
    import DishesWeight from '@/components/goods-detail/dishes-weight'
    import SpecMethods from '@/components/goods-detail/spec-methods.vue'
    import CashierSet from '@/components/goods-detail/cashier-set.vue'
    import ServiceFee from '@/components/goods-detail/service-fee.vue'
    import GoodsShow from '@/components/goods-detail/goods-show.vue'
    import GoodsState from '@/components/goods-detail/goods-state.vue'
    import DetailImg from '@/components/goods-detail/detail-img.vue'
    import settingModule from "@/store/modules/setting/index"
    import goodsModule from "@/store/modules/goods/index"
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
                tabData: emuGoodsTabs,
                /*检验表单*/
                isBaseInfoLegal: false,
                isDetailFormLegal: false,
                isCashierSetLegal: false,
                isGoodsShowLegal: false,
                isServiceFeeLegal: false,
                checkResult: {
                    baseInfo: false,
                    detailImg: false,
                    cashierSet: false,
                    goodsShow: false,
                    serviceFee: false
                }
            }
        },
        mounted() {
            this._clearGoodsDetail()
            let itemId = this.$route.query.itemId
            let opEntityId = this.$route.query.entityId
//            this.setNav(2)
            this.$store.dispatch("leftNav/showShopNav", 3);

            this._getGoodsSelectList({opEntityId, plateEntityId: '', itemId, type: 'edit'})
        },
        computed: {
            ...mapState({
                // 获取所有select的options值
                allSelectList(state) {
                    return state.setting.common.goods.allSelectList
                },
                // 返回给后端的参数
                detailToBack(state) {
                    return state.setting.common.goods.detailToBack
                }
            }),
            subTitle() {
                if (!this.detailToBack.state) {
                    return '下架商品在收银设备上仍然显示并可点，在其他点菜设备（火小二、火服务生、微信点餐等）上不显示'
                }
                return '在所有可点单的设备上（包括火小二）显示'
            },
            cateGoryPath() {
                let opEntityId = this.$route.query.entityId
                let crumbName = this.$route.query.crumbName
                return {
                    path: '/single_shop_goods_class',
                    query: {
                        opEntityId,
                        crumbName
                    }
                }
            },
            goodsManageRoute() {
                let crumbName = this.$route.query.crumbName
                let entityId = this.$route.query.entityId || ""
                return {path: 'shop_manage_library_goods_manage', query: {crumbName, entityId}}
            }
        },
        methods: {
            ...mapActions({
                setNav: "leftNav/setNav",
                _getGoodsSelectList: 'setting/getGoodsSelectList',
                _modifyGoodsItem: 'setting/modifyGoodsItem',
                _clearGoodsDetail: 'setting/clearGoodsDetailToBack'
            }),
            checkBaseInfo(val) {
                this.checkResult.baseInfo = val
            },
            checkDetailImg(val) {
                this.checkResult.detailImg = val
            },
            checkCashierSet(val) {
                this.checkResult.cashierSet = val
            },
            checkGoodsShow(val) {
                this.checkResult.goodsShow = val
            },
            checkServiceFee(val) {
                this.checkResult.serviceFee = val
            },
            save() {
                this.isBaseInfoLegal = !this.isBaseInfoLegal
                this.isDetailFormLegal = !this.isDetailFormLegal
                this.isCashierSetLegal = !this.isCashierSetLegal
                this.isGoodsShowLegal = !this.isGoodsShowLegal
                this.isServiceFeeLegal = !this.isServiceFeeLegal
                this.$nextTick(() => {
                    let {baseInfo, detailImg, cashierSet, goodsShow, serviceFee} = this.checkResult
                    if (baseInfo && detailImg && cashierSet && goodsShow && serviceFee) {
                        let crumbName = this.$route.query.crumbName
                        let entityId = this.$route.query["entityId"] || ""
                        let obj = JSON.parse(JSON.stringify(this.detailToBack))
                        // 取出掉后端不需要的参数，节省带宽
                        let {acridLevel, recommendLevel, specialTagId, mainIngredient, typeId} = obj.label || {}

                        //取消标签判断
                        // if (!typeId) {
                        //     this.$Message.error('请选择标签类型')
                        //     return
                        // }
                        obj.consume = Number(obj.consume)
                        obj.price = Number(obj.price)
                        obj.memberPrice = Number(obj.memberPrice)
                        // 计算labelInfo
                        if (mainIngredient && mainIngredient.length) {
                            let arr = []
                            for (let i = 0; i < mainIngredient.length; i++) {
                                arr.push(mainIngredient[i].fatherId + ',' + mainIngredient[i].labelId)
                            }
                            obj.label = {
                                acridLevel,
                                recommendLevel,
                                specialTagId,
                                labelInfo: String(typeId) + ';' + arr.join('|'),
                                tagSource: 1
                            }
                        }
                        else {
                            obj.label = {
                                acridLevel,
                                recommendLevel,
                                specialTagId,
                                labelInfo: String(typeId),
                                tagSource: 1
                            }
                        }
                        // 2选1
                        if (obj.specWeightList && obj.specWeightList.length) {
                            obj.weight && delete obj.weight
                        }
                        else {
                            delete obj.specWeightList
                        }
                        // 去掉多余的头部图片
                        if (obj.headPicList && obj.headPicList.length) {
                            let arr = obj.headPicList.filter(item => {
                                return item.isValid || item.menuDetailId
                            })
                            obj.headPicList = arr
                        }
                        // 去掉多余的详情图片
                        if (obj.detailPicList && obj.detailPicList.length) {
                            let arr = obj.detailPicList.filter(item => {
                                return item.isValid || item.menuDetailId
                            })
                            obj.detailPicList = arr
                        }
                        // 过滤做法
                        if (obj.makeList && obj.makeList.length) {
                            let arr = obj.makeList.filter(item => {
                                return item.isValid || item.menuMakeId
                            })
                            obj.makeList = arr
                        }
                        // 过滤规格
                        if (obj.specDetailList && obj.specDetailList.length) {
                            let arr = obj.specDetailList.filter(item => {
                                return item.isValid || item.menuSpecDetailId
                            })
                            obj.specDetailList = arr
                        }
                        obj.opEntityId = entityId
                        obj.plateEntityId = ''
                        let self = this
                        obj.callback = function () {
                            self.$Message.success('修改成功')
                            setTimeout(() => {
                                self.$router.push({
                                    path: 'shop_manage_library_goods_manage',
                                    query: {crumbName, entityId}
                                })
                            }, 1000)
                        }
                        this._modifyGoodsItem(obj)
                    }
                })
            }
        },
        components: {
            crumbBar,
            Crumb,
            settingTabs,
            Tabs,
            CardBlock,
            BaseInfo,
            MainImg,
            DishesWeight,
            SpecMethods,
            CashierSet,
            ServiceFee,
            GoodsShow,
            GoodsState,
            DetailImg
        },
        beforeCreate() {
//            动态注册module
            let {setting = {}, goods = {}} = this.$store.state

            if (Object.keys(goods).length <= 0) {
                this.$store.registerModule('goods', goodsModule)
            }
            if (Object.keys(setting).length <= 0) {
                this.$store.registerModule('setting', settingModule)
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

        .save-btn {
            position: absolute;
            width: 180px;
            height: 36px;
            left: 50%;
            margin-left: -90px;
        }
    }
</style>

