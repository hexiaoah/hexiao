import Divider from '@/components/divider'
export default self => [
  {
    title: '打印机IP地址',
    key: 'ipAddress'
  },
  {
    title: '桌位区域',
    key: 'areaNameListStr',
    render(h, { row }) {
      let text = '未设置'
      let areaNameListStr = row.areaNameListStr || ''
      if (areaNameListStr) {
        areaNameListStr = areaNameListStr.split(',')
        text =
          areaNameListStr.length > 2
            ? areaNameListStr.slice(0, 2).join('、') + ` 等${areaNameListStr.length}个`
            : areaNameListStr.join('、')
      }
      return (
        <span class="pass-scheme-columns-action">
          <span onClick={self.editAreaModal(row)}>{text}</span>
        </span>
      )
    }
  },
  {
    title: '操作',
    render: (h, { row }) => {
      return (
        <div class="pass-scheme-columns-action">
          <span onClick={self.editAreaPrintModal(row)}>编辑</span>
          <Divider />
          <span onClick={self.delAreaPrint(row)}>删除</span>
        </div>
      )
    }
  }
]
