<template>
  <Modal :value="visible" title="添加商品分类" @on-ok="ok" @on-cancel="cancel">
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
    <Table
            :columns="columns"
            :data="viewList"
            size="small"
            @on-selection-change="changeSelect"
        />
    <div class="page-bar">
      <Page
        :total="realList.length"
        show-total
        @on-change="paging"
        :page-size="10"
        :current="currentPage"
      />
    </div>
  </Modal>
</template>

<script>
import API from '@/config/api_pass'
export default {
  props: {
    visible: Boolean,
    list: Array
  },
  name: 'goodsTypeModal',
  data() {
    return {
      realList: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '商品分类',
          key: 'name'
        }
      ],
      currentPage: 1
    }
  },
  created() {
    // this.getGoodsType()
  },
  watch: {
    visible(val) {
      if (val) {
        this.currentPage = 1
        this.realList = this.list.map(item => {
          return {
            _checked: item.needOneMealOneCut,
            ...item
          }
        })
      }
    }
  },
  computed: {
    viewList() {
      return this.realList.slice((this.currentPage - 1) * 10, 10 * this.currentPage)
    }
  },
  methods: {
    async getGoodsType() {
      const { data } = await API.getAllGoodsType({})
      this.list = data
    },
    ok() {
      this.$emit('ok', this.realList.filter(({ _checked }) => _checked))
    },
    cancel() {
      this.$emit('update:visible', false)
    },
    changeSelect(selected) {
      for (let i = (this.currentPage - 1) * 10; i < 10 * this.currentPage; i++) {
        if (this.realList[i]) {
          this.realList[i]._checked = selected.some(item => this.realList[i].id === item.id)
        }
      }
    },
    paging(p) {
      this.currentPage = p
    }
  }
}
</script>

<style scoped>
.page-bar {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
