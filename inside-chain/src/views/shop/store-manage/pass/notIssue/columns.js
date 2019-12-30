export default self => [
  {
    title: '商品名称',
    key: 'name'
  },
  {
    title: '商品分类',
    key: 'kindMenuName'
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
