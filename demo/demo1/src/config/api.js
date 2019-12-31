import { API_BASE_URL, API_GET_TOKEN_URL } from "apiConfig";
import { API_AUTH_PHONE } from "apiConfig";
import {GW} from '@2dfire/gw-params';
const AND = '&' + GW

const API = {

//    获取应用列表
    GET_APPS_LIST: API_BASE_URL + '/application/list.do',
// 生成签名
    GET_SIGNATURE: API_BASE_URL + '/application/genSign.do',
//    获取所有应用权限列表
    GET_APPS_RIGHTS: API_BASE_URL + '/application/rights.do',
//    新建应用
    CREATE_APP: API_BASE_URL + '/application/create-app.do',
//    新建应用
    GET_APP_INFO: API_BASE_URL + '/application/appInfo.do',
// 获取开放给这个App的所有权限
    GET_AUTH_APP_RIGHTS: API_BASE_URL + '/application/appAuthRightsList.do',
//    更新应用
    UPDATE_APP: API_BASE_URL + '/application/save.do',
//    获取应用下的已授权商铺列表
    GET_APP_SHOPS: API_BASE_URL + '/application/app-shop.do',
//    应用下授权店铺删除接口
    DEL_APP_SHOP: API_BASE_URL + '/application/del-shop.do',
//    应用下的已授权商铺详细
    GET_APP_SHOP_DETAIL: API_BASE_URL + '/application/shop-detail.do',
//    获取应用下的已授权商铺列表
    GET_AUTH_INFO: API_BASE_URL + '/application/getAuthorizeInfo.do',
//    应用下的商户绑定详细
    GET_APP_AUTH_DETAIL: API_BASE_URL + '/application/app-shop-detail.do',

//    更新正式环境url
    SAVE_URL: API_BASE_URL + '/application/save-url.do',
//    应用下的商户绑定第三方店铺
    RELATE_SHOP: API_BASE_URL + '/application/shop-relate.do',

//    授权  扫码后获取需要授权的权限列表
    GET_SHOP_APP_RIGHTS: API_BASE_URL + '/shop/getShopAppRights.do',
//    授权  商户登录
    SHOP_AUTH_LOGIN: API_BASE_URL + '/shop/shopAuthAppLogin.do',
//    授权  手机登录
    SHOP_AUTH_PHONE_LOGIN:API_BASE_URL + '/user/checkPhoneLogin.do',
    SHOP_CHECK_PHONE_LOGIN:API_BASE_URL + '/user/saveMerchantInfo.do',
//    扫码  登录
    SHOP_SHOP_INFO_LIST:API_BASE_URL + '/user/queryShopInfoList.do',
//    授权  商户授权应用详细
    SHOP_AUTH_DETAIL: API_BASE_URL + '/shop/shopAuthAppDetail.do',
//    授权  商户授权
    SHOP_AUTH_APP: API_BASE_URL + '/shop/shopAuthApp.do',





//    登录
    USER_LOGIN: API_BASE_URL + '/user/developerLogin.do',

//    商户登录
    MC_LOGIN: API_BASE_URL + '/user/shopLogin.do',
//    开发者注册
    DL_REG: API_BASE_URL + '/user/register.do',
//    开发者登录
    DL_LOGIN: API_BASE_URL + '/user/developerLogin.do',
//    忘记密码
    FG_PASSWORD: API_BASE_URL + '/user/findPwd.do',
//    修改密码
    CHANGE_PWD: API_BASE_URL + '/user/updatePwd.do',
//    修改密码
    FEED_BACK: API_BASE_URL + '/user/saveUserMessage.do',
//    日志查询
    USER_LOG: API_BASE_URL + '/log/query.do',

//   获取开发者列表
    DEV_LIST:API_BASE_URL+'/shop/appInfoList.do',

//  开发者认证
    DEV_APPROVE:API_BASE_URL+'/user/saveDevInfo.do',
//  资质认证
    DEV_APTITUDE:API_BASE_URL+'/user/getUserLoginInfo.do',
//  开发者详情
    DEV_DETAILS:API_BASE_URL+'/shop/appInfoDetail.do',
//  开发者资质详情
     VER_DETAILS:API_BASE_URL+'/user/devInfo.do',
//  商户详情
    MER_DETAILS:API_BASE_URL+'/shop/shopDetail.do',

//  开发者权限列表
    DEV_AUTHORITY: API_BASE_URL + '/rights/userAuthRights.do',
//  权限列表详情以及商户列表
    SHOP_LIST: API_BASE_URL + '/rights/rightsShopList.do',
//  获取商户权限店铺列表
    SHOP_AUTHORITY: API_BASE_URL + '/rights/shopRightsList.do',
// 获取API翻译字典项
    API_TRANSLATION: API_BASE_URL + '/rights/load_translation.do',
//  解除授权
    SHOP_RELIEVE:API_BASE_URL+'/rights/shopRemoveRight.do',
//  商户授权
    SHOP_ACCREDIT:API_BASE_URL +'/shop/appRightsBind.do',
//  上传图片
    IMG_UPLOAD:API_BASE_URL+'/user/uploadImg.do',
//  回调地址
    MERCHANT_URL:API_BASE_URL+'/shop/saveExtUrl.do',
//  直营列表
    DIRECT_LIST:API_BASE_URL+'/chain/chainShopList.do',

    DIRECT_BIND:API_BASE_URL+'/chain/bind.do',

    //  验证token的有效性
    CHECK_AUTH_LOGIN:API_BASE_URL+'/shop/shopAuthAppLoginFromBossScan.do',

    GET_TOKEN: API_GET_TOKEN_URL + 'com.dfire.soa.sso.ISessionManagerService.validateServiceTicket' + AND

}

export default API;
