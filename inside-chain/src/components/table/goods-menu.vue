<template>
    <div class="table-wrapper clearfix">
        <div class="table-header">
            <Select v-model="searchItems.kindIdShow" @on-change="changeType" class="search-select pull-left"
                    style="width: 198px;">
                <Option value="all">
                    全部分类
                </Option>
                <Option v-for="(item, index) in goodsKinds"
                        :value="item.kindId"
                        :key="index">
                    {{item.kindName}}
                </Option>
            </Select>
            <Input v-model="searchItems.goodsName"
                   class="search-input"
                   icon="ivu-icon ivu-icon-search"
                   @on-click="searchGoods"
                   @on-enter="searchGoods"
                   placeholder="商品名称">
            </Input>
            <div class="pull-right">
                <Button type="ghost" class="mr-10px" @click="delBatch" :disabled="!checkedCount">批量移除</Button>
                <Button type="primary" @click="importGoods">添加菜单关联商品</Button>
            </div>
        </div>

        <div v-if="goodsOfMenuTotal > 0">
            <table class="goods-table mt-20px">
                <tr>
                    <th>
                        <Checkbox @on-change="checkAll" :value="all">商品</Checkbox>
                    </th>
                    <th>所属分类</th>
                    <th>价格设置</th>
                    <th>修改时间</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(item,index) in goodsOfMenu" :key="index">
                    <td>
                        <Checkbox @on-change="checkOne(item, $event)" :value="item.checked"
                                  class="pull-left mt-20px"></Checkbox>
                        <GoodsInfo :item="item"></GoodsInfo>
                    </td>
                    <td>
                        {{item.kind}}
                    </td>
                    <td>
                        <PriceShow :price="item.defaultPrice" :switch="item.useDefaultPriceSwitch"></PriceShow>
                    </td>
                    <td>
                        {{item.optime}}
                    </td>
                    <td>
                        <div>
                            <button class="table-button" @click="editGoods(item)">编辑</button>
                            <button class="table-button" @click="delOne(item)">删除</button>
                        </div>
                        <div>
                            <button class="table-button" @click="goGoodsInfo(item)">查看商品详情</button>
                        </div>
                    </td>
                </tr>

            </table>

            <div class="page-bar">
                <Page class="mt-15px" :total="goodsOfMenuTotal" :page-size="20" :current="searchItems.pageIndex"
                      show-total
                      @on-change="change"></Page>
            </div>
        </div>

        <!--修改菜单价格-->
        <BaseModal :show="pageState.modalShow"
                   :header="pageState.modalTitle"
                   :width="450"
                   okText="保存"
                   @on-ok="ok"
                   @on-cancel="cancel">

            <Form :label-width="200" class="pd-10px menu-modal">
                <FormItem label="价格设置与商品库中的基础价一致">
                    <i-switch class="pull-right" v-model="goodsPrice.priceSwitch"
                              @on-change="switchPriceSet"></i-switch>
                </FormItem>
                <FormItem label="商品在此菜单里的单价 (￥)">
                    <Input v-model="goodsPrice.price" class="pull-right" style="width: 88px"
                           :disabled="goodsPrice.priceSwitch"></Input>
                    <br>
                    <Verify class="pull-right" :need="pageState.need" :type="2" :value="goodsPrice.price" :max="100000"
                            @verify="verifyDefault"></Verify>
                    <div class="fl-clear"></div>
                </FormItem>
                <FormItem label="商品在此菜单里的会员价 (￥)">
                    <Input v-model="goodsPrice.memberPrice" class="pull-right" style="width: 88px"
                           :disabled="goodsPrice.priceSwitch"></Input>
                    <br>
                    <Verify class="pull-right" :need="pageState.need" :type="2" :value="goodsPrice.memberPrice"
                            :max="100000"
                            @verify="verifyMember"></Verify>
                    <div class="fl-clear"></div>

                </FormItem>
                <FormItem v-for="item,index in goodsPrice.specPrices" :label="item.specDetailName +' (￥)'" :key="index">
                    <Input v-model="item.price" class="pull-right" style="width: 88px"
                           :disabled="goodsPrice.priceSwitch"></Input>
                    <br>
                    <Verify class="pull-right" :need="pageState.need" :type="2" :value="item.price" :max="100000"
                            @verify="verifySpecPrice(item, $event)"></Verify>
                </FormItem>

                <!--<FormItem>
                    循环各个规格价格输入
                </FormItem>-->
            </Form>
        </BaseModal>

    </div>
</template>

<script>
    import GoodsInfo from './goods-menu/base-info.vue'
    import PriceShow from './goods-menu/price-show'
    import BaseModal from '@/components/modal/base-modal'
    import Verify from '@/components/verify/base-verify'

    import {mapGetters, mapActions} from 'vuex'

    let pageState = {
        modalShow: false,
        modalTitle: '商品在菜单内的价格设置',
        need: false,
        vDefault: true,
        vMember: true,
        vPrices: [],
    }

    let form = {
        menuId: ''
    }
    //    筛选项参数保存
    let searchItems = {
        goodsName: '',
        kindId: '',
        kindIdShow: 'all',
        pageIndex: 1
    }

    export default {
        name: 'goods-of-menu',
        props: {},
        components: {
            BaseModal,
            GoodsInfo,
            Verify,
            PriceShow
        },
        data() {
            return {
                searchItems,
                pageState,
                form
            }
        },
        computed: {
            ...mapGetters({
                goodsOfMenu: "menuManage/goodsOfMenu",
                goodsOfMenuTotal: "menuManage/goodsOfMenuTotal",
                goodsPrice: "menuManage/goodsPrice",
                goodsKinds: "menuManage/goodsKinds",
            }),
//            选中的商品个数
            checkedCount() {
                let count = 0;
                this.goodsOfMenu.map(v => {
                    if (v.checked) {
                        count++
                    }
                })
                return count
            },
//            商品是否全选
            all() {
                let count = 0;
                let length = this.goodsOfMenu.length;
                count = this.checkedCount;

                return (length !== 0) && (count === length)
            },
//            验证 规格价格输入是否通过
            verifySpecPriceSuccess() {
                let self = this;
                let all = 0;
                let s_count = 0;
                if (self.goodsPrice.specPrices && self.goodsPrice.specPrices.length > 0) {
                    all = self.goodsPrice.specPrices.length;
                    self.goodsPrice.specPrices.map(item => {
//                        不为空且验证通过
                        if (item.price !== '' && item.verify) {
                            s_count++;
                        }
                    })
                }

                return all === s_count
            },
//            验证其余输入是否通过
            verifySuccess() {
                let self = this;
                let notEmpty = false;
//                判断输入不为空
                if (self.goodsPrice.price !== '' && self.goodsPrice.memberPrice !== '') {
                    notEmpty = true
                } else {
                    notEmpty = false
                }
                return self.verifySpecPriceSuccess && notEmpty && self.pageState.vDefault && self.pageState.vMember
            },
        },
        methods: {
            ...mapActions({
                removeGoods: 'menuManage/removeGoodsOfMenu',
                checkOneGoods: 'menuManage/checkOneGoodsOfMenu',
                checkAllGoods: 'menuManage/checkAllGoodsOfMenu',
                getGoodsByMenuId: 'menuManage/getGoodsByMenuId',
                getGoodsPrice: 'menuManage/getGoodsPrice',
                setGoodsPrice: 'menuManage/setGoodsPrice',
                updateGoodsPrice: 'menuManage/updateGoodsPrice',
            }),
            verifySpecPrice(item, e) {
                item.verify = e
            },
            // 验证
            verifyDefault(e) {
                this.pageState.vDefault = e
            },
            verifyMember(e) {
                this.pageState.vMember = e
            },
            changePageNum(num) {
                this.page.pageNum = num
            },
//            菜单导入商品
            importGoods() {
                let self = this;
                self.$router.push({
                    path: '/menu_import',
                    query: self.$route.query
                });
            },
//            全选
            checkAll(e) {
                this.checkAllGoods(e);
            },
//            单选
            checkOne(item, e) {
                this.checkOneGoods({item: item, check: e})
            },
//            批量移除
            delBatch() {
//                确定将{商品数量}个商品从此菜单中移除吗？

                let self = this;
                self.$Modal.confirm({
                    title: '请注意',
                    content: `确定将${self.checkedCount}个商品从此菜单中移除吗？`,
//                    点击确定的操作
                    onOk: () => {
                        let params = {
                            delType: 1,
                            plateEntityId: self.$route.query.plateEntityId,
                            menuId: self.$route.query.menuId,

                        };

                        Object.assign(params, self.searchItems)

                        self.removeGoods(params)
                    },
//                    点击取消的操作
                    onCancel: () => {
                    }
                });

            },
//            移除一个商品
            delOne(item) {
                //  二次确认
                let self = this;
                self.$Modal.confirm({
                    title: '请注意',
                    content: '确定将商品从此菜单中移除吗？',
//                    点击确定的操作
                    onOk: () => {
                        let params = {
                            delType: 0,
                            itemId: item.itemId,
                            plateEntityId: self.$route.query.plateEntityId,
                            menuId: self.$route.query.menuId,
                        };
                        Object.assign(params, self.searchItems)
                        self.removeGoods(params)
                    },
//                    点击取消的操作
                    onCancel: () => {
                    }
                });

            },
//            跳转到商品详情页面
            goGoodsInfo(item) {
                let pathSuit = '/edit_set_base_info'
                let pathGoods = '/goods_edit'
                let path = '';
                if (item.isInclude) {
                    path = pathSuit
                } else {
                    path = pathGoods
                }
                let self = this;
                this.$router.push({
                    path: path,
                    query: {
                        itemId: item.itemId,
                        plateEntityId: self.$route.query.plateEntityId,
                    }
                })
            },
            editGoods(item) {
                let self = this;
                self.form.itemId = item.itemId;

                let params = {
                    plateEntityId: self.$route.query.plateEntityId,
                    menuId: self.$route.query.menuId,
                    itemId: item.itemId
                }
                self.getGoodsPrice(params)

                self.showEditModal()
            },
//            编辑菜单内商品价格
            ok() {
                let self = this;
                if (self.verifySuccess) {
                    let goodsInfo = {
                        plateEntityId: self.$route.query.plateEntityId,
                        menuId: self.$route.query.menuId,
                        itemId: self.form.itemId
                    }
                    let params = {
                        goodsPrice: Object.assign(goodsInfo, self.goodsPrice),
                        searchItems: Object.assign(goodsInfo, self.searchItems),
                    }
//                    更新价格
                    self.updateGoodsPrice(params);
                    self.pageState.modalShow = false
                } else {
                    self.pageState.need = true;
                    console.log('error', self.goodsPrice)
                }
            },
//            打开编辑弹窗
            showEditModal() {
                let self = this;
                self.pageState.modalShow = true
            },
//            弹窗关闭
            cancel() {
                let self = this;
                self.pageState.modalShow = false
                self.pageState.need = false;
//                self.clearForm()
            },
            //            清空弹窗内表单输入
//            clearForm() {
//                let self = this;
//            },
//            表单内是否和基础价保持一致
            switchPriceSet(e) {
                let self = this
                self.setGoodsPrice(e)
            },
//            翻页
            change(e) {
                let self = this;
                self.searchItems.pageIndex = e;

                console.log('self.searchItems', self.searchItems)
                self.getGoods(self.searchItems)
            },

            changeType(e) {
                let self = this;
                self.searchItems.kindId = e;
                self.searchGoods()
            },
            searchGoods() {
                let self = this;
//                重置回第一页
                self.searchItems.pageIndex = 1;

                self.getGoods(self.searchItems)

            },

//            传入参数 获取商品
            getGoods(params) {
                let self = this;
                params.plateEntityId = self.$route.query.plateEntityId
                params.menuId = self.$route.query.menuId
                if (params.kindIdShow === 'all') {
                    params.kindId = ''
                } else {
                    params.kindId = params.kindIdShow
                }
                self.getGoodsByMenuId(params)
            }

        },
        created() {
            this.searchItems.pageIndex = 1;
            this.searchItems.goodsName = '';
            this.searchItems.kindIdShow = 'all';
            this.searchItems.kindId = '';
        },
    }
</script>

<style lang="scss" scoped>

    .table-wrapper {
        background: #ffffff;

        .search-input {
            width: 180px;
            margin-left: 10px;
        }

        .search-select {
            width: 88px;
        }

        .manage-page {
            margin-top: 15px;
        }
    }

</style>

