import { currentWeixinMealUrl } from '@src/utils/env'
import { getEntityId } from '@src/container/visualConfig/utils'
import commonComponents from './commonComponents'


const page = {
    name: '店铺首页',
    configName: 'page:home',
    link: () => `${currentWeixinMealUrl}/page_split/v1/retail_home/${getEntityId()}`,

    components: [
        'backgroundImage',
        ...commonComponents,
    ],

    defaults: null,
}


const defaults = {
    components: [
        {
            type: 'banner',
            mode: '2',
            backgroundImage: null,
        },
        {
            type: 'whitespace',
            height: 25,
        },
        {
            type: 'goodsList',
            mode: '大图',
            goodsList: [],
            showFields: ['名称', '价格', '下单按钮'],
            orderButton: {
                mode: '立即下单',
                orderStyle: '1',
                cartStyle: '1',
            },
            subscript: {
                type: 'text',
                text: '新品',
                image: null,
            },
        },
        {
            type: 'goodsList',
            mode: '详细列表',
            goodsList: [],
            showFields: ['名称', '价格', '下单按钮'],
            orderButton: {
                mode: '立即下单',
                orderStyle: '1',
                cartStyle: '1',
            },
            subscript: {
                type: 'text',
                text: '热卖',
                image: null,
            },
        },
        {
            type: 'goodsList',
            mode: '双列小图',
            goodsList: [],
            showFields: ['名称', '价格', '下单按钮'],
            orderButton: {
                mode: '立即下单',
                orderStyle: '1',
                cartStyle: '1',
            },
            subscript: {
                type: 'text',
                text: '热卖',
                image: null,
            },
        },
        {
            type: 'whitespace',
            height: 35,
        },
        {
            type: 'title',
            text: '更多商品',
            size: 'medium',
            textAlign: 'center',
            textColor: '#000000',
            backgroundColor: '#fff',
            linkType: 'page',
            linkGoodsId: '',
            linkPage: '商品分类',
        },
        {
            type: 'whitespace',
            height: 25,
        },
    ],
}


export default {
    ...page,
    defaults,
}
