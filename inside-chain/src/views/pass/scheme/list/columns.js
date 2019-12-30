import Divider from '../../common/divider'
export default self => [
  {
    title: '传菜方案名称',
    key: 'name'
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
          to={{ path: '/pass/scheme/goodsManage', query: { id: producePlanId, title: name, ...self.$route.query } }}
        >
          {menuCount || '未设置'}
        </router-link>
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
