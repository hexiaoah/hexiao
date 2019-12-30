import API from '@/config/api_pass'
//获取顶部下拉选择的门店id
export function getPlateId(self) {
  return self.$route.query.plate_entity_id
}
//获取所有商品类别
export async function getGoodTypes(params) {
  const { data } = await API.getAllGoodsType(params)
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
