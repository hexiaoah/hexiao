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
    title: '状态',
    key: 'status',
    render(h, { row }) {
      const { isKDS, isPrint, relatedNum } = row
      if (relatedNum > 0) {
        return (
          <span class="pass-scheme-columns-action" onClick={self.showSettingModal(row)}>
            已关联
            {relatedNum}个
          </span>
        )
      }
      if (isKDS) {
        return <span>KDS</span>
      }
      if (isPrint <= 0) {
        return <span>不出单商品</span>
      }
      if (!isKDS && relatedNum <= 0) {
        return (
          <span class="pass-scheme-columns-action" onClick={self.showSettingModal(row)}>
            未设置
          </span>
        )
      }
      return <span>未设置</span>
    }
  }
]
