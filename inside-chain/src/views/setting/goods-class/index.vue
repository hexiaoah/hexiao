<!--商品分类-->
<template>
    <div>
        <BrandSelect></BrandSelect>

        <div class="goods-class">

            <crumbBar class="mb-20px">
                <settingTabs></settingTabs>
            </crumbBar>
            <BaseCard v-if="selectedBrand">
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

    import goodClass from './components/good_class_module'
    import BrandSelect from '@/components/brand-select/brand-select'
    import goodsModule from "@/store/modules/goods/index"

    let pageState = {
        modalShow: false,

    }

    let input = {
        value: ''
    }
    import crumbBar from '@/components/layout/crumb-bar'
    import Crumb from '@/components/layout/crumb'
    import settingTabs from "@/components/tabs/setting-tabs";

    import {mapGetters} from "vuex";
    import brandSelectModules from '@/store/modules/components/brand-select'


    export default {
        data() {
            return {
                pageState,
            }
        },
        computed: mapGetters({
            shopsList: "shop/shops",
            shop_filter: "shop/shop_filter",
            selectedBrand: "brandSelect/selected",
        }),
        methods: {

        },
        created() {
            let self = this;
            self.$store.dispatch("leftNav/setNav", 6);
        },
        components: {
            crumbBar,
            Crumb,
            settingTabs,
            baseModal,
            Verify,
            ButtonAdd,
            goodClass,
            BrandSelect,
            BaseCard
        },
        beforeCreate() {
//            动态注册module
            let { brandSelect={}, goods={} } = this.$store.state

            if(Object.keys(brandSelect).length <= 0) {
                this.$store.registerModule('brandSelect', brandSelectModules)
            }
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
