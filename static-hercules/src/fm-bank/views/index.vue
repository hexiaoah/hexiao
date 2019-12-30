<template>
  <section class="index-page">
    <div
      :class="[
        'balance-wrap',
        'plr-30',
        'border-top',
        { 'mb-36': !isApplyFire },
        { 'border-bottom': !isApplyFire }
      ]"
    >
      <p class="txt">账户余额（元）</p>
      <div class="balance-item">
        <p class="number">{{ balance | fen2yuan | number }}</p>
        <Btn type="apply" :disabled="isDisabled" @click="mainJump('/account-select')" class="apply-btn"
          >提现</Btn
        >
      </div>
    </div>
    <p v-show="isApplyFire" class="line"></p>
    <div v-if="isApplyFire" class="balance-wrap plr-30 border-bottom mb-36">
      <p class="txt">账户余额（担保交易）（元）</p>
      <div class="balance-item">
        <p :class="['number']">
          {{ account007.balance | fen2yuan | number }}
        </p>
        <Btn type="apply" class="apply-btn" @click="fireApply">提现</Btn>
      </div>
      <div class="apply-card">
        <p class="fire-notice">
          担保交易渠道冻结余额：{{ account012.balance | fen2yuan | number }}元
          <img
            @click="toNotice"
            class="icon"
            src="https://assets.2dfire.com/frontend/7526168156e693e9823a06b391ab7b73.png"
            alt=""
          />
        </p>
        <p
          class="bind-card"
          v-if="isOpen"
          @click="jumpAccountGuarantee('/pay-account')"
        >
          绑定其他银行卡提现
        </p>
      </div>
    </div>

    <!-- <div class="list border-top border-bottom mb-36" @click="mainJump('/account-select')" >
            <div class="left">
                <img class="img" src="https://assets.2dfire.com/frontend/2d3c1ea93fd29c88b9b780ca15489d45.png"/>
                <div class="apply">提现</div>
            </div>
            <div class="right"></div>
        </div> -->

    <div class="list border-top" @click="jumpAccount()">
      <div class="left">
        <img
          class="img"
          src="https://assets.2dfire.com/frontend/e25ec92b553faa1bb0aa01a26f1e1957.png"
        />
        <div class="apply">收款账户</div>
      </div>
      <div class="right"></div>
    </div>

    <div class="list border-top" @click="jump('/account-book')">
      <div class="left">
        <img
          class="img"
          src="https://assets.2dfire.com/frontend/06af5268db4f211bd574318c2376cdfd.png"
        />
        <div class="apply">收支明细</div>
      </div>
      <div class="right"></div>
    </div>

    <div class="list border-top" @click="jump('/record')">
      <div class="left">
        <img
          class="img"
          src="https://assets.2dfire.com/frontend/6c34923f17390b56381544841dac8a50.png"
        />
        <div class="apply">提现记录</div>
      </div>
      <div class="right"></div>
    </div>
    <div class="list border-top" @click="jumpEle()">
      <div class="left">
        <img
          class="img"
          src="https://assets.2dfire.com/frontend/58006ebd1f2c45af21d11ab84a2dd7aa.png"
        />
        <div class="apply">电子收款明细</div>
      </div>
      <div class="right"></div>
    </div>
    <div
      v-if="isShow"
      class="list border-top border-bottom "
      @click="jump('/accredit')"
    >
      <div class="left">
        <img
          class="img"
          src="https://assets.2dfire.com/frontend/338779524049cacf9e1f0bd06c854fa8.png"
        />
        <div class="apply">资金管理授权</div>
      </div>
      <div class="right"></div>
    </div>
    <div class="notice mt-36 plr-30">
      <p>
        提示：<br />
        1. 电子收款数据统计按照自然日计算；<br />
        2. 商户钱包可用余额为扣除服务费之后的金额；<br />
        3.
        电子收款明细账单信息是微信收款、支付宝收款、二维火收款、QQ钱包收款等收款方式的总和。
      </p>
    </div>
  </section>
</template>

<script>
import API from '../config/api'
import Router from '@2dfire/utils/router'
import sessionStorage from '@2dfire/utils/sessionStorage'
import tools from '../utils/tools'
import Btn from '../components/fire-button'

export default {
  name: 'index',
  components: {},
  data() {
    return {
      ticket: Router.route.query['s_tk'] || '',
      token: sessionStorage.getItem('token'),
      balance: 0,
      isShow: false,
      isDisabled: false,
      enableWithdraw: true,
      noApplyFire: false,
      isApplyFire: false,
      accountNo: '',
      account007: {}, //火拼拼账户详情
      account012: { balance: 0 }, //火拼拼冻结账户详情
      isOpen: false
    }
  },
  components: {
    Btn
  },
  methods: {
    mainJump(path) {
      if (!this.enableWithdraw) {
        this.$alert({
          confirmText: '我知道了',
          content: '当前账户不可提现，请联系客服处理'
        })
        return false
      }
      
      this.$router.push(path)
    },
    fireApply() {
      const { enableWithdraw, balance } = this.account007
      if (this.noApplyFire) {
        this.$alert({
          confirmText: '我知道了',
          content: '您未开通担保交易'
        })
        return false
      }
      if (!enableWithdraw) {
        this.$alert({
          confirmText: '我知道了',
          content: '当前账户不可提现，请联系客服处理'
        })
        return false
      }
      if (Number(balance) === 0) {
        this.$alert({
          confirmText: '我知道了',
          content: '当前账户用余额可为0'
        })
        return false
      }
      this.jumpAccountGuarantee('/withdraw-deposit')
      // this.$router.push({
      //   path: '/withdraw-deposit',
      //   query: {
      //     source: '007'
      //   }
      // })
    },
    jump(path) {
      this.$router.push(path)
    },
    jumpEle() {
      window.location.href = 'ele-account.html'
    },
    jumpAccount() {
      window.location.href = 'tdf-manager://2dfire.com/payment/detail'
    },
    jumpAccountGuarantee(page) {
      window.location.href = `secured-account.html#${page}`
    },

    toNotice() {
      this.$router.push('/explain')
    },
    init() {
      this.getHomeInfo()
      this.isShowFundManageAuthorize()
      this.getGuaranteeAccounts()
      this.checkOpenBindCard()
    },
    getHomeInfo() {
      const entityId = sessionStorage.getItem('entityId')
      API.getHomeInfo({ entityId }).then(data => {
        const { balance, enableWithdraw, accountType } = data
        this.balance = balance
        if (Number(balance) === 0) {
          this.isDisabled = true
        }
        this.enableWithdraw = enableWithdraw
        sessionStorage.setItem('accountType', accountType)
      })
    },
    //获取担保交易账户信息
    getGuaranteeAccounts() {
      const entityId = sessionStorage.getItem('entityId')
      API.getGuaranteeAccounts({ entityId }).then(data => {
        if (data.length === 0) {
          this.noApplyFire = true
          return false
        }
        this.isApplyFire = true
        data.forEach((el, i) => {
          if (el.accountType === '007') {
            this.account007 = el
          }
          if (el.accountType === '012') {
            const { balance } = el
            this.account012.balance = balance
          }
        })
      })
    },
    //查询是否开通专用收款账户信息
    checkOpenBindCard() {
      const entityId = sessionStorage.getItem('entityId')
      API.checkOpenBindCard({ entityId })
        .then(data => {
          if (data == 1) {
            // 1：开通  0：未开通
            this.isOpen = true
          } else {
            this.isOpen = false
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 是否展示门店钱包查询授权总部提现
    isShowFundManageAuthorize() {
      API.isShowFundManageAuthorize( { userId: sessionStorage.getItem('userId')}).then(data => {
        if (data === true) {
          this.isShow = true
        }
      })
    },
    // 获取session信息
    getSessionInfo() {
      API.getSessionInfo()
        .then(data => {
          const { entityId, shopName, userId ,userName } = data
          sessionStorage.setItem('entityId', entityId)
          sessionStorage.setItem('userId', userId)
          sessionStorage.setItem('shopName', shopName)
          sessionStorage.setItem('userName', userName)
          setTimeout(() => {
            this.init()
          }, 0)
        })
        .catch(e => {})
    },
    getToken() {
      let ticket = sessionStorage.getItem('s_tk')
      let token = sessionStorage.getItem('token')
      if ((ticket === this.ticket || !this.ticket) && token) {
        this.getSessionInfo()
      } else {
        API.getToken({
          serviceTicket: this.ticket
        }).then(data => {
          let token = data.dfireToken
          console.log('token:', token)
          sessionStorage.setItem('s_tk', this.ticket)
          sessionStorage.setItem('token', token)
          this.token = token
          this.getSessionInfo()
        })
      }
    }
  },
  mounted() {
    this.getToken()
  }
}
</script>
<style lang="scss">
.index-page {
  .balance-wrap {
    padding-top: 30px;
    background: #ffffff;
    .txt {
      font-size: 30px;
      color: #333333;
      font-weight: bold;
      padding-bottom: 40px;
    }
    .balance-item {
      display: flex;
      justify-content: space-between;
      .number {
        font-size: 68px;
        color: #0088FF;
        padding-bottom: 36px;
      }
      .disabled {
        color: #ccc;
      }
    }
    .fire-notice {
      font-size: 26px;
      color: #666666;
      line-height: 36px;
      padding-bottom: 32px;
      .icon {
        width: 38px;
        height: 38px;
        margin-left: 20px;
      }
    }
    .apply-card {
      display: flex;
      justify-content: space-between;
      .bind-card {
        color: #0088ff;
      }
    }
  }
  .line {
    background: #ffffff;
    padding-left: 30px;
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background: #ccc;
    }
  }
  .list {
    height: 88px;
    padding: 0 30px;
    display: flex;
    background-color: white;
    align-items: center;
    justify-content: space-between;
    font-size: 30px;
    color: #333333;
    .img {
      width: 40px;
      // height: 40px;
    }
    .apply {
      margin-left: 26px;
      vertical-align: middle;
      display: inline-block;
    }

    .right {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAnCAYAAAFiXLgWAAAABGdBTUEAALGPC/xhBQAAA+tJREFUSA2tlktIlFEUx53RUafoMVASRrYJI6hFtgkqQuhltCnIiEoRHY0ogqAIWtQiiqBFmwxfiDJUWERE0JOC6AEVVIugxyKoVUVZUGOmzvQ7n9/5+h535sv0wnDuOed/HvecM/d+BQX+1dbWlvXIRBD1SIRxYH19fcUebWdn5zqPAOgdS8Dmqm5++SFZtBUeoZuRcB0dHUdFFnErZI/yAOSEI0fwTiwcQXt7+z6PQDUodujeTaPZbLbXaCEoFN9zKnH5LKcShSwrM9M5spFI5KU7EavQuEwFhLhpCggp/uKAsLu7e7pHCBPB5y4OeVoUxcXFiYaGhm9+kJt3siXubxQxURYWFlY1NTU9cwN17xioAMP37OfYfLKlpaVTdUIDBqrE8Bp7naoUhlbTchq4DA+yPy68FDY4xoqEUpAzEAsMvdvc3LzQGAHgUyq3xLY9RjqH7L33DOT9FUVClFSqhkpdV6BSKwIeM3jUaHPxKJUyriKRAm5IJBLnamtrpRfhi1TOh6NGETIaVjqU7AFVWB5mKGW1KkBayzB+HWZgHZS/89ZMJnNWwET6TKSyXIZamQKMVmB0zwamqdRkk5FjIMqurq75w8PDr2xgBqNCv5HHQJS9vb1lAwMDHxWIkQfjYRREmSex/6l8ZWVlrLq6elh4o4EoqFqUqo3IXhaNnUJjf+Q0GIW57uBRQXne8VYjpUVFRZFAFVQpKZWXl2eUBzy1sbHxizElXoB4f39/WsF5D02FZgD8rGB/WT1n4Dab5wJL4wIZOAaMxtKRkZG3tucBU5dFZxlQ743M0SMRyPABlsYZlzRnLxW5JFrAb/JNqmDk8Thlgx8Cni/70DWmv6h448CNnKGdbZS0bhB1E+dw+hAaMQ9A7oATOJR31bMI9Ly0tHRtXV3dJ49ijIzTRwLtJJC8Q04rbV8fGLvVjF3ofWKK7QRQJeVaT7kuwsdVZtPv0A2U7r5PnpcNBFA0jayiTNc51UyV2XQIuo1AF3xyI5szgKIJVEGgWwSqVJlS5PsZvZPKm2hoADUi0DT28vFmegxOE2gPAf9+b9mG/xzAFSiGoxQnqlWZUuRXYrHYFj5UnI/HMQdQZ0LzjPjjaDQqz/XXcQXQYJSvj/1m5ZVyotvjCoBj+VyRbxzPwvGTkpKSmvr6evOV7UH7GJxKD3rowVafSm6//+9BKpWamk6nr+B4pcFxazKZ3E2AsU9RT0/P7MHBQfkfLDA4/v//AaVYhMOb/Gb5HA+R6XbmXhobugJNZvRWYXWZjP2fL+O7i8i4nsy6cOx/3Md3m3J7Hub2PGI464t4PL5mQt4DeQsI0Er2HGJiX7Q/eLe0vymLctoAAAAASUVORK5CYII=);
      background-size: cover;
      width: 16px;
      height: 26px;
    }
  }
  .notice {
    font-size: 26px;
    color: #999999;
    line-height: 40px;
  }
}
</style>
