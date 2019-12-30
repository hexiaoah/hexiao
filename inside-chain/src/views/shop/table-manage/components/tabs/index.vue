<template>
    <div>
        <div class="tab-wrap">
            <router-link
                v-for="item in list"
                active-class="active"
                :to="query?{'path':item.link,'query':query}:item.link"
                :key="item.value"
            >
                {{item.name}}
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    active: String,
    list: Array
  },
  computed: {
    query() {
      const entityId = this.$route.query.entityId
      return entityId
        ? {
              entityId
          }
        : null
    }
  }
}
</script>
<style lang="scss" scoped>
.root {
  padding: 30px;
}
.tab-wrap {
  color: #999999;
  font-size: 14px;
  background: #fff;
  min-height: 60px;
  padding: 26px 30px 20px 30px;
  a.active {
    color: #d83f3f;
    padding-bottom: 4px;
  }
  a {
    display: inline-block;
    font-size: 14px;
    color: #999999;
    margin-right: 50px;
    &:last-child {
      margin-right: 0px;
    }
  }
}
</style>
