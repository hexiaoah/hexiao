<template>
    <div class="root">
        <div class="header">
            <Breadcrumb>
                <BreadcrumbItem :to="listPath">传菜方案</BreadcrumbItem>
                <BreadcrumbItem>{{goodsInfo.title}}</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="search-bar">
            <div>
                <Select v-model="params.kind_id" style="width:200px" @on-change="getList(1)">
                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Input
                    icon="ios-search"
                    placeholder="搜索商品"
                    style="width: 160px"
                    v-model="params.name"
                    @on-enter="getList(1)"
                    @on-click="getList(1)"
                />
            </div>
            <div>
                <Button style="margin-right: 10px" :disabled="disabled" @click="delBatch">
                    批量删除
                </Button>
                <Button type="primary" @click="doRelevanceGoodsModal">
                    添加关联商品
                </Button>
            </div>
        </div>
        <div class="list">
            <Table :columns="columns" :data="list" @on-selection-change="select"/>
            <div class="page">
                <Page :total="total" show-total @on-change="paging" :page-size="20" :current="currentPage"/>
            </div>
        </div>
        <RelevanceGoodsModal
            :visible.sync="relevanceGoodsModal"
            @ok="relevanceGoods"
            :type="0"
        />
    </div>
</template>
<script>
import getColumns from './columns'
import RelevanceGoodsModal from '../../common/relevanceGoodsModal'
import API from '@/config/api_pass'
import { getGoodTypes } from '../../utils'
export default {
  data() {
    return {
      goodsInfo: {},
      columns: getColumns(this),
      list: [],
      params: { name: '', kind_id: '-' },
      selected: [],
      total: 0,
      typeList: [],
      relevanceGoodsModal: false,
      currentPage: 1
    }
  },
  computed: {
    disabled() {
      return !this.selected.length
    },
    listPath() {
      const { entityId, crumbName } = this.$route.query
      return {
        path: '/store_pass/scheme/list',
        query: {
          entityId,
          crumbName
        }
      }
    }
  },
  methods: {
    async getGoodType() {
      this.typeList = await getGoodTypes()
    },
    async getList(page_index = 1) {
        const {name,kind_id}=this.params
      this.loading = true
      const { data } = await API.getPassSchemeDetail({
        produce_plan_id: this.$route.query.id,
        page_index,
          name,
          kind_id:kind_id==='-'?'':kind_id
      })
      this.currentPage = page_index
      const { datas, totalRecord } = data || {}
      this.list = datas
      this.total = totalRecord
      this.selected = []
      this.loading = false
    },
    paging(p) {
      this.currentPage = p
      this.getList(p)
    },
    //删除商品分类
    delGoods(row) {
      return () => {
        this.$Modal.confirm({
          // title: '确认要删除此项吗？',
          content: '确认要删除此项吗？',
          onOk: async () => {
            await API.delSchemeDetailGoods({
              kind_menu_ids: JSON.stringify([row.removeId])
            })
            this.getList()
          }
        })
      }
    },
    //批量删除
    delBatch() {
      this.$Modal.confirm({
        // title: '确认要删除此项吗？',
        content: '确认要删除此项吗？',
        onOk: async () => {
          await API.delSchemeDetailGoods({
            kind_menu_ids: JSON.stringify(this.selected.map(({ removeId }) => removeId))
          })
          this.getList()
        }
      })
    },
    select(selected) {
      this.selected = selected
    },
    doRelevanceGoodsModal() {
      this.relevanceGoodsModal = !this.relevanceGoodsModal
    },
    //点击确认使用关联商品
    async relevanceGoods(goods) {
      if (goods.length) {
        await API.addSchemeDetailGoods({
          produce_plan_id: this.$route.query.id,
          kind_menu_ids: JSON.stringify(goods.map(({ moduleId }) => moduleId)),
          type: 1
        })
        this.getList()
        this.doRelevanceGoodsModal()
      }
    }
  },
  components: {
    RelevanceGoodsModal
  },
  created() {
    this.goodsInfo = this.$route.query
    this.getList()
    this.getGoodType()
  }
}
</script>
<style scoped lang="less">
.root {
  padding: 0 10px 10px 10px;
  .header {
    padding-top: 15px;
  }
  .search-bar {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
  }
  .list {
    .page {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
