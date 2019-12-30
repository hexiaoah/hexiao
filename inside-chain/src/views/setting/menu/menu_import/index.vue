<!--菜单 商品导入-->
<!--前端不校验套餐、子菜-->
<template>
    <div>
        <BrandSelect></BrandSelect>

        <div class="menu-import">

            <CrumbBar class="mb-20px">
                <SettingTabs></SettingTabs>
            </CrumbBar>

            <BaseCard>
                <MenuNav :first="menu.menuName" second="添加菜单商品" :path="menuPath"></MenuNav>
                <div class="mt-15px">
                    <MenuSelect
                        :goodsList="allSimpleItem"
                        :typeList="typeList"
                        title="选择商品"
                        @check-all="checkAll"
                        @check-one="checkOne"
                        @on-search="searchAllSimpleItem"
                    ></MenuSelect>

                    <VButtonGroup>
                        <Button class="block-btn"
                                type="primary"
                                @click="transForm"
                                :disabled="addCount"
                        >
                            添加
                            <Icon type="ios-arrow-right"></Icon>
                        </Button>

                        <Button class="block-btn"
                                type="ghost"
                                @click="removeGoods"
                                :disabled="removeCount"
                        >
                            <Icon type="ios-arrow-left"></Icon>
                            移除
                        </Button>
                    </VButtonGroup>

                    <MenuSelect
                        :goodsList="goodsOfMenuSimple"
                        :typeList="goodsKinds"
                        title="已添加的商品"
                        @check-all="checkAllResult"
                        @check-one="checkOneResult"
                        @on-search="searchResult"
                    ></MenuSelect>
                </div>
            </BaseCard>

            <Tip>提示：套餐内的商品，会跟随套餐一起被添加至菜单内。菜单内的套餐子商品，不可被单独移除。</Tip>

        </div>
    </div>
</template>
<script>
    import BaseCard from '@/components/layout/base-card'
    import BrandSelect from '@/components/brand-select/brand-select'
    import ButtonHuge from '@/components/button/button-huge'
    import CrumbBar from '@/components/layout/crumb-bar'
    import SettingTabs from '@/components/tabs/setting-tabs'
    import Tip from '@/components/tip/tip'
    import MenuNav from '../components/menu-nav'
    import MenuSelect from './components/menu-select'
    import VButtonGroup from './components/v-button-group'

    import {mapGetters, mapActions} from "vuex";
    import menuManageModule from "@/store/modules/menu/index"

    let pageParams = {
        menuId: '',
        plateEntityId: '',
        kindId: '',
        goodsName: ''
    }

    export default {
        data() {
            return {
                listStyle: {
                    width: '360px',
                    height: '410px'
                },
                menuPath: '',
                pageParams
            }
        },
        components: {
            BaseCard,
            BrandSelect,
            ButtonHuge,
            CrumbBar,
            SettingTabs,
            Tip,
            MenuNav,
            MenuSelect,
            VButtonGroup
        },
        computed: {
            ...mapGetters({
                typeList: "menuManage/typeList",
                goodsKinds: "menuManage/goodsKindsSingle",
                goodsOfMenuSimple: "menuManage/goodsOfMenuSimple",
                unSubmitGoods: "menuManage/unSubmitGoods",
                menu: "menuManage/menuInfo",
                resultBackup: "menuManage/resultBackup",
                allSimpleItem: "menuManage/allSimpleItem",
            }),
            addCount() {
                let count = 0;
                this.allSimpleItem.map(v => {
                    if (v.checked) {
                        count++
                    }
                })

                return count < 1
            },
            removeCount() {
                let count = 0;
                this.goodsOfMenuSimple.map(v => {
                    if (v.checked) {
                        count++
                    }
                })

                return count < 1
            },
        },
        methods: {
            ...mapActions({
                setLeftNav: "leftNav/setNav",
                getMenuInfo: "menuManage/getMenuInfo",
                kindMenuTree: "menuManage/kindMenuTree",
                submitGoods: "menuManage/submitGoods",
                checkAllGoods: "menuManage/checkAllGoods",
                checkOneGoods: "menuManage/checkOneGoods",
                checkAllResultGoods: "menuManage/checkAllResult",
                checkOneResultGoods: "menuManage/checkOneResult",
                removeResultGoods: "menuManage/removeResultGoods",
                listAllSimpleItem: "menuManage/listAllSimpleItem",
                getGoodsByMenuIdSimple: "menuManage/getGoodsByMenuIdSimple",
                getGoodsKindsByMenuIdSingle: "menuManage/getGoodsKindsByMenuIdSingle",
            }),
            searchAllSimpleItem(e) {
                let self = this;
                let params = {
                    plateEntityId: self.$route.query.plateEntityId,
                    name: e.name,
                    kindId: e.kindId
                }
                self.listAllSimpleItem(params)

            },
            removeGoods() {
//                return item.label
                let self = this;
                self.pageParams.delType = 1;
                this.removeResultGoods(self.pageParams)
            },
            checkAll(e) {
                this.checkAllGoods(e)
            },
            checkOne(e) {
                this.checkOneGoods(e)
            },
            checkAllResult(e) {
                this.checkAllResultGoods(e)
            },
            checkOneResult(e) {
                this.checkOneResultGoods(e)
            },
            transForm() {
                let self = this;

            // 直接提交选中的商品
                this.submitGoods(self.pageParams);
            },
            saveGoods() {
                let self = this;
                self.submitGoods(self.pageParams)
            },
            searchResult(e) {
                let params = e;
                let self = this;
                self.pageParams.goodsName = e.name;
                self.pageParams.kindId = e.kindId;
//                筛选结果
                this.getGoodsByMenuIdSimple(self.pageParams)


            }
        },
        created() {
            let self = this;
            self.pageParams.plateEntityId = self.$route.query.plateEntityId
            self.pageParams.menuId = self.$route.query.menuId
            self.menuPath = '/menu_goods?menuId=' + self.pageParams.menuId;
            self.getMenuInfo();

//            设置左侧导航栏
            self.setLeftNav(6);

//             获取所有商品、套餐简单列表
            self.listAllSimpleItem(self.pageParams);
//            获取商品、套餐分类
            self.kindMenuTree(self.pageParams)
//            获取已添加的商品/套餐
            self.getGoodsByMenuIdSimple(self.pageParams)

            self.getGoodsKindsByMenuIdSingle(self.pageParams)

        },
        beforeCreate() {
//            动态注册module
            let { menuManage={} } = this.$store.state

            if(Object.keys(menuManage).length <= 0) {
                this.$store.registerModule('menuManage', menuManageModule)
            }
        }
    };
</script>
<style lang="scss" scoped>
    .menu-import {
        padding: 30px;
    }

    .block-btn {
        display: block;
        margin: 10px auto;
    }

</style>
