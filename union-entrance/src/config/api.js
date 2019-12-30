import { API_BASE_URL, WEB_SOCKET_URL } from 'apiConfig'
import { GW } from '@2dfire/gw-params'
const AND = '&'
const API = {
  //    店铺编码登录
  CODE_LOGIN:
    API_BASE_URL +
    'com.dfire.boss.center.pc.ILoginBossPcService.shopCodeLogin' +
    AND,
  //    手机号登录
  TEL_LOGIN:
    API_BASE_URL + 'com.dfire.boss.center.pc.ILoginBossPcService.login' + AND,
  //    获取用户信息
  GET_USER_INFO:
    API_BASE_URL +
    'com.dfire.boss.center.pc.IUserBossPcService.getUserInfo' +
    AND,
  //    切店时店铺机构列表
  //GET_SHOPS_LIST: API_BASE_URL + 'com.dfire.boss.center.pc.IEntityBossPcService.getMemberEntityList' + AND,
  GET_SHOPS_LIST:
    API_BASE_URL +
    'com.dfire.boss.center.pc.IEntityBossPcService.getMemberEntityListWithWorkStatus' +
    AND +
    GW, //新版新增工作中标识和可管理的店铺标识
  //   切换店铺
  CHANGE_SHOP:
    API_BASE_URL +
    'com.dfire.boss.center.pc.IEntityBossPcService.changeEntity' +
    AND,
  //  获取登录用二维码
  GET_CODE:
    API_BASE_URL +
    'com.dfire.boss.center.login.service.IScanQrCodeLoginService.createScanQrCode' +
    AND +
    GW,
  // 获取区号接口
  GET_COUNTRY_CODE:
    API_BASE_URL +
    'com.dfire.boss.center.soa.login.service.IUnifiedLoginClientService.listCountry' +
    AND +
    GW,
  //可管理的店铺列表
  GET_MANAGE_LIST:
    API_BASE_URL +
    'com.dfire.boss.center.pc.IShopBossPcService.queryShopList4Chain' +
    AND +
    GW,
  //直接切店
  CHANGE_SHOP_INLIST:
    API_BASE_URL +
    'com.dfire.boss.center.pc.IEntityBossPcService.changeEntity4ChainShop' +
    AND +
    GW,
  //查看连锁下是否有分店
  HAS_SHOP_LIST:
    API_BASE_URL +
    'com.dfire.soa.boss.centerpc.entity.service.IShopBossPcService.hasShopList4Chain' +
    AND +
    GW,
  //  websocket登录
  SCAN_CODE_LOGIN: WEB_SOCKET_URL + '/boss_ws'
}

export default API
