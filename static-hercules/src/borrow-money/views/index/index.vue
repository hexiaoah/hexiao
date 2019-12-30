<template>
  <section class="discover-page">
    <div class="banner-box">
      <!-- 信用卡轮播图 -->
      <banner-swiper 
        :bannerObj="bannerObj" 
        @on-tap="item=>toDetail(item,1)"
        v-if="bannerObj.prdType===3"
      ></banner-swiper> 
      <!-- 借款推荐 -->
      <div class="main-banner-box" v-else>
        <banner
          :mainData="bannerObj"
          @on-tap="toDetail(bannerObj, 2)"
        ></banner>
      </div>
    </div>
    <!-- 借款产品 -->
    <div class="handle-bar">
      <h3 class="title">借款产品</h3>
      <div class="tip" @click="toggleApplySteps">新手申请流程</div>
    </div>
    <ul class="item-list">
      <li
        class="item"
        v-for="item in recommendList"
        :key="item.name"
        @click="toDetail(item, 3)"
      >
        <div class="item-top">
          <div
            class="top-left"
            :style="{ backgroundImage: 'url(' + item.logoUrl + ')' }"
          ></div>
          <div class="top-right">
            <div class="name">{{ item.name }}</div>
            <div class="specialty">
              <div class="span-wrap borrow-span-wrap">
                <span v-if="item.feature1">{{ item.feature1 }}</span>
              </div>
              <div class="span-wrap borrow-span-wrap">
               <span v-if="item.feature2">{{ item.feature2 }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="item-middle">
          <span class="limit" 
            >最高额度<i>{{ item.preMaxAmount*10000 | number(0)}}</i
            >元</span
          >
        </div>
        <div class="item-bottom">
          <span class="interest-rate"
            >日利率最低<i>{{ item.loanRate }}%</i></span
          >
        </div>
      </li>
    </ul>
    <!-- 信用卡产品 -->
    <div class="handle-bar">
      <h3 class="title">信用卡</h3>
    </div>
    <ul class="item-list">
      <li
        class="item"
        v-for="item in creditList"
        :key="item.name"
        @click="toDetail(item, 4)"
      >
        <div class="item-top">
          <div
            class="top-left"
            :style="{ backgroundImage: 'url(' + item.logoUrl + ')' }"
          ></div>
          <div class="top-right">
            <div class="name">{{ item.name }}</div>
            <div class="specialty">
              <div class="span-wrap credit-span-wrap">
                <span v-if="item.feature1">{{ item.feature1 }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="item-middle credit-middle">
          {{ item.feature2 }}
        </div>
        <div class="item-bottom">
          {{ item.feature3 }}
        </div>
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
import Banner from '../../components/banner'
import BannerSwiper from '../../components/banner-swiper'
import {
  getList,
  checkUserInfoByConsumerId,
  checkIsBindByThirdId,
  getToken,
  queryUserInfoByMemberId,
  getSessionMapFromToken
} from '../../config/api'

export default {
  data() {
    return {
      ticket: Router.route.query['s_tk'] || '',
      token: sessionStorage.getItem('token'),
      stepDialog: false,
      bannerObj: {},
      recommendList: [],
      creditList: [],
      openid: Router.route.query['openid'] || '',
      thirdId: Router.route.query['thirdId'] || '',
      consumerId: Router.route.query['id'] || '',
      entityId: '',
      isBind: false,
      sourceApp: ''
    }
  },
  components: {
    ApplySteps,
    Banner,
    BannerSwiper
  },
  methods: {
    /*新手申请流程显示/隐藏*/
    toggleApplySteps() {
      this.stepDialog = !this.stepDialog
    },
    // 新增入口 如果是掌柜或者云收银过来的入口 需要根据token去 获取thirdId 和 isBind
    init() {
      const sourceType = Router.route.query['sourceType'] || ''
      const source = Router.route.query['source'] || ''
      const wx = Router.route.query['thirdId'] || ''
      if (sourceType === 'fireApp') {
        this.getToken()
        if (source === 'manager') {
          this.sourceApp = '掌柜'
        } else if(source === 'cloudpos') {
          this.sourceApp = '云收银'
        }
      } else {
        this.checkIsBind()
        if (wx) {
          this.sourceApp = '吃喝购'
        }
        if(source === 'huopinpinapp') {
          this.sourceApp = '火拼拼'
        }
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
      this.getSessionToken()
    },
    // 用于埋点
    getSessionToken() {
      getSessionMapFromToken()
      .then(data => {
        const { entityId } = data
        this.entityId = entityId
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
        let targetArr = [],
        creditArr=[],
        index=0
        data.forEach((v, i) => {
          const {
            name,
            loanRate,
            logoUrl,
            newUrl,
            sort,
            preMaxAmount,
            proBriefUrl,
            isClassical,
            prdType
          } = v
          let addobj = {}
          if(prdType===2){
            // 借款产品
            addobj = {
              prdType,
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
          }else if(prdType === 3){
            let advertUrl = ''
            if (v.advertUrl) {
              advertUrl = JSON.parse(v.advertUrl)
            }
            // 信用卡
            addobj = {
              prdType,
              name,
              loanRate,
              logoUrl,
              newUrl,
              sort,
              advertUrl: advertUrl,
              proBriefUrl,
              feature1: proBriefUrl.split('&')[0] || '',
              feature2: proBriefUrl.split('&')[1] || '',
              feature3: proBriefUrl.split('&')[2] || '',
            }
            creditArr.push(addobj)
          }
          // banner
          if (isClassical) {
            if(prdType===2){
              // 获取加精的当前下标
              index=targetArr.length-1
            }
            this.bannerObj = addobj
          }
        })
        setTimeout(() => {
          if (this.bannerObj.logoUrl === undefined) {
            this.bannerObj = targetArr[0]
            index = 0
          }
          // 加精项目为借款产品，👎总数为大于1的奇数时
          if(this.bannerObj.prdType === 2){
            if (targetArr.length > 1 && targetArr.length % 2 !== 0){
              targetArr.splice(index,1)
            }
          }
          this.recommendList = targetArr
          this.creditList = creditArr
        }, 0)
      })
    },
    /* 跳转详情 */
    toDetail(item, type) {
      const self = this
      const { thirdId, openid, consumerId, entityId, isBind, sourceApp } = self
      const { newUrl, name } = item
      let key = sourceApp + '信用卡'
      if (type === 1) {
        const { sort } = item
        key = sourceApp + `推荐位图${sort}信用卡`
      } else if (type === 2) {
        key = sourceApp + '推荐位借款产品'
      } else if (type === 3) {
        key = sourceApp + '借款产品'
      }
      self.logger({
        name: key,
        info: name + '&thirdId=' + (thirdId || consumerId || entityId)
      })
      if (thirdId || consumerId) {
        if (isBind || type === 1 || type === 4) {
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
  background: #f7f8fa;
  >div,ul{
    background:#fff;
  }
  .banner-box{
    padding: 30px 0 60px 30px;
  }
  .handle-bar {
    display: flex;
    justify-content: space-between;
    padding:0 30px 0 50px;
    box-sizing: border-box;
    position: relative;
    &:before{
      position: absolute;
      content:'';
      width:10px;
      height:32px;
      background:#5B8AFF;
      left:30px;
      top:50%;
      transform: translateY(-50%);
    }
    .title {
      font-size: 36px;
      color: #333333;
      line-height: 48px;
      font-weight: bold;
    }
    .tip {
      font-size: 24px;
      color: #4a6cff;
      line-height: 48px;
    }
  }
  .item-list {
    overflow: hidden;
    padding-top:30px;
    .item {
      float:left;
      width:50%;
      margin-bottom:60px;
      padding-left:30px;
      position: relative;
      &:nth-of-type(odd){
        position: relative;
        &:after{
          position: absolute;
          content:'';
          width:2px;
          height:180px;
          background:rgba(0,0,0,0.08);
          top:0;
          right:0;
        }
      }      
      .item-top {
        display: flex;
        justify-content: flex-start;
        .top-left{
          width: 80px;
          height: 80px;
          margin-right:14px;
          /* prettier-ignore */
          border: 0.5PX solid #e7e5e5;
          border-radius: 10px;
          background-size: cover;
          background-position: center;
        }
        .top-right{
          .name{
            color:#333;
            font-size: 32px;
            font-weight: bold;
            line-height: 44px;
            margin-bottom: 8px;
            letter-spacing: 0;
          }
          .specialty {
            .span-wrap{
              float: left;
              text-align: center;
              color: #666;
              letter-spacing: 0;
              &:first-child{
                margin-right: 8px;
              }
              &.borrow-span-wrap{
                width:110px;
              }
              span{
                display:inline-block;
                font-size: 24px;
                line-height:35px;
                border:0.5PX solid #666;
                min-width:110px;
                border-radius:4px;
              }
              &.credit-span-wrap{
                color:#5B8AFF;
                span{
                  border:none;
                  padding:0 10px;
                  background:rgba(91,138,255,0.10);
                }
                &:first-child{
                  margin-right: 0;
                }
              }
            }
          }
        }
      }
      .item-middle {
        margin:16px 0 10px;
        overflow: hidden;
        white-space:nowrap;
        &.credit-middle{
          margin:16px 0 8px;
        }
        color:#333;
        font-size: 28px;
        line-height: 40px;
        .limit {
          i {
            font-style: normal;
            color: #ff5539;
            font-weight: bold;
          }
        }
      }
      .item-bottom {
          color: #999;
          font-size: 28px;
          line-height:40px;
          .interest-rate {
            i {
              font-style: normal;
              color: #ff7c33;
              font-weight: bold;
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
    width:100%;
    height:128px;
    font-size: 28px;
    color: #999;
    line-height:100px;
    text-align: center;
    background:#f7f8fa;
  }
}
</style>
