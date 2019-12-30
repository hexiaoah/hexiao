import Good from '../../common/good'
export default self => [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '商品',
    key: 'name',
    render(h, { row }) {
      return <Good data={row} />
    }
  },
  {
    title: '所属分类',
    key: 'moduleKindName'
  },
  {
    title: '操作',
    render: (h, { row }) => {
      return (
        <a style="color:#3e76f6" onClick={self.delGoods(row)}>
          删除
        </a>
      )
    }
  }
]
