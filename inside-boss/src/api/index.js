import axios from './networkAxios'
// 全局 AppKey
const APP_AUTH = '?app_key=200800&s_os=pc_merchant_back'
import { merApiPrefix } from '../utils/env'
import getUserInfo from '../utils/getUserInfo'

export default {
    // 搜索条件
    getSearchFormArgs(params) {
        return axios({
            url: 'report/queryArgs.json' + APP_AUTH,
            mockUrl: '127/report/queryArgs.json',
            method: 'POST',
            data: params
        })
    },

    // 报表 chart 结构
    getChartDetails(params) {
        return axios({
            url: 'report/details.json' + APP_AUTH,
            mockUrl: '127/report/details.json',
            method: 'POST',
            data: params
        })
    },

    // 报表 chart 数据
    getChartData(params) {
        return axios({
            url: 'report/data.json' + APP_AUTH,
            mockUrl: '127/report/data.json',
            method: 'POST',
            data: params
        })
    },

    // "导出 Excel "
    getExcel(params) {
        return axios({
            url: 'report/exportXls.do' + APP_AUTH,
            mockUrl: '127/report/exportXls.do',
            method: 'POST',
            data: params
        })
    },

    // 联动下拉框时，异步取数据
    getUnionSelect(params) {
        return axios({
            url: 'report/lovValues.json' + APP_AUTH,
            mockUrl: '127/report/lovValues.json',
            method: 'POST',
            data: params
        })
    },
    //获取充值批次列表
    fetchBatchList(params) {
        return axios({
            mock: false,
            url: 'merchant/batch/v1/get_batch_list' + APP_AUTH,
            mockUrl: '123/getFilesSuccess',
            method: 'GET',
            params
        })
    },
    //删除批次
    deleteBatch(params) {
        return axios({
            mock: false,
            url: 'merchant/batch/v1/delete_batch' + APP_AUTH,
            mockUrl: '123/deleteBatchSuccess',
            method: 'GET',
            params
        })
    },
    //查询表格数据
    fetchRechargeList(params) {
        return axios({
            mock: false,
            url: 'merchant/batch/v1/get_batch_details_list_by_query' + APP_AUTH,
            mockUrl: '123/merchant/batch/v1/get_batch_details_list',
            method: 'GET',
            params
        })
    },
    //查询导入日志信息
    getCommTypes(params) {
        return axios({
            mock: false,
            url: 'merchant/batch/v1/getCommTypes' + APP_AUTH,
            mockUrl: '123/merchant/batch/v1/getCommTypes',
            method: 'GET',
            params
        })
    }, //查询导入日志信息
    getImportLog(params) {
        return axios({
            mock: false,
            url: 'merchant/import/v1/query_import_operate_Log' + APP_AUTH,
            mockUrl: '123/merchant/batch/v1/get_import_log',
            method: 'GET',
            params
        })
    },
    //查询日志详情
    getImportLogDetail(params) {
        return axios({
            mock: false,
            url:
                'merchant/import/v1/query_import_operate_detail_Log' + APP_AUTH,
            mockUrl: '123/merchant/batch/v1/get_import_log',
            method: 'GET',
            params
        })
    },
    //获取商家可选择的类目列表
    getCategory(params) {
        return axios({
            mock: false,
            url: 'merchant/import/v1/query_category' + APP_AUTH,
            mockUrl: '123/merchant/batch/v1/get_import_log',
            method: 'GET',
            params
        })
    },
    //下载商品模板
    downloadTemplate(params) {
        return axios({
            mock: false,
            url: 'merchant/import/v1/create_import_template' + APP_AUTH,
            mockUrl: '123/merchant/import/v1/create_import_template',
            method: 'GET',
            params
        })
    },

    //商品库列表
    getGoodsList(params) {
        return axios({
            mock: false,
            url: 'merchant/menu/v1/menu_list' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/532/merchant/plate/get_plate_list',
            method: 'POST',
            data: params
        })
    },
    //商品库列表(新)
    getGoodsListNew(params) {
        return axios({
            mock: false,
            url: 'merchant/menu/v2/menu_list' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/532/merchant/plate/get_plate_list',
            method: 'POST',
            data: params
        })
    },
    getSpecification(params) {
        return axios({
            mock: false,
            url: 'merchant/menu/v1/query_sku_by_menuId' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/532/merchant/plate/get_plate_list',
            method: 'GET',
            params
        })
    },

    //获取数据订正状态
    getIsShowBrand(params) {
        return axios({
            mock: false,
            url: 'merchant/plate/fixstatus' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjs/532/merchant/plate/fixstatus',
            method: 'GET',
            params
        })
    },
    //获取品牌列表
    getBrandList(params) {
        return axios({
            mock: false,
            url: 'merchant/plate/get_plate_list' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/532/merchant/plate/get_plate_list',
            method: 'GET',
            params
        })
    },

    /********************************************************************************************************************************************* */
    // 商品模板列表
    getTemplateList(params) {
        return axios({
            mock: false,
            url: 'merchant/plate/fixstatus' + APP_AUTH,
            mockUrl: '',
            method: 'GET',
            params
        })
    },
    // 获取模板详情
    getTemplateDetail(params) {
        return axios({
            mock: false,
            url: 'merchant/plate/fixstatus' + APP_AUTH,
            mockUrl: '',
            method: 'GET',
            params
        })
    },

    // 保存模板
    saveEditTemplate(params) {
        return axios({
            mock: false,
            url: 'merchant/plate/fixstatus' + APP_AUTH,
            mockUrl: '',
            method: 'POST',
            data: params
        })
    },

    // 交路信息库列表
    getRouteList(params) {
        return axios({
            mock: false,
            url: 'railway/v1/queryTrains' + APP_AUTH,
            mockUrl: '',
            method: 'POST',
            data: params
        })
    },
    // 车次时刻信息库列表
    getTrainList(params) {
        return axios({
            mock: false,
            url: 'railway/v1/queryTrainStations' + APP_AUTH,
            mockUrl: '',
            method: 'POST',
            data: params
        })
    },
    //充值信息编辑
    rechargeModify(params) {
        return axios({
            mock: false,
            url: 'merchant/batch/v1/modify_batch_details' + APP_AUTH,
            mockUrl: '',
            method: 'POST',
            data: params
        })
    },
    //批量删除充值信息
    deleteMultiple(params) {
        return axios({
            mock: false,
            url: 'merchant/batch/v1/delete_batch_details_list' + APP_AUTH,
            mockUrl: '',
            method: 'POST',
            data: params
        })
    },
    //批量充值
    rechargeMultiple(params) {
        return axios({
            mock: false,
            url: 'merchant/batch/v1/batch_recharge' + APP_AUTH,
            mockUrl: '',
            method: 'POST',
            data: params
        })
    },
    //批量红冲
    refund(params) {
        return axios({
            mock: false,
            url: 'merchant/batch/v1/cancel_charge_card' + APP_AUTH,
            mockUrl: '',
            method: 'POST',
            data: params
        })
    },
    //删除单个
    deleteSingle(params) {
        return axios({
            mock: false,
            url: 'merchant/batch/v1/delete_batch_details' + APP_AUTH,
            mockUrl: '',
            method: 'POST',
            data: params
        })
    },
    modifyInfo(params) {
        return axios({
            mock: false,
            url: 'merchant/batch/v1/modify_batch_details' + APP_AUTH,
            mockUrl: '',
            method: 'POST',
            data: params
        })
    },
    // 视频列表
    videoList(params) {
        return axios({
            mock: false,
            url: 'shadow_deer/list_video_library' + APP_AUTH,
            mockUrl: '',
            method: 'POST',
            data: params
        })
    },
    // 名字检验是否重复
    is_name_repeat(params) {
        return axios({
            mock: false,
            url: 'shadow_deer/is_name_repeat' + APP_AUTH,
            mockUrl: '',
            method: 'POST',
            data: params
        })
    },
    getDuplicatedItems(params) {
        return axios({
            mock: false,
            url: 'merchant/menu/v1/list_duplicated_item' + APP_AUTH,
            mockUrl: '',
            method: 'POST',
            data: params
        })
    },
    pictureList(params) {
        return axios({
            mock: false,
            url: 'merchant/menu/v1/get_menu_page' + APP_AUTH,
            mockUrl: '281/pictureList',
            method: 'POST',
            data: params
        })
    },
    pictureDetailList(params) {
        return axios({
            mock: false,
            url: 'merchant/menu/v2/get_menu_image' + APP_AUTH,
            mockUrl: '281/pictureDetailList',
            method: 'POST',
            data: params
        })
    },
    //商品排序
    changeListSort(params) {
        return axios({
            mock: false,
            url: 'merchant/menu/v1/sort_image' + APP_AUTH,
            mockUrl: '496/sort_image',
            method: 'POST',
            data: params
        })
    },
    //删除图片
    deletePicture(params) {
        return axios({
            mock: false,
            url: 'merchant/menu/v2/remove_menu_image' + APP_AUTH,
            mockUrl: '281/pageChange',
            method: 'POST',
            data: params
        })
    },
    //订单存照列表
    orderList(params) {
        return axios({
            mock: false,
            url: 'cashlog/orderHistoryList' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/427/orderList',
            method: 'POST',
            data: params
        })
    },
    //是否展示会员导出按钮
    isShowMemberExportBtn(params) {
        return axios({
            mock: false,
            url: 'merchant/export/v1/init_page' + APP_AUTH,
            mockUrl: '',
            method: 'GET',
            params
        })
    },

    //发放优惠券
    getCouponType(params) {
        return axios({
            mock: false,
            url: 'coupon/back/v1/getCouponType' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/getCouponType',
            method: 'GET',
            params
        })
    },
    importFileList(params) {
        return axios({
            mock: false,
            url: 'coupon/back/v1/importFileList' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/importFileList',
            method: 'GET',
            params
        })
    },
    rechargeList(params) {
        return axios({
            mock: false,
            url: 'coupon/back/v1/rechargeList' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/rechargeList',
            method: 'POST',
            data: params
        })
    },
    reupload(params) {
        return axios({
            mock: false,
            url: 'coupon/back/v1/reupload' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/reupload',
            method: 'POST',
            data: params
        })
    },
    deleteBatch_(params) {
        return axios({
            mock: false,
            url: 'coupon/back/v1/deleteBatch' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/deleteBatch',
            method: 'POST',
            data: params
        })
    },
    pushProgress(params) {
        return axios({
            mock: false,
            url: 'coupon/back/v1/pushProgress' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/pushProgress',
            method: 'POST',
            data: params
        })
    },
    //获取掌柜侧边栏
    getBossMenuList(params) {
        return axios({
            url:
                merApiPrefix +
                'merchant/function/v1/get_boss_functions' +
                APP_AUTH +
                '&' +
                getUserInfo(true),
            method: 'POST',
            data: params
        })
    },
    //获取高铁侧边栏
    getRailwayMenuList(params) {
        return axios({
            url:
                merApiPrefix +
                'merchant/function/v1/get_railway_functions' +
                APP_AUTH +
                '&' +
                getUserInfo(true),
            method: 'POST',
            data: params
        })
    },
    // 获取不记名优惠券下拉框内容
    getNoOwnerCoupon(params) {
        return axios({
            mock: false,
            url: 'coupon/offline/v1/init' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/pushProgress',
            method: 'POST',
            data: params
        })
    },
    // 不记名优惠券批量激活
    noOwnerCouponActive(params) {
        return axios({
            mock: false,
            url: ' coupon/offline/v1/batchActivate' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/pushProgress',
            method: 'POST',
            data: params
        })
    },
    // 不记名优惠券批量停用
    noOwnerCouponStop(params) {
        return axios({
            mock: false,
            url: 'coupon/offline/v1/batchStop' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/pushProgress',
            method: 'POST',
            data: params
        })
    },
    // 不记名优惠券批量激活
    noOwnerCouponSearch(params) {
        return axios({
            mock: false,
            url: 'coupon/offline/v1/report' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/pushProgress',
            method: 'POST',
            data: params
        })
    },
    // 不记名优惠券查询
    noOwnerSetList(params) {
        return axios({
            mock: false,
            url: 'coupon/offline/v1/report' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/pushProgress',
            method: 'POST',
            data: params
        })
    },
    // 不记名优惠券获取优惠券
    noOwnerGetCoupon(params) {
        return axios({
            mock: false,
            url: 'coupon/offline/v1/couponList' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/pushProgress',
            method: 'POST',
            data: params
        })
    },
    // 商品多规格导入
    uploadSpec: {
        mock: false,
        url: 'merchant/import/item/spec' + APP_AUTH,
        mockUrl:
            'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/pushProgress',
        method: 'POST'
    },
    // 商品无规格导入
    uploadNospec: {
        mock: false,
        url: 'merchant/import/item/no_spec' + APP_AUTH,
        mockUrl:
            'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/pushProgress',
        method: 'POST'
    },
    // 商品信息导出
    exportItems(params) {
        return axios({
            mock: false,
            url: 'merchant/export/v1/retail/sku/menus' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/pushProgress',
            method: 'GET',
            params
        })
    },
    //导入履历查询
    getImportHistoryList(params) {
        console.log('output params', params)
        return axios({
            mock: false,
            url: ' record/v1/query_all' + APP_AUTH,
            mockUrl:
                'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/pushProgress',
            method: 'GET',
            params
        })
    }
}
