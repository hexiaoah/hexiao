<!--商品分类-->
<template>
    <div>
        <!--<crumbBar>-->
            <!--<Crumb></Crumb>-->
        <!--</crumbBar>-->

        <div class="goods-class">
            <!--<crumbBar class="mb-20px">-->
                <!--<SecondTabs></SecondTabs>-->
            <!--</crumbBar>-->
            <crumbBar class="mb-20px">
                <thirdTabs  :tab-data="tabData"></thirdTabs>
            </crumbBar>
            <BaseCard>
                <goodClass></goodClass>
            </BaseCard>

        </div>
    </div>
</template>
<script>

    import baseModal from '@/components/modal/base-modal'
    import Verify from '@/components/verify/base-verify'
    import ButtonAdd from '@/components/button/button-add'
    import BaseCard from '@/components/layout/base-card'

    import goodClass from './good_class_module'
    import BrandSelect from '@/components/brand-select/brand-select'

    let pageState = {
        modalShow: false,

    }

    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from '@/components/layout/crumb'
    import settingTabs from "@/components/tabs/setting-tabs";

    import SecondTabs from "@/components/tabs/tabs"

    import thirdTabs from "@/components/tabs/third-tab"

    import emuGoodsTabs from "@/const/emu-goods-lib.js"

    import {mapGetters} from "vuex";
    import goodsModule from "@/store/modules/goods/index"

    export default {
        data() {
            return {
                pageState,
                tabData: emuGoodsTabs

            }
        },
        computed: mapGetters({
            shopsList: "shop/shops",
            shop_filter: "shop/shop_filter",
        }),
        methods: {

        },
        created() {
//            let self = this;
//            self.$store.dispatch("leftNav/setNav", 2);
            this.$store.dispatch("leftNav/showShopNav", 3);

        },
        components: {
            crumbBar,
            Crumb,
            thirdTabs,
            settingTabs,
            baseModal,
            Verify,
            ButtonAdd,
            goodClass,
            BrandSelect,
            BaseCard,
            SecondTabs
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
    .goods-class {
        padding: 30px;
    }

    .content {
        background: #ffffff;
        padding: 15px
    }
</style>
