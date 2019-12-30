<template>
    <div class="root">
        <div class="tab-header">
            <Select :value="type" style="width:200px" @on-change="changeType">
                <Option :value="-1">全部</Option>
                <Option :value="0">不出单商品</Option>
                <Option :value="1">未设置</Option>
                <Option :value="2">已关联</Option>
                <Option :value="3">KDS</Option>
            </Select>
            <Button type="primary" @click="getList(1)">
                查询
            </Button>
        </div>
        <Table
            :columns="columns"
            :data="list"
            :loading="loading"
        />
        <div class="page">
            <Page :total="total" show-total @on-change="paging" :page-size="20" :current="currentPage"/>
        </div>
        <SettingModal
            :visible.sync="settingModal"
            @ok="ok"
            :currRow="currRow"
        />
    </div>
</template>
<script>
import getColumns from './columns'
import API from '@/config/api_pass'
import SettingModal from './settingModal'
export default {
  data() {
    return {
      columns: getColumns(this),
      list: [],
      total: 0,
      type: -1,
      loading: false,
      settingModal: false,
      currRow: null,
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
      const { data } = await API.getPassCheckList({ type: this.type, page_index })
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
    changeType(e) {
      this.type = e
      this.getList()
    },
    showSettingModal(row) {
      return () => {
        this.currRow = row
        this.settingModal = true
      }
    },
    async ok(selected) {
      await API.setPassCheckList({
        menu_id: this.currRow.menuId,
        pantry_ids: JSON.stringify(selected.map(({ pantryId }) => pantryId))
      })
      this.getList()
      this.settingModal = false
    }
  },
  components: { SettingModal }
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
    justify-content: space-between;
  }
  .page {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
