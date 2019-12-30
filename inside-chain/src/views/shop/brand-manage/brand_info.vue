<template>
    <div>
        <crumbBar>
            <Crumb></Crumb>
        </crumbBar>
    <div class="shop-brand-info">
        <containerCard class="brand-wrap">
            <Row>
                <Col :md="12" :xs="24">
                <Row>
                    <Col span="24">
                    <inlineDesc :title="brand_form.brandName">{{brand_info.name}}</inlineDesc>
                    </Col>
                    <Col span="24">
                    <inlineDesc :title="brand_form.brandDate">{{brand_info.foundDate}}</inlineDesc>
                    </Col>
                    <Col span="24">
                    <inlineDesc :title="brand_form.brandMeal">
                        <div class="v-middle">
                            <grayLabel
                                v-if="brand_info.cooking.length > 0"
                                v-for="(item,index) in brand_info.cooking"
                                :key="index"
                                :name="item">
                            </grayLabel>
                            <span v-if="brand_info.cooking.length == 0">-</span>
                        </div>
                    </inlineDesc>
                    </Col>
                    <Col span="24">
                    <inlineDesc  :title="brand_form.brandType">{{brand_info.joinMode}}</inlineDesc>
                    </Col>
                </Row>
                </Col>
                <Col :md="12" :xs="24">
                <Row>
                    <Col span="24">
                    <inlineDesc  :title="brand_form.brandLogo">
                        <div class="v-middle">
                            <imgBox :src="brand_info.logo" class="brand-logo" name="LOGO"></imgBox>
                        </div>
                    </inlineDesc>
                    </Col>
                </Row>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <inlineDesc  :title="brand_form.brandIntro">{{brand_info.intro}}</inlineDesc>
                </Col>
            </Row>
        </containerCard>
    </div>
    </div>
</template>
<script>

    import containerCard from "@/components/layout/container-card";
    import inlineDesc from "@/components/inline/inline-desc";
    import imgBox from "@/components/img/img-box";
    import grayLabel from "@/components/label/gray-label";
    import Crumb from "@/components/layout/crumb";
    import crumbBar from "@/components/layout/crumb-bar";
    import Route from "@2dfire/utils/router";
    import { mapGetters } from "vuex";

    let brand_form = {
        brandName: '品牌名',
        brandLogo: '品牌LOGO',
        brandDate: '成立时间',
        brandMeal: '经营菜系',
        brandType: '连锁模式',
        brandIntro: '品牌简介',
    }

    export default {
        name: "shop_brand_info",
        data() {
          return {
              brand_form,
              params:{
                  entityId : '',
              },

          }
        },
        computed: mapGetters({
            brand_info: "shop/brand_info"
        }),
        components: {
            containerCard,
            inlineDesc,
            imgBox,
            grayLabel,
            Crumb,
            crumbBar
        },
        methods: {

        },
        created() {
//            设置侧边导航栏显示
            let self = this;
            self.params.entityId = Route.route.query["entityId"]
            self.$store.dispatch("leftNav/setNav", 3);
            self.$store.dispatch("shop/getBrandInfo", this.params);
        }
    };
</script>
<style lang="scss" scoped>
    .shop-brand-info {
        padding: 30px;
    }
    .brand-wrap{
        min-height: 700px;
    }

    .brand-logo {
        width: 160px;
        height: 160px;
    }

    .v-middle {
        margin-top: -7.5px;
        display: inline-block;
    }
</style>
