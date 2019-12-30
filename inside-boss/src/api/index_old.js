import nattyFetch from 'natty-fetch'
import * as bridge from '../utils/bridge'
import {callParent} from '../utils/bridge'
import {currentAPIUrlPrefix, merApiPrefix} from '../utils/env'
import getUserInfo from '../utils/getUserInfo'

import cookie from "@2dfire/utils/cookie";
// import cookie from "@2dfire/utils/cookie";
// import {currentEnvString} from "./networkApi";
const apiContext = nattyFetch.context({
  mock: false,
  urlPrefix: currentAPIUrlPrefix, // eslint-disable-line
  mockUrlPrefix: 'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/',
  withCredentials: false,
  postDataFormat: 'JSON',
  willFetch: (vars, config) => {
    if (!config.mock) {
      // let token = cookie.getItem("new-token");
      // const url = config.url;
      // if (
      //     url.indexOf("get_boss_function") !== -1 ||
      //     url.indexOf("get_railway_functions") !== -1
      // ) {
      //     token = getUserInfo().token;
      // }

      config.header['X-Token'] = getUserInfo().token;

      config.header['token'] = undefined;
      config.header['lang'] = undefined;
      config.header['env'] =undefined;
      // config.header['Accept'] = 'application/vnd.ms-excel;charset=UTF-8';
    }
  },
  fit: res => {
    if (res.code === 0 && res.errorCode === '401') {
      return callParent('logout')
    }

        return {
            success: res.code && res.code === 1,
            content: res.data,
            error: {message: res.message, errorCode: res.errorCode}
        }
    }
})

// 全局 AppKey
const APP_AUTH = '?app_key=200800&s_os=pc_merchant_back'

apiContext.create({
    // 搜索条件
    getSearchFormArgs: {
        url: 'report/queryArgs.json' + APP_AUTH,
        mockUrl: '127/report/queryArgs.json',
        method: 'POST'
    },

    // 报表 chart 结构
    getChartDetails: {
        url: 'report/details.json' + APP_AUTH,
        mockUrl: '127/report/details.json',
        method: 'POST'
    },

    // 报表 chart 数据
    getChartData: {
        url: 'report/data.json' + APP_AUTH,
        mockUrl: '127/report/data.json',
        method: 'POST'
    },

    // "导出 Excel "
    getExcel: {
        url: 'report/exportXls.do' + APP_AUTH,
        mockUrl: '127/report/exportXls.do',
        method: 'POST'
    },

    // 联动下拉框时，异步取数据
    getUnionSelect: {
        url: 'report/lovValues.json' + APP_AUTH,
        mockUrl: '127/report/lovValues.json',
        method: 'POST'
    },
    //获取充值批次列表
    fetchBatchList: {
        mock: false,
        url: 'merchant/batch/v1/get_batch_list' + APP_AUTH,
        mockUrl: '123/getFilesSuccess',
        method: 'GET'
    },
    //删除批次
    deleteBatch: {
        mock: false,
        url: 'merchant/batch/v1/delete_batch' + APP_AUTH,
        mockUrl: '123/deleteBatchSuccess',
        method: 'GET'
    },
    //查询表格数据
    fetchRechargeList: {
        mock: false,
        url: 'merchant/batch/v1/get_batch_details_list_by_query' + APP_AUTH,
        mockUrl: '123/merchant/batch/v1/get_batch_details_list',
        method: 'GET'
    },
    //查询导入日志信息
    getCommTypes: {
        mock: false,
        url: 'merchant/batch/v1/getCommTypes' + APP_AUTH,
        mockUrl: '123/merchant/batch/v1/getCommTypes',
        method: 'GET'
    }, //查询导入日志信息
    getImportLog: {
        mock: false,
        url: 'merchant/import/v1/query_import_operate_Log' + APP_AUTH,
        mockUrl: '123/merchant/batch/v1/get_import_log',
        method: 'GET'
    },
    //查询日志详情
    getImportLogDetail: {
        mock: false,
        url: 'merchant/import/v1/query_import_operate_detail_Log' + APP_AUTH,
        mockUrl: '123/merchant/batch/v1/get_import_log',
        method: 'GET'
    },
    //获取商家可选择的类目列表
    getCategory: {
        mock: false,
        url: 'merchant/import/v1/query_category' + APP_AUTH,
        mockUrl: '123/merchant/batch/v1/get_import_log',
        method: 'GET'
    },
    //下载商品模板
    downloadTemplate: {
        mock: false,
        url: 'merchant/import/v1/create_import_template' + APP_AUTH,
        mockUrl: '123/merchant/import/v1/create_import_template',
        method: 'GET',
        header: {
            Accept:
                'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
        }
    },

    //商品库列表
    getGoodsList: {
        mock: false,
        url: 'merchant/menu/v1/menu_list' + APP_AUTH,
        mockUrl:
            'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/532/merchant/plate/get_plate_list',
        method: 'POST'
    },
    //商品库列表(新)
    getGoodsListNew: {
        mock: false,
        url: 'merchant/menu/v2/menu_list' + APP_AUTH,
        mockUrl:
            'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/532/merchant/plate/get_plate_list',
        method: 'POST'
    },

    //获取数据订正状态
    getIsShowBrand: {
        mock: false,
        url: 'merchant/plate/fixstatus' + APP_AUTH,
        mockUrl:
            'http://mock.2dfire-daily.com/mock-serverapi/mockjs/532/merchant/plate/fixstatus',
        method: 'GET'
    },
    //获取品牌列表
    getBrandList: {
        mock: false,
        url: 'merchant/plate/get_plate_list' + APP_AUTH,
        mockUrl:
            'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/532/merchant/plate/get_plate_list',
        method: 'GET'
    },
    // 交路信息库列表
    getRouteList: {
        mock: false,
        url: 'railway/v1/queryTrains' + APP_AUTH,
        mockUrl: '',
        method: 'POST'
    },
    // 车次时刻信息库列表
    getTrainList: {
        mock: false,
        url: 'railway/v1/queryTrainStations' + APP_AUTH,
        mockUrl: '',
        method: 'POST'
    },
    //充值信息编辑
    rechargeModify: {
        mock: false,
        url: 'merchant/batch/v1/modify_batch_details' + APP_AUTH,
        mockUrl: '',
        method: 'POST'
    },
    //批量删除充值信息
    deleteMultiple: {
        mock: false,
        url: 'merchant/batch/v1/delete_batch_details_list' + APP_AUTH,
        mockUrl: '',
        method: 'POST'
    },
    //批量充值
    rechargeMultiple: {
        mock: false,
        url: 'merchant/batch/v1/batch_recharge' + APP_AUTH,
        mockUrl: '',
        method: 'POST'
    },
    //批量红冲
    refund: {
        mock: false,
        url: 'merchant/batch/v1/cancel_charge_card' + APP_AUTH,
        mockUrl: '',
        method: 'POST'
    },
    //删除单个
    deleteSingle: {
        mock: false,
        url: 'merchant/batch/v1/delete_batch_details' + APP_AUTH,
        mockUrl: '',
        method: 'POST'
    },
    modifyInfo: {
        mock: false,
        url: 'merchant/batch/v1/modify_batch_details' + APP_AUTH,
        mockUrl: '',
        method: 'POST'
    },
    // 视频列表
    videoList: {
        mock: false,
        url: 'shadow_deer/list_video_library' + APP_AUTH,
        mockUrl: '',
        method: 'POST'
    },
    // 名字检验是否重复
    is_name_repeat: {
        mock: false,
        url: 'shadow_deer/is_name_repeat' + APP_AUTH,
        mockUrl: '',
        method: 'POST'
    },

    pictureList: {
        mock: false,
        url: 'merchant/menu/v1/get_menu_page' + APP_AUTH,
        mockUrl: '281/pictureList',
        method: 'POST'
    },
    pictureDetailList: {
        mock: false,
        url: 'merchant/menu/v2/get_menu_image' + APP_AUTH,
        mockUrl: '281/pictureDetailList',
        method: 'POST'
    },
    //商品排序
    changeListSort: {
        mock: false,
        url: 'merchant/menu/v1/sort_image' + APP_AUTH,
        mockUrl: '496/sort_image',
        method: 'POST'
    },
    //删除图片
    deletePicture: {
        mock: false,
        url: 'merchant/menu/v2/remove_menu_image' + APP_AUTH,
        mockUrl: '281/pageChange',
        method: 'POST'
    },
    //订单存照列表
    orderList: {
        mock: false,
        url: 'cashlog/orderHistoryList' + APP_AUTH,
        mockUrl:
            'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/427/orderList',
        method: 'POST'
    },
    //是否展示会员导出按钮
    isShowMemberExportBtn: {
        mock: false,
        url: 'merchant/export/v1/init_page' + APP_AUTH,
        mockUrl: '',
        method: 'GET'
    },

    //发放优惠券
    getCouponType: {
        mock: false,
        url: 'coupon/back/v1/getCouponType' + APP_AUTH,
        mockUrl:
            'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/getCouponType',
        method: 'GET'
    },
    importFileList: {
        mock: false,
        url: 'coupon/back/v1/importFileList' + APP_AUTH,
        mockUrl:
            'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/importFileList',
        method: 'GET'
    },
    rechargeList: {
        mock: false,
        url: 'coupon/back/v1/rechargeList' + APP_AUTH,
        mockUrl:
            'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/rechargeList',
        method: 'POST'
    },
    reupload: {
        mock: false,
        url: 'coupon/back/v1/reupload' + APP_AUTH,
        mockUrl:
            'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/reupload',
        method: 'POST'
    },
    deleteBatch_: {
        mock: false,
        url: 'coupon/back/v1/deleteBatch' + APP_AUTH,
        mockUrl:
            'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/deleteBatch',
        method: 'POST'
    },
    pushProgress: {
        mock: false,
        url: 'coupon/back/v1/pushProgress' + APP_AUTH,
        mockUrl:
            'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/pushProgress',
        method: 'POST'
    },
    //获取掌柜侧边栏
    getBossMenuList: {
        url:
        merApiPrefix +
        'merchant/function/v1/get_boss_functions' +
        APP_AUTH +
        '&' +
        getUserInfo(true),
        method: 'POST'
    },
    //获取高铁侧边栏
    getRailwayMenuList: {
        url:
        merApiPrefix +
        'merchant/function/v1/get_railway_functions' +
        APP_AUTH +
        '&' +
        getUserInfo(true),
        method: 'POST'
    },
    // 获取不记名优惠券下拉框内容
    getNoOwnerCoupon: {
        mock: false,
        url: 'coupon/offline/v1/init' + APP_AUTH,
        mockUrl: 'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/pushProgress',
        method: 'POST'
    },
    // 不记名优惠券批量激活
    noOwnerCouponActive: {
        mock: false,
        url: ' coupon/offline/v1/batchActivate' + APP_AUTH,
        mockUrl: 'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/pushProgress',
        method: 'POST'
    },
    // 不记名优惠券批量停用
    noOwnerCouponStop: {
        mock: false,
        url: 'coupon/offline/v1/batchStop' + APP_AUTH,
        mockUrl: 'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/pushProgress',
        method: 'POST'
    },
    // 不记名优惠券批量激活
    noOwnerCouponSearch: {
        mock: false,
        url: 'coupon/offline/v1/report' + APP_AUTH,
        mockUrl: 'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/pushProgress',
        method: 'POST'
    },
    // // 不记名优惠券查询
    // noOwnerSetList: {
    //     mock: false,
    //     url: 'coupon/offline/v1/report' + APP_AUTH,
    //     mockUrl: 'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/pushProgress',
    //     method: 'POST'
    // },
    // 不记名优惠券获取优惠券
    noOwnerGetCoupon: {
        mock: false,
        url: 'coupon/offline/v1/couponList' + APP_AUTH,
        mockUrl: 'http://mock.2dfire-daily.com/mock-serverapi/mockjsdata/481/pushProgress',
        method: 'POST'
    }
})

export default apiContext.api
