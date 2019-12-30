<template>
    <div>
        <!--<crumbBar>-->
            <!--<Crumb></Crumb>-->
        <!--</crumbBar>-->

        <div class="shop-wrap">
            <!--<crumbBar class="mb-20px">-->
                <!--<Tabs></Tabs>-->
            <!--</crumbBar>-->
            <Row class="mb-20px">
                <Col :md="24">
                <containerCard title="基本资料">
                    <Row>
                        <Col :md="12">
                        <inlineDesc title="门店名称">{{shop_info.base_info.name}}</inlineDesc>
                        </Col>

                        <Col :md="12">
                        <inlineDesc title="经营类型">{{shop_info.base_info.type}}</inlineDesc>
                        </Col>

                        <Col :md="12">
                        <inlineDesc title="门店品牌">{{shop_info.base_info.brand}}</inlineDesc>
                        </Col>

                        <Col :md="12">
                        <inlineDesc title="门店经理">{{shop_info.base_info.manager}}</inlineDesc>
                        </Col>

                        <Col :md="12">
                        <inlineDesc title="门店编码">{{shop_info.base_info.code}}</inlineDesc>
                        </Col>
                        <Col :md="12">
                        <inlineDesc title="联系电话">{{shop_info.base_info.phone}}</inlineDesc>
                        </Col>

                        <Col :md="24">
                        <inlineDesc title="门店上级机构">
                            {{shop_info.base_info.organ}}
                        </inlineDesc>
                        </Col>

                    </Row>

                </containerCard>
                </Col>
            </Row>

            <Row class="mb-20px">
                <Col :md="24">
                <containerCard title="营业资料">
                    <Row>
                        <Col :md="12">
                        <inlineDesc title="营业时间">{{shop_info.business_info.open_date}}</inlineDesc>
                        </Col>

                        <Col :md="12">
                        <inlineDesc title="餐饮菜系">
                            <span v-for="item in shop_info.business_info.cooking">
                                {{item.name}}
                            </span>
                        </inlineDesc>
                        </Col>

                        <Col :md="12">
                        <inlineDesc title="门店地址">{{shop_info.business_info.address}}</inlineDesc>
                        </Col>

                        <Col :md="12">
                        <inlineDesc title="特色服务">
                            <span v-for="item in shop_info.business_info.service">
                            {{item.name}}
                            </span>
                        </inlineDesc>
                        </Col>

                        <Col :md="24">
                        <inlineDesc title="人均消费">{{shop_info.business_info.avgPrice}}</inlineDesc>
                        </Col>

                        <Col :md="24">
                        <inlineDesc title="店家简介">
                            {{shop_info.business_info.intro}}
                        </inlineDesc>
                        </Col>

                    </Row>
                </containerCard>
                </Col>
            </Row>

            <Row class="mb-20px">
                <Col :md="24">
                <containerCard title="门店相册">
                    <div class="shop-imgs">
                        <Row>
                            <Col :md="12" class="pr-10px">
                            <imgBox class="main-img" name="门头照/主图" :src="shop_info.shop_photo.main"></imgBox>
                            </Col>
                            <Col :md="12">
                            <Row>
                                <Col :xs="12" :md="12" class="pr-10px mb-10px">
                                <imgBox :src="shop_info.shop_photo.imgs[0]" class="extra-img" name="店铺图片1"></imgBox>
                                </Col>
                                <Col :xs="12" :md="12" class="pr-10px mb-10px">
                                <imgBox :src="shop_info.shop_photo.imgs[1]" class="extra-img" name="店铺图片2"></imgBox>
                                </Col>
                                <Col :xs="12" :md="12" class="pr-10px mb-10px">
                                <imgBox :src="shop_info.shop_photo.imgs[2]" class="extra-img" name="店铺图片3"></imgBox>
                                </Col>
                                <Col :xs="12" :md="12" class="pr-10px mb-10px">
                                <imgBox :src="shop_info.shop_photo.imgs[3]" class="extra-img" name="店铺图片4"></imgBox>
                                </Col>
                            </Row>
                            </Col>
                        </Row>
                    </div>
                </containerCard>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
    // 组件引入
    import containerCard from '@/components/layout/container-card'
    import inlineDesc from '@/components/inline/inline-desc'
    import imgBox from '@/components/img/img-box'
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from "@/components/layout/crumb";
    import Tabs from "@/components/tabs/tabs";

    import shopModule from "@/store/modules/shop/index"

    // 工具方法引入
    import Route from '@2dfire/utils/router'

    let params = {
        entityId: '',
    }

    import {mapGetters} from "vuex";

    export default {
        data(){
            return {
                params
            }
        },
        computed: mapGetters({
            shop_info: "shop/shop_info"
        }),
        methods: {
            getShopInfo(params) {
                let self = this;
                self.$store.dispatch("shop/getShopInfo", params);

            }

        },
        created() {
            let self = this;
//            self.$store.dispatch("leftNav/setNav", 2);
            this.$store.dispatch("leftNav/showShopNav", 2);

            self.params.entityId = Route.route.query["entityId"];
            self.getShopInfo(self.params)
        },
        components: {
            Crumb, crumbBar, containerCard, inlineDesc, imgBox, Tabs
        },
        beforeCreate() {
//            动态注册module
            let { shop={} } = this.$store.state

            if(Object.keys(shop).length <= 0) {
                this.$store.registerModule('shop', shopModule)
            }
        }
    };
</script>
<style lang="scss" scoped>
    .shop-wrap {
        padding: 30px;
    }

    .main-img {
        height: 325px;
    }

    .extra-img {
        height: 157.5px
    }

    .shop-imgs {
        padding: 15px 10px 10px 15px;
    }

</style>
