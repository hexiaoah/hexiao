<template>
    <div class="root">
        <Table :columns="columns" :data="store.__list" v-bind="$attrs"></Table>
        <div v-if="pagination" class="page-bar">
            <Page v-bind="pagination"/>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CoreTable',
  props: {
    store: Object,
    columns: Array,
    pagination: Object
  },
  created() {
    this.store.__getList(1)
  }
}
</script>

<style scoped lang="less">
.root {
  .page-bar {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
