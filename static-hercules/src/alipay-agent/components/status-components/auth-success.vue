<template>
<!-- 审核成功页面 -->
    <div class="main-wrapper">
        <div class="auth-wrapper">
            <img class="img-audit-status" src="https://assets.2dfire.com/frontend/0592284ad3be81413de6cc6d9d165cd6.png" alt="">
            <h3 class="audit-status">审核通过</h3>
            <h3 class="audit-status">支付宝收款账号：{{alipayAccount}}</h3>
            <h3 v-if="isEnable" class="audit-status">已启用直连收款</h3>
            <div class="padding-t48" v-else>
                <btn-custom-short  @click.native="toBind">立即启用直连收款</btn-custom-short>
            </div>
            <p class="check" @click="checkInfo">查看已递交的材料</p>
            <p class="check"  @click="updateInfo">升级我的申请资料（收款无限额）</p>
            <p class="text-color"  >现有优惠费率活动，通过即可享受0.2%的费率（仅支持餐饮商户）。<span class="check" @click="toApply">立即申请</span></p>
        </div>
    </div>
</template>

<script>
import BtnCustomShort from '../../components/btn-custom-short.vue'
import API from '../../config/api'

export default {
  data() {
    return {
      isEnable: false,
      alipayAccount: this.$route.query.alipayAccount
    }
  },
  components: {
    BtnCustomShort
  },
  created() {
    const enable = this.$route.query.isEnable
    if (enable === true || enable === 'true') {
      this.isEnable = true
    } else {
      this.isEnable = false
    }
  },
  methods: {
    toBind() {
      const self = this
      API.enableAlipay({
        entityId: sessionStorage.getItem('entityId')
      })
        .then(data => {
          self.isEnable = true
        })
        .catch(e => {
          console.log(e)
        })
    },
    checkInfo() {
      // 查看申请资料
      this.$router.push({
        path: '/input',
        query: { pageType: 'detail', isNeedGetInfo: true }
      }) // 不可修改
    },
    // 升级申请资料
    updateInfo() {
      this.$router.push({
        path: '/upgrade'
      })
    },
    toApply() {
      window.location.href = './ocean-zl.html'
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>

    .auth-wrapper {
        text-align: center;
        padding: 350px 50px 0;
        .img-audit-status {
            width: 58px;
            height: 58px;
            vertical-align: middle;
        }
        .audit-status {
            margin: 40px 0 30px;
            color: #333333;
            font-size: 34px;
            word-break: break-all;
        }
        .padding-t48{
            padding-top: 48px;
        }
        .check{
            padding-top: 30px;
            font-size: 26px;
            color: #0088FF;
            line-height: 36px;
        }
        .text-color{
             padding-top: 50px;
            font-size: 26px;
            // color: #0088FF;
            line-height: 36px;
        }
    }
</style>