<template>
    <div class="main-entrance" >
      <wechat-entrance v-if="type==='2'"></wechat-entrance>
      <alipay-entrance v-else></alipay-entrance>
    </div>
</template>

<script>
import Router from '@2dfire/utils/router'
import WechatEntrance from './wechat-entrance'
import AlipayEntrance from './alipay-entrance'

export default {
  name: 'Entrance',
  data() {
    return {
      type: Router.route.query['type'] || ''
    }
  },
  components: {
    WechatEntrance,
    AlipayEntrance
  },
  created() {},
  methods: {}
}
</script>

<style type="text/scss" lang="scss" scoped>
</style>

