import Vue from 'vue';
import Router from 'vue-router';

import shopManage from '../views/shop/index.vue';
import shopManageView from '../views/shop/shop-manage/manage_view.vue';
import shopManageInfo from '../views/shop/shop-manage/manage_info.vue';
import shopManageGoodsLibraryGoodsManage from '../views/shop/store-manage/goods-library/goods-manage';
import singleShopGoodsAdd from '../views/shop/store-manage/goods-library/goods-manage/add-goods'
import singleShopGoodsEdit from '../views/shop/store-manage/goods-library/goods-manage/edit-goods'
import shopManageGoodsLibrarySuitManage from '../views/shop/store-manage/goods-library/suit-manage'

import singleShopSuitAddFirstStep from '../views/shop/store-manage/goods-library/suit-manage/add-suit/set-first-step'
import singleShopSuitAddSecondStep from '../views/shop/store-manage/goods-library/suit-manage/add-suit/set-second-step'

import singleShopSuitEditFirstStep from '../views/shop/store-manage/goods-library/suit-manage/edit-suit/set-first-step'
import singleShopSuitEditSecondStep from '../views/shop/store-manage/goods-library/suit-manage/edit-suit/set-second-step'

import singleShopGoodsAttr from '../views/shop/store-manage/goods-attr/goods_attr'
import singleShopGoodsClass from '../views/shop/store-manage/goods-class/goods_class'

import shopBrand from '../views/shop/brand-manage/index.vue';
import shopBrandInfo from '../views/shop/brand-manage/brand_info.vue';
import shopOrgan from '../views/shop/organ-manage/index.vue';
import memberIndex from '../views/member/index.vue';
import goodsClass from '../views/setting/goods-class/index.vue';
import goodsAttr from '../views/setting/goods-attr/index.vue';
import goodsManage from '../views/setting/goods-manage/index.vue';
import goodsAdd from '../views/setting/goods-manage/add-goods/index.vue';
import goodsEdit from  '../views/setting/goods-manage/edit-goods/index.vue'
import addSetBaseInfo from '../views/setting/suit-manage/add-suit/set-firsts-tep/index.vue';
import addSetComboGoods from '../views/setting/suit-manage/add-suit/set-second-step/index.vue';
import editSetBaseInfo from '../views/setting/suit-manage/edit-suit/set-firsts-tep/index.vue';
import editSetComboGoods from '../views/setting/suit-manage/edit-suit/set-second-step/index.vue';
import menuManage from '../views/setting/menu/index.vue';
import menuDist from '../views/setting/menu/menu_dist/index.vue';
import menuGoods from '../views/setting/menu/menu_goods/index.vue';
import menuImport from '../views/setting/menu/menu_import/index.vue';
import suitManage from '../views/setting/suit-manage/index.vue';

import distManage from '../views/distCenter/index';
import distHistory from '../views/distCenter/history/index';
import distRetry from '../views/distCenter/history/retry/index';

import payKindManage from '../views/setting/pay-kind/index';
import payKindAdd from '../views/setting/pay-kind/add-pay-kind/index';
import payKindEdit from '../views/setting/pay-kind/edit-pay-kind/index';
import payKindPublish from '../views/setting/pay-kind/publish-pay-kind/index';

import shopPayKindManage from '../views/shop/cash-manage/pay-kind/index';
import shopPayKindAdd from '../views/shop/cash-manage/pay-kind/add-pay-kind/index';
import shopPayKindEdit from '../views/shop/cash-manage/pay-kind/edit-pay-kind/index';

// 传菜
import passManage from '../views/pass/index';
import passPublish from '../views/pass/publish/index';
import passRouter from './pass'
import storePassRouter from './storePass'

import shopTableManage from './shopTableManage'
import manageGroup from './manageGroup'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '*',
            redirect: '/shop_manage'
        }, {
            path: "/shop_manage",
            name: "shopManage",
            title: "门店管理",
            component: shopManage
        }, {
            path: "/shop_manage_view",
            name: "shopManageView",
            title: "经营概况",
            component: shopManageView
        }, {
            path: "/shop_manage_info",
            name: "shopManageInfo",
            title: "店铺资料",
            component: shopManageInfo
        },{
            path: "/shop_manage_library_goods_manage",
            name: "shopManageLibraryGoodsManage",
            title: "商品库-商品管理",
            component: shopManageGoodsLibraryGoodsManage,
        },{
            path: "/shop_manage_library_suit_manage",
            name: "shopManageLibrarySuitManage",
            title: "商品库-套餐管理",
            component: shopManageGoodsLibrarySuitManage,
        }, {
            path: "/single_shop_goods_add",
            name: "singleShopGoodsAdd",
            title: "",
            component: singleShopGoodsAdd
        }, {
            path: "/single_shop_goods_edit",
            name: "singleShopGoodsEdit",
            title: "",
            component: singleShopGoodsEdit
        },{
            path: "/single_shop_suit_add_first_step",
            name: "singleShopSuitAddFirstStep",
            title: "",
            component: singleShopSuitAddFirstStep
        },{
            path: "/single_suit_add_second_step",
            name: "singleShopSuitAddSecondStep",
            title: "",
            component: singleShopSuitAddSecondStep
        },{
            path: "/single_suit_edit_first_step",
            name: "singleShopSuitEditFirstStep",
            title: "",
            component: singleShopSuitEditFirstStep
        },{
            path: "/single_suit_edit_second_step",
            name: "singleShopSuitEditSecondStep",
            title: "",
            component: singleShopSuitEditSecondStep
        },{
            path: "/single_shop_goods_attr",
            name: "singleShopGoodsAttr",
            title: "商品库-商品属性",
            component: singleShopGoodsAttr
        },{
            path: "/single_shop_goods_class",
            name: "singleShopGoodsClass",
            title: "商品库-商品分类",
            component: singleShopGoodsClass
        },{
            path: "/shop_brand",
            name: "shopBrand",
            title: "品牌管理",
            component: shopBrand
        }, {
            path: "/shop_brand_info",
            name: "shopBrandInfo",
            title: "品牌详情",
            component: shopBrandInfo
        }, {
            path: "/shop_organ",
            name: "shopOrgan",
            title: "分支机构",
            component: shopOrgan
        }, {
            path: "/member_index",
            name: "memberIndex",
            title: "员工管理",
            component: memberIndex
        }, {
            path: "/goods_manage",
            name: "goodsManage",
            title: "商品管理",
            component: goodsManage
        }, {
            path: "/goods_class",
            name: "goodsClass",
            title: "分类管理",
            component: goodsClass
        }, {
            path: "/goods_attr",
            name: "goodsAttr",
            title: "商品属性",
            component: goodsAttr
        },{
            path: "/goods_add",
            name: "goodsAdd",
            title: "添加商品",
            component: goodsAdd
        },{
            path: "/goods_edit",
            name: "goodsEdit",
            title: "编辑商品",
            component: goodsEdit
        },{
            path: "/combo_manage",
            name: "suitManage",
            title: "套餐属性",
            component: suitManage
        },
        {
            //新增套餐基本信息开发用
            path: "/add_set_base_info",
            name: "addSetBaseInfo",
            title: "套餐基本信息开发用",
            component: addSetBaseInfo
        },
        {
            //新增设置套餐商品开发用
            path: "/add_set_combo_goods",
            name: "addSetComboGoods",
            title: "设置套餐商品开发用",
            component: addSetComboGoods
        },
        {
            //编辑套餐基本信息开发用
            path: "/edit_set_base_info",
            name: "editSetBaseInfo",
            title: "套餐基本信息开发用",
            component: editSetBaseInfo
        },
        {
            //编辑设置套餐商品开发用
            path: "/edit_set_combo_goods",
            name: "editSetComboGoods",
            title: "设置套餐商品开发用",
            component: editSetComboGoods
        },
        {
            path: "/menu_manage",
            name: "menuManage",
            title: "菜单管理",
            component: menuManage
        },
        {
            path: "/menu_dist",
            name: "menuDist",
            title: "菜单下发",
            component: menuDist
        },
        {
            path: "/menu_goods",
            name: "menuGoods",
            title: "菜单商品",
            component: menuGoods
        },
        {
            path: "/menu_import",
            name: "menuImport",
            title: "菜单商品导入",
            component: menuImport
        },
        {
            path: "/dist_manage",
            name: "distManage",
            title: "下发中心",
            component: distManage
        },
        {
            path: "/dist_manage_history",
            name: "distHistory",
            title: "下发记录",
            component: distHistory
        },
        {
            path: "/dist_manage_retry",
            name: "distRetry",
            title: "重新下发",
            component: distRetry
        },
        {
            path: "/pay_kind_manage",
            name: "payKindManage",
            title: "付款方式",
            component: payKindManage
        },
        {
            path: "/pay_kind_edit",
            name: "payKindEdit",
            title: "编辑付款方式",
            component: payKindEdit
        },
        {
            path: "/pay_kind_add",
            name: "payKindAdd",
            title: "添加付款方式",
            component: payKindAdd
        },
        {
            path: "/pay_kind_publish",
            name: "payKindPublish",
            title: "付款方式下发",
            component: payKindPublish
        },
        {
            path: "/shop_pay_kind_manage",
            name: "shopPayKindManage",
            title: "付款方式",
            component: shopPayKindManage
        },
        {
            path: "/shop_pay_kind_edit",
            name: "shopPayKindEdit",
            title: "编辑付款方式",
            component: shopPayKindEdit
        },
        {
            path: "/shop_pay_kind_add",
            name: "shopPayKindAdd",
            title: "添加付款方式",
            component: shopPayKindAdd
        },
        {
            path: "/pass_manage",
            name: "passManage",
            title: "传菜管理",
            component: passManage
        },
        {
            path: "/pass_publish",
            name: "passPublish",
            title: "传菜下发",
            component: passPublish
        },
		...passRouter,
    	...storePassRouter,
        ...shopTableManage,
        ...manageGroup
    ]
});
