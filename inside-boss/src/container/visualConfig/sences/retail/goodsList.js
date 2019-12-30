import { currentWeixinMealUrl } from '@src/utils/env'
import { getEntityId } from '@src/container/visualConfig/utils'


const page = {
    name: '商品分类页',
    configName: 'page:goodsList',
    link: () => `${currentWeixinMealUrl}/page_split/v1/goods_list/${getEntityId()}?industry=3`,

    components: [
        // 核心组件
        'cateList',

        // 附加组件
        'backgroundImage',
        'banner',
        'pictureAds',
        'title',
        'coupons',
        'searchInput',
        'announce',
        'hotline',
        'whitespace',
    ],

    defaults: {
        components: [
            { type: 'cateList' },
        ],
    },
}


export default page
