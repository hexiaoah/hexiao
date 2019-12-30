import Divider from '@/components/divider'
export default self => [
  {
    title: '原打印机IP',
    key: 'originIp'
  },
  {
    title: '备用打印机IP',
    key: 'backupIp'
  },
  {
    title: '操作',
    render: (h, { row }) => {
      return (
        <div class="pass-scheme-columns-action">
          <span onClick={self.editPrinterModal(row)}>编辑</span>
          <Divider />
          <span onClick={self.delPrinter(row)}>删除</span>
        </div>
      )
    }
  }
]
