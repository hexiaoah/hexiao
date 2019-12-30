<template>
    <div class="tab-wrap">
        <router-link
            v-for="item of list"
            active-class="active"
            :key="item.value"
            :to="query?{'path':item.link,'query':query}:item.link"
        >
            {{item.name}}
        </router-link>
    </div>
</template>
<script>
// import { isEmpty } from '@2dfire/utils/object'
export default {
  data() {
    return {
      list: [
        { name: '传菜方案', value: 'Scheme', link: '/store_pass/scheme' },
        { name: '不出单商品', value: 'NotIssue', link: '/store_pass/notIssue' },
        { name: '备用打印机', value: 'Printer', link: '/store_pass/printer' },
        { name: '点菜单分区域打印', value: 'AreaPrint', link: '/store_pass/areaPrint' },
        { name: '套餐中商品分类打印设置', value: 'PrintSetting', link: '/store_pass/printSetting' },
        { name: '传菜检查', value: 'SchemeCheck', link: '/store_pass/schemeCheck' }
      ]
    }
  },
  computed: {
    query() {
      const { entityId, crumbName } = this.$route.query
      return entityId
        ? {
            entityId,
            crumbName
          }
        : null
    }
  }
}
</script>
<style lang="scss" scoped>
.tab-wrap {
  color: #999999;
  font-size: 14px;

  background: #fff;
  height: 71px;
  line-height: 71px;
  padding-left: 30px;
  margin-bottom: 20px;
  a.active {
    color: #d83f3f;
    position: relative;
    vertical-align: top;
  }
  a {
    display: inline-block;
    font-size: 14px;
    color: #999999;
    margin-right: 50px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
