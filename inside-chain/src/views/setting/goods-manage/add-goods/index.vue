<template>
    <div class="add-goods">
        <crumbBar>
            <Crumb></Crumb>
        </crumbBar>
        <div>
            <card-block title="基本信息">
                <Row>
                    <Col :sm="24" :md="12">
                    <base-info :kind-menu-list="allSelectList && allSelectList.kindMenuList"
                               :unit-list="allSelectList && allSelectList.unitList"
                               :check-form="isBaseInfoLegal"
                               @check-base-info="checkBaseInfo"
                               :type="'add'"
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
            <div class="fixed-save">
            <Button type="primary"
                    class="save-btn"
                    @click="save">
                保存
            </Button>
            </div>
        </div>
    </div>
</template>
<script>
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from '@/components/layout/crumb'
    import CardBlock from '@/components/layout/card-block.vue'
    import BaseInfo from '@/components/goods-detail/base-info.vue'
    import MainImg from '@/components/goods-detail/main-img.vue'
    import DishesWeight from '@/components/goods-detail/dishes-weight'
    import SpecMethods from '@/components/goods-detail/spec-methods.vue'
    import CashierSet from '@/components/goods-detail/cashier-set.vue'
    import ServiceFee from '@/components/goods-detail/service-fee.vue'
    import GoodsShow from '@/components/goods-detail/goods-show.vue'
    import DetailImg from '@/components/goods-detail/detail-img.vue'
    import settingModule from "@/store/modules/setting/index"
    import goodsModule from "@/store/modules/goods/index"

    import {mapState, mapActions} from "vuex"
    export default {
        data(){
            return {
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
        computed: {
            ...mapState({
                // 获取所有select的options值
                allSelectList(state){
                    return state.setting.common.goods.allSelectList
                },
                // 返回给后端的参数
                detailToBack(state){
                    return state.setting.common.goods.detailToBack
                }
            }),
            cateGoryPath(){
                return {
                    path: '/goods_class',
                    query: {
                        plateEntityId: this.$route.query.plateEntityId,
                    }
                }
            }
        },
        created(){
            this._clearGoodsDetail()
            let plateEntityId = this.$route.query.plateEntityId
            this.setNav(6)
            this._getGoodsSelectList({opEntityId: '', plateEntityId})
        },
        methods: {
            checkBaseInfo(val){
                this.checkResult.baseInfo = val
            },
            checkDetailImg(val){
                this.checkResult.detailImg = val
            },
            checkCashierSet(val){
                this.checkResult.cashierSet = val
            },
            checkGoodsShow(val){
                this.checkResult.goodsShow = val
            },
            checkServiceFee(val){
                this.checkResult.serviceFee = val
            },
            ...mapActions({
                setNav: "leftNav/setNav",
                _getGoodsSelectList: 'setting/getGoodsSelectList',
                _addGoodsItem: 'setting/addGoodsItem',
                _clearGoodsDetail: 'setting/clearGoodsDetailToBack'
            }),
            save(){
                this.isBaseInfoLegal = !this.isBaseInfoLegal
                this.isDetailFormLegal = !this.isDetailFormLegal
                this.isCashierSetLegal = !this.isCashierSetLegal
                this.isGoodsShowLegal = !this.isGoodsShowLegal
                this.isServiceFeeLegal = !this.isServiceFeeLegal
                this.$nextTick(() => {
                    let {baseInfo, detailImg, cashierSet, goodsShow, serviceFee} = this.checkResult
                    if (baseInfo && detailImg && cashierSet && goodsShow && serviceFee) {
                        let plateEntityId = this.$route.query.plateEntityId
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
                        obj.state && delete obj.state
                        obj.opEntityId = ''
                        obj.plateEntityId = plateEntityId
                        let self = this
                        obj.callback = function () {
                            self.$Message.success('新增成功')
                            setTimeout(() => {
                                self.$router.push({
                                    path: '/goods_manage',
                                    query: {
                                        plateEntityId
                                    }
                                })
                            }, 1000)
                        }
                        this._addGoodsItem(obj)
                    }
                })
            }
        },
        components: {
            crumbBar,
            Crumb,
            CardBlock,
            BaseInfo,
            MainImg,
            DishesWeight,
            SpecMethods,
            CashierSet,
            ServiceFee,
            GoodsShow,
            DetailImg
        },
        beforeCreate() {
//            动态注册module
            let { setting={},goods={} } = this.$store.state
            if(Object.keys(setting).length <= 0) {
                this.$store.registerModule('setting', settingModule)
            }
            if(Object.keys(goods).length <= 0) {
                this.$store.registerModule('goods', goodsModule)
            }
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>

    .add-goods {
        padding-bottom: 117px;

        .save-btn {
            position: absolute;
            width: 180px;
            height: 36px;
            left: 50%;
            margin-left: -90px;
        }
    }
</style>
