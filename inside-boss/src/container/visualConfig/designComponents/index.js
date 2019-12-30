import { formatDesignComponent } from '@src/container/visualConfig/store/formatters/definition'
// 零售组件
import nav from './retail/nav'
import backgroundImage from './retail/backgroundImage'
import banner from './retail/banner'
import title from './retail/title'
import coupons from './retail/coupons'
import searchInput from './retail/searchInput'
import announce from './retail/announce'
import hotline from './retail/hotline'
import goodsList from './retail/goodsList'
import goodsRanking from './retail/goodsRanking'
import pictureAds from './retail/pictureAds'
import pictureTextNav from './retail/pictureTextNav'
import cateList from './retail/cateList'
import mine from './retail/mine'
// 餐饮联盟组件
import unionPictureAds from './union/unionPictureAds'
import unionHotGoods from './union/unionHotGoods'
import unionRecommendGoods from './union/unionRecommendGoods'
import unionBanner from './union/unionBanner'
import unionNav from './union/unionNav'
import unionMemberCard from './union/unionMemberCard'
import unionRelativeShops from './union/unionRelativeShops'
import unionAdPlace from './union/unionAdPlace'
import unionHotspot from './union/unionHotspot'
import unionGroupActivity from './union/unionGroupActivity'
import unionCoupons from './union/unionCoupons'
import unionPage from './union/unionPage'
// 共用组件
import whitespace from './whitespace'

const components = [
    nav,
    backgroundImage,
    banner,
    title,
    coupons,
    searchInput,
    announce,
    hotline,
    whitespace,
    goodsList,
    goodsRanking,
    pictureAds,
    pictureTextNav,
    cateList,
    mine,
    unionPictureAds,
    unionHotGoods,
    unionRecommendGoods,
    unionBanner,
    unionNav,
    unionMemberCard,
    unionRelativeShops,
    unionAdPlace,
    unionHotspot,
    unionGroupActivity,
    unionCoupons,
    unionPage,
]

export default components.map(formatDesignComponent)
