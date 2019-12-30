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

            <suit-manage :add-router-path="routerPath"
                         :edit-router-path="editRouterPath">
            </suit-manage>
        </div>
    </div>
</template>

<script>
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from '@/components/layout/crumb'
    import settingTabs from "@/components/tabs/third-tab"
    import emuGoodsTabs from "@/const/emu-goods-lib.js"
    import SuitManage from '@/components/table/suit-manage.vue'
    import Tabs from "@/components/tabs/tabs"
    import settingModule from "@/store/modules/setting/index"

    import {mapActions} from 'vuex'
    export default {
        name: '',
        data() {
            return {
                tabData: emuGoodsTabs
            }
        },
        computed: {
            routerPath(){
                let crumbName = this.$route.query["crumbName"] || ""
                let entityId = this.$route.query["entityId"] || ""
                return {path: "single_shop_suit_add_first_step", query: {crumbName, entityId}}
            },
            editRouterPath(){
                let crumbName = this.$route.query["crumbName"] || ""
                let entityId = this.$route.query["entityId"] || ""
                return {path: "single_suit_edit_first_step", query: {crumbName, entityId}}
            }
        },
        created(){
//            this.setNav(3)
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
            SuitManage
        },
        beforeCreate() {
//            动态注册module
            let {setting = {}, goods = {}} = this.$store.state
            if (Object.keys(setting).length <= 0) {
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

