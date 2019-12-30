<template>
<!-- 审核中页面 -->
    <div class="main-wrapper">
        <div class="auth-wrapper">
            <img class="img-audit-status" src="https://assets.2dfire.com/frontend/76bdc52b4e5c3b7334aba0295dbea23e.png" alt="">
            <h3 class="audit-status">您的申请审核中</h3>
            <p class="audit-notice">您的申请已提交，审核预计会在24小时内结束，请耐心等待。</p>
            <p class="submit-time">审核提交时间：{{applyTime | transTime}}</p>
            <p class="check" @click="checkInfo">查看我提交的审核资料</p>
        </div>
    </div>
    
</template>

<script>
import { dateFormat } from '../../../base/utils/date'
export default {
  data() {
    return { applyTime: this.$route.query.applyTime }
  },
  filters: {
    transTime(timestamp) {
      return dateFormat('yyyy年MM月dd日 hh:mm', new Date(Number(timestamp)))
    }
  },
  created() {},
  methods: {
    reApply() {},
    checkInfo() {
      // 查看申请资料
      this.$router.push({
        path: '/input',
        query: { pageType: 'detail', isNeedGetInfo: true }
      }) // 不可修改
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
        .submit-time {
            margin-bottom: 72px;
            font-size: 26px;
            color: #666666;
            line-height: 36px;
        }
        .check{
            font-size: 26px;
            color: #0088FF;
            line-height: 36px;
        }
    }
</style>