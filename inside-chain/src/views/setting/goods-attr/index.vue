<!--商品属性-->
<template>
    <div>
        <BrandSelect></BrandSelect>

        <div class="goods-attr">
            <crumbBar class="mb-20px">
                <settingTabs></settingTabs>
            </crumbBar>

            <div class="chain-tabs" v-if="selectedBrand">
                <Tabs type="card" v-model="currentTab" :animated="false">

                    <TabPane name="spec" label="商品规格">
                        <attrSpec v-if="currentTab == 'spec'"></attrSpec>
                    </TabPane>
                    <TabPane name="prac" label="商品做法">
                        <attrPractice v-if="currentTab == 'prac'"></attrPractice>
                    </TabPane>
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
    import BrandSelect from '@/components/brand-select/brand-select'

    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from '@/components/layout/crumb'
    import settingTabs from "@/components/tabs/setting-tabs";
    import goodFeed from './components/good_attr_feed'
    import goodAttrRemark from './components/good_attr_remark'

    import attrSpec from './components/attr_spec'
    import attrUnit from "./components/attr_unit";
    import attrPractice from "./components/attr_practice";
    import goodsModule from "@/store/modules/goods/index"
    import brandSelectModule from "@/store/modules/components/brand-select"


    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
//                当前选中的tab的name
                currentTab: 'spec'
            }
        },
        computed: mapGetters({
            selectedBrand: "brandSelect/selected",
        }),
        methods: {},
        created() {
            let self = this;
            self.$store.dispatch("leftNav/setNav", 6);
        },
        components: {
            BrandSelect,
            crumbBar,
            Crumb,
            settingTabs,
            attrUnit,
            goodFeed,
            goodAttrRemark,
            attrSpec,
            attrPractice
        },
        beforeCreate() {
//            动态注册module
            let { goods={}, brandSelect={} } = this.$store.state

            if(Object.keys(goods).length <= 0) {
                this.$store.registerModule('goods', goodsModule)
            }
            if(Object.keys(brandSelect).length <= 0) {
                this.$store.registerModule('brandSelect', brandSelectModule)
            }
        }
    };
</script>
<style lang="scss" scoped>
    .goods-attr {
        padding: 30px;
    }
</style>
