<template>
  <div class="root">
    <p class="name">{{name}}</p>
    <div class="verify-success">
      <img src="../../images/success.png" alt="">
      <span>恭喜您验证成功！</span>
    </div>
    <div class="phone">
      <div class="phone-inside">
        <img :src="facePhone" alt="">
      </div>
    </div>
    <p class="tip">
      您可到开通人脸验证的商家体验无手机会员身份验证，刷脸取餐~
    </p>
    <Button type="primary" @click="setting">
      完成
    </Button>
    <p class="footer">由商汤科技提供技术支持</p>
  </div>
</template>
<script>
import Button from '../../components/Button'
import { getFace } from '../../utils'
const router = require('@2dfire/utils/router')
export default {
  data() {
    return {
      facePhone: '',
      name: ''
    }
  },
  methods: {
    setting() {
      this.$router.replace('/setting')
    }
  },
  components: { Button },
  created() {
    document.title = '验证完成'
    this.facePhone = getFace('url')
    this.name = router.route.query['nickname']
  }
}
</script>
<style lang="scss" scoped src="./style.scss">
</style>
