<template>
    <div class="root">
        <div class="tab-header">
            <Input
                icon="ios-search"
                placeholder="输入商品名称搜索"
                style="width: 200px"
                v-model="searchText"
                @on-enter="getList(1)"
                @on-click="getList(1)"
            />
            <Button type="primary" @click="doAddGoodsModal">
                添加商品
            </Button>
        </div>
        <Table no-data-text="当前无不出单商品，请添加！" :columns="columns" :data="data.pantryMenuVOs" :loading="loading"/>
        <div class="page">
            <Page :total="data.totalRecord" show-total @on-change="paging" :page-size="20" :current="currentPage"/>
        </div>
        <AddGoodsModal
            :visible.sync="addGoodsModal"
            @ok="addGoods"
            :type="1"
            title="添加不出单商品"
        />
    </div>
</template>
<script>
import getColumns from './columns'
import AddGoodsModal from '../common/relevanceGoodsModal'
import API, { getEntityId } from '@/config/api_pass'
import { getPlateId } from '../utils'
export default {
  data() {
    return {
      columns: getColumns(this),
      data: {},
      searchText: '',
      addGoodsModal: false,
      loading: false,
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
      const { data } = await API.getNotIssueList({
        page_index,
        name: this.searchText,
        brand_entity_id: getEntityId(),
        plate_entity_id: getPlateId(this),
        entity_type: 1 //总部是1，门店是2
      })
      this.currentPage = page_index
      this.data = data
      this.loading = false
    },
    paging(p) {
      this.currentPage = p
      this.getList(p)
    },
    //删除不出单商品
    delGoods(row) {
      return () => {
        this.$Modal.confirm({
          content: '确认要删除此项吗？',
          onOk: async () => {
            await API.delNotIssue({
              entity_type: 1,
              relation_ids: JSON.stringify([row.relationId])
            })
            this.getList()
          }
        })
      }
    },
    doAddGoodsModal() {
      this.addGoodsModal = !this.addGoodsModal
    },
    async addGoods(goods) {
      if (goods.length) {
        await API.addNotIssueGoods({
          entity_type: 1,
          plate_entity_id: getPlateId(this),
          menu_ids: JSON.stringify(goods.map(({ moduleId }) => moduleId))
        })
        this.getList()
        this.doAddGoodsModal()
      }
    }
  },
  components: {
    AddGoodsModal
  }
}
</script>
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
