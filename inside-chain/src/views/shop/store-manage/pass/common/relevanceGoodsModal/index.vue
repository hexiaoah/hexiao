<template>
  <!-- prettier-ignore -->
  <Modal :width="700" :value="visible" :title="title" footer-hide @on-ok="ok" @on-cancel="cancel">
    <!-- prettier-ignore -->
    <div slot="footer">
          <Button @click="cancel">
              取消
          </Button>
          <Button type="error" @click="ok">
              确定
          </Button>
      </div>
    <!-- prettier-ignore -->
    <div class="search-bar">
      <div>
        <Select v-model="params.kind_id" style="width:200px">
          <Option v-for="item in typeList" :value="item.value" :key="item.value">{{
            item.label
          }}</Option>
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
      <div class="search-icon" @click="getList(1)">
        <Icon type="loop" color="red" size="26"></Icon>
      </div>
    </div>
    <Table :columns="columns" :data="list" @on-selection-change="select" :loading="loading" />
    <div class="page">
      <Button type="primary" @click="ok" :disabled="!selectedGoods.length">确认使用</Button>
      <Page :total="total" show-total @on-change="paging" :page-size="5" :current="currentPage" />
    </div>
  </Modal>
</template>

<script>
import API from '@/config/api_pass'
import { getGoodTypes } from '../../utils'
import Good from '../good'
export default {
  props: {
    visible: Boolean,
    type: Number,
    title: {
      type: String,
      default: '添加关联商品'
    }
  },
  name: 'relevanceGoodsModal',
  data() {
    return {
      list: [],
      loading: false,
      total: 0,
      selectedGoods: [],
      params: { name: '', kind_id: '-' },
      typeList: [],
      currentPage: 1,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '商品',
          key: 'name',
          render(h, { row }) {
            return <Good data={row} />
          }
        }
      ]
    }
  },
  created() {
    this.getGoodsType()
  },
  watch: {
    visible(val) {
      if (val) {
        this.selectedGoods = []
        this.getList()
      }
    }
  },
  methods: {
    async getGoodsType() {
      this.typeList = await getGoodTypes()
    },
    async getList(page_index = 1) {
      const { name, kind_id } = this.params
      this.loading = true
      const { data } = await API.getAllGoodsList({
        entity_type: 2,
        type: this.type,
        page_index,
        page_size: 5,
        name,
        kind_id: kind_id === '-' ? '' : kind_id,
        ...(this.type === 0 ? { produce_plan_id: this.$route.query.id } : {})
      })
      this.currentPage = page_index
      this.total = data.totalRecord
      this.list = (data.datas || []).map(item => ({
        ...item,
        _checked: item.isCheck === 1,
        _disabled: item.isCheck === 1
      }))
      this.loading = false
    },
    select(selected) {
      this.selectedGoods = selected
    },
    ok() {
      this.$emit('ok', this.selectedGoods)
    },
    cancel() {
      this.$emit('update:visible', false)
    },
    paging(page) {
      this.currentPage = page
      this.getList(page)
    }
  }
}
</script>

<style scoped lang="less">
.page {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.search-bar {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  .search-icon {
    cursor: pointer;
  }
}
</style>
