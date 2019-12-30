<template>
  <div class="root">
      <div class="header">
          <Breadcrumb>
              <BreadcrumbItem :to="listPath">传菜方案</BreadcrumbItem>
              <BreadcrumbItem>下发</BreadcrumbItem>
          </Breadcrumb>
      </div>
      <div class="content">
          下发内容
      </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  computed: {
    listPath() {
      return {
        path: '/pass/scheme/list',
        query: {
          plate_entity_id: this.$route.query.plate_entity_id
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.root {
  padding: 0 10px 10px 10px;
  .header {
    padding-top: 15px;
  }
}
</style>
