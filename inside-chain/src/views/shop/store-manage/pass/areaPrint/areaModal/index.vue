<template>
  <Modal :value="visible" title="添加区域" @on-ok="ok" @on-cancel="cancel">
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
            :data="list"
            @on-selection-change="select"
        />
  </Modal>
</template>

<script>
import { getAllAreas } from '../../utils'
export default {
  props: {
    visible: Boolean,
    initialValue: Object
  },
  name: 'goodsTypeModal',
  data() {
    return {
      areas: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '区域',
          key: 'name'
        }
      ],
      list: []
    }
  },
  watch: {
    visible(v) {
      if (v) {
        this.areas = []
        this.getList()
      }
    }
  },
  methods: {
    async getList() {
      this.list = await getAllAreas({
        print_id: this.initialValue.id,
        sale_out_flag: true
      })
      this.areas = this.list.filter(({ _checked }) => _checked)
    },
    ok() {
      this.$emit('areaOk', this.areas)
    },
    cancel() {
      this.$emit('update:visible', false)
    },
    select(selected) {
      this.areas = selected
    }
  }
}
</script>

<style scoped></style>
