export default self => [
  {
    title: '套餐中不一菜一切的商品分类',
    key: 'name'
  },
  {
    title: '操作',
    render: (h, { row }) => {
      return (
        <a style="color:#3e76f6" onClick={self.delPrinter(row)}>
          删除
        </a>
      )
    }
  }
]
