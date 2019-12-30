import { goodsDefaultValue } from '@/const/emu-goodsDefaultValue'
import { suitDefaultValue } from '@/const/emu-suitDefaultValue'
export default{
    // 获取品牌列表
    brandList: [],
    // 分类列表
    categoryList: [],
    // 连锁商品列表
    chain: {
        goodsList: {
            total: 0,
            itemList: []
        },
        suitList: {
            total: 0,
            list: []
        }
    },
    // 单店商品列表
    single: {
        goodsList: {
            total: 0,
            itemList: []
        },
        suitList: {
            total: 0,
            list: []
        }
    },
    common: {
        goods: {
            detailFromBack: Object.assign({}, goodsDefaultValue),
            detailToBack: Object.assign({}, goodsDefaultValue),
            labelList: {},
            // 新增/编辑时候所有select下面的内容
            allSelectList: {}
        },
        suit: {
            // 套餐基本信息
            detailBaseInfoToBack: Object.assign({}, suitDefaultValue),
            labelList: {},
            // 获取新增/编辑时候点菜单位的select列表
            orderUnitSelectList: [],
            suitGoodsList: {},
            suitGoodsCategory: []
        }
    }
}
