import { API_BASE_URL } from 'apiConfig'
import Requester from '@/base/requester'
import catchError from '@/base/catchError'
import { GW } from '@2dfire/gw-params'
import router from '@2dfire/utils/router'
import cookie from '@2dfire/utils/cookie'
const entity_id = JSON.parse(cookie.getItem('entrance')).shopInfo.entityId
function withEntityId() {
  return '&' + GW + '&' + 'entity_id=' + getEntityId()
}
export function getEntityId() {
  return router.route.query.entityId || entity_id
}
async function http(url, config) {
  try {
    const res = await Requester.get(API_BASE_URL + url, config)
    const { code } = res
    if (code === 1) {
      return {
        ...res,
        success: true
      }
    } else {
      return {
        ...res,
        success: false
      }
    }
  } catch (e) {
    catchError(e)
  }
}
/**
 * 连锁和门店传菜相关api
 */
export default {
  //连锁、门店传菜列表
  getPassSchemeList: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPantryClientService.listPantries' +
        withEntityId(),
      {
        params
      }
    ),
  //连锁、门店传菜列表点击商品进入详情列表
  getPassSchemeDetail: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPantryClientService.listMenuDetail' +
        withEntityId(),
      {
        params
      }
    ),
  //连锁、门店传菜列表点击商品进入详情列表,再点击关联商品的时候调用
  addSchemeDetailGoods: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPantryMenuClientService.updatePantryMenu' +
        withEntityId(),
      {
        params
      }
    ),
  //连锁、门店传菜列表点击商品进入详情列表,删除关联商品
  delSchemeDetailGoods: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPantryMenuClientService.removePantryMenu' +
        withEntityId(),
      {
        params
      }
    ),
  //添加传菜信息
  addPassSchemeInfo: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPantryClientService.savePantryInfo' +
        withEntityId(),
      {
        params
      }
    ),
  //编辑更新传菜信息
  updatePassSchemeInfo: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPantryClientService.updatePantryInfo' +
        withEntityId(),
      {
        params
      }
    ),
  //删除传菜信息
  delPassSchemeInfo: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPantryClientService.removePantry' +
        withEntityId(),
      {
        params
      }
    ),
  //获取不出单商品列表
  getNotIssueList: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPantryMenuClientService.listNoPrint' +
        withEntityId(),
      { params }
    ),
  //删除不出单商品(总部的)
  delNotIssue: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPantryMenuClientService.deleteNoPrint4Chain' +
        withEntityId(),
      {
        params
      }
    ),
  //删除或更新不出单商品(门店的)
  updateNotIssue: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPantryMenuClientService.updateNoPrint' +
        withEntityId(),
      {
        params
      }
    ),
  //查询所有商品
  getAllGoodsList: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPantryMenuClientService.listItem' +
        withEntityId(),
      {
        params
      }
    ),
  //查询所有商品类别
  getAllGoodsType: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPantryClientService.listEndKind' + withEntityId(),
      {
        params
      }
    ),
  //未出单商品中添加商品
  addNotIssueGoods: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPantryMenuClientService.saveNoPrint4Chain' +
        withEntityId(),
      {
        params
      }
    ),
  //套餐中商品分类打印设置
  getPrintSettingList: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.ICashClientService.getKindMenuPrintSettings' +
        withEntityId(),
      {
        params
      }
    ),
  //商品分类打印设置中增加套餐分类
  updatePrintSetting: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.ICashClientService.updateKindMenuPrintSettings' +
        withEntityId(),
      {
        params
      }
    ),
  //商品分类打印设置中删除套餐分类
  delPrintSetting: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.ICashClientService.deleteKindMenuPrintSettings' +
        withEntityId(),
      {
        params
      }
    ),
  //门店传菜列表中获取区域列表
  getAllArea: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPrintClientService.listArea' + withEntityId(),
      {
        params
      }
    ),
  //门店传菜列表中更新区域列表
  updateArea: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPantryClientService.updatePantryArea' +
        withEntityId(),
      {
        params
      }
    ),
  //门店备用打印机列表
  getPrinterList: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IBackupPrinterClientService.list' + withEntityId(),
      {
        params
      }
    ),
  //门店添加备用打印机
  addPrinter: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IBackupPrinterClientService.save' + withEntityId(),
      {
        params
      }
    ),
  //门店添加编辑更新打印机
  updatePrinter: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IBackupPrinterClientService.update' +
        withEntityId(),
      {
        params
      }
    ),
  //门店添加删除打印机
  delPrinter: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IBackupPrinterClientService.remove' +
        withEntityId(),
      {
        params
      }
    ),
  //门店分区域打印列表
  getAreaPrintList: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPrintClientService.getPrintList' + withEntityId(),
      {
        params
      }
    ),
  //门店分区域打印添加打印信息
  addAreaPrint: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPrintClientService.uploadPrint' + withEntityId(),
      {
        params
      }
    ),
  //门店分区域打印编辑保存打印信息
  updateAreaPrint: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPrintClientService.updatePrintInfoById' +
        withEntityId(),
      {
        params
      }
    ),
  //门店分区域打印删除打印信息
  delAreaPrint: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPrintClientService.deletePrintById' +
        withEntityId(),
      {
        params
      }
    ),
  //门店分区域打印更新区域
  updateAreaPrintArea: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPrintClientService.updatePrintAreaById' +
        withEntityId(),
      {
        params
      }
    ),
  //门店传菜检查
  getPassCheckList: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.ICashInspectionClientService.queryCashInspection' +
        withEntityId(),
      {
        params
      }
    ),
  //门店传菜检查关联设置传菜方案
  setPassCheckList: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.ICashInspectionClientService.saveCashPrint' +
        withEntityId(),
      {
        params
      }
    ),
  //添加传菜方案时选在标签打印机的时候获取打印纸宽高
  getPrinterWH: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.IPantryClientService.getPrintType' +
        withEntityId(),
      {
        params
      }
    ),
  //添加传菜方案时获取的打印设备列表
  getPrinterSys: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.ISysMobileClientService.listDicSysItems' +
        withEntityId(),
      {
        params
      }
    ),
  //添传菜检查设置关联的时候
  getCheckSetting: params =>
    http(
      'com.dfire.soa.cashplatform.client.service.ICashInspectionClientService.queryCashPrint' +
        withEntityId(),
      {
        params
      }
    )
}
