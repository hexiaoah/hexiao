<template>
  <section class="discover-page">
    <main-banner
      :mainData="bannerObj"
      @on-tap="toDetail(bannerObj, 1)"
    ></main-banner>
    <div class="handle-bar">
      <h3 class="title">热门借款</h3>
      <div class="tip" @click="toggleApplySteps">新手申请流程</div>
    </div>
    <ul class="item-list">
      <li
        class="item"
        v-for="item in recommendList"
        :key="item.name"
        @click="toDetail(item)"
      >
        <div
          class="left"
          :style="{ backgroundImage: 'url(' + item.logoUrl + ')' }"
        ></div>
        <div class="middle">
          <div class="top">
            <span class="name">{{ item.name }}</span>
            <span class="limit"
              >最高<i>{{ item.preMaxAmount }}</i
              >万</span
            >
          </div>
          <div class="bottom">
            <div class="specialty">
              <div class="span-wrap">
                <span v-if="item.feature1">{{ item.feature1 }}</span>
              </div>
              <div class="span-wrap">
                <span v-if="item.feature2">{{ item.feature2 }}</span>
              </div>
            </div>
            <span class="interest-rate"
              >日利率最低<i>{{ item.loanRate }}%</i></span
            >
          </div>
        </div>
        <div class="right"></div>
      </li>
    </ul>
    <div class="no-more">
      更多产品即将上线，敬请期待
    </div>
    <apply-steps :show="stepDialog" @close="toggleApplySteps"></apply-steps>
  </section>
</template>
<script>
import Router from '@2dfire/utils/router'
import ApplySteps from '../../components/apply-steps'
import MainBanner from '../../components/main-banner'
import {
  getList,
  checkUserInfoByConsumerId,
  checkIsBindByThirdId,
  getToken,
  queryUserInfoByMemberId
} from '../../config/api'

export default {
  data() {
    return {
      ticket: Router.route.query['s_tk'] || '',
      token: sessionStorage.getItem('token'),
      stepDialog: false,
      bannerObj: {},
      recommendList: [],
      openid: Router.route.query['openid'] || '',
      thirdId: Router.route.query['thirdId'] || '',
      consumerId: Router.route.query['id'] || '',
      isBind: false
    }
  },
  components: {
    ApplySteps,
    MainBanner
  },
  methods: {
    /*新手申请流程显示/隐藏*/
    toggleApplySteps() {
      this.stepDialog = !this.stepDialog
    },
    // 新增入口 如果是掌柜或者云收银过来的入口 需要根据token去 获取thirdId 和 isBind
    init() {
      const sourceType = Router.route.query['sourceType'] || ''
      if (sourceType === 'fireApp') {
        this.getToken()
      } else {
        this.checkIsBind()
      }
    },
    getToken() {
      let ticket = sessionStorage.getItem('s_tk')
      let token = sessionStorage.getItem('token')
      if ((ticket === this.ticket || !this.ticket) && token) {
        this.getSessionInfo()
      } else {
        getToken({
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
    },
    getSessionInfo() {
      queryUserInfoByMemberId()
        .then(data => {
          const { thirdId } = data
          // 客户端过来的 不管是否绑定 都是直接跳转第三方页面
          this.isBind = true
          this.thirdId = thirdId
        })
        .catch(e => {})
    },
    // 判断用户是否已实名
    checkIsBind() {
      const self = this
      const { thirdId, consumerId } = self
      if (thirdId) {
        checkIsBindByThirdId({ thirdId }).then(res => {
          self.isBind = res
        })
      }
      if (consumerId) {
        checkUserInfoByConsumerId({ consumerId }).then(res => {
          self.isBind = res.isBind
        })
      }
    },
    /*获取贷款公司列表*/
    getRecommend() {
      const self = this
      getList().then(data => {
        let targetArr = []
        data.forEach((v, i) => {
          const {
            name,
            loanRate,
            logoUrl,
            newUrl,
            sort,
            preMaxAmount,
            proBriefUrl,
            isClassical
          } = v
          const addobj = {
            name,
            loanRate,
            logoUrl,
            newUrl,
            sort,
            preMaxAmount: parseInt(Number(preMaxAmount)),
            proBriefUrl,
            feature1: proBriefUrl.split('&')[0] || '',
            feature2: proBriefUrl.split('&')[1] || ''
          }
          targetArr.push(addobj)
          // banner
          if (isClassical) {
            this.bannerObj = addobj
          }
        })
        setTimeout(() => {
          this.recommendList = targetArr
          if (this.bannerObj.logoUrl === undefined) {
            this.bannerObj = targetArr[0]
          }
        }, 0)
      })
    },
    /* 跳转详情 */
    toDetail(item, type) {
      const self = this
      const { thirdId, openid, consumerId, isBind } = self
      const { newUrl, name } = item
      if (type === 1) {
        self.logger({
          name: '推荐位借款产品',
          info: name + '&thirdId=' + (thirdId || consumerId)
        })
      } else {
        self.logger({
          name: '借款产品',
          info: name + '&thirdId=' + (thirdId || consumerId)
        })
      }
      if (thirdId || consumerId) {
        if (isBind) {
          setTimeout(() => {
            window.location.href = newUrl
          }, 0)
        } else {
          self.$router.push({
            path: '/infoCollect',
            query: { thirdId, consumerId, url: newUrl, name }
          })
        }
      } else {
        setTimeout(() => {
          window.location.href = newUrl
        }, 0)
      }
    }
  },
  created() {
    this.init()
    this.getRecommend()
  }
}
</script>

<style lang="scss" scoped>
.discover-page {
  background: #ffffff;
  padding: 40px 30px 0;
  .title {
    font-size: 36px;
    color: #333333;
    line-height: 48px;
    font-weight: bold;
  }
  .handle-bar {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    .tip {
      font-size: 24px;
      color: #4a6cff;
      line-height: 48px;
    }
  }
  .item-list {
    .item {
      display: flex;
      justify-content: space-between;
      padding: 28px 0 28px;
      /* prettier-ignore */
      border-bottom: 1PX solid rgba(204, 204, 204, 0.3);
      .left {
        width: 60px;
        height: 60px;
        margin-top: 7px;
        /* prettier-ignore */
        border: 0.5PX solid #e7e5e5;
        border-radius: 10px;
        background-size: cover;
        background-position: center;
      }
      .middle {
        width: 540px;
        margin-right: 8px;
        .top {
          display: flex;
          color: #333333;
          justify-content: space-between;
          margin-bottom: 6px;
          .name {
            font-size: 32px;
            font-weight: bold;
            line-height: 44px;
          }
          .limit {
            font-size: 28px;
            line-height: 32px;
            i {
              font-style: normal;
              font-size: 36px;
              color: #ff5539;
              line-height: 56px;
              font-weight: bold;
            }
          }
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          color: #666;
          font-size: 24px;
          .specialty {
            .span-wrap {
              display: inline-block;
            }
            span {
              display: inline-block;
              /* prettier-ignore */
              border: 1PX solid #666;
              padding: 2px 10px;
              border-radius: 21px;
              margin-right: 8px;
            }
          }
          .interest-rate {
            i {
              font-style: normal;
              color: #ff7433;
            }
          }
        }
      }
      .right {
        width: 30px;
        height: 100px;
        background-position: center;
        background-size: 16px 30px;
        background-repeat: no-repeat;
        background-image: url('../../images/icon-left.png');
      }
    }
  }
  .no-more {
    position: relative;
    margin-top: 28px;
    padding-bottom: 88px;
    font-size: 26px;
    color: #999;
    text-align: center;
    &:before {
      display: block;
      content: '';
      position: absolute;
      top: 17px;
      left: 150px;
      width: 15px;
      height: 2px;
      background-color: #999999;
    }
    &:after {
      display: block;
      content: '';
      position: absolute;
      top: 17px;
      right: 150px;
      width: 15px;
      height: 2px;
      background-color: #999999;
    }
  }
}
</style>
