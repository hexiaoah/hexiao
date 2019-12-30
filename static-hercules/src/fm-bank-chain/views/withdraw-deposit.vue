<template>
  <section class="withdraw-deposit">
    <div class="shop-info border-bottom border-top">
      <div class="left">
        <img
          src="https://assets.2dfire.com/frontend/a1c743ea816fc1470245963c94dbbbe0.png"
          class="icon"
          alt=""
        />
        <p>提现门店数</p>
      </div>
      <div class="right">{{ params.totalNum }}家</div>
    </div>
    <div class="border-bottom item-wrap ">
      <div class="top">
        <span>提现金额（元）</span>
      </div>
      <p class="input">{{ params.totalAmt | fen2yuan }}</p>
      <p class="availBln border-top">
        <span>可用余额：{{ params.totalAmt | fen2yuan }}元</span>
      </p>
    </div>
    <div class="btn-wrap">
      <Btn @click="sure()">确认提现</Btn>
      <p class="notice">本次提现不收取手续费</p>
    </div>
    <div class="main-notice ">
      提示：<br />
      请您尽量在12:00-20:00点之间发起提现操作，晚于20:00提现预计会顺延到第二天到账。
    </div>
  </section>
</template>

<script>
import Router from '@2dfire/utils/router'
import API from '../config/api'
import Btn from '../components/fire-button'

export default {
  name: 'withdraw-deposit',
  data() {
    return {
      params: {
        totalAmt: Router.route.query['totalAmt'] || '',
        totalNum: Router.route.query['totalNum'] || ''
      },
      userRole: ''
    }
  },
  components: {
    Btn
  },
  methods: {
    sure() {
      this.authShopWithdrawApply()
    },
    // 发起提现申请
    authShopWithdrawApply() {
      const self = this
      const { totalNum, totalAmt } = this.params
      const detailListArr = sessionStorage.getItem('targetArr') || ''
      const params = {
        chainEntityId: sessionStorage.getItem('entityId') || '',
        chainName: sessionStorage.getItem('shopName') || '',
        userId: sessionStorage.getItem('userId') || '',
        applyNum: totalNum,
        applyAmt: totalAmt,
        operator: self.userRole,
        detailList: JSON.parse(detailListArr)
      }
      API.authShopWithdrawApply(params)
        .then(res => {
          const { resultCode, resultMsg } = res
          if (resultCode === '0000') {
            self.applySuccess()
          } else {
            self.$toast(resultMsg)
          }
        })
        .catch(e => {})
    },
    getUserRole() {
      const params = {
        entityId: sessionStorage.getItem('entityId') || '',
        userId: sessionStorage.getItem('userId') || ''
      }
      API.getUserRole(params).then(data => {
        const userName = sessionStorage.getItem('userName') || ''
        const role = data || ''
        this.userRole =`${userName}（${role}）`
      })
    },
    applySuccess() {
      const self = this
      self.$alert({
        confirmText: '我知道了',
        content: '提现操作成功，预计2小时内到账，请留意银行信息。',
        confirm: function() {
          self.$router.push({
            path: '/index'
          })
        }
      })
    }
  },
  created() {
    this.getUserRole()
  }
}
</script>

<style lang="scss" scoped>
.withdraw-deposit {
  .shop-info {
    background: #ffffff;
    height: 128px;
    padding: 24px 30px;
    margin-bottom: 22px;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      font-size: 30px;
      color: #333333;
      .icon {
        height: 80px;
        width: 80px;
        margin-right: 30px;
      }
    }
    .right {
      font-size: 30px;
      color: #0088ff;
      line-height: 80px;
    }
  }
  .item-wrap {
    height: 284px;
    background-color: #ffffff;
    margin-bottom: 72px;
    padding: 28px 30px 20px;

    .top {
      display: flex;
      justify-content: space-between;
      font-size: 30px;
      color: #333333;
      margin-bottom: 6px;
      .right {
        color: #0088ff;
      }
    }
    .input {
      padding: 20px;
      width: 100%;
      font-size: 80px;
      color: #333333;
    }
    .availBln {
      padding-top: 20px;
      font-size: 26px;
      color: #666666;
    }
  }
  .btn-wrap {
    padding: 0 76px;
    .notice {
      font-size: 26px;
      color: #999999;
      text-align: center;
      margin-top: 20px;
    }
  }
  .main-notice {
    font-size: 26px;
    color: #999999;
    margin-top: 72px;
    padding: 0 30px;
  }
}
</style>
