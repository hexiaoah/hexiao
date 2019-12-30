<template>
  <Modal :value="visible" title="传菜设置" @on-ok="ok" @on-cancel="cancel">
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
            @on-selection-change="select"
        />
    <div class="page">
      <Page
        :total="list.length"
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
    currRow: Object
  },
  name: 'settingModal',
  data() {
    return {
      selected: [],
      currentPage: 1,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '传菜方案名称',
          key: 'pantryName'
        },
        {
          title: '打印机IP地址',
          key: 'printerIp'
        }
      ],
      list: []
    }
  },
  watch: {
    visible(v) {
      if (v) {
        this.selected = []
        this.getList()
      }
    }
  },
  computed: {
    viewList() {
      return this.list.slice((this.currentPage - 1) * 10, 10 * this.currentPage)
    }
  },
  methods: {
    async getList(page_index = 1) {
      const { data } = await API.getCheckSetting({
        page_index,
        menu_id: this.currRow.menuId
      })
      this.currentPage = page_index
      this.list = data.map(item => {
        return {
          _checked: item.setPantry,
          ...item
        }
      })
      this.selected = data.filter(({ setPantry }) => setPantry)
    },
    ok() {
      this.$emit('ok', this.list.filter(({ _checked }) => _checked))
    },
    cancel() {
      this.$emit('update:visible', false)
    },
    select(selected) {
      for (let i = (this.currentPage - 1) * 10; i < 10 * this.currentPage; i++) {
        if (this.list[i]) {
          this.list[i]._checked = selected.some(item => this.list[i].pantryId === item.pantryId)
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
.page {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
