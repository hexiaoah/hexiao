<template>
  <div class="unbind-wrapper">
    <p class="title">您还未绑定电子收款账户</p>
    <p class="content">请先绑定收款账户再来申请微信支付优惠费率</p>
    <a href="javascript:void(0)"
       class="bind-btn"
       @click="bindAccount">点击绑定电子收款账户</a>
    <!-- <Info v-show="!isSuper" @close="close"></Info> -->
  </div>
</template>

<script>
import { judgeSuper } from '../../config/api'
import errorToast from 'src/oasis/libs/errorToast'
// import Info from 'src/oasis/components/Info.vue'
import hintToast from 'src/ocean/libs/hintToast'
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
      judgeSuper()
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
          // errorToast.show(e.result.message)
          console.log(e)
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

  .unbind-wrapper{
    padding-top: 202px;

    .title{
      font-size: 17PX;
      color: #333333;
      letter-spacing: 0;
      line-height: 22px;
      text-align: center;
    }

    .content{
      font-size: 13PX;
      color: #666666;
      letter-spacing: 0;
      line-height: 18px;
      margin-bottom: 36px;
      margin-top: 15px;
      text-align: center;
    }

    a{
      width: 300px;
      background: #0088FF;
      border-radius: 6px;
      font-size: 15PX;
      color: #FFFFFF;
      line-height: 44px;
      margin: auto;
      display: block;
      text-align: center;
    }
  }
</style>
