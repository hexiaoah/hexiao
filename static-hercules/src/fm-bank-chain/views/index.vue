<template>
  <section class="index-page">
    <div class="balance-wrap plr-30 border-top border-bottom mb-36">
      <p class="txt">账户余额（元）</p>
      <div class="balance-item">
        <p class="number">{{ balance | fen2yuan | number }}</p>
        <Btn type="apply" :disabled='isDisabled' @click="mainJump('/account-select')" class="apply-btn">提现</Btn>
      </div>
    </div>

    <div class="list border-top" @click="jumpRecord('/account-book')">
      <div class="left">
        <img
          class="img"
          src="https://assets.2dfire.com/frontend/e25ec92b553faa1bb0aa01a26f1e1957.png"
        />
        <div class="apply">门店账户余额</div>
      </div>
      <div class="right"></div>
    </div>

    <div class="list border-top border-bottom" @click="jumpRecord('/record')">
      <div class="left">
        <img
          class="img"
          src="https://assets.2dfire.com/frontend/6c34923f17390b56381544841dac8a50.png"
        />
        <div class="apply">提现操作记录</div>
      </div>
      <div class="right"></div>
    </div>

    <div class="notice mt-36 plr-30">
      <p>
        提示：
        <br />1. 连锁总部可对旗下门店的钱包资金做提现处理；
        <br />2. 提现后钱款进入门店绑定的收款账户中；
        <br />3. 提现的最终状态请于各门店的商户钱包中查看。
      </p>
    </div>
  </section>
</template>

<script>
import API from '../config/api'
import Router from '@2dfire/utils/router'
import sessionStorage from '@2dfire/utils/sessionStorage'
import Btn from '../components/fire-button'

export default {
  name: 'index',
  components: {},
  data() {
    return {
      ticket: Router.route.query['s_tk'] || '',
      token: sessionStorage.getItem('token'),
      balance: 0,
      isDisabled: false
    }
  },
  components: {
    Btn
  },
  methods: {
    mainJump(path) {
      this.$router.push(path)
    },
    // jump提现记录
    jumpRecord(path) {
      this.$router.push(path)
    },
    init() {
      this.getHomeInfo()
    },
    getHomeInfo() {
      const chainEntityId = sessionStorage.getItem('entityId')
      API.getTotalWalletAmt({ chainEntityId }).then(data => {
        this.balance = data
        if (Number(data) === 0) {
          this.isDisabled = true
        }
      })
    },
    // 获取session信息
    getSessionInfo() {
      API.getSessionInfo()
        .then(data => {
          const { entityId, shopName ,userName ,userId } = data
          sessionStorage.setItem('entityId', entityId)
          sessionStorage.setItem('shopName', shopName)
          sessionStorage.setItem('userName', userName)
          sessionStorage.setItem('userId', userId)
          setTimeout(() => {
            this.init()
          }, 0)
        })
        .catch(e => {
          console.log(e);
        })
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
          sessionStorage.setItem('s_tk', this.ticket)
          sessionStorage.setItem('token', token)
          this.token = token
          this.getSessionInfo()
        })
      }
    }
  },
  created() {
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
