<template>
  <div class="unbind-wrapper">
    <p class="title">不支持自然人申请</p>
    <p class="content">你当前为自然人商户类型，目前仅支持个体工商户和企业帐户申请，请前往绑定银行卡页面（原电子收款帐户页面）修改帐户类型后继续申请。</p>
    <a href="javascript:void(0)"
       class="bind-btn"
       @click="bindAccount">点击前往修改账户类型</a>
    <!-- <Info v-show="!isSuper" @close="close"></Info> -->
  </div>
</template>

<script>
import { judgeSuper, naturalChange } from '../../config/api'
import errorToast from 'src/oasis/libs/errorToast'
import hintToast from 'src/ocean/libs/hintToast'
// import Info from 'src/oasis/components/Info.vue'
export default {
  data() {
    return {
      //   isSuper: true,
      appUrl: 'tdf-manager://2dfire.com/payment/info?bizType=1'
    }
  },
  created() {
    if (window.tdfire) {
      let app_version = window.tdfire.appVersion()
      if (app_version) {
        let versionNum = Number(app_version.replace(/\./g, ''))
        if (versionNum < 5830) {
          this.appUrl = 'tdf-manager://2dfire.com/payment/detail?bizType=1'
        }
      }
    }
  },
  methods: {
    bindAccount() {
      naturalChange()
        .then(data => {
          if (data.data) {
            // this.isSuper = true
            window.location.href = this.appUrl
          } else {
            hintToast.show(
              '您没有收款账户的操作权限，请联系店铺管理者(老板或主管)开通权限。'
            )
          }
        })
        .catch(e => {
          errorToast.show(e.result.message)
        })
    }
    // close() {
    //   this.isSuper = true
    // }
  },
  components: {
    // Info
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
.unbind-wrapper {
  padding-top: 202px;

  .title {
    font-size: 17px;
    color: #333333;
    letter-spacing: 0;
    line-height: 22px;
    text-align: center;
  }

  .content {
    font-size: 13px;
    color: #666666;
    letter-spacing: 0;
    line-height: 18px;
    margin: 15px 20px 36px;
    text-align: center;
  }

  a {
    width: 300px;
    background: #0088ff;
    border-radius: 6px;
    font-size: 15px;
    color: #ffffff;
    line-height: 44px;
    margin: auto;
    display: block;
    text-align: center;
  }
}
</style>
