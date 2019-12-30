<!--菜单 管理-->
<template>
    <div>
        <BrandSelect></BrandSelect>

        <!--<CrumbBar>-->
        <!--<Crumb></Crumb>-->
        <!--</CrumbBar>-->

        <div class="menu-manage">
            <CrumbBar class="mb-20px">
                <SettingTabs></SettingTabs>
            </CrumbBar>

            <!-- 选择品牌后再展示内容 -->
            <BaseCard v-show="selectedBrand">
                <!--全部（x） 按钮1 按钮2-->
                <!--菜单-->
                <Row>
                    <Col :md="12">
                    <span class="title-total">全部({{allMenuList.total}})</span>
                    </Col>
                    <Col :md="12">
                    <ButtonBar>
                        <Button type="ghost" @click="dist" :disabled="!noMenuStatus">下发</Button>
                        <Button type="primary" @click="createNewMenu">创建菜单</Button>
                    </ButtonBar>
                    </Col>
                </Row>

                <table class="goods-table" v-if="noMenuStatus">
                    <thead>
                    <tr>
                        <th>菜单名称</th>
                        <th>菜单商品</th>
                        <th>最新操作</th>
                        <th>操作时间</th>
                        <th>操作人</th>
                        <th>备注</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, index) in allMenuList.menus" :key="index + '_menu'">
                        <td>
                            <span class="table-button" @click="showGoods(item)">
                            {{item.menuName}}
                            </span>
                        </td>
                        <td>
                            <button class="table-button" @click="showGoods(item)">{{item.itemCnt | showCount}}</button>
                        </td>
                        <td>{{item.opt}}</td>
                        <td>{{item.optTime}}</td>
                        <td>{{item.optName}}</td>
                        <td>{{item.remark | showRemark}}</td>
                        <td>
                            <button class="table-button" @click="editMenu(item)">修改</button>
                            <button class="table-button" @click="deleteMenu(item)">删除</button>
                        </td>
                    </tr>
                    </tbody>

                </table>

                <NoMenu text="当前没有菜单!" v-else></NoMenu>
            </BaseCard>
            <!--<BaseCard>-->
            <!--&lt;!&ndash;全部（x） 按钮1 按钮2&ndash;&gt;-->
            <!--&lt;!&ndash;菜单&ndash;&gt;-->

            <!--<NoMenu text="当前菜单内无商品，请添加菜单关联商品！"></NoMenu>-->

            <!--<MenuReuse :count="3"></MenuReuse>-->
            <!--</BaseCard>-->

            <BaseModal :show="pageState.modalShow" :header="pageState.modalTitle" okText="保存" @on-ok="ok"
                       @on-cancel="cancel">
                <Form :label-width="150">
                    <FormItem label="菜单名称">
                        <Input v-model="form.menuName" placeholder=""></Input>
                        <Verify :need="pageState.need" type="1" :value="form.menuName" :max="20"
                                @verify="verifyMenuName"></Verify>
                    </FormItem>
                    <FormItem label="菜单备注说明">
                        <Input type="textarea" :rows="4" v-model="form.menuRemark" placeholder="选填"
                               ></Input>
                        <Verify type="1" :value="form.menuRemark" :max="50"
                        @verify="verifyMenuRemark"></Verify>
                    </FormItem>
                    <!--<FormItem class="last-item" label="套餐内子菜价格不覆盖">-->
                        <!--<i-switch :true-value="1" :false-value="0" v-model="form.detailMenuPriceNotPublish"></i-switch>-->
                        <!--<p class="price-tip">如果子菜已下发过且在各门店价格不一致，之后下发套餐时为了避免子菜价格被全部覆盖成一致，可打开这个开关。</p>-->
                    <!--</FormItem>-->
                </Form>
            </BaseModal>

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
    import Tip from '@/components/tip/tip'
    import MenuImport from './menu_import/index.vue'

    import {mapGetters, mapActions} from "vuex";

    let form = {
        menuId: '',
        menuName: '',
        menuRemark: '',
        detailMenuPriceNotPublish: 0,
    }
    let pageState = {
        modalShow: false,
        modalTitle: '',
        modalType: 1,
        verifyMenuName: true,
        verifyMenuRemark: true,
        need: false
    }

    let pageParams = {
        plateEntityId: ''
    }

    import menuManageModule from "@/store/modules/menu/index"


    export default {
        data() {
            return {
                form,
                pageState,
                pageParams
            }
        },
        components: {
            BaseCard,
            ButtonBar,
            CrumbBar,
            Crumb,
            SettingTabs,
            Verify,
            BaseModal,
            NoMenu,
            BrandSelect,
            MenuImport,
            Tip
        },
        computed: {
            ...mapGetters({
                allMenuList: "menuManage/allMenuList",
                selectedBrand: "brandSelect/selected",
                selectedBrandName: "brandSelect/selectedName"
            }),
//            是否有菜单
            noMenuStatus() {
                return this.allMenuList.total > 0
            },
            verifySuccess() {
                let self = this;
                return self.pageState.verifyMenuName && self.pageState.verifyMenuRemark && self.form.menuName
            },
        },
        filters: {
            showCount: function (value) {
                if (!value) return '未设置'
                return value
            },
            showRemark: function (value) {
                if (!value) return '-'
                return value
            }
        },
        methods: {
            ...mapActions({
                setLeftNav: "leftNav/setNav",
//                删除菜单
                deleteMenuItem: "menuManage/deleteMenu",
//                新建菜单
                createMenu: "menuManage/createMenu",
//                编辑更新菜单信息
                updateMenu: "menuManage/updateMenu",
//                设置菜单小导航
                setMenuInfo: "menuManage/setMenuInfo",
//                获取品品牌下菜单、总数
                getAllMenus: "menuManage/getAllMenus",
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
            createNewMenu() {
                let self = this;
                self.pageState.modalShow = true
                self.pageState.modalType = '1'
                self.pageState.modalTitle = '创建菜单'
            },
//            弹窗关闭
            cancel() {
                let self = this;
                self.pageState.modalShow = false
                self.clearForm()
            },
//            弹窗确定
            ok() {
                let self = this;
                Object.assign(self.form, self.pageParams)
                if (self.verifySuccess) {

                    if (self.pageState.modalType === '1') {
                        self.createMenu(self.form)
                    } else {
                        self.updateMenu(self.form)
                    }

//                    关掉弹窗
                    self.pageState.modalShow = false
//                    清除表单输入
                    self.clearForm()
                }
                else {
                    self.pageState.need = true;
                }
            },
            //            表单验证用 单位名称
            verifyMenuName(e) {
                let self = this;
                self.pageState.verifyMenuName = e
            },
//            验证表单输入
            verifyMenuRemark(e) {
                let self = this;
                self.pageState.verifyMenuRemark = e
            },
            //            清空弹窗内表单输入
            clearForm() {
                let self = this;
                self.pageState.need = false;
                self.form.menuId = ''
                self.form.menuName = ''
                self.form.menuRemark = ''
                self.form.detailMenuPriceNotPublish = 0
            },
//            跳转菜单商品
            showGoods(item) {
                let self = this;
                self.setMenuInfo(item);
                let query = self.$route.query;
                let params = {
                    menuId: item.menuId
                }
                self.$router.push({
                    path: '/menu_goods',
                    query: Object.assign(query, params)
                });
            },
//            编辑菜单
            editMenu(item) {
                let self = this;
                self.pageState.modalTitle = '菜单详情'
                self.pageState.modalType = '2'
                self.pageState.modalShow = true

                self.form.menuId = item.menuId
                self.form.menuName = item.menuName
                self.form.menuRemark = item.remark || ''
                self.form.detailMenuPriceNotPublish = item.detailMenuPriceNotPublish || 0

                console.log('form', self.form)
            },
//            删除菜单
            deleteMenu(item) {
//  二次确认
                let self = this;
                Object.assign(item, self.pageParams)
                self.$Modal.confirm({
                    title: '请注意',
                    content: '菜单删除后不可恢复。确定需要立即删除这个菜单吗？',
//                    点击确定的操作
                    onOk: () => {
                        self.deleteMenuItem(item)
                    },
//                    点击取消的操作
                    onCancel: () => {
                    }
                });

            },
//            初始化菜单列表
            initMenus() {
                let self = this;
                self.pageParams.plateEntityId = self.$route.query.plateEntityId;
                if (self.pageParams.plateEntityId)
                    self.getAllMenus(self.pageParams.plateEntityId);


            }
        },
        created() {
            let self = this;
            self.setLeftNav(6);
            self.initMenus()
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
    .menu-manage {
        padding: 30px;
    }

    .title-total {
        font-size: 14px;
        font-weight: 600;
        color: #3C4144;
    }
    .price-tip {
        color: #999999;
        line-height: 1.5;
        margin-top: 5px;
    }
</style>
