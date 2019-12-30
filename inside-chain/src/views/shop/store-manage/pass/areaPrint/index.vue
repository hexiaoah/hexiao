<template>
    <div class="root">
        <div class="tab-header">
            <Button type="primary" @click="showAreaPrintModal">
                添加
            </Button>
        </div>
        <Table no-data-text="当前无备用打印机，请添加！" :columns="columns" :data="list" :loading="loading"/>
        <div class="page">
            <Page :total="total" show-total @on-change="paging" :current="currentPage" :page-size="20"/>
        </div>
        <AreaPrintModal
            :visible.sync="areaPrintModal"
            @ok="ok"
            :title="areaPrintModalTitle"
            :initialForm="currAreaPrint"
        />
        <AreaModal
            :visible.sync="areaModal"
            @areaOk="areaOk"
            :initialValue="currArea"
        />
    </div>
</template>
<script>
import getColumns from './columns'
import API from '@/config/api_pass'
import AreaPrintModal from './areaPrintModal'
import AreaModal from './areaModal'
export default {
  data() {
    return {
      columns: getColumns(this),
      list: [],
      total: 0,
      loading: false,
      currAreaPrint: null,
      currArea: null,
      areaPrintModal: false,
      areaModal: false,
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
      const { data } = await API.getAreaPrintList({
        page_index
      })
      const { datas, totalRecord } = data
      this.currentPage = page_index
      this.list = datas
      this.total = totalRecord
      this.loading = false
    },
    paging(p) {
      this.currentPage = p
      this.getList(p)
    },
    showAreaPrintModal() {
      this.currAreaPrint = null
      this.areaPrintModal = true
    },
    editAreaPrintModal(row) {
      return () => {
        this.currAreaPrint = row
        this.areaPrintModal = true
      }
    },
    editAreaModal(row) {
      return () => {
        this.currArea = row
        this.areaModal = true
      }
    },
    //添加区域
    async areaOk(areas) {
      console.log(areas)
      await API.updateAreaPrintArea({
        id: this.currArea.id,
        areaId_list: JSON.stringify(areas.map(({ id }) => id))
      })
      this.getList()
      this.areaModal = false
    },
    //删除
    delAreaPrint(row) {
      return () => {
        this.$Modal.confirm({
          // title: '确认要删除此项吗？',
          content: '确认要删除此项吗？',
          onOk: async () => {
            await API.delAreaPrint({
              id: row.id
            })
            this.getList()
          }
        })
      }
    },
    async ok(action, info) {
      const { ipAddress, paperWidth, rowNum, id } = info
      if (action === 'add') {
        await API.addAreaPrint({
          ip_address: ipAddress,
          paper_width: paperWidth,
          row_num: rowNum
        })
        this.currentPage = 1
      } else {
        await API.updateAreaPrint({
          id,
          ip_address: ipAddress,
          paper_width: paperWidth,
          row_num: rowNum
        })
      }
      this.getList(this.currentPage)
      this.areaPrintModal = false
    }
  },
  computed: {
    areaPrintModalTitle() {
      return `${this.currAreaPrint ? '编辑' : '添加'}打印信息`
    }
  },
  components: {
    AreaPrintModal,
    AreaModal
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
