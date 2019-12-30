<template>
  <section class="accredit">
    <div class="list border-top border-bottom">
      <div class="left">允许连锁总部发起提现</div>
      <div class="right">
        <base-switch v-model="isSwitch" @on-switch="onSwitch"></base-switch>
      </div>
    </div>
    <div class="notice">
      如果允许连锁总部发起提现，则连锁总部可以对门店的钱包
      <br />账户余额发起提现操作，资金会提现至<span class="te"
        >门店绑定的银行卡</span
      >。
    </div>
  </section>
</template>

<script>
import API from '../config/api'
import BaseSwitch from '../components/base-switch'
export default {
  name: 'accredit',
  components: {
    BaseSwitch
  },
  data() {
    return {
      isSwitch: false
    }
  },
  methods: {
    init() {
      this.queryChainAuthWithdraw()
    },
    queryChainAuthWithdraw() {
      API.queryChainAuthWithdraw().then(data => {
        // data 还有可能是undefined .....
        if ( data === true || data === false ) {
          this.isSwitch = data
        }
      })
    },
    onSwitch(e) {
      this.updateChainAuthWithdraw(e)
    },
    // 修改门店授权总部提现
    updateChainAuthWithdraw(isAuth) {
      API.updateChainAuthWithdraw({
        isAuth: isAuth,
        userId: sessionStorage.getItem('userId'),
        operator: sessionStorage.getItem('userName')
      }).then(res => {
        console.log(res)
      })
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.accredit {
  .list {
    height: 88px;
    padding: 0 30px;
    display: flex;
    background-color: white;
    justify-content: space-between;
    font-size: 30px;
    color: #333333;
    line-height: 88px;
  }
  .notice {
    padding: 20px 30px;
    font-size: 26px;
    color: #999999;
    line-height: 40px;
    .te {
      color: #151515;
    }
  }
}
</style>
