<template>
    <div>
        <!--<crumbBar>-->
            <!--<Crumb></Crumb>-->
        <!--</crumbBar>-->

        <div class="goods-lib-content">
            <!--<crumbBar class="mb-20px">-->
                <!--<Tabs></Tabs>-->
            <!--</crumbBar>-->

            <crumbBar class="mb-20px">
                <settingTabs :tab-data="tabData"></settingTabs>
            </crumbBar>

            <goods-manage :add-router-path="routerPath"
                          :edit-router-path="editRouterPath">
            </goods-manage>
        </div>
    </div>
</template>

<script>
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from '@/components/layout/crumb'
    import settingTabs from "@/components/tabs/third-tab"
    import emuGoodsTabs from "@/const/emu-goods-lib.js"
    import Tabs from "@/components/tabs/tabs"
    import GoodsManage from '@/components/table/goods-manage.vue'
    import settingModule from "@/store/modules/setting/index"
    import goodsModule from "@/store/modules/goods/index"
    import {mapActions} from 'vuex'
    export default {
        name: 'goods-library',
        data() {
            return {
                tabData: emuGoodsTabs
            }
        },
        computed: {
            routerPath(){
                let crumbName = this.$route.query["crumbName"] || ""
                let entityId = this.$route.query["entityId"] || ""
                return {path: "single_shop_goods_add", query: {crumbName, entityId}}
            },
            editRouterPath(){
                let crumbName = this.$route.query["crumbName"] || ""
                let entityId = this.$route.query["entityId"] || ""
                return {path: "single_shop_goods_edit", query: {crumbName, entityId}}
            }
        },
        created(){
//            this.setNav(2)
            this.$store.dispatch("leftNav/showShopNav", 3);

        },
        methods: {
            ...mapActions({
                setNav: "leftNav/setNav"
            }),
        },
        components: {
            crumbBar,
            Crumb,
            Tabs,
            settingTabs,
            GoodsManage
        },
        beforeCreate() {
//            动态注册module
            let { setting={}, goods={} } = this.$store.state

            if(Object.keys(goods).length <= 0) {
                this.$store.registerModule('goods', goodsModule)
            }
            if(Object.keys(setting).length <= 0) {
                this.$store.registerModule('setting', settingModule)
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    .goods-lib-content {
        padding: 30px 30px 180px;

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
</style>

