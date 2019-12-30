/* eslint-disable */
/**
 * App Actions
 *
 * 位于 `/src/container/App` 下的 action 是相对于全局使用，集成错误提示、弹窗等。
 */
import React from 'react'
import api from '../api'
import apiNetwork from '../api/networkApi'
import uploadApi from '../api/uploadApi'
import * as bridge from '../utils/bridge'
import { message as MessageComponent, Modal } from 'antd'
import { currentAPIUrlPrefix } from '../utils/env'
import {hashHistory} from 'react-router'
import Cookie from '@2dfire/utils/cookie'

const APP_AUTH = '?app_key=200800&s_os=pc_merchant_back'

import ActionTypes from './type'

/******************************************************
 * 全局
 */

import { GLOBAL_LOADING, GLOBAL_LOADING_HIDE } from '../constants'

export const globalMessageError = message => dispatch => {
  MessageComponent.error(message)
}

export const globalMessageSuccess = message => dispatch => {
  MessageComponent.success(message)
}

export const globalLoading = () => ({
  type: GLOBAL_LOADING
})

export const globalLoadingHide = () => ({
  type: GLOBAL_LOADING_HIDE
})

export const errorHandler = err => dispatch => {
  if (err.status && err.status > 200) {
    dispatch(globalMessageError('服务器连接失败，请稍后重试'))
    return
  }

  dispatch(globalMessageError(err.message))
}
export const successHandler = (message) => dispatch => {
    dispatch(globalMessageSuccess(message))
}

/**
 * ****************************************************
 * 导入导出模块
 */

import {
  INIT_DATA, 
  SHOW_SPIN, 
  INIT_DATA_IMPORT_HISTORY,
  SET_WHITE, 
  SET_TEBLE_FIELDS_LIST, 
  SET_TABLE_FIELDS_OPTIONS, 
  SET_TABLE_OPTION_KEY, 
  SET_MENU_LIST, 
  SET_MODAL_VISIBLE, 
  SET_RESULT_DATA, 
  SET_TABLE_HEADER, 
  SET_MENU_LANGUAGE,
  SET_TWINS_FILEDID,
  SET_GOODS_PARAMS,
  SET_HISTORY_DATA
} from '../constants'
import FormatImportOrExport from '../components/goods/format'

export const initData = data => ({
  type: INIT_DATA,
  data
})
export const initDataImportHostory = (data) => ({
    type: INIT_DATA_IMPORT_HISTORY,
    data
})

export const showSpin = data => ({
  type: SHOW_SPIN,
  data
})


export const setWhite = data => ({
    type: SET_WHITE,
    data
})

export const setMenuList = data=>({
  type: SET_MENU_LIST,
  data
})

export const setModalVisible = data=>({
  type: SET_MODAL_VISIBLE,
  data
})

export const setResultData = data=>({
  type: SET_RESULT_DATA,
  data
})

export const setHistoryData = data=>({
  type: SET_HISTORY_DATA,
  data
})

export const setTableHeader = data =>({
  type: SET_TABLE_HEADER,
  data
})

export const setMenuLanguage = data=>({
  type: SET_MENU_LANGUAGE,
  data
})

export const setTwinsFiledId = data=>({
  type: SET_TWINS_FILEDID,
  data
})
export const setGoodsParams = data =>({
  type: SET_GOODS_PARAMS,
  data
})
export const setTableFiledOptions = data =>({
  type: SET_TABLE_FIELDS_OPTIONS,
  data
})

export const checkWhiteList = () => dispatch => {
    apiNetwork.checkWhiteList().then(
        res => {
            console.log('output',res);
            dispatch(setWhite(res.data))
            dispatch((getIsShowBrand('',res.data)))
        },
        err => {
            dispatch(errorHandler(err))
        }
    ).then(
        e => {
            dispatch(showSpin({
                bool: false,
                content: ''
            }))
        }
    )
}
//获取历史记录
export const getImportResultList = (plateEntityId,pageIndex = 1)=>(dispatch)=>{
  const params = {
    plateEntityId,
    gridType:'1',
    pageSize: 10,
    pageIndex
  }
 apiNetwork.getImportResultList(params).then(res=>{
   if(res.data){
     const data = []
     res.data.list.map((i,index)=>{
      data.push({
        key:index,
        createTime: i.createTime || '',
        successAdd: i.successAdd || 0,
        success: i.success || 0,
        successUpdate: i.successUpdate || 0,
        failed: i.failed || 0,
        successFilePath: i.successFilePath || '',
        failedFilePath: i.failedFilePath || '',
      })
     })
     dispatch(setHistoryData({data: data,total:res.data.total}))
   }
 },err=>{
    dispatch(errorHandler(err))
 }) 
}

//查询双语设置
export const canSetupMenuLanguage = (plateEntityId)=> dispatch =>{
    apiNetwork.canSetupMenuLanguage({plateEntityId}).then(res=>{
      dispatch(setMenuLanguage(res.data))
    },err=>{
      console.log(err)
    })
}

//下载空白模板
export const startDownload = ({kindMenuIdList,plateEntityId})=>(dispatch)=>{
  const params = {
    kindMenuIdList: kindMenuIdList,
    gridType: '1',
    plateEntityId: plateEntityId
  }
  return apiNetwork.setupTemplate(params)
  // apiNetwork.setupTemplate(params).then(res=>{
  //   if(res.data){
  //     window.location.href = res.data
  //   }
  // },err=>{
  //   dispatch(errorHandler(err))
  // })
}

//保存选择字段
export const batchCreatUserGridField = ({data,plateEntityId,gridType=1}) => (dispatch)=>{
  const params = {
    gridType,
    gridFieldIds:[].concat(data),
    plateEntityId
  }
  apiNetwork.batchCreatUserGridField(params).then(res=>{
    if(res.data){
      // MessageComponent.success('字段保存成功')
      console.log(res.data)
    }
  },err=>{
    dispatch(errorHandler(err))
  })
}

//导入导出模板字段状态更新
export const setTableOptionKey = (key,list)=>(dispatch)=>{
 dispatch({
   type:SET_TABLE_OPTION_KEY,
   data: {key,list}
 }) 
}

export const flatDeep= arr => {
  return arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatDeep(b) : b), [])
}

const createInfo = (list=[],dispatch,type=false)=>{
  let obj = {},twinsFiledIdList = {}
  list.map(i=>{
        obj[i.groupName] = {
          defaultList:[],
          selectedList:[],
          allList:[],
          toggleList:[]
        }
        let itemList = i.children ? i.fields.concat(i.children.map(h=>h.fields)): [].concat(i.fields)
        // itemList.flat(Infinity).map(j=>{
          flatDeep(itemList).map( j=>{
          if ( j.isDisabled && j.isSelected ){
            obj[i.groupName]['defaultList'].push(j.gridFieldId)
          }
          if (j.isSelected && j.relType != "22" ){
            obj[i.groupName]['selectedList'].push(j.gridFieldId)
          }
          if(j.childrenFidldId && j.childrenFidldId != '0' ){
            obj[i.groupName]['toggleList'].push({parentKey:j.gridFieldId,childKey:j.childrenFidldId})
          }
          if(j.twinsFiledId && j.twinsFiledId != '0'){
            twinsFiledIdList[j.twinsFiledId] = j.gridFieldId
          }
          //过滤掉relType == 22 和 （isDisable == true && isSelected == false ）的
          if(j.relType != "22" && !(j.isDisabled && !j.isSelected )){
            obj[i.groupName]['allList'].push(j.gridFieldId)
          }
        })
    })
    if(type){
      const data = []
      Object.values(obj).map(i=>{
        data = data.concat(i.selectedList)
      })
      dispatch(setTableHeader(data))
    }else{
      dispatch(setTwinsFiledId(twinsFiledIdList))
      dispatch(setTableFiledOptions(obj))
      dispatch({
        type: SET_TEBLE_FIELDS_LIST,
        data: list
      })
    }
}

//获取空白模板字段信息
export const getTableFieldsList = ({plateEntityId,MenuLanguage=false})=>(dispatch)=>{
    const params = {
      gridType:1,
      plateEntityId
    }
    apiNetwork.queryUserGridFieldForDisplay(params).then(res=>{
      const data = FormatImportOrExport.formatTableHeader(res.data,MenuLanguage,false,plateEntityId)
      createInfo(data,dispatch)
    },err=>{
      dispatch(errorHandler(err))
    })
}

//获取自定义表头字段
export const getCustomTableHeader = (plateEntityId,type=true,MenuLanguage)=> dispatch =>{
    const params = {
      gridType:2,
      plateEntityId
    }
    apiNetwork.queryUserGridFieldForDisplay(params).then(res=>{
      const data = FormatImportOrExport.formatTableHeader(res.data,MenuLanguage,true,plateEntityId)
      createInfo(data,dispatch,type)
    },err=>{
      dispatch(errorHandler(err))
    })
}

//重置表格字段
export const resetFromFieldsList=(plateEntityId,MenuLanguage)=>(dispatch)=>{
  const params = {
    plateEntityId,
    gridType:1,
  }
  apiNetwork.createResetForDisplay(params).then(res=>{
    const data = FormatImportOrExport.formatTableHeader(res.data,MenuLanguage,false,plateEntityId)
    createInfo(data,dispatch)
  },err=>{
    dispatch(errorHandler(err))
  })
}

//获取分类信息
export const getMenuTree = (plateEntityId='')=> dispatch =>{
  const entrance = JSON.parse(decodeURIComponent(Cookie.getItem('entrance')))
  const params = {
    isInclude: 0,
    plateEntityId: plateEntityId,
    opEntityId: plateEntityId?'':entrance.shopInfo.entityId
  }
  apiNetwork.kindMenuTreeSelect(params).then(res=>{
    if(res.data){
      const data = res.data.map(item=>{
        let obj = {
          addSub:item.addSub,
          entityId:item.entityId, 
          id:item.id,
          isInclude:item.isInclude,
          name:item.name,
        }
        if(item.subList){
          obj.subList = [].concat(item.subList)
        }
        return obj
    })
      dispatch(setMenuList(data))
    }
  },err=>{
    dispatch(errorHandler(err))
  })
}


/**
 * ****************************************************
 * 商品库列表
 */
import {
    SET_GOODS_LIST,
    SET_PAGE_INDEX,
    SET_IS_SHOW_BRAND,
    SET_BRAND_LIST,
    SET_BRAND_ID,
    SET_SHOW_SPECIFICATION
} from '../constants'

export const setGoodsList = data => ({
  type: SET_GOODS_LIST,
  data
})

export const setPageIndex = data => ({
  type: SET_PAGE_INDEX,
  data
})

/**
 * 判断是否显示品牌（新版本或者旧版本）
 * */
export const setIsShowBrand = data => ({
  type: SET_IS_SHOW_BRAND,
  data
})
/**
 * 获取数据订正状态(是否显示品牌)
 * type ：1是图片管理
 * */
export const getIsShowBrand = (type,inWhite) => dispatch => {
    api.getIsShowBrand().then(
        res => {
            dispatch(setIsShowBrand(res))
            if (res === 'fixed') {
                dispatch(getBrandList(type))
            } else {
                if(!!!inWhite) {
                  dispatch(getCustomTableHeader())
                  dispatch(getMenuTree())
                  dispatch(canSetupMenuLanguage())
                  dispatch(getGoodsList(1))
                }
                dispatch(getShowSpecification())
                if(type === 1) {
                    dispatch(getPictureList(1))
                }
            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    ).then(
        e => {
            dispatch(showSpin({
                bool: false,
                content: ''
            }))
      },
      err => {
        dispatch(errorHandler(err))
      }
    )
    .then(e => {
      dispatch(showSpin({ bool: false, content: '' }))
    })
}
/**
 * 获取品牌列表
 * type 1图片
 * */

export const getBrandList = (type) => dispatch => {
    api.getBrandList().then(
        res => {
            // res=[{entityId: "99925699",
            //     name: "品牌一"}];
            dispatch(setBrandList(res));
            console.log(res)
            if (res.length === 1) {
                dispatch(setBrandId(res[0].entityId))
              //  type===1?dispatch(getPictureList(1, '',res[0].entityId)): dispatch(getGoodsList(1, res[0].entityId))
              if(type === 1){
                dispatch(getPictureList(1, '',res[0].entityId))
              }else{
                dispatch(getGoodsList(1, res[0].entityId))
                dispatch(getMenuTree(res[0].entityId))
                dispatch(getCustomTableHeader(res[0].entityId))
                dispatch(canSetupMenuLanguage(res[0].entityId))
              }
            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    ).then(
        e => {
            dispatch(showSpin({
                bool: false,
                content: ''
            }))
      },
      err => {
        dispatch(errorHandler(err))
      }
    )
    .then(e => {
      dispatch(showSpin({ bool: false, content: '' }))
    })
}
export const setBrandList = data => ({
  type: SET_BRAND_LIST,
  data
})
/**
 * 获取是否可设置多规格商品
 * */
export const getShowSpecification = () => dispatch => {
    apiNetwork.getShowSpecification().then(
        res => {
            res=true
            dispatch(setShowSpecification(res))
        },
        err => {
            dispatch(errorHandler(err))
        }
    ).then(
        e => {
            dispatch(showSpin({bool: false, content: ''}))
        }
    )
}
export const setShowSpecification = (data) => ({
    type: SET_SHOW_SPECIFICATION,
    data
})

/**
 * 设置品牌id
 * @param data string 当前选中品牌
 * */
export const setBrandId = data => ({
  type: SET_BRAND_ID,
  data
})
/**
 * 获取商品列表
 * @param pageNumber 分页
 * @param brandId 当前选中品牌id，不是必须
 * */
export const getGoodsList = (pageNumber, brandId, params) => dispatch => {
    let data = {
        pageSize: 10,
        pageNum: pageNumber,
        ...params
    };
    const entrance = JSON.parse(decodeURIComponent(Cookie.getItem('entrance')))
    if( entrance && entrance.shopInfo && entrance.shopInfo.industry != 3 ){
      data.plateEntityId = brandId || ''
      apiNetwork.listItemDetail(data).then(
        res => {
            const data = FormatImportOrExport.formatTableMain(res.data)
            dispatch(setGoodsList(data))
        },
        err => {
            dispatch(errorHandler(err))
        }
      ).then(
        e => {
            dispatch(showSpin({bool: false, content: ''}))
        }
      )
    }else{
      if (brandId) {
          data.plateEntityId = brandId;
          api.getGoodsListNew(data).then(
              res => {
                  dispatch(setGoodsList(res))
              },
              err => {
                  dispatch(errorHandler(err))
              }
          ).then(
              e => {
                  dispatch(showSpin({bool: false, content: ''}))
              }
          )
      } else {
          api.getGoodsList(data).then(
              res => {
                  // res.records.map((val) => {
                  //     val.specification = true;
                  //     return val
                  // })
                  dispatch(setGoodsList(res))
              },
              err => {
                  dispatch(errorHandler(err))
              }
          ).then(
              e => {
                  dispatch(showSpin({bool: false, content: ''}))
              }
          )
      }
    }


}
/**
 * ****************************************************
 * 交路信息导入导出
 */
import { INIT_ROUTE_DATA, SET_ROUTE_LIST, SET_CUR_INDEX } from '../constants'

export const initRouteData = data => ({
  type: INIT_ROUTE_DATA,
  data
})
export const setRouteList = data => ({
  type: SET_ROUTE_LIST,
  data
})

export const setCurIndex = data => ({
  type: SET_CUR_INDEX,
  data
})

export const getRouteList = pageNumber => dispatch => {
  api
    .getRouteList({
      pageSize: 10,
      pageNum: pageNumber
    })
    .then(
      res => {
        dispatch(setRouteList(res))
      },
      err => {
        dispatch(errorHandler(err))
      }
    )
    .then(e => {
      dispatch(showSpin({ bool: false, content: '' }))
    })
}

/**
 * ****************************************************
 * 车次时刻信息导入导出
 */
import { INIT_TRAIN_DATA, SET_TRAIN_LIST, SET_CUR_NUM } from '../constants'

export const initTrainData = data => ({
  type: INIT_TRAIN_DATA,
  data
})
export const setTrainList = data => ({
  type: SET_TRAIN_LIST,
  data
})

export const setCurNum = data => ({
  type: SET_CUR_NUM,
  data
})

export const getTrainList = pageNumber => dispatch => {
  api
    .getTrainList({
      pageSize: 10,
      pageNum: pageNumber
    })
    .then(
      res => {
        dispatch(setTrainList(res))
      },
      err => {
        dispatch(errorHandler(err))
      }
    )
    .then(e => {
      dispatch(showSpin({ bool: false, content: '' }))
    })
}

/**
 * ****************************************************
 * 根据类目下载商品模板
 */

import {
  INIT_TYPE_DATA,
  CHECK_TYPE,
  DEL_TABLE_ITEM,
  CHECKED_TYPE,
  ADD_CATEGORY
} from '../constants'

// 初始化类目数据
export const initTypeData = data => ({
  type: INIT_TYPE_DATA,
  data
})

export const addCatrgory = data => ({
  type: ADD_CATEGORY,
  data
})

//获取类目数据
export const getCategory = ({ entityId }, name) => dispatch => {
  api
    .getCategory({
      entityId: entityId,
      name: name || null
    })
    .then(
      res => {
        console.log(res)

        dispatch(addCatrgory(res))
      },
      err => {
        console.log('err!!', err)

        MessageComponent.info(err.message)
      }
    )
    .then(e => {
      dispatch(showSpin({ bool: false, content: '' }))
    })
}
export const checkedType = data => ({
  type: CHECKED_TYPE,
  data
})
export const delTableItem = data => ({
  type: DEL_TABLE_ITEM,
  data
})
/**
 * ****************************************************
 * 上传商品模板文件
 */

import { INIT_UPLOAD_DATA } from '../constants'

// 初始化上传文件的地址和下载模板的地址
export const initUploadData = data => ({
  type: INIT_UPLOAD_DATA,
  data
})

/**
 * ****************************************************
 * 导入日志
 */

import {
  INIT_IMPORT_LOG_DATA,
  GET_IMPORT_LOG_DATA,
  INIT_LOG_DETAIL_DATA,
  INIT_LOG_DATA
} from '../constants'

export const InitLogData = data => ({
  type: INIT_LOG_DATA,
  data
})
export const InitImportLogData = data => ({
  type: INIT_IMPORT_LOG_DATA,
  data
})
export const InitLogDetailData = data => ({
  type: INIT_LOG_DETAIL_DATA,
  data
})
export const getImportLogData = data => ({
  type: GET_IMPORT_LOG_DATA,
  data
})

export const getImportLogByPage = (
  { entityId, businessType },
  pageIndex,
  pageSize
) => dispatch => {
  dispatch(showSpin({ bool: true, content: '正在加载数据....' }))
  api
    .getImportLog({
      start: pageIndex || 1,
      limit: pageSize || 15,
      entityId: entityId,
      businessType: businessType
    })
    .then(
      res => {
        sessionStorage.setItem('pageIndex', pageIndex)
        console.log('res', res.bizLogList)
        dispatch(InitImportLogData(res))
      },
      err => dispatch(InitImportLogData([]))
    )
    .then(e => {
      dispatch(showSpin({ bool: false, content: '' }))
    })
}

export const getImportLogDetail = (logId, pageIndex, pageSize) => dispatch => {
  api
    .getImportLogDetail({
      start: pageIndex || 1,
      limit: pageSize || 15,
      bizLogId: logId
    })
    .then(
      res => {
        dispatch(InitLogDetailData(res))
      },
      err => dispatch(InitLogDetailData([]))
    )
    .then(e => {
      dispatch(showSpin({ bool: false, content: '' }))
    })
}

/**
 * ******************************************************
 * 会员卡批量充值
 */
import {
  FETCH_BATCH_LIST,
  FETCH_RECHARGE_LIST,
  RECHARGE_IMPORT_EVENT,
  SHOW_EDIT_LAYER,
  SET_SELECTED_COUNTER,
  SET_SELECTED_ROW_KEYS,
  BTN_LOCK,
  SET_STATUS,
  SET_LAYER_DEFAULT_VALUES,
  SET_START_VALUE,
  SET_END_VALUE
} from '../constants'

export const btnLock = data => ({
  type: BTN_LOCK,
  data
})

export const updateBatchList = list => ({
  type: FETCH_BATCH_LIST,
  list: list
})

export const fetchBatchList = dispatch => {
  dispatch(globalLoading())
  sessionStorage.setItem('dropDownButtonLock', 'loading')
  api
    .fetchBatchList()
    .then(
      res => dispatch(updateBatchList(res)),
      err => dispatch(errorHandler(err))
    )
    .then(e => {
      dispatch(globalLoadingHide())
      sessionStorage.setItem('dropDownButtonLock', '')
    })
}

export const deleteBatch = value => dispatch => {
  dispatch(globalLoading())
  api
    .deleteBatch({
      rechargeBatchId: value
    })
    .then(
      res => {
        const oldBatchId = sessionStorage.getItem('oldBatchId')
        if (oldBatchId === value) {
          window.location.reload()
        } else {
          MessageComponent.success('删除成功！', 2)
        }
      },
      err => dispatch(errorHandler(err))
    )
    .then(e => {
      dispatch(globalLoadingHide())
    })
}

export const updateRechargeList = data => ({
  type: FETCH_RECHARGE_LIST,
  data
})

export const setStartValue = value => ({
  type: SET_START_VALUE,
  value
})

export const setEndValue = value => ({
  type: SET_END_VALUE,
  value
})

/**
 * [充值列表模块，查询表格数据接口]
 * @param  {[type]} options.batchId    [批次id]
 * @param  {[type]} options.startTime  [开始时间]
 * @param  {[type]} options.endTime    [截止时间]
 * @param  {[type]} options.statusList [包含选取充值状态的列表]
 * @param  {[type]} options.pageSize      [每页条数]
 * @param  {[type]} options.pageIndex  [页码]
 * @return {[type]}                    [description]
 */
export const fetchRechargeList = ({
  rechargeBatchId,
  startTime,
  endTime,
  rechargeStatusList,
  pageSize,
  pageIndex,
  tag
}) => dispatch => {
  dispatch(showSpin({ bool: true, content: '正在加载数据....' }))
  api
    .fetchRechargeList({
      rechargeBatchId: rechargeBatchId,
      startTime: startTime,
      endTime: endTime,
      rechargeStatusList: rechargeStatusList,
      pageSize: pageSize,
      pageIndex: pageIndex
    })
    .then(
      res => {
        sessionStorage.setItem('oldBatchId', rechargeBatchId)
        const list = res.rechargeBatchDetailsViewList || []
        if (list.length === 0) {
          MessageComponent.warning('查询结果为空！')
        }

        dispatch(updateRechargeList(res))
        dispatch(setSelectedCounter(0))
        if (tag === 'fromBatchSelector') {
          dispatch(setStartValue(0))
          dispatch(setEndValue(0))
          sessionStorage.setItem('endTime', 0)
          sessionStorage.setItem('startTime', 0)
        }
        if (tag === 'fromSearchBtn') {
          sessionStorage.setItem('pageSize', 50)
        }
      },
      err => dispatch(errorHandler(err))
    )
    .then(e => {
      dispatch(btnLock({ name: 'search', bool: false }))
      dispatch(showSpin({ bool: false, content: '' }))
    })
}

export const rechargeImportEvent = data => ({
  type: RECHARGE_IMPORT_EVENT,
  data: data
})

export const showEditLayer = data => ({
  type: SHOW_EDIT_LAYER,
  data: data
})

export const rechargeMultiple = ({
  rechargeBatchId,
  startTime,
  endTime,
  rechargeStatusList,
  pageSize,
  pageIndex,
  rechargeBatchDetailsVoList
}) => dispatch => {
  dispatch(showSpin({ bool: true, content: '充值中......' }))
  api
    .rechargeMultiple({
      rechargeBatchId: rechargeBatchId,
      startTime: startTime,
      endTime: endTime,
      rechargeStatusList: rechargeStatusList,
      pageSize: pageSize,
      pageIndex: pageIndex,
      rechargeBatchDetailsVoList: rechargeBatchDetailsVoList
    })
    .then(
      res => {
        dispatch(updateRechargeList(res))
        dispatch(setSelectedCounter(0))
        Modal.info({
          title: '充值信息',
          content: (
            <div>
              {(() => {
                if (!res.failNum) {
                  return (
                    <p>
                      {res.successNum}
                      条数据充值成功
                    </p>
                  )
                } else if (!res.successNum) {
                  return (
                    <p>
                      {res.failNum}
                      条数据充值失败
                    </p>
                  )
                } else {
                  return (
                    <p>
                      {res.successNum}
                      条数据充值成功，
                      {res.failNum}
                      条数据充值失败
                    </p>
                  )
                }
              })()}
            </div>
          )
        })
      },
      err => {
        if (err.status && err.status > 200) {
          dispatch(globalMessageError('服务器连接失败，请稍后重试'))
          return
        }

        Modal.info({
          title: '错误信息',
          content: <p>{err.message}</p>
        })
      }
    )
    .then(e => {
      dispatch(showSpin({ bool: false, content: '' }))
    })
}

export const deleteMultiple = (
  rechargeBatchId,
  startTime,
  endTime,
  rechargeStatusList,
  pageSize,
  pageIndex,
  rechargeBatchDetailsVoList
) => dispatch => {
  dispatch(showSpin({ bool: true, content: '删除中......' }))
  api
    .deleteMultiple({
      rechargeBatchId: rechargeBatchId,
      startTime: startTime,
      endTime: endTime,
      rechargeStatusList: rechargeStatusList,
      pageSize: pageSize,
      pageIndex: pageIndex,
      rechargeBatchDetailsVoList: rechargeBatchDetailsVoList
    })
    .then(
      res => {
        dispatch(updateRechargeList(res))
        dispatch(setSelectedCounter(0))
        MessageComponent.success('删除成功！', 2)
      },
      err => {
        if (err.status && err.status > 200) {
          dispatch(globalMessageError('服务器连接失败，请稍后重试'))
          return
        }

        Modal.info({
          title: '错误信息',
          content: <p>{err.message}</p>
        })
      }
    )
    .then(e => {
      dispatch(showSpin({ bool: false, content: '' }))
    })
}

export const deleteSingle = (
  rechargeBatchId,
  startTime,
  endTime,
  rechargeStatusList,
  pageSize,
  pageIndex,
  id
) => dispatch => {
  dispatch(showSpin({ bool: true, content: '删除中......' }))
  api
    .deleteSingle({
      rechargeBatchId: rechargeBatchId,
      startTime: startTime,
      endTime: endTime,
      rechargeStatusList: rechargeStatusList,
      pageSize: pageSize,
      pageIndex: pageIndex,
      id: id
    })
    .then(
      res => {
        dispatch(updateRechargeList(res))
        dispatch(setSelectedCounter(0))
        MessageComponent.success('删除成功！', 2)
      },
      err => {
        dispatch(errorHandler(err))
      }
    )
    .then(e => {
      dispatch(showSpin({ bool: false, content: '' }))
    })
}

export const refund = ({
  rechargeBatchId,
  startTime,
  endTime,
  rechargeStatusList,
  pageSize,
  pageIndex,
  rechargeBatchDetailsVoList
}) => dispatch => {
  dispatch(showSpin({ bool: true, content: '红冲中......' }))
  api
    .refund({
      rechargeBatchId: rechargeBatchId,
      startTime: startTime,
      endTime: endTime,
      rechargeStatusList: rechargeStatusList,
      pageSize: pageSize,
      pageIndex: pageIndex,
      rechargeBatchDetailsVoList: rechargeBatchDetailsVoList
    })
    .then(
      res => {
        dispatch(updateRechargeList(res))
        dispatch(setSelectedCounter(0))
        Modal.info({
          title: '充值信息',
          content: (
            <div>
              {(() => {
                if (!res.failNum) {
                  return (
                    <p>
                      红冲成功
                      {res.successNum}条
                    </p>
                  )
                } else if (!res.successNum) {
                  return (
                    <p>
                      红冲失败
                      {res.failNum}
                      条，请重新核对后再次红冲
                    </p>
                  )
                } else {
                  return (
                    <p>
                      红冲成功
                      {res.successNum}
                      条，红冲失败
                      {res.failNum}
                      条，请重新核对后红冲
                    </p>
                  )
                }
              })()}
            </div>
          )
        })
      },
      err => {
        if (err.status && err.status > 200) {
          dispatch(globalMessageError('服务器连接失败，请稍后重试'))
          return
        }

        Modal.info({
          title: '错误信息',
          content: <p>{err.message}</p>
        })
      }
    )
    .then(e => {
      dispatch(showSpin({ bool: false, content: '' }))
    })
}

export const setSelectedCounter = len => ({
  type: SET_SELECTED_COUNTER,
  len
})

export const setSelectedRowKeys = selectedRowKeys => ({
  type: SET_SELECTED_ROW_KEYS,
  selectedRowKeys
})

export const modifyInfo = (
  rechargeBatchId,
  startTime,
  endTime,
  rechargeStatusList,
  pageSize,
  pageIndex,
  rechargeBatchDetailsVo,
  form
) => dispatch => {
  api
    .modifyInfo({
      rechargeBatchId: rechargeBatchId,
      startTime: startTime,
      endTime: endTime,
      rechargeStatusList: rechargeStatusList,
      pageSize: pageSize,
      pageIndex: pageIndex,
      rechargeBatchDetailsVo: rechargeBatchDetailsVo
    })
    .then(
      res => {
        dispatch(updateRechargeList(res))
        dispatch(setSelectedCounter(0))
        form.resetFields()
        MessageComponent.success('保存成功！', 2)
      },
      err => {
        dispatch(errorHandler(err))
      }
    )
    .then(e => {
      dispatch(btnLock({ name: 'saveModifyBtn', bool: false }))
      dispatch(showEditLayer(false))
    })
}

export const setStatus = list => ({
  type: SET_STATUS,
  list
})

export const setLayerDefaultValues = data => ({
  type: SET_LAYER_DEFAULT_VALUES,
  data
})

// 导入视频
import {
  SET_VIDEO_LIST,
  INIT_VIDEO_DATA,
  CHANGE_VIDEO_TYPE
} from '../constants'

export const setVideoList = data => ({
  type: SET_VIDEO_LIST,
  data
})

export const initVideoData = data => ({
  type: INIT_VIDEO_DATA,
  data
})
export const checkNameResult = data => ({
  type: CHECK_NAME_RESULT,
  data
})
export const getVideoList = (videoType, pageNumber) => dispatch => {
  api
    .videoList({
      videoType: videoType,
      pageSize: 24,
      pageIndex: pageNumber
    })
    .then(
      res => {
        dispatch(setVideoList(res))
      },
      err => {
        dispatch(errorHandler(err))
      }
    )
    .then
    // e => {
    //     // dispatch(btnLock({name: 'saveModifyBtn', bool: false}))
    //     // dispatch(showEditLayer(false))
    // }
    ()
}

export const changeVideoType = data => ({
  type: CHANGE_VIDEO_TYPE,
  data
})

//会员信息导入导出

import {
  INIT_MEMBER_DATA,
  LIST_INIT_DATA,
  SET_MEMBER_EXPORT
} from '../constants'

export const initMemberData = data => ({
  type: INIT_MEMBER_DATA,
  data
})

export const listInitData = data => ({
  type: LIST_INIT_DATA,
  data
})

export const getMemberExportBtn = (
  orderType,
  pageNumber,
  startTime,
  endTime,
  invoiceCode
) => dispatch => {
  api
    .isShowMemberExportBtn()
    .then(
      res => {
        dispatch(setMemberExport(res))
      },
      err => {}
    )
    .then
    // e => {
    //     // dispatch(btnLock({name: 'saveModifyBtn', bool: false}))
    //     // dispatch(showEditLayer(false))
    // }
    ()
}

export const setMemberExport = data => ({
  type: SET_MEMBER_EXPORT,
  data
})

// 商品图片管理

import {
    INIT_PICTURE_DATA,
    DETAIL_CHANGE,
    SET_PICTURE_LIST,
    LIST_DUPLICATED_ITEMS,
    BACK_TO_PICTURE_LIST,
    GET_DUPLICATED_ITEMS,
    SET_PICTURE_DETAIL_LIST,
    SET_PAGE_NUMBER,
    SET_SEARCH_NAME,
    EDIT_TEMPLATE,
    TEMPLATE_DETAIL_DATA,
    TEMPLATE_LIST
} from '../constants'

export const initPictureData = data => ({
  type: INIT_PICTURE_DATA,
  data
})

export const detailChange = data => ({
  type: DETAIL_CHANGE,
  data
})

export const editTemplate = (data) => ({
    type: EDIT_TEMPLATE,
    data
})

export const setTemplateData = (data) => ({
    type: TEMPLATE_DETAIL_DATA,
    data
})

export const setTemplateList = (data) => ({
    type: TEMPLATE_LIST,
    data
})

export const getTemplateList = (entityId, pictureFileId) => dispatch => {
    apiNetwork.getTemplateList({
        page: 1,
        pageSize: 500,
        entityId: entityId,
        itemId: pictureFileId
    }).then(
        res => {
            dispatch(setTemplateList(res))
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}

export const getTemplateDetail = (id, pictureFileId, entityId) => dispatch => {
    apiNetwork.getTemplateDetail({
        entityId: entityId,
        itemId: pictureFileId
    }).then(
        res => {
            dispatch(setTemplateData(res))
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}

export const saveTemplate = (ItemDetailVO, type, pictureFileId, entityId) => dispatch => {
    apiNetwork.saveEditTemplate({
        itemDetailConvertVO: JSON.stringify(ItemDetailVO)
    }).then(
        res => {
            if (res.data) {
                if (type == 1) {//默认、老版本自动刷新状态
                    dispatch(getTemplateList(entityId, pictureFileId))
                } else {
                    dispatch(detailChange({detail: true, pictureFileId: pictureFileId}));
                    dispatch(editTemplate({edit: false}))
                }
            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}


export const setPictureList = (data) => ({
    type: SET_PICTURE_LIST,
    data
})

export const setPictureDetailList = data => ({
  type: SET_PICTURE_DETAIL_LIST,
  data
})

export const setPageNumber = data => ({
  type: SET_PAGE_NUMBER,
  data
})

export const setSearchName = data => ({
  type: SET_SEARCH_NAME,
  data
})

export const backPictureList = (name, entityId) => {
    return dispatch => {
        dispatch({
            type: BACK_TO_PICTURE_LIST,
        })
    }
}

export const getDuplicatedItems = (name, entityId) => {
    return dispatch => {
        return api.getDuplicatedItems({
            pageSize: 24,
            pageNum: 1,
            name,
            plateEntityId:entityId,
        }).then(
            res => {
                dispatch({
                    type: GET_DUPLICATED_ITEMS,
                    data: res,
                })
            },
            err => {
                dispatch(errorHandler(err))
            }
        )
    }
}


export const listDuplicatedItems = () => {
    return dispatch => {
        dispatch({
            type: LIST_DUPLICATED_ITEMS,
        })
    }
}

export const getPictureList = (pageNumber, name ,entityId) => dispatch => {
    api.pictureList({
        pageSize: 24,
        pageNum: pageNumber,
        name,
        plateEntityId:entityId,
    }).then(
        res => {
            dispatch(setPictureList(res))
        },
        err => {
            dispatch(errorHandler(err))
        }
    ).then(
        // e => {
        //     // dispatch(btnLock({name: 'saveModifyBtn', bool: false}))
        //     // dispatch(showEditLayer(false))
        // }
    )
    .then
    // e => {
    //     // dispatch(btnLock({name: 'saveModifyBtn', bool: false}))
    //     // dispatch(showEditLayer(false))
    // }
    ()
}

export const getPictureDetailList = id => dispatch => {
  api
    .pictureDetailList({
      menuId: id
    })
    .then(
      res => {
        dispatch(setPictureDetailList(res))
      },
      err => {
        dispatch(errorHandler(err))
      }
    )
    .then
    // e => {
    //     // dispatch(btnLock({name: 'saveModifyBtn', bool: false}))
    //     // dispatch(showEditLayer(false))
    // }
    ()
}
export const changeListSort = (sortList, callback) => dispatch => {
  api
    .changeListSort({
      menuDetailData: sortList
    })
    .then(
      res => {
        callback(res)
      },
      err => {
        dispatch(errorHandler(err))
      }
    )
    .then
    // e => {
    //     // dispatch(btnLock({name: 'saveModifyBtn', bool: false}))
    //     // dispatch(showEditLayer(false))
    // }
    ()
}

//订单存照
import {
  CHANGE_ORDER_TYPE,
  SET_ORDER_START_VALUE,
  SET_ORDER_END_VALUE,
  SET_ORDER_LIST,
  INIT_ORDER_DATA,
  SET_INVOICE_CODE
} from '../constants'

export const initOrderData = data => ({
  type: INIT_ORDER_DATA,
  data
})

export const changeOrderType = data => ({
  type: CHANGE_ORDER_TYPE,
  data
})

export const setOrderStartValue = value => ({
  type: SET_ORDER_START_VALUE,
  value
})

export const setOrderEndValue = value => ({
  type: SET_ORDER_END_VALUE,
  value
})

export const setInvoiceCode = value => ({
  type: SET_INVOICE_CODE,
  value
})

export const getOrderList = (
  orderType,
  pageNumber,
  startTime,
  endTime,
  invoiceCode
) => dispatch => {
  dispatch(showSpin({ bool: true, content: 'loading....' }))
  api
    .orderList({
      billType: orderType,
      pageSize: 10,
      pageIndex: pageNumber,
      startTime: startTime,
      endTime: endTime,
      invoiceCode: invoiceCode
    })
    .then(
      res => {
        dispatch(setOrderList(res))
      },
      err => {
        dispatch(errorHandler(err))
      }
    )
    .then(e => {
      dispatch(showSpin({ bool: false, content: '' }))
    })
}

export const setOrderList = data => ({
  type: SET_ORDER_LIST,
  data
})

//发放优惠券

import {
  INIT_COUPON_DATA,
  INIT_COUPON_TYPE,
  GET_BATCH_LIST,
  SET_OLD_BATCH_ID,
  RECHARGE_LIST,
  CHANGE_STATUS,
  CHANGE_COUPON_TYPE,
  VISIBLE,
  SHOW
} from '../constants'

export const initCouponData = data => ({
  type: INIT_COUPON_DATA,
  data
})

export const initCouponType = data => ({
  type: INIT_COUPON_TYPE,
  data
})

export const getBatchList = data => ({
  type: GET_BATCH_LIST,
  data
})

export const getCouponType = () => dispatch => {
  api
    .getCouponType({})
    .then(
      res => {
        dispatch(initCouponType(res))
      },
      err => {
        dispatch(errorHandler(err))
      }
    )
    .then(e => {})
}
/**
 * 选择已上传的文件
 * @param type string 'UPLOAD_DEFAULT'表示为优惠券批量发放之后获取默认获取当前上传的内容
 * */
export const fetchImportFileList = type => dispatch => {
  api
    .importFileList({})
    .then(
      res => {
        if (type && type === 'UPLOAD_DEFAULT') {
          const { id } = res.importFileList[res.importFileList.length - 1]
          const rechargeBatchId = id
          const pageSize = 50
          const pageIndex = 1
          dispatch(changeStatus(null))
          dispatch(getRechargeList(rechargeBatchId, null, pageSize, pageIndex))
        } else {
          dispatch(getBatchList(res))
        }
      },
      err => {
        dispatch(errorHandler(err))
      }
    )
    .then(e => {})
}

/**
 * 获取发券列表
 * @param rechargeBatchId string 可fetchImportFileList中获取，props中oldBatchId的值，session storage中oldBatchId的值
 * @param status string 当前发券选中状态，为null的时候为默认
 * @param pageSize number
 * @param pageIndex number
 * */
export const getRechargeList = (
  rechargeBatchId,
  status,
  pageSize,
  pageIndex
) => dispatch => {
  dispatch(showSpin({ bool: true, content: '正在加载数据....' }))
  let pramData = {
    id: rechargeBatchId,
    pageSize: pageSize,
    pageIndex: pageIndex
  }
  if (status) {
    pramData.status = status
  }
  api
    .rechargeList(pramData)
    .then(
      res => {
        dispatch(setOldBatchId(rechargeBatchId))
        sessionStorage.setItem('oldBatchId', rechargeBatchId)
        const list = res.rechargeList || []
        if (list.length === 0) {
          MessageComponent.warning('查询结果为空！')
        }
        dispatch(rechargeList(res))
      },
      err => dispatch(errorHandler(err))
    )
    .then(e => {
      dispatch(showSpin({ bool: false, content: '' }))
    })
}

export const setOldBatchId = data => ({
  type: SET_OLD_BATCH_ID,
  data
})

export const rechargeList = data => ({
  type: RECHARGE_LIST,
  data
})

/**
 * 修改发券选中状态
 * @param data  string   1：发券成功
 *                        2：发券失败
 *                        null：未选状态，默认，getRechargeList中为null则status值不传
 * */
export const changeStatus = data => ({
  type: CHANGE_STATUS,
  data
})

export const changeCouponType = data => ({
  type: CHANGE_COUPON_TYPE,
  data
})

export const reupload = rechargeList => dispatch => {
  dispatch(showSpin({ bool: true, content: '正在加载数据....' }))
  const oldBatchId = sessionStorage.getItem('oldBatchId')
  rechargeList = Array.isArray(rechargeList) ? rechargeList : [rechargeList]
  api
    .reupload({
      rechargeList: JSON.stringify(rechargeList),
      oldBatchId: oldBatchId
    })
    .then(
      res => {
        Modal.info({
          title: '' + '发劵完成',
          onOk: () => {
            dispatch(visible(false))
            dispatch(changeStatus(null))
            const pageSize = 50
            const pageIndex = 1
            dispatch(getRechargeList(oldBatchId, null, pageSize, pageIndex))
          },
          content: (
            <div>
              <p>
                {/*共{res.total}条数据，*/}
                发送成功
                {res.successNum}
                条，发送失败
                {res.failNum}条
              </p>
            </div>
          )
        })
      },
      err => dispatch(errorHandler(err))
    )
    .then(e => {
      dispatch(showSpin({ bool: false, content: '' }))
    })
}

export const visible = data => ({
  type: VISIBLE,
  data
})

export const show = data => ({
  type: SHOW,
  data
})

export const deleteBatch_ = value => dispatch => {
  api
    .deleteBatch_({
      rechargeBatchId: value
    })
    .then(
      res => {
        const oldBatchId = sessionStorage.getItem('oldBatchId')
        if (oldBatchId === value) {
          window.location.reload()
        } else {
          MessageComponent.success('删除成功！', 2)
        }
      },
      err => dispatch(errorHandler(err))
    )
    .then(e => {
      dispatch(fetchImportFileList())
    })
}

export const pushProgress = processId => dispatch => {
  api
    .pushProgress({
      processId: processId
    })
    .then(
      res => {
        sessionStorage.setItem('progressNum', res.process_num)
      },
      err => dispatch(errorHandler(err))
    )
    .then()
}
/**
 * 高铁日常监控
 * */

import { SET_HIGH_MONITOR, INIT_HIGH_MONITOR } from '../constants'

export const setMonitor = data => ({
  type: SET_HIGH_MONITOR,
  data
})
export const initHighMonitor = data => ({
  type: INIT_HIGH_MONITOR,
  data
})
export const getHighMonitor = page => dispatch => {
    apiNetwork.getMonitorList({
      trainInfoQuery: JSON.stringify({
        pageSize: 20,
        pageIndex: page || 1
      })
    })
    .then(
      res => {
        dispatch(setMonitor(res.data))
      },
      err => dispatch(errorHandler(err))
    )
    .then()
}
/**
 * 自定义单据模板
 * */
import {
  INIT_DATA_BILL,
  SET_BILL_STORE_MODAL,
  SET_BILL_STORE_SHOP_LIST,
  SET_BILL_STORE_BRANCH,
  SET_BILL_STORE_PROVINCE,
  SET_BILL_ACTIVE_SHOP,
  SET_ALL_TMPL_TYPE,
  SET_TYPE_TMPL_LIST,
  SET_TYPE_TMPL_TITLE,
  SET_ENTITY_TYPE
} from '../constants'
export const billStoreModelSet = data => ({
  type: SET_BILL_STORE_MODAL,
  data
})
export const initDataBill = data => {
  return{
  type: INIT_DATA_BILL,
  data
}}

export const getAllShopList = data => dispatch => {
    apiNetwork.getAllShopList(data)
    .then(
      res => {
        dispatch(setAllShopList(res.data))
      },
      err => dispatch(errorHandler(err))
    )
    .then()
}
export const setAllShopList = data => ({
  type: SET_BILL_STORE_SHOP_LIST,
  data
})

export const getBranch = page => dispatch => {
  apiNetwork
    .getBranch({})
    .then(
      res => {
        dispatch(setBranch(res.data))
      },
      err => dispatch(errorHandler(err))
    )
    .then()
}
export const setBranch = data => ({
  type: SET_BILL_STORE_BRANCH,
  data
})

export const getAllProvince = page => dispatch => {
  apiNetwork
    .getAllProvince({})
    .then(
      res => {
        dispatch(setAllProvince(res.data))
      },
      err => dispatch(errorHandler(err))
    )
    .then()
}
export const setAllProvince = data => ({
  type: SET_BILL_STORE_PROVINCE,
  data
})

export const setBillActiveShop = data => ({
  type: SET_BILL_ACTIVE_SHOP,
  data
})

// 获取所有的模板分类
export const getAllTmplType = params => dispatch => {
  apiNetwork
    .getAllTmplType(params)
    .then(
      res => {
          dispatch(setAllTmplType(res.data))
          console.log({tmplCode:res.data[0].tmplCodeList[0].tmplCode,entityId:params.entityId})
          dispatch(getTypeTmplList({tmplCode:res.data[0].tmplCodeList[0].tmplCode,entityId:params.entityId,codeName:res.data[0].tmplCodeList[0].codeName}))
      },
      err => dispatch(errorHandler(err))
    )
    .then()
}
export const setAllTmplType = data => ({
  type: SET_ALL_TMPL_TYPE,
  data
})
// 获取所有的模板分类
export const getTypeTmplList = data => dispatch => {
    apiNetwork
        .getTypeTmplList(data)
        .then(
            res => {
                console.log('getTypeTmplList!!',data,'getTypeTmplList!!',res)
                dispatch(setTypeTmplList(res.data))
                dispatch(setTypeTmplTitle(data.codeName))
            },
            err => dispatch(errorHandler(err))
        )
        .then()
}

export const setTypeTmplList = data => ({
    type: SET_TYPE_TMPL_LIST,
    data
})
export const setTypeTmplTitle = data => ({
    type: SET_TYPE_TMPL_TITLE,
    data
})
// 获取店铺分类
export const getEntityType = params => dispatch => {
  apiNetwork
    .getEntityType(params)
    .then(
      res => {
        dispatch(setEntityType(res.data))
        console.log('output setEntityType',res.data);
      },
      err => dispatch(errorHandler(err))
    )
    .then()
}
export const setEntityType = data => ({
  type: SET_ENTITY_TYPE,
  data
})




/**
 * 不记名优惠券
 * */
import {
    SET_NO_OWNER_COUPON,
    INIT_NO_OWNER_COUPON,
    SET_NO_OWNER_COUPON_LIST,
    SET_NO_OWNER_PAGE_NUM,
    SET_SEARCH_PARAM,
    IS_SHOW_SET_PAGE,
    SET_NO_SET_PAGE_NUM,
    SET_NO_OWNER_SET_LIST
} from '../constants/index';


//不记名优惠券初始获取下拉框内容
// export const pushProgress = processId => dispatch => {
export const getNoOwnerCoupon = () => dispatch => {
    // debugger
    api.getNoOwnerCoupon({}).then(
        res => {
            dispatch(setNoOwnerCoupon(res))
        },
        err => dispatch(errorHandler(err))
    ).then(e => {
    })
}
// 设置下拉框查询内容
export const setNoOwnerCoupon = (data) => ({
    type: SET_NO_OWNER_COUPON,
    data
})
// 优惠券初始查询
export const initNoOwnerCoupon = (data) => ({
    type: INIT_NO_OWNER_COUPON,
    data
})
//不记名优惠券查询
export const noOwnerCouponSearch = (data) => dispatch => {
    api.noOwnerCouponSearch({
        ...data
    }).then(
        res => {
            // let res = {
            //     goodsListTotal: 3,
            //     pageNumber: 1,
            //     list: [{
            //         numId: '1',
            //         couponId: 'John Brown',
            //         couponName: '￥300,000.00',
            //         status: 'New York No. 1 Lake Park',
            //         worth: 'New',
            //         endTime: 'New',
            //         store: 'New',
            //         time: 'New',
            //     }, {
            //         numId: '2',
            //         couponId: 'John Brown',
            //         couponName: '￥300,000.00',
            //         status: 'New York No. 1 Lake Park',
            //         worth: 'New',
            //         endTime: 'New',
            //         store: 'New',
            //         time: 'New',
            //     }, {
            //         numId: '3',
            //         couponId: 'John Brown',
            //         couponName: '￥300,000.00',
            //         status: 'New York No. 1 Lake Park',
            //         worth: 'New',
            //         endTime: 'New',
            //         store: 'New',
            //         time: 'New',
            //     }]
            // }
            dispatch(setNoOwnerCouponList(res))
            dispatch(setNoOwnerCouponPageNum(data.pageNumber))
        },
        err => {
            dispatch(errorHandler(err))
        }
    ).then(e => {
    })
}
// 设置优惠券列表
export const setNoOwnerCouponList = (data) => ({
    type: SET_NO_OWNER_COUPON_LIST,
    data
})
//设置优惠券列表页数
export const setNoOwnerCouponPageNum = (data) => ({
    type: SET_NO_OWNER_PAGE_NUM,
    data
})
//设置查找条件
export const setSearchParam = (data) => ({
    type: SET_SEARCH_PARAM,
    data
})
//设置查找条件
export const isShowSetPage = (data) => ({
    type: IS_SHOW_SET_PAGE,
    data
})
//不记名优惠券操作记录查询
export const noOwnerSetList = (data) => dispatch => {
    api.noOwnerGetCoupon({
        ...data
    }).then(
        res => {
            dispatch(setNoOwnerSetList(res))
            dispatch(setNoOwnerSetPageNum(data.pageNumber))
        },
        err => {

            dispatch(errorHandler(err))
        }
    ).then(e => {
    })
}

// 获取banner列表
export const initBannerList = ({ entityId }) => dispatch => (data = {}) => {
    const { page = 1, size = 20 } = data

    apiNetwork.getMallBannerList({
        entityId, pageNo: page, pageSize: size,
    }).then(
        res => {
            return dispatch({
                type: ActionTypes.FETCH_BANNER_LIST_SUCCESS,
                data: res.data
            })
        },
        err => {
            return dispatch({
                type: ActionTypes.FETCH_BANNER_LIST_FAILURE,
                data: err
            })
        }
    ).then()
}

// 编辑banner
export const editBannerItem = ({ entityId, userId }) => dispatch => ({ data = {}, success, failure }) => {
    const { type = 0, form = {} } = data || {}

    apiNetwork.postEditBannerItem({
        entityId, userId, operateType: type, mallBannerReq: JSON.stringify(form)
    }).then(
        res => {
            success && success()
            return dispatch({
                type: ActionTypes.EDIT_BANNER_ITEM_SUCCESS,
                data: res.data
            })
        },
        err => {
            failure && failure(err)
            return dispatch({
                type: ActionTypes.EDIT_BANNER_ITEM_FAILURE,
                data: err
            })
        }
    ).then()
}

// 编辑banner排序
export const editBannerIndex = ({ entityId, userId }) => dispatch => ({ data = {}, success, failure }) => {
    const { editList = [] } = data

    apiNetwork.postEditBannerIndex({
        entityId, userId, mallBannerReqList: JSON.stringify(editList)
    }).then(
        res => {
            success && success()
            return dispatch({
                type: ActionTypes.EDIT_BANNER_INDEX_SUCCESS,
                data: res.data
            })
        },
        err => {
            failure && failure(err)
            return dispatch({
                type: ActionTypes.EDIT_BANNER_INDEX_FAILURE,
                data: err
            })
        }
    ).then()
}

// 获取活动列表
export const initActivityList = ({ entityId }) => dispatch => (data = {}) => {
    const { page = 1, size = 20 } = data

    apiNetwork.getMallActivityList({
        entityId, pageNo: page, pageSize: size,
    }).then(
        res => {
            return dispatch({
                type: ActionTypes.FETCH_ACTIVITY_LIST_SUCCESS,
                data: res.data
            })
        },
        err => {
            return dispatch({
                type: ActionTypes.FETCH_ACTIVITY_LIST_FAILURE,
                data: err
            })
        }
    ).then()
}

// 编辑活动
export const editActivityItem = ({ entityId, userId }) => dispatch => ({ data = {}, success, failure }) => {
    const { type = 0, form = {} } = data || {}
    apiNetwork.postEditActivityItem({
        entityId, userId, operateType: type, mallPromotionReq: JSON.stringify(form)
    }).then(
        res => {
            success && success()
            return dispatch({
                type: ActionTypes.EDIT_ACTIVITY_ITEM_SUCCESS,
                data: res.data
            })
        },
        err => {
            failure && failure(err)
            return dispatch({
                type: ActionTypes.EDIT_ACTIVITY_ITEM_FAILURE,
                data: err
            })
        }
    ).then()
}
/**
 *导入履历
 */
import {
    SET_IMPORT_HISTORY_LIST,
    SET_IMPORT_PAGE_NUM
} from '../constants/index';

export const getImportHistoryList = (data) => dispatch => {
    console.log(data)
    api.getImportHistoryList({
        pageNum: data.pageNum,
        pageSize: 10
    }).then(
        res => {
            console.log(res);
            // res = {
            //     "records": [
            //         {
            //             "date": "2018-12-10",
            //             "hint": "共导入3条，成功2条，失败1条",
            //             "id": "测试内容3q25",
            //             "messageUrl": "http://www.baidu.com/111.txt",
            //             "name": "测试内容810c"
            //         }
            //     ],
            //     "totalRecord": 86207
            // }
            dispatch(setImportHistoryList(res))
            dispatch(setImportPageNum((data.pageNum)))
        },
        err => {
            dispatch(errorHandler(err))
        }
    ).then(e => {
    })
}

export const setImportHistoryList = (data) => ({
    type: SET_IMPORT_HISTORY_LIST,
    data
})

export const setImportPageNum = (data) => ({
    type: SET_IMPORT_PAGE_NUM,
    data
})

import {
    SET_CATEGORY_LIST,
    SET_SPEC_LIST,
    SET_UNIT_LIST,
} from '../constants'
import FormatProperty from '../components/goodsProperty/format'
/**
 * 获取零售的分类列表
 */
export const getCategoryList = () => dispatch => {
    apiNetwork.getCateList({industry: 3}).then(
        res => {
            if(Object.keys(res.data).length>0) {
                const { categoryList } = res.data
                dispatch(setCateList(categoryList))
            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
export const setCateList = (data) => ({
    type: SET_CATEGORY_LIST,
    cateList: FormatProperty.formatCateList(data),
    cateFlat: FormatProperty.formatCateListFlat(data),
})

/**
 * 获取零售的规格列表
 */
export const getSpecList = (industry) => dispatch => {
    apiNetwork.getSpecList({industry}).then(
        res => {
            if(Object.keys(res.data).length>0) {
                const { skuPropertyList = [] } = res.data
                const list = FormatProperty.formatSpec(skuPropertyList)
                dispatch(setSpecList(list))
            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
export const setSpecList = (data) => ({
    type: SET_SPEC_LIST,
    data,
})

/**
 * 获取零售的单位列表
 */
export const getUnitList = (industry) => dispatch => {
    apiNetwork.getUnitList({industry}).then(
        res => {

            if(Object.keys(res.data).length>0) {
                const { unitList = []} = res.data
                dispatch(setUnitList(unitList))
            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
export const setUnitList = (data) => ({
    type: SET_UNIT_LIST,
    data
})

/**
 * 新增规格值
 * @param args
 * @returns {Function}
 */
export const saveSpecName = (args) => dispatch => {
    const { industry, specId, specName, addSpecList=[] } = args
    const params = {
        industry,
        propertyId: specId,
        propertyName: specName,
        valueNames: JSON.stringify(addSpecList)
    }
    apiNetwork.saveSpec(params).then(
        res => {
            if(res.data) {
                dispatch(successHandler('添加成功~'))
                dispatch(getSpecList(industry))
            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}

/**
 * 切换规格值的停用和启用状态
 * @param args
 * @returns {Function}
 */
export const switchSpecItemStatus = (args) => dispatch => {
    const { industry, id, flag, specList } = args
    apiNetwork.specItemSwitch({industry, status: flag, ids: JSON.stringify([id])}).then(
        res => {
            dispatch(successHandler('操作成功~'))
            const list = FormatProperty.updateSpecList(specList, id)
            dispatch(setSpecList(list))
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}

/**
 * 切换规格名称的停用和启用状态
 * @param args
 * @returns {Function}
 */
export const switchSpecNameStatus = (args) => dispatch => {
    const { industry, id, flag, specList } = args
    apiNetwork.specNameSwitch({industry, status: flag, ids: JSON.stringify([id])}).then(
        res => {
            dispatch(successHandler('操作成功~'))
            const list = FormatProperty.updateSpecList(specList, id)
            dispatch(setSpecList(list))
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}

/**
 * 删除单位名称
 * @param args
 * @returns {Function}
 */
export const deleteUnit = (args) => dispatch => {
    const { id, industry } = args
    apiNetwork.deleteUnit({id, industry}).then(
        res => {
            if(res.data) {
                dispatch(successHandler('操作成功~'))
                dispatch(getUnitList(industry))
            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}

/**
 * 新增分类信息
 * @param args
 * @returns {Function}
 */
export const addCate = (args) => dispatch => {
    const {industry} = args
    apiNetwork.saveCate(args).then(
        res => {
            dispatch(successHandler('操作成功~'))
            dispatch(getCategoryList({industry}))
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}

/**
 * 更新分类信息
 * @param args
 * @returns {Function}
 */
export const updateCate = (args) => dispatch => {
    const {industry} = args
    apiNetwork.updateCate(args).then(
        res => {
            dispatch(successHandler('操作成功~'))
            dispatch(getCategoryList({industry}))
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}

/**
 * 删除分类
 * @param args
 * @returns {Function}
 */
export const deleteCate = (args) => dispatch => {
    apiNetwork.deleteCate(args).then(
        res => {
            dispatch(successHandler('操作成功~'))
            dispatch(getCategoryList())
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
/**
 * 获取商品列表
 * @param args
 * @returns {Function}
 */
export const getItemList = (args) => dispatch => {
    const { pageSize = 20, pageIndex, keyword = '', categoryId = '' } = args
    apiNetwork.getItemList({pageSize, pageIndex, keyword, categoryId, searchType: 1}).then(
        res => {
            if(res.data.itemList&&res.data.itemList.length>0) {
                res.data.itemList.forEach((value)=>{
                    value.isRatio = value.isRatio ? '是' : '否'
                    value.isTwoAccount = value.isTwoAccount ? '是' : '否'
                })
                dispatch(setItemList(res.data))
            } else {
                dispatch(setItemList({goodsCategoryList: {
                    categoryList: []
                }}))
            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
/**
 * 验证想删除商品是否是组合商品或者下发商品
 * @param args
 * @returns {Function}
 */
import { SET_CHILD_GOODS_RESULT } from '../constants'
export const getChildGoodResult = (args) => dispatch => {
           const params = {
               req: JSON.stringify({
                   itemType: 0,
                   itemIdList: args.itemIdList
               })
           }
           apiNetwork.getChildGoodResult(params).then(
               res => {
                   if (res.data) {
                       dispatch(setChildGoodResult(res.data))
                   }
               },
               err => {
                   dispatch(errorHandler(err))
               }
           )
       }

export const setChildGoodResult = data => ({
           type: SET_CHILD_GOODS_RESULT,
           data
       })
/**
 * 删除商品
 * @param args
 * @returns {Function}
 */
export const deleteItem = (args) => dispatch => {
    let { idList = [], pageSize = 20, pageIndex, keyword = '', categoryId = '' } = args
    const params = {
        industry:3,
        req: JSON.stringify({
            idList:idList,
            industry: 3
        })
    }
    apiNetwork.deleteItem(params).then(
        res => {
            if(res.data) {
                dispatch(getItemList({pageSize, pageIndex, keyword, categoryId}))
            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}

import {
    SET_ITEM_LIST
} from '../constants'
export const setItemList = (data) => ({
    type: SET_ITEM_LIST,
    data
})
/**
 * 商品多规格导入
 * @param args
 * @returns {Function}
 */
export const uploadSpec = (args) => dispatch => {
    api.uploadSpec(args).then(
        res => {
            dispatch(setUpload(res.data))
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
/**
 * 商品无规格导入
 * @param args
 * @returns {Function}
 */
export const uploadNospec = (args) => dispatch => {
    for (var value of args.values()) {
        console.log(value);
     }
    api.uploadNospec(args).then(
        res => {
            dispatch(setUpload(res.data))
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
/**
 * 商品信息导出
 * @param args
 * @returns {Function}
 */
export const exportItems = (args) => dispatch => {
    let {menu_ids = []} = args
    menu_ids = menu_ids.join(',')
    api.exportItems({menu_ids}).then(
        res => {
            location.href = res
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}

/**
 * 换分类
 * @param args
 * @returns {Function}
 */
export const changeCateSave = (args) => dispatch => {
    let {idList = [], changeCategoryId = '', pageSize = 20, pageIndex, keyword = '', categoryId = '' } = args
    // idList = JSON.stringify(idList)
    const params = {
        industry: 3,
        req: JSON.stringify({
            industry: 3,
            idList,
            categoryId: changeCategoryId
        })
    }
    apiNetwork.changeCategory(params).then(
        res => {
            dispatch(successHandler('操作成功~'))
            dispatch(getItemList({pageSize, pageIndex, keyword, categoryId}))
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
/**
 * 换分类
 * @param args
 * @returns {Function}
 */
export const changeCombinedCateSave = (args) => dispatch => {
    let {idList = [], changeCategoryId = '', pageSize = 20, pageIndex, keyword = '', categoryId = '' } = args
    // idList = JSON.stringify(idList)
    const params = {
        industry: 3,
        req: JSON.stringify({
            industry: 3,
            idList,
            categoryId: changeCategoryId
        })
    }
    apiNetwork.changeCombinedCategory(params).then(
        res => {
            dispatch(successHandler('操作成功~'))
            dispatch(getCombinedGoodsList({ pageSize, pageIndex, keyword, categoryId }))
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
/**
 * 添加单位
 * @param args
 * @returns {Function}
 */
export const addUnit = (args) => dispatch => {
    const { industry, unitName } = args
    apiNetwork.addUnit({industry, name: unitName}).then(
        res => {
            dispatch(getUnitList(industry))
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}

import {
    SET_UPLOAD
} from '../constants'
export const setUpload = (data) => ({
    type: SET_UPLOAD,
    data
})

/**
 *  商品编辑模块  start
 * */
import {
    SET_GOOD_ITEM_DETAIL,
    SET_GOOD_CATEGORY_LIST,
    SET_GOOD_SKU_LIST,
    SET_GOOD_UNIT_LIST,
    SET_FREIGHT_TEMPLATE,
    SET_SELECTED_SKU_LIST,
    SET_SKU_TABLE_DATA,
    SET_GOOD_DETAIL_PICTURE,
    SET_GOOD_HEAD_PICTURE,
    SET_GOOD_STRATEGY,
    SET_GOOD_FACADE
} from '../constants'
import FormatEdit from '../components/goodEdit/format'
import { basename } from 'path';

//拉取商品详情
export const getGoodItemDetail = (id) => dispatch => {
    const args = {
        industry: 3,
        req: JSON.stringify({
            id,
        })
    }
    apiNetwork.getGoodItemDetail(args).then(
        res => {
            const { skuVOList = [], headPicList = [], detailPicList = [] } = res.data
            dispatch(setGoodItemDetail(res.data))
            dispatch(setDetailPicture(detailPicList))
            dispatch(setHeadPicture(headPicList))
            dispatch(setSkuTableData(skuVOList))
            // 将初始sku数据存储起来
            localStorage.setItem('initSkuVOList',JSON.stringify(skuVOList))
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
// 设置商品详情
export const setGoodItemDetail = (data) => ({
    type: SET_GOOD_ITEM_DETAIL,
    data
})
// 设置商品头图
export const setHeadPicture = (data) => ({
    type: SET_GOOD_HEAD_PICTURE,
    data
})
// 设置商品详情图
export const setDetailPicture = (data) => ({
    type: SET_GOOD_DETAIL_PICTURE,
    data
})
// 拉取商品分类
export const getGoodCategory = () => dispatch => {
    apiNetwork.getCateList({
        industry: 3
    }).then(
        res => {
            if(Object.keys(res.data).length>0) {
                dispatch(setGoodCategory(res.data))
            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
// 获取策略
export const getGoodStrategy = () => dispatch => {
  apiNetwork.getStrategy({
    param: JSON.stringify({ shopStrategyType: 1})
  }).then(
      res => {
          if( Object.keys(res).length>0) {
              dispatch(setGoodStrategy(res.data))
          }
      },
      err => {
          dispatch(errorHandler(err))
      }
  )
}
// 获取商品转自建策略
export const getFacadeService = (param) => dispatch => {
  apiNetwork.getFacadeService(param).then(
      res => {
        dispatch(setGoodFacade(res.data))
      },
      err => {
          dispatch(errorHandler(err))
      }
  )
}
// 设置商品分类
export const setGoodCategory = (data) => ({
    type: SET_GOOD_CATEGORY_LIST,
    data
})

// 设置商品策略
export const setGoodStrategy = (data) => ({
  type: SET_GOOD_STRATEGY,
  data
})

// 设置商品转自建策略
export const setGoodFacade = (data) => ({
  type: SET_GOOD_FACADE,
  data
})
/**
 * 拉取商品sku列表
 * @params   queryStatus  0 停用，1 启用 ，-1 全部
 * @params   menuId 商品Id
 */
export const getGoodSkuList = (id, queryStatus) =>  dispatch => {
    apiNetwork.getSpecList({
        industry: 3,
        menuId: id,
        queryStatus
    }).then(
        res => {
            const  { skuPropertyList = [] } = res.data
            const selectedSku = FormatEdit.formatSelectedSku(skuPropertyList)
            dispatch(setGoodSkuList(skuPropertyList))
            dispatch(setSelectedSkuList(selectedSku))
            // 将初始数据保存起来
            localStorage.setItem('initSelectedSku', JSON.stringify(selectedSku))
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
// 设置商品sku列表
export const setGoodSkuList = (data) => ({
    type: SET_GOOD_SKU_LIST,
    data
})
// 设置已选择的规格列表
export const setSelectedSkuList = (data) => ({
    type: SET_SELECTED_SKU_LIST,
    data
})


// 拉取单位列表
/**
 * @params industry 行业，0餐饮，1，3零售
 */
export const getGoodUnitList = (industry) => dispatch => {
    apiNetwork.getUnitList(industry).then(
        res => {
            const { unitList = [] } = res.data
            dispatch(setGoodUnitList(unitList))
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
// 设置单位列表
export const setGoodUnitList = (data) => ({
    type: SET_GOOD_UNIT_LIST,
    data
})

// 拉取运费模版
export const getFreightTemplate = (data) => dispatch => {
    apiNetwork.getFreightTemplate().then(
        res => {
            dispatch(setFreightTemplate(res.data))
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}

// 设置运费模版
export const setFreightTemplate = (data) => ({
    type: SET_FREIGHT_TEMPLATE,
    data
})

// 更新规格table数据
export const setSkuTableData = (data) => ({
    type: SET_SKU_TABLE_DATA,
    data
})

// 新建分类
export const addNewCategory = (data) => dispatch => {
    apiNetwork.saveCate(data).then(
        res => {
            if (res.data) {
                MessageComponent.success('分类新建成功')
            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
// 新建单位
export const addNewUnit = (data) => dispatch => {
    apiNetwork.addUnit({
        industry: 3,
        name: data
    }).then(
        res => {
            if (res.data) {
                MessageComponent.success('单位新建成功')
            }
        },
        err => {
            dispatch(errorHandler(err))
        }

    )
}
// 保存商品
export const saveGoodItem = (industry, data) => dispatch => {

    apiNetwork.saveGoodItem( industry, data ).then(
        res => {
            if (res.data) {
                MessageComponent.success('商品保存成功', 1)
                setTimeout(() => {
                    hashHistory.push('/ITEM_EXPORT/item')
                }, 1000)
            }
        },
        err => {
            dispatch(errorHandler(err))
        }

    )
}
import { SET_PRICE_TAG_MODULE, SET_MODULE_DETAIL,SET_GOOD_TAG_IMAGE,SET_UPDATE_MODULE_RESULT, } from '../constants'
// 生成标签图片
export const uploadGoodTagImage = ( data) => dispatch => {
    uploadApi.uploadGoodTagImage(data).then(
        (res) => {
            if (res) {
                dispatch(setGoodTagImage(res))
            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
export const setGoodTagImage = (data) => ({
           type: SET_GOOD_TAG_IMAGE,
           data
       })

import {
    SET_COMBINED_GOODS_LIST,
    SET_COMBINED_GOOD_DETAIL,
    SET_SELECT_COMBINED_LIST,
    SET_CHILD_SPEC_ITEMS,
    SET_SELECT_GOODS_SPEC,
} from '../constants'
// 拉取组合商品列表
export const getCombinedGoodsList= (args) => dispatch => {
const { pageSize = 20, pageIndex, keyword = '', categoryId = ''} = args
    apiNetwork.getCombinedGoodsList({pageSize, pageIndex, keyword, categoryId, searchType: 1}).then(
        res => {
            if (res.data) {
                res.data.itemList.forEach(value => {
                    value.isRatio = value.isRatio ? '是' : '否'
                    value.isTwoAccount = value.isTwoAccount ? '是' : '否'
                })
                dispatch(setCombinedGoodsList(res.data))
                            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
// 获取商品贴标签模板
export const getPriceTagModule = (data) => dispatch => {
    apiNetwork.getPriceTagModule(data).then(
        res => {
            if (res.data) {
                dispatch(setPriceTagModule(res.data))
            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
// 设置组合商品列表信息
export const setCombinedGoodsList = data => ({
           type: SET_COMBINED_GOODS_LIST,
           data
       })
export const deleteCombinedGoodDetail = (args) => dispatch => {
    let { idList = [],pageSize, pageIndex, keyword, categoryId } = args
    const params = {
        industry:3,
        req: JSON.stringify({
            idList:idList,
            industry: 3
        })
    }
    apiNetwork.deleteCombinedGoodDetail(params).then(
        res => {
            if(res.data) {
                dispatch(getCombinedGoodsList({pageSize, pageIndex, keyword, categoryId}))
                MessageComponent.success('删除成功！', 1)
            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
export const setPriceTagModule = data => ({
           type: SET_PRICE_TAG_MODULE,
           data
})
// 复制商品贴标签模板
export const copyPriceTagModule = (data) => dispatch => {
    apiNetwork.copyPriceTagModule(data).then(
        res => {
            if (res.data) {
                dispatch(getPriceTagModule(data))
            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
// 拉取组合商品详细信息
export const getCombinedGoodDetail= (id) => dispatch => {
    const args = {
        req: JSON.stringify({
            id,
        })
    }
    apiNetwork.getCombinedGoodDetail(args).then(
        res => {
            if (res.data) {
                const { headPicList = [] } = res.data
                dispatch(setCombinedGoodDetail(res.data))
                dispatch(setSelectCombinedGoodsList(res.data.childItems))
                dispatch(setHeadPicture(headPicList))
            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}

// 查询模板信息
export const getModuleDetail = (data) => dispatch => {
    apiNetwork.getModuleDetail(data).then(
        res => {
            if (res.data) {
                 dispatch(setModuleDetail(res.data))
            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
export const setCombinedGoodDetail = data => ({
           type: SET_COMBINED_GOOD_DETAIL,
           data
})
// 修改组合商品详细信息
export const updateCombinedGood = (data) => dispatch => {

    apiNetwork.updateCombinedGood(data).then(
        res => {
            if (res.data) {
                dispatch(setCombinedGoodDetail(res.data))
            }
        },
        err => {
            dispatch(errorHandler(err))
        }
    )
}
// 新增组合商品详细信息
export const addCombinedGood = (data) => dispatch => {
    apiNetwork.addCombinedGood(data).then(
               res => {
                   if (res.data) {
                       console.log('add success')
                    //    dispatch(setCombinedGoodDetail(res.data))
                   }
               },
               err => {
                   dispatch(errorHandler(err))
               }
           )
}

export const setSelectCombinedGoodsList = data => ({
           type: SET_SELECT_COMBINED_LIST,
           data
 })
export const setChildSpecItems = data => ({
           type: SET_CHILD_SPEC_ITEMS,
           data
})
export const setSelectGoodsSpec = data => ({
           type: SET_SELECT_GOODS_SPEC,
           data
})
export const setFormatSpecGoods = data => ({
           type: SET_FORAMT_SPEC_GOODS,
           data
       })
export const setModuleDetail = data => ({
           type: SET_MODULE_DETAIL,
           data
})
// 修改模板信息
export const updatePriceTagModule = (data) => dispatch => {
    apiNetwork.updatePriceTagModule(data).then(
        res => {
            if (res.data) {
                dispatch(setUpdatePriceTag(res.data))
            }
        },
        err => {
            dispatch(setUpdatePriceTag(err))
        }
    )
}
export const setUpdatePriceTag = data => ({
           type: SET_UPDATE_MODULE_RESULT,
           data
})

/**
 *  商品编辑模块  end
 * */
