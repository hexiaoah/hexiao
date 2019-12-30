/**
 * 付费模块购买详情页接口
 */

const {API_BASE_URL} = require('apiConfig');
const  BOSS_API_URL=API_BASE_URL+"/boss-api";
module.exports = {
    // 购买详情页
    BUY_DETAILS_CARD: BOSS_API_URL+'/module_charge/v1/query_purchase_detail',
    // 可用优惠券
    AVAILABLE_COUPON: BOSS_API_URL+'/module_charge/v1/item_list_coupons'
    
}