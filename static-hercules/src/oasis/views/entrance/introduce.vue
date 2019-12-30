<template>
    <div class="introduce-wrapper" >
        <img v-if="suorceType==='weixin'" class="main-logo" src="https://assets.2dfire.com/frontend/956540e659c26a26639a7a624d88c492.png" alt="">
        <img v-if="suorceType==='alipay'" class="main-logo" src="https://assets.2dfire.com/frontend/7a06f59f418f5ece7c05c2c0d03213dc.png" alt="">
        <apply-title text='申请条件'></apply-title>
        <apply-require :text='noticeText'></apply-require>
        <apply-title text='准备材料'></apply-title>
        <div class="item-wrapper">
            <div v-for="item in list" :key="item.name" @click="showExample(item.url)" class="item">
                <div class="pic" :style="{'background-image':'url('+item.url+')'}"></div>
                <p class="title">{{item.name}}</p>
            </div>
        </div>
        <div class="btn">
            <a href="javascript: void(0)"
               class="submitapply"
               @click="apply">立即申请</a>
        </div>
         <shop-img-example></shop-img-example>
          <Rule v-show="showRule" v-on:hide="hide"></Rule>
    </div>
</template>

<script>
import { fixedBody, looseBody } from 'base/utils/unit.js'
import { applyState } from '../../config/api'
import { mapActions } from 'vuex'
import {
  wxJl,
  wxJlText,
  wxZlText,
  wxZl,
  alipayJl,
  alipayJlText,
  alipayTlJl,
  alipayTlJlText,
  alipayZl,
  alipayZlText
} from '../../constants/index'
import Router from '@2dfire/utils/router'
import Rule from './Rule'
import ApplyTitle from '../../components/applyTitle'
import ApplyRequire from '../../components/applyRequire'
import ShopImgExample from '../../components/ShopImgExample.vue'

export default {
  name: 'Introduce',
  data() {
    return {
      showRule: false,
      suorceType: '',
      openType: '',
      noticeText: '',
      list: []
    }
  },
  components: {
    Rule,
    ApplyTitle,
    ApplyRequire,
    ShopImgExample
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions(['changeExamplePhoto']),
    apply() {
      let {
        openType = '',
        accountStatus = '',
        openStatus = '',
        naturalPerson
      } = this.$route.query
      if (openType === 'alipay_jl') {
        this.alipayJl(openStatus)
      } else if (openType === 'alipay_tljl') {
        this.alipayTlJl()
      } else if (openType === 'alipay_zl') {
        this.alipayZl()
      } else {
        this.wechatAll(openType, accountStatus, naturalPerson)
      }
    },
    // 支付宝网商间连
    alipayJl(openStatus) {
      if (openStatus === 'unopen') {
        this.showRule = true
        fixedBody()
      } else {
        window.location.replace('ocean.html#/result')
      }
    },
    // 支付宝通联间连
    alipayTlJl() {
      //   console.log('支付宝通联间连')
      window.location.replace('./ocean-zl.html#/inactive-tl?version=1.2')
    },
    // 支付宝直连
    alipayZl() {
      window.location.replace('./ocean-zl.html#/input')
    },
    // 微信 间连 + 直连
    wechatAll(openType, accountStatus, naturalPerson) {
      const routerpath = [
        {
          path: '/inactive',
          query: {
            accountStatus: accountStatus
          }
        },
        {
          path: '/natural'
        },
        {
          path: '/input',
          query: {
            openType: openType
          }
        }
      ]
      if (openType === 'e_payment' && accountStatus !== 'activated') {
        this.$router.push(routerpath[0])
      } else if (openType === 'e_payment' && naturalPerson === 'true') {
        this.$router.push(routerpath[1])
      } else {
        this.$router.push(routerpath[2])
      }
    },
    hide() {
      this.showRule = false
      looseBody()
    },
    switchType() {
      const { openType = '' } = this.$route.query
      switch (openType) {
        case 'e_payment':
          this.suorceType = 'weixin'
          this.list = wxJl
          this.noticeText = wxJlText
          return
        case 'wechat_payment':
          this.suorceType = 'weixin'
          this.list = wxZl
          this.noticeText = wxZlText
          return
        case 'alipay_jl':
          this.suorceType = 'alipay'
          this.list = alipayJl
          this.noticeText = alipayJlText
          return
        case 'alipay_zl':
          this.suorceType = 'alipay'
          this.list = alipayZl
          this.noticeText = alipayZlText
          return
        case 'alipay_tljl':
          this.suorceType = 'alipay'
          this.list = alipayTlJl
          this.noticeText = alipayTlJlText
          return
        default:
          this.suorceType = 'weixin'
          break
      }
    },
    init() {
      this.switchType()
    },
    showExample(url) {
      fixedBody()
      this.changeExamplePhoto({ img: url, isShow: true })
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
.introduce-wrapper{
    background: #ffffff;
    padding-bottom: 30px;
    .main-logo{
        display: block;
        width: 100%;
        margin-bottom: 18px;
    }
    .item-wrapper{
        padding: 0 0 20px 32px;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        .item{
            display: flex;
            flex-direction: column;
            margin-right: 26px;
            .pic{
                 width: 86px;
                 height: 94px;
                 background-repeat: no-repeat;
                 background-size: cover;
            }
            .title{
                font-size: 13px;
                text-align: center;
                color: #333333;
                padding: 10px 0 15px;
            }
        }
    }
    .submitapply{
        width: 300px;
        height: 44px;
        background: #0088FF;
        border-radius: 6px;
        font-size: 15px;
        color: #FFFFFF;
        line-height: 44px;
        margin: auto;
        text-align: center;
        display: block;
    }
}

</style>

