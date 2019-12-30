<template>
  <section class="accout-select">
    <div v-if="isShow">
      <div class="notice">请选择你要提现的账户</div>
      <ul class="border-bottom item-wrap">
        <li
          class="item border-bottom"
          v-for="(item, i) in pageList"
          :key="item.account"
          @click="check(i)"
        >
          <div class="left">
            <i :class="['check', { checked: checked === i }]"></i>
          </div>
          <div class="right">
            <p class="account">
              {{ item.bankName }}：{{ item.cardNo | filterCardNo }}
            </p>
            <p class="availBln">
              可用余额：¥{{ item.balance | fen2yuan | number }}
            </p>
          </div>
        </li>
      </ul>
      <div class="btn-wrap">
        <Btn :disabled="checked === -1" @click="allow()">提现</Btn>
      </div>
      <div class="notice2 mt-36 plr-30">
        <p>
          提示：<br />
          1. 当前页面只显示最新三个且余额不为0的账户 如有疑问可联系客服处理<br />
        </p>
      </div>
    </div>
    <div v-if="isApplying" class="applying-wrapper">
      <i class="applying"></i>
      <p class="title">银行加紧处理中</p>
      <p class="content">请您耐心等待，稍后再试。</p>
    </div>

    <Loading v-if="isLoading"></Loading>
  </section>
</template>

<script>
import API from '../config/api'
import Btn from '../components/fire-button'
import Loading from '../components/loading'

export default {
  name: 'accout-select',
  data() {
    return {
      checked: -1,
      isShow: false,
      isApplying: false,
      isLoading: true,
      pageList: [
        // {
        //   entityId: '',
        //   userNo: '',
        //   accountNo: '',
        //   balance: '',
        //   mobile: '',
        //   bankName: '',
        //   cardNo: ''
        // },
        // {
        //   entityId: '',
        //   userNo: '',
        //   accountNo: '',
        //   balance: '',
        //   mobile: '',
        //   bankName: '',
        //   cardNo: ''
        // }
      ]
    }
  },
  components: {
    Btn,
    Loading
  },
  filters: {
    filterCardNo(cardNumber) {
      const newCardNo = `${cardNumber.substring(0, 4)} ${'*'
        .repeat(cardNumber.length - 8)
        .replace(/(.{4})/g, `$1 `)}${
        cardNumber.length % 4 ? ' ' : ''
      }${cardNumber.slice(-4)}`
      return newCardNo
    }
  },
  methods: {
    check(i) {
      this.checked = i
    },
    getAccountList() {
      const entityId = sessionStorage.getItem('entityId')
      API.accountListQuery({ entityId })
        .then(data => {
          this.isLoading = false
          this.pageList = data.filter(item => {
            return item.balance != 0
          })
          if (this.pageList.length === 0) {
            this.isApplying = true
          } else {
            this.isShow = true
          }
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    allow() {
      const accountType = sessionStorage.getItem('accountType')
      let valData = this.pageList[this.checked]
      valData.accountType = accountType
      sessionStorage.setItem('currentAccount', JSON.stringify(valData))
      setTimeout(() => {
        this.$router.push({
          path: '/withdraw-deposit'
        })
      }, 100)
    }
  },
  created() {
    this.getAccountList()
  }
}
</script>

<style lang="scss" scoped>
.accout-select {
  .notice {
    background: #ffefd6;
    height: 80px;
    padding: 0 30px;
    font-size: 28px;
    color: #333333;
    line-height: 80px;
  }
  .notice2 {
    font-size: 26px;
    color: #999999;
    line-height: 40px;
  }
  .item-wrap {
    background-color: #ffffff;
    margin-bottom: 72px;
  }
  .item {
    height: 156px;
    padding: 30px;
    display: flex;
    .left {
      width: 70px;

      .check {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        border: 1px solid #ccc;
      }

      .checked {
        background-image: url('https://assets.2dfire.com/frontend/9fdf1d94d0ea8feeea0d713098cb4a21.png');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border: none;
      }
    }
    .account {
      font-size: 30px;
      color: #333333;
      letter-spacing: 0;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .availBln {
      font-size: 30px;
      color: #666666;
      letter-spacing: 0;
    }
  }
  .btn-wrap {
    padding: 0 76px;
    font-size: 32px;
  }
  .applying-wrapper {
    padding-top: 380px;
  }
  i {
    display: block;
    width: 58px;
    height: 58px;
    margin: 0 auto 40px;
    background-repeat: no-repeat;
    &.applying {
      background-image: url(https://assets.2dfire.com/frontend/b5558aafd495fa5f5f26dc44f17ca784.png);
      background-size: cover;
    }
  }
  .title {
    font-size: 34px;
    color: #333333;
    letter-spacing: 0;
    line-height: 44px;
    text-align: center;
    margin-bottom: 30px;
  }
  .content {
    font-size: 26px;
    color: #666666;
    line-height: 36px;
    text-align: center;
    padding: 0 30px 15px;
    letter-spacing: 0;
    word-wrap: break-word;
  }
}
</style>
