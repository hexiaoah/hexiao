<template>
<!-- 审核中页面 -->
    <div class="main-wrapper">
        <div class="auth-wrapper">
            <img class="img-audit-status" src="https://assets.2dfire.com/frontend/76bdc52b4e5c3b7334aba0295dbea23e.png" alt="">
            <h3 class="audit-status">您的申请待确认</h3>
            <p class="audit-notice">请留意 短信/邮箱/支付宝App消息 进行确认签约，或点击下方链接进行确认签约。</p>
            <a class="link" :href='signUrl'>{{signUrl}}</a>
            <p class="check" @click="checkInfo">查看我提交的审核资料</p>
        </div>
    </div>
    
</template>

<script>
import BtnCustomShort from '../../components/btn-custom-short.vue'

export default {
  data() {
    return { signUrl: this.$route.query.signUrl }
  },
  components: {
    BtnCustomShort
  },
  created() {},
  methods: {
    reApply() {},
    checkInfo() {
      // 查看申请资料
      this.$router.push({
        path: '/input',
        query: { pageType: 'detail', isNeedGetInfo: true }
      })
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
        }
        .audit-notice {
            margin-bottom: 28px;
            font-size: 26px;
            color: #666666;
            line-height: 36px;
        }
        .link {
            display: block;
            margin-bottom: 72px;
            font-size: 26px;
            color:#0088FF;
            line-height: 36px;
            word-break: break-word;
        }
        .check{
            font-size: 26px;
            color: #0088FF;
            line-height: 36px;
        }
    }
</style>