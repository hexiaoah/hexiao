<template>
    <div class="root">
        <div class="tab-header">
            <router-link :to="sendPath">
                <Button style="margin-right: 20px">
                    下发
                </Button>
            </router-link>
            <Button type="primary" @click="showAddSchemeModal">
                添加传菜方案
            </Button>
        </div>
        <Table :loading="loading" no-data-text="当前无传菜方案，请添加！" :columns="columns" :data="list"/>
        <div class="page">
            <Page :total="total" show-total @on-change="paging" :page-size="20" :current="currPage"/>
        </div>
        <AddSchemeModal
            :visible.sync="addSchemeModal"
            @ok="ok"
            :title="schemeModalTitle"
            :initialForm="currScheme"
        />
    </div>
</template>
<script>
import AddSchemeModal from './addSchemeModal'
import getColumns from './columns'
import API, { getEntityId } from '@/config/api_pass'
import { getPlateId } from '../../utils'
export default {
  data() {
    return {
      columns: getColumns(this),
      list: [],
      total: 0,
      //添加、编辑传菜方案的Modal
      addSchemeModal: false,
      //编辑传菜方案时正在操作的那列数据
      currScheme: null,
      loading: false,
      currPage: 1
    }
  },
  created() {
    //获取表格数据
    this.getList()
  },
  methods: {
    async getList(page_index = 1) {
      this.loading = true
      const { data } = await API.getPassSchemeList({
        page_index,
        brand_entity_id: getEntityId(),
        plate_entity_id: getPlateId(this)
      })
      const { datas, totalRecord } = data
      this.list = datas
      this.total = totalRecord
      this.loading = false
    },
    paging(p) {
      this.currPage = p
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
      if (action === 'add') {
        await API.addPassSchemeInfo({
          req: JSON.stringify({
              ...info,
              isAllPlan: 1,
              isAutoPrint: 1
          }),
          plate_entity_id: getPlateId(this),
            is_all_area:1,
        })
        this.currPage = 1
      } else {
        await API.updatePassSchemeInfo({
          plate_entity_id: getPlateId(this),
          req: JSON.stringify({
            ...info,
            id: info.pantryId,
              isAllPlan: 1,
              isAutoPrint: 1
          })
        })
      }
      this.getList(this.currPage)
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
              pantry_id: row.pantryId,
              plate_entity_id: getPlateId(this)
            })
            this.currPage = 1
            this.getList()
          }
        })
      }
    }
  },
  computed: {
    //保存和编辑时Modal的标题
    schemeModalTitle() {
      return `${this.currScheme ? '编辑' : '添加'}传菜方案`
    },
    sendPath() {
      const { plate_entity_id } = this.$route.query
      return {
        path: '/pass_publish',
        query: { plate_entity_id }
      }
    }
  },
  watch: {
    $route() {
      this.getList()
    }
  },
  components: {
    AddSchemeModal
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
