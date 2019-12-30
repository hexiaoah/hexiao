<template>
    <div class="root">
        <div class="tab-header">
            <Button type="primary" @click="showAddSchemeModal">
                添加传菜方案
            </Button>
        </div>
        <Table :loading="loading" no-data-text="当前无传菜方案，请添加！" :columns="columns" :data="list"/>
        <div class="page">
            <Page :total="total" show-total @on-change="paging" :page-size="20" :current="currentPage"/>
        </div>
        <AddSchemeModal
            :visible.sync="addSchemeModal"
            @ok="ok"
            :title="schemeModalTitle"
            :initialForm="currScheme"
        />
        <AreaModal
            :visible.sync="areaModal"
            @areaOk="areaOk"
            :initialValue="currScheme"
        />
    </div>
</template>
<script>
import AddSchemeModal from './addSchemeModal'
import AreaModal from './areaModal'
import getColumns from './columns'
import API from '@/config/api_pass'
import { getEntityId } from '../../utils'
export default {
  data() {
    return {
      columns: getColumns(this),
      list: [],
      total: 0,
      //添加、编辑传菜方案的Modal
      addSchemeModal: false,
      areaModal: false,
      //编辑传菜方案时正在操作的那列数据
      currScheme: null,
      loading: false,
      currentPage: 1
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList(page_index = 1) {
      this.loading = true
      const { data } = await API.getPassSchemeList({
        page_index,
        brand_entity_id: getEntityId(this, true)
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
    //点击编辑将当前编辑的列数据保存
    editAddSchemeModal(row) {
      return () => {
        this.currScheme = row
        this.addSchemeModal = true
      }
    },
    //点击添加将当前编辑的列数据清空
    showAddSchemeModal() {
      this.currScheme = null
      this.addSchemeModal = true
    },
    //保存方案
    async ok(action, info) {
      console.log(action, '传菜', info)
      if (action === 'add') {
        await API.addPassSchemeInfo({
          req: JSON.stringify({
              ...info,
              isAllPlan: 1,
              isAutoPrint: 1
          }),
            is_all_area:1
        })
        this.currentPage = 1
      } else {
        await API.updatePassSchemeInfo({
          req: JSON.stringify({
            ...info,
            id: info.pantryId,
              isAllPlan: 1,
              isAutoPrint: 1
          })
        })
      }
      this.getList(this.currentPage)
      this.addSchemeModal = false
    },
    //删除方案
    delScheme(row) {
      return () => {
        console.log('删除', row)
        this.$Modal.confirm({
          // title: '确认要删除此项吗？',
          content: '确认要删除此项吗？',
          onOk: async () => {
            await API.delPassSchemeInfo({
              pantry_id: row.pantryId
            })
            this.getList()
          }
        })
      }
    },
    showAreaModal(row) {
      return () => {
        this.currScheme = row
        this.areaModal = true
      }
    },
    //添加区域
    async areaOk(areas,is_all_area) {
      await API.updateArea({
        pantry_id: this.currScheme.pantryId,
        area_ids: JSON.stringify(areas.map(({ id }) => id)),
          is_all_area:is_all_area?1:0
      })
      this.getList()
      this.areaModal = false
    }
  },
  computed: {
    //保存和编辑时Modal的标题
    schemeModalTitle() {
      return `${this.currScheme ? '编辑' : '添加'}传菜方案`
    }
  },
  watch: {
    $route() {
      this.getList()
    }
  },
  components: {
    AddSchemeModal,
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
