<!--商品属性-->
<template>
    <div>
        <!--<crumbBar>-->
            <!--<Crumb></Crumb>-->
        <!--</crumbBar>-->

        <div class="goods-attr">
            <!--<crumbBar class="mb-20px">-->
                <!--<SecondTabs></SecondTabs>-->
            <!--</crumbBar>-->

            <crumbBar class="mb-20px">
                <settingTabs :tab-data="tabData"></settingTabs>
            </crumbBar>

            <div class="chain-tabs">
                <Tabs type="card" v-model="currentTab" :animated="false">

                    <TabPane name="spec" label="商品规格">
                        <attrSpec v-if="currentTab == 'spec'"></attrSpec>
                    </TabPane>
                    <TabPane name="prac" label="商品做法">
                        <attrPractice v-if="currentTab == 'prac'"></attrPractice>
                    </TabPane>
                    <!--连锁商品没有标签-->
                    <!--<TabPane label="商品标签">标签主料</TabPane>-->
                    <TabPane name="feed" label="商品加料">
                        <goodFeed v-if="currentTab == 'feed'"></goodFeed>
                    </TabPane>
                    <TabPane name="remark" label="商品备注">
                        <goodAttrRemark v-if="currentTab == 'remark'"></goodAttrRemark>
                    </TabPane>
                    <TabPane name="unit" label="商品单位">
                        <attrUnit v-if="currentTab == 'unit'"></attrUnit>
                    </TabPane>
                </Tabs>


            </div>
        </div>
    </div>
</template>
<script>
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from '@/components/layout/crumb'
    import settingTabs from "@/components/tabs/third-tab"
    import emuGoodsTabs from "@/const/emu-goods-lib.js"
    import SecondTabs from "@/components/tabs/tabs"

    import goodFeed from './good_attr_feed'
    import goodAttrRemark from './good_attr_remark'

    import attrSpec from './attr_spec'
    import attrUnit from "./attr_unit";
    import attrPractice from "./attr_practice";
    import goodsModule from "@/store/modules/goods/index"


    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
//                当前选中的tab的name
//                spec 规格
//                prac 做法
//                feed 加料
//                remark 备注
//                unit 单位
                currentTab: 'spec',
                tabData: emuGoodsTabs

            }
        },
        computed: mapGetters({}),
        methods: {},
        created() {
            let self = this;
//            self.$store.dispatch("leftNav/setNav", 2);
            this.$store.dispatch("leftNav/showShopNav", 3);

        },
        components: {
            crumbBar,
            Crumb,
            settingTabs,
            SecondTabs,
            attrUnit,
            goodFeed,
            goodAttrRemark,
            attrSpec,
            attrPractice
        },
        beforeCreate() {
//            动态注册module
            let { goods={} } = this.$store.state

            if(Object.keys(goods).length <= 0) {
                this.$store.registerModule('goods', goodsModule)
            }
        }
    };
</script>
<style lang="scss" scoped>
    .goods-attr {
        padding: 30px;
    }
</style>
