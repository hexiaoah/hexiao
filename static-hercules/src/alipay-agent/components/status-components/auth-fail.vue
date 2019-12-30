<template>
<!-- 审核中页面 -->
    <div class="main-wrapper">
        <div class="auth-wrapper">
            <img class="img-audit-status" src="https://assets.2dfire.com/frontend/0d3bb4caf2b823c8b8e31a9a3fe08e31.png" alt="">
            <h3 class="audit-status">您的申请审核失败，请重新申请</h3>
            <p class="audit-notice">失败原因：{{auditMessage}}</p>
            <div class="btn">
                <btn-custom-short @click.native="reApply">重新申请</btn-custom-short>
            </div>
        </div>
    </div>
    
</template>

<script>
import BtnCustomShort from '../../components/btn-custom-short.vue'

export default {
  data() {
    return { auditMessage: this.$route.query.auditMessage }
  },
  components: {
    BtnCustomShort
  },
  created() {},
  methods: {
    reApply() {
      this.$router.push({
        path: '/input',
        query: { pageType: 'edit', isNeedGetInfo: true, source: 'fail' }
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
            margin-bottom: 72px;
            font-size: 26px;
            color: #666666;
            line-height: 36px;
        }
    }
</style>