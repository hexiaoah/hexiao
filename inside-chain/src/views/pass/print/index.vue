<template>
    <div class="root">
        <div class="tab-header">
            <Button type="primary" @click="goodsTypeModal=true">
                添加商品分类
            </Button>
        </div>
        <Table no-data-text="当前无套餐中商品分类打印设置，请添加！" :columns="columns" :data="list" :loading="loading"/>
        <div class="page">
            <Page :total="total" show-total @on-change="paging" :page-size="20" :current="currPage"/>
        </div>
        <GoodsTypeModal
            :visible.sync="goodsTypeModal"
            @ok="addPrinter"
            :list="kindMenuList"
        />
    </div>
</template>
<script>
import getColumns from './columns'
import GoodsTypeModal from './goodsTypeModal'
import API from '@/config/api_pass'
import { getPlateId } from '../utils'
export default {
  data() {
    return {
      columns: getColumns(this),
      list: [],
      total: 0,
      loading: false,
      goodsTypeModal: false,
      //所有的已添加的分类
      kindMenuList: [],
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
      const { data } = await API.getPrintSettingList({
        plate_entity_id: getPlateId(this),
        page_index
      })
      const { cutKindMenuList, kindMenuList, totalRecord } = data
      this.list = cutKindMenuList || []
      this.total = totalRecord
      this.kindMenuList = kindMenuList
      this.currPage = page_index
      this.loading = false
    },
    paging(p) {
      this.currPage = p
      this.getList(p)
    },
    //删除商品分类
    delPrinter(row) {
      return () => {
        console.log('删除', row)
        this.$Modal.confirm({
          // title: '确认要删除此项吗？',
          content: '确认要删除此项吗？',
          onOk: async () => {
            await API.delPrintSetting({
              kind_menu_ids: JSON.stringify([row.id])
            })
            this.getList()
          }
        })
      }
    },
    //添加商品分类
    async addPrinter(goods) {
      await API.updatePrintSetting({
        plate_entity_id: getPlateId(this),
        kind_menu_ids: JSON.stringify(goods.map(({ id }) => id))
      })
      this.getList()
      this.goodsTypeModal = false
    }
  },
  components: {
    GoodsTypeModal
  }
}
</script>
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
