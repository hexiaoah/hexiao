import Divider from '@/components/divider'
import MyTag from '../../common/Tag'
export default self => [
  {
    title: '传菜方案名称',
    key: 'name',
    render(
      h,
      {
        row: { name, chain }
      }
    ) {
      return (
        <div>
          <span style="margin-right:4px">{name}</span>
          {chain ? <MyTag>连锁</MyTag> : null}
        </div>
      )
    }
  },
  {
    title: 'IP地址',
    key: 'printerIp'
  },
  {
    title: '商品',
    key: 'menuCount',
    render: (h, { row: { producePlanId, name, menuCount } }) => {
      return (
        <router-link
          style="color:#3e76f6"
          to={{
            path: '/store_pass/scheme/goodsManage',
            query: { id: producePlanId, title: name, ...self.$route.query }
          }}
        >
          {menuCount || '未设置'}
        </router-link>
      )
    }
  },
  {
    title: '区域',
    key: 'areaCount',
    render(h, { row }) {
      let text = '未设置'
      let areaVOS = row.areaVOS || []
      if (row.isAllArea === 1) {
        text = '全部'
      } else if (areaVOS.length) {
        areaVOS = areaVOS.map(({ name }) => name)
        text =
          areaVOS.length > 2
            ? areaVOS.slice(0, 2).join('、') + ` 等${areaVOS.length}个`
            : areaVOS.join('、')
      }
      return (
        <span class="pass-scheme-columns-action">
          <span onClick={self.showAreaModal(row)}>{text}</span>
        </span>
      )
    }
  },
  {
    title: '操作',
    render: (h, { row }) => {
      return (
        <div class="pass-scheme-columns-action">
          <span onClick={self.editAddSchemeModal(row)}>编辑</span>
          <Divider />
          <span onClick={self.delScheme(row)}>删除</span>
        </div>
      )
    }
  }
]
