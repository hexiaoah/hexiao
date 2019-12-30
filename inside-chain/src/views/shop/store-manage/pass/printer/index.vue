<template>
    <div class="root">
        <div class="tab-header">
            <Button type="primary" @click="showPrinterModal">
                添加备用打印机
            </Button>
        </div>
        <Table no-data-text="当前无备用打印机，请添加！" :columns="columns" :data="list" :loading="loading"/>
        <div class="page">
            <Page :total="total" show-total @on-change="paging" :current="currentPage" :page-size="20"/>
        </div>
        <AddPrinterModal
            :visible.sync="addPrinterModal"
            @ok="ok"
            :loading.sync="addPrinterModalLoading"
            :title="printerModalTitle"
            :initialForm="currPrinter"
        />
    </div>
</template>
<script>
import getColumns from './columns'
import API from '@/config/api_pass'
import AddPrinterModal from './addPrinterModal'
export default {
  data() {
    return {
      columns: getColumns(this),
      list: [],
      total: 0,
      loading: false,
      addPrinterModal: false,
      addPrinterModalLoading:true,
      currPrinter: null,
      currentPage: 1
    }
  },
  created() {
    //获取表格数据
    this.getList()
  },
  methods: {
    async getList(page_index = 1) {
      this.loading = true
      const { data } = await API.getPrinterList({
        page_index
      })
      this.currentPage = page_index
      const { datas, totalRecord } = data
      this.list = datas
      this.total = totalRecord
      this.loading = false
    },
    paging(p) {
      this.currentPage = p
      this.getList(p)
    },
    //删除打印机
    delPrinter(row) {
      return () => {
        this.$Modal.confirm({
          // title: '确认要删除此项吗？',
          content: '确认要删除此项吗？',
          onOk: async () => {
            await API.delPrinter({
              backup_printer_id: row.backupPrinterId
            })
            this.getList()
          }
        })
      }
    },
    showPrinterModal() {
      this.currPrinter = null
      this.addPrinterModal = true
    },
    editPrinterModal(row) {
      return () => {
        console.log(row)
        this.currPrinter = row
        this.addPrinterModal = true
      }
    },
    //保存打印机信息
    async ok(action, info) {
      await API[action === 'add' ? 'addPrinter' : 'updatePrinter']({
        req: JSON.stringify(info)
      })
      const currentPage = action === 'add' ? 1 : this.currentPage
      this.getList(currentPage)
      this.addPrinterModal = false
    }
  },
  computed: {
    printerModalTitle() {
      return `${this.currPrinter ? '编辑' : '添加'}备用打印机`
    }
  },
  components: {
    AddPrinterModal
  }
}
</script>
<style>
.pass-scheme-columns-action {
  color: #3e76f6;
  cursor: pointer;
}
</style>
<style scoped lang="less">
.root {
  padding: 0 10px 10px 10px;
  .tab-header {
    padding: 15px 0;
    display: flex;
    justify-content: flex-end;
  }
  .page {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
