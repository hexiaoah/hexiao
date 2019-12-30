<template>
    <div class="root">
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
      const plate_entity_id = this.$route.query.plate_entity_id
      return plate_entity_id
        ? {
            plate_entity_id
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
    /*box-shadow: 0 6px #ffffff, 0 10px #D83F3F;*/
    padding-bottom: 4px;
    border-bottom: solid 4px #d83f3f;
    vertical-align: top;
  }
  a {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    color: #999999;
    margin-right: 50px;
    &:last-child {
      margin-right: 0px;
    }
  }
}
</style>
