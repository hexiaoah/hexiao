import API from '@/config/api_pass'
import cookie from '@2dfire/utils/cookie'
//获取当前门店entityId,isChain：是否是总部的entityId(cookie中的)
export function getEntityId(self, isChain = true) {
  return isChain ? JSON.parse(cookie.getItem('entrance')).shopInfo.entityId : self.$route.query.entityId
}
//获取所有商品类别
export async function getGoodTypes(params) {
  const { data } = await API.getAllGoodsType(params || {})
  const res = (data || []).map(({ name, kindId }) => ({
    label: name,
    value: kindId
  }))
  res.unshift({
    label: '全部',
    value: '-'
  })
  return res
}
//获取所有的区域
export async function getAllAreas(params = { sale_out_flag: true },isAllArea) {
  const { data } = await API.getAllArea(params)
  return (data || []).map(item => {
    return {
      _checked: isAllArea===1||item.isCheck === 1,
      ...item
    }
  })
}
