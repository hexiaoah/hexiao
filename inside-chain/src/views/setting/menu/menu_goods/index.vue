<!--菜单 商品-->
<template>
    <div>

        <BrandSelect></BrandSelect>

        <div class="menu-manage">
            <CrumbBar class="mb-20px">
                <SettingTabs></SettingTabs>
            </CrumbBar>

            <div v-show="selectedBrand">
                <BaseCard>

                    <!--菜单小导航-->
                    <MenuNav first="菜单管理" :second="menu.menuName" path="/menu_manage"></MenuNav>

                    <!--菜单内有商品时 展示-->
                    <GoodsList class="mt-20px"></GoodsList>
                    <!--<GoodsList v-if="noGoods > 0" class="mt-20px"></GoodsList>-->

                    <!--菜单内无商品时 且无筛选数据 展示-->
                    <div class="noMenuStatus" v-if="!noGoods && noSearchItems">
                        <NoMenu text="当前菜单内无商品，请添加菜单关联商品！"></NoMenu>
                        <MenuReuse :count="reuseMenuList.length" @on-tap="showReuse"></MenuReuse>
                    </div>

                    <!--菜单内无商品时 且有筛选数据 展示-->
                    <div class="noMenuStatus" v-show="!noGoods && !noSearchItems">
                        <NoMenu text="当前未搜索到相应商品！"></NoMenu>
                    </div>

                </BaseCard>

                <!--复用菜单 弹窗-->
                <BaseModal :show="pageState.modalShow" :header="pageState.modalTitle" okText="保存" @on-ok="ok"
                           @on-cancel="cancel">
                    <p>选择复用方案</p>
                    <table class="goods-table mt-10px">
                        <tr>
                            <th>菜单名称</th>
                            <th>菜单所含商品数量</th>
                            <th>菜单创建时间</th>
                        </tr>
                        <tr v-for="(item,index) in reuseMenuList" :key="index">
                            <td>
                                <Radio :value="item.checked" @on-change="checkMenu(item)">{{item.menuName}}</Radio>
                            </td>
                            <td>{{item.itemCnt}}</td>
                            <td>{{item.createTimeStr}}</td>
                        </tr>
                    </table>
                    <Tip>提示：菜单复用后，如有需要可根据实际情况对菜单商品及价格设置进行修改。</Tip>
                </BaseModal>
            </div>
        </div>
    </div>
</template>
<script>
    import BrandSelect from '@/components/brand-select/brand-select'
    import CrumbBar from '@/components/layout/crumb-bar'
    import Crumb from '@/components/layout/crumb'
    import ButtonBar from '@/components/button/button-bar'
    import BaseCard from '@/components/layout/base-card'
    import SettingTabs from '@/components/tabs/setting-tabs'
    import BaseModal from '@/components/modal/base-modal'
    import Verify from '@/components/verify/base-verify'
    import NoMenu from '@/components/no-data/no-menu'
    import MenuReuse from '../components/menu-reuse'
    import MenuNav from '../components/menu-nav'
    import Tip from '@/components/tip/tip'
    import GoodsList from '@/components/table/goods-menu'


    import {mapGetters, mapActions} from "vuex";
    import menuManageModule from "@/store/modules/menu/index"
    import brandSelectModule from '@/store/modules/components/brand-select'

    let form = {
        plateEntityId: '',
        menuId: '',
        typeId: '',
        goodsName: '',
        pageIndex: 1,

    }
    let pageState = {
        modalShow: false,
        modalTitle: '',
        verifyMenuName: true,
        verifyMenuRemark: true,
        need: false
    }

    let reuseMenu = {
        menuId: ''
    }

    let pageParams = {
        plateEntityId: '',
        menuId: ''
    }

    export default {
        data() {
            return {
                form,
                pageState,
                pageParams,
                reuseMenu
            }
        },
        components: {
            BaseCard,
            BaseModal,
            BrandSelect,
            ButtonBar,
            CrumbBar,
            Crumb,
            GoodsList,
            MenuReuse,
            MenuNav,
            NoMenu,
            SettingTabs,
            Verify,
            Tip
        },
        computed: {
            ...mapGetters({
                selectedBrand: "brandSelect/selected",
                menu: "menuManage/menuInfo",
                goodsOfMenuTotal: "menuManage/goodsOfMenuTotal",
                noSearchItems: "menuManage/noSearchItems",
                reuseMenuList: "menuManage/reuseMenuList"

            }),
            noGoods() {
                return !!this.goodsOfMenuTotal
            },
            verifySuccess() {
                let self = this;
                if (self.reuseMenu.menuId)
                    return true
                return false
            },
        },
        methods: {
            ...mapActions({
                setLeftNav: "leftNav/setNav",
                getReuseMenus: "menuManage/getReuseMenus",
                checkReuseMenus: "menuManage/checkReuseMenus",
                resetMenuChecked: "menuManage/resetMenuChecked",
                multiplexMenu: "menuManage/multiplexMenu",
                getMenuInfo: "menuManage/getMenuInfo",
                getGoodsByMenuId: 'menuManage/getGoodsByMenuId',
                getGoodsKindsByMenuId: 'menuManage/getGoodsKindsByMenuId',

            }),
//            下发
            dist() {
//                跳转到菜单下发页面
                let self = this;
                self.$router.push({
                    path: '/menu_dist',
                    query: self.$route.query
                });
            },
//            新建菜单
            showReuse() {
                let self = this;
                self.pageState.modalShow = true
                self.pageState.modalTitle = '菜单复用'
            },
//            弹窗关闭
            cancel() {
                let self = this;
                self.pageState.modalShow = false
                self.clearForm()
                self.resetMenuChecked()
            },
//            弹窗确定
            ok() {
                let self = this;

                if (self.verifySuccess) {

                    let params = {
                        menu: {
                            plateEntityId: self.$route.query.plateEntityId,
                            menuId: self.reuseMenu.menuId,
                            newMenuId: self.$route.query.menuId,
                        },
                        searchItems:{
                            plateEntityId: self.$route.query.plateEntityId,
                            menuId: self.$route.query.menuId,
                            kindId: '',
                            goodsName: '',
                            pageIndex: 1
                        }
                    }
                    self.multiplexMenu(params)
                    self.pageState.modalShow = false
                    self.resetMenuChecked()
                }
                else {
                    self.$Message.info('请先选择复用的菜单')
                }
            },
//            选择一个要复用的菜单
            checkMenu(item) {
                let self = this;
                self.reuseMenu.menuId = item.menuId
                self.checkReuseMenus(item)
            },
            clearForm() {
                let self = this;
                self.reuseMenu.menuId = ''
            },

//            菜单导入商品
            importGoods() {
                let self = this;
                self.$router.push({
                    path: '/menu_import',
                    query: self.$route.query
                });
            },
            initGoods() {
                let self = this;
                self.form.plateEntityId = self.$route.query.plateEntityId;
                self.form.menuId = self.$route.query.menuId;
                self.form.pageIndex = 1;
//                获取菜单商品
                self.getGoodsByMenuId(self.form)
//                获取菜单内商品分类
                self.getGoodsKindsByMenuId(self.form)

            },
        },
        created() {
            let self = this;
            self.pageParams.plateEntityId = self.$route.query.plateEntityId;
            self.pageParams.menuId = self.$route.query.menuId;

            self.setLeftNav(6);
//            获取可复用的菜单(同获取菜单)
            self.getReuseMenus(self.pageParams);
//            获取当前进入的菜单信息 for 菜单内小导航
            self.getMenuInfo();
//            初始化 菜单内商品管理页
            self.initGoods()
        },
        beforeCreate() {
//            动态注册module
            let { menuManage={}, brandSelect={} } = this.$store.state

            if(Object.keys(menuManage).length <= 0) {
                this.$store.registerModule('menuManage', menuManageModule)
            }
            if(Object.keys(brandSelect).length <= 0) {
                this.$store.registerModule('brandSelect', brandSelectModule)
            }
        }
    };
</script>
<style lang="scss" scoped>
    .menu-manage {
        padding: 30px;
    }

    .title-total {
        font-size: 14px;
        font-weight: 600;
        color: #3C4144;
    }
</style>
