<template>
    <div>
        <div class="shop-wrap">
            <!--桌位/区域 内部tab导航-->
            <Tabs :list="list" class="mb-20px"></Tabs>

            <!--内部router页面-->
            <router-view></router-view>
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
    import Tabs from "./components/tabs";

    import shopModule from "@/store/modules/shop/index"

    // 工具方法引入
    import Route from '@2dfire/utils/router'

    let params = {
        entityId: '',
    }

    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                params,
                list: [
                    {name: '桌位管理', value: 'tableList', link: '/shop_table_manage/list'},
                    {name: '区域管理', value: 'areaList', link: '/shop_area_manage/list'},
                ]
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
            this.$store.dispatch("leftNav/showShopNav", 6);

            self.params.entityId = Route.route.query["entityId"];
            self.getShopInfo(self.params)
        },
        components: {
            Crumb, crumbBar, containerCard, inlineDesc, imgBox, Tabs
        },
        beforeCreate() {
//            动态注册module
            let {shop = {}} = this.$store.state

            if (Object.keys(shop).length <= 0) {
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
