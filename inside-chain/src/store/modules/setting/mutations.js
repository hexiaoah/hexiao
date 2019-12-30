import Vue from 'vue'
import * as types from './mutation-types'
import { goodsDefaultValue } from '@/const/emu-goodsDefaultValue'
import { suitDefaultValue } from '@/const/emu-suitDefaultValue'
const _ = require('lodash')

export default{
    // 获取品牌列表
    [types.GET_BRAND_LIST](state, data){
        state.brandList = data
    },
    // 获取商品/套餐列表内分类选项框内容
    [types.GET_CATEGORY_LIST](state, data){
        state.categoryList = data
    },
    // 获取连锁商品列表
    [types.GET_CHAIN_GOODS_LIST](state, data){
        Vue.set(state.chain, 'goodsList', data)
    },
    // 获取单店商品列表
    [types.GET_SINGLE_GOODS_LIST](state, data){
        Vue.set(state.single, 'goodsList', data)
    },
    // 商品点击新增/编辑时候获取各个select里面的内容
    [types.GET_GOODS_SELECT_LIST](state, data){
        Vue.set(state.common.goods, 'allSelectList', data)
    },
    // 商品的标签列表
    [types.GET_GOODS_LABEL_LIST](state, data){
        Vue.set(state.common.goods, 'labelList', data)
    },
    // 获取商品详情
    [types.GET_GOODS_DETAIL](state, data){
        Vue.set(state.common.goods, 'detailFromBack', data)
    },
    // 清空商品详情
    [types.CLEAR_GOODS_DETAIL_FROM_BACK](state){
        let defaultValue = Object.assign({}, goodsDefaultValue)
        Vue.set(state.common.goods, 'detailFromBack', defaultValue)
    },
    // 点击编辑时候将获取到的商品详情复制给detailToBack
    [types.MERGE_GOODS_DETAIL](state, data){
        let obj = _.merge({}, state.common.goods.detailToBack, data)
        Vue.set(state.common.goods, 'detailToBack', obj)
    },
    // 清空新增/编辑商品传递给后端的值
    [types.CLEAR_GOODS_DETAIL_TO_BACK](state){
        let defaultValue = Object.assign({}, goodsDefaultValue)
        Vue.set(state.common.goods, 'detailToBack', defaultValue)
    },
    // 修改新增/编辑商品时候从前端传递给后端的参数
    [types.CHANGE_GOODS_VAL](state, data){
        Vue.set(state.common.goods.detailToBack, data.attr, data.val)
    },
    // 获取连锁套餐列表
    [types.GET_CHAIN_SUIT_LIST](state, data){
        Vue.set(state.chain, 'suitList', data)
    },
    // 获取单店套餐列表
    [types.GET_SINGLE_SUIT_LIST](state, data){
        Vue.set(state.single, 'suitList', data)
    },
    // 获取套餐点餐单位的select列表
    [types.GET_ORDER_UNIT_SELECT_LIST](state, data){
        Vue.set(state.common.suit, 'orderUnitSelectList', data)
    },
    // 获取套餐标签列表
    [types.GET_SUIT_LABEL_LIST](state, data){
        Vue.set(state.common.suit, 'labelList', data)
    },
    // 获取套餐里面的商品
    [types.GET_SUIT_GOODS_LIST](state, data){
        Vue.set(state.common.suit, 'suitGoodsList', data)
    },
    // 获取套餐里面的商品分类
    [types.GET_SUIT_GOODS_CATEGORY_LIST](state, data){
        Vue.set(state.common.suit, 'suitGoodsCategory', data)
    },
    // 修改新增/编辑套餐基本信息
    [types.CHANGE_SUIT_BASEINFO_VAL](state, data){
        Vue.set(state.common.suit.detailBaseInfoToBack, data.attr, data.val)
    },
    // 获取套餐的基本信息
    [types.STORAGE_SUIT_BASEINFO](state, data){
        let obj = _.merge({}, suitDefaultValue, data)
        Vue.set(state.common.suit, 'detailBaseInfoToBack', obj)
    },
    // 初始化套餐基本信息
    [types.CLEAR_SUIT_BASEINFO](state){
        let obj = Object.assign({}, suitDefaultValue)
        Vue.set(state.common.suit, 'detailBaseInfoToBack', obj)
    }
}
