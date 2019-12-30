/**
 * Created by zyj on 2018/4/3.
 */
import * as types from './mutation-types'
import errorToast from 'src/oasis/libs/errorToast'
import {
  getApplyMaterials,
  getRegion
} from 'src/oasis/config/api'

const findIdIndex = (arr, id) => {
  let index = arr.findIndex(item => {
    return item.id === id
  })
  return index >= 0 ? index : 0
}

// 获取shopinfo
export const getApplyInfo = ({
  commit
}, params) => {
  getApplyMaterials(params.type).then(data => {
    let currentShopCode = data.data.shopCode
    let localShopCode = ''

    try {
      localShopCode = JSON.parse(localStorage.getItem('baseInfo')).shopCode
    } catch (e) {
      localShopCode = ''
    }

    if (!params.isview) {
      // 判断是否为同一个用户
      if (currentShopCode !== localShopCode) {
        commit(types.GET_APPLY_MATERIALS, data.data)
        // 如果有街道，但是没市，就隐藏市
        if (data.data.cityId) {
          getArea({
            commit
          }, {
            sub_area_type: "town",
            parent_id: data.data.cityId,
            id: data.data.townId
          })
        }
      } else {
        let localbaseinfo, localarea, localphoto
        try {
          localbaseinfo = JSON.parse(localStorage.getItem('baseInfo'))
        } catch (e) {
          localbaseinfo = {}
        }
        try {
          localarea = JSON.parse(localStorage.getItem('area'))
        } catch (e) {
          localarea = {}
        }
        try {
          localphoto = JSON.parse(localStorage.getItem('photos'))
        } catch (e) {
          localphoto = {}
        }
        let combim = Object.assign({}, data.data, localarea, localbaseinfo, localphoto)
        commit(types.GET_APPLY_MATERIALS, combim)
        // 如果有街道，但是没市，就隐藏市
        if (combim.cityId) {
          getArea({
            commit
          }, {
            sub_area_type: "town",
            parent_id: combim.cityId,
            id: combim.townId
          })
        }
      }
    } else {
      localStorage.removeItem('baseInfo')
      localStorage.removeItem('area')
      localStorage.removeItem('photos')
      commit(types.GET_APPLY_MATERIALS, data.data)
    }
  }).catch(e => {
    console.log(e)
    // errorToast.show(e.result.message)
  })
}

// 修改店铺信息
export const modifyShopInfo = ({
  commit
}, params) => {
  commit(types.MODIFY_SHOPINFO, params)
}

// 修改pickerSlot
export const modifyPickerSlot = ({
  commit
}, params) => {
  let index = findIdIndex(params.list, params.id)
  let obj = params.list[index]
  commit(types.MODIFY_PICKER_SLOT, [{
    flex: 1,
    values: params.list,
    defaultIndex: index,
    value: obj.name,
    valueIndex: index
  }])
  // 修改picker的默认值
  commit(types.MODIFY_PICKER_CHANGE_VALUE, {
    type: 'province',
    value: {
      name: obj.name,
      id: obj.id
    }
  })
}

// 点击picker上面的完成触发的事件
export const getArea = ({
  commit
}, params) => {
  // 首先清空
  commit(types.MODIFY_PICKER_SLOT, [])
  getRegion(params.sub_area_type, params.parent_id).then(data => {
    let index = findIdIndex(data.data.subAreaList, params.id)
    commit(types.MODIFY_PICKER_SLOT, [{
      flex: 1,
      values: data.data.subAreaList,
      defaultIndex: index,
      valueIndex: index,
      value: data.data.subAreaList[index].name
    }])
    // 如果是省的话要把数据存到store里面，这样获取省的时候就不需要每次请求了
    if (params.sub_area_type === "province") {
      commit(types.SAVE_PROVINCE_LIST, data.data.subAreaList)
    }
    if (params.sub_area_type === 'town') {
      if (data.data.subAreaType === 'street') {
        commit(types.HIDE_TOWN, true)
      } else {
        commit(types.HIDE_TOWN, false)
      }
    }
    let obj = data.data.subAreaList[index]
    commit(types.MODIFY_PICKER_CHANGE_VALUE, {
      type: params.sub_area_type,
      value: {
        name: obj.name,
        id: obj.id
      }
    })
    params.callback && params.callback()
  }).catch(e => {
    // errorToast.show(e.result.message)
    console.log(e)
  })
}

// 实时修改选择省市区的选相框
export const modifyPickerChangeValue = ({
  commit
}, params) => {
  commit(types.MODIFY_PICKER_CHANGE_VALUE, params)
}
// 修改示例图片显示状态
export const changeExamplePhoto = ({commit}, params) => {
    commit(types.CHANGE_EXAMPLE_PHOTO, params)
}