<template>
    <div class="entrance-wrapper" >
        <div class="entrance-top">
            <div class="image">
                <img src="https://assets.2dfire.com/frontend/96e4b38f40500c933d0865be4fee7391.jpg">
            </div>
        </div>
        <div class="notice">
            <p class="title">政策通知</p>
            <div class="text pt1">   根据微信支付优惠费率新规调整如下：从2018年12月28日开始，至2019年12月31日，所有已审核通过特约商户结算费率将统一变更为0.2%。</div>
            <!-- <div class="text pb1">根据支付宝支付优惠费率新规调整如下：从2019年2月1日开始，至2019年12月31日，所有已审核通过支付宝优惠费率申请的商户，结算费率将统一调整为0.2%。</div> -->
        </div>
        <!--支付宝 间连-->
        <p class="sub-title">申请入口</p>
        <div class="active-entrance alipay-entrance" @click="toRule" style="border-top: 1PX solid #ddd">
            <img src="https://assets.2dfire.com/frontend/d8deb5e67e9aed34955fe5f1ed3add6b.png"/>
            <div class="apply">
                <p class="apply-title">
                    <span>支付宝优惠费率申请</span>
                    <span class="unopen label" v-if="alipayApplyState.openStatus === 'no_permission'">{{alipayApplyState.statusTitle}}</span>
                    <span class="unopen label" v-else-if="alipayApplyState.openStatus === 'unopen'">未开通</span>
                    <span class="opening label" v-else-if="alipayApplyState.openStatus === 'opening'">审核中</span>
                    <span class="success label" v-else-if="alipayApplyState.openStatus === 'opened'">已开通</span>
                    <span class="fail label" v-else-if="alipayApplyState.openStatus === 'open_fail'">开通失败</span>
                </p>
                <p class="apply-content">已绑定电子收款帐户的个体或企业商户由此入</p>
            </div>
            <div class="turn-right"></div>
        </div>
        <!--微信- 间联 -->
        <div v-for="(item,index) in applyState" :key="index" class="border-b" :class="index===0?' border-t':''">
            <div v-if="item.openType==='e_payment'" class="active-entrance   weixin-0" @click="goApply(item)">
                <img src="https://assets.2dfire.com/frontend/248916a36f9f66a2637ec2e995fdca3e.png"/>
                <div class="apply">
                    <p class="apply-title">
                        <span>微信优惠费率申请-普通</span>
                        <span class="unopen label" v-if="item.openStatus === 'no_permission'">{{item.statusTitle}}</span>
                        <span class="unopen label" v-if="item.openStatus === 'unopen'">未开通</span>
                        <span class="opening label" v-if="item.openStatus === 'opening'">审核中</span>
                        <span class="success label" v-if="item.openStatus === 'opened'">已开通</span>
                        <span class="fail label" v-if="item.openStatus === 'open_fail'">开通失败</span>
                    </p>
                    <p class="apply-content">绑定电子收款账户的商户可申请</p>
                </div>
                <div class="turn-right"></div>
            </div>
            <!--微信 -直连-->
            <div v-else-if="item.openType==='wechat_payment'" class="active-entrance  weixin-0"
                 @click="goApply(item)">
                <img src="https://assets.2dfire.com/frontend/c6b609d4c0510cd1a1f3e06420de7036.png"/>
                <div class="apply">
                    <p class="apply-title">
                        <span>微信优惠费率申请-特约</span>
                        <span class="unopen label" v-if="item.openStatus === 'no_permission'">{{item.statusTitle}}</span>
                        <span class="unopen label" v-if="item.openStatus === 'unopen'">未开通</span>
                        <span class="opening label" v-if="item.openStatus === 'opening'">审核中</span>
                        <span class="success label" v-if="item.openStatus === 'opened'">已开通</span>
                        <span class="fail label" v-if="item.openStatus === 'open_fail'">开通失败</span>
                    </p>
                    <p class="apply-content">开通微信支付特约的商户可申请</p>
                </div>
                <div class="turn-right"></div>
            </div>
        </div>
        
        <!--蓝海提示框-->
        <Rule v-show="showRule" v-on:hide="hide"></Rule>
    </div>
</template>

<script>
import { applyState, applyAliPayState, getToken } from 'src/oasis/config/api.js'
import errorToast from 'src/oasis/libs/errorToast'
import hintToast from 'src/ocean/libs/hintToast'
import Rule from './Rule'
import { fixedBody, looseBody } from 'base/utils/unit.js'
import Router from '@2dfire/utils/router'
import Vue from 'vue'

export default {
  name: 'ApplyEntrance',
  components: { Rule },
  data() {
    return {
      ticket: Router.route.query['s_tk'] || '',
      token: sessionStorage.getItem('token'),
      applyState: [], //申请结果
      alipayApplyState: {},
      showRule: false
    }
  },
  created() {
    this.getToken()
  },
  methods: {
    init() {
      // Vue.http.headers.common['token'] = sessionStorage.getItem('token')
      this.getAliPayState()
      this.getApplyState()
    },
    getToken() {
      let ticket = sessionStorage.getItem('s_tk')
      let token = sessionStorage.getItem('token')
      /*5.6.74版本以后，前端统一appKey200800，不再支持token的形式。*/
      let urlToken = Router.route.query['token']
      console.log(`s_tk=${ticket}&urlToken=${urlToken}&token=${token}`)
      /*兼容74以前版本*/
      if (urlToken) {
        sessionStorage.setItem('token', encodeURIComponent(urlToken))
        sessionStorage.setItem('appKey', 200006)
        this.init()
        return
      }
      if ((ticket === this.ticket || !this.ticket) && token) {
        this.init()
      } else {
        getToken({
          serviceTicket: this.ticket
        })
          .then(data => {
            let token = data.data.dfireToken
            console.log('token:', token)
            sessionStorage.setItem('s_tk', this.ticket)
            sessionStorage.setItem('token', token)
            this.token = token
            this.init()
          })
          .catch(e => {
            // errorToast.show(e.result.message)
            console.log(e)
          })
      }
    },
    getAliPayState() {
      applyAliPayState()
        .then(data => {
          this.alipayApplyState = data.data
        })
        .catch(e => {
          // errorToast.show(e.result.message)
          console.log(e)
        })
    },
    getApplyState() {
      applyState()
        .then(data => {
          //   data.data=[{
          //   "accountStatus": "activated",
          //   "naturalPerson": false,
          //   "openStatus": "unopen",
          //   "openType": "e_payment",
          //   "statusContent": "状态内容",
          //   "statusTitle": "状态标题"
          // }, {
          //   "isSpecial": false,
          //   "openStatus": "unopen",
          //   "openType": "wechat_payment",
          //   "statusContent": "状态内容",
          //   "statusTitle": "状态标题"
          // }]
          this.applyState = data.data
        })
        .catch(e => {
          // errorToast.show(e.result.message)
          console.log(e)
        })
    },

    goApply(item) {
      let conditionsA = item.openStatus === 'unopen' //是否未开通
      let conditionsB = item.openStatus === 'no_permission' //是否需要补全
      let routerpath = [
        {
          path: '/input',
          query: {
            openType: item.openType
          }
        },
        {
          path: '/result',
          query: {
            openType: item.openType,
            openStatus: item.openStatus,
            title: item.statusTitle,
            content: item.statusContent,
            accountStatus: item.accountStatus
          }
        },
        {
          path: '/unbind'
        },
        {
          path: '/inactive',
          query: {
            accountStatus: item.accountStatus
          }
        },
        {
          path: '/natural',
          query: {
            // accountStatusC: this.applyState.accountStatus
          }
        }
      ]
      if (item.openStatus === 'opened' || item.openStatus === 'open_fail') {
        this.$router.push(routerpath[1])
      } else if (conditionsA) {
        if (
          item.openType === 'e_payment' &&
          item.accountStatus !== 'activated'
        ) {
          this.$router.push(routerpath[3])
        } else if (item.openType === 'e_payment' && !!item.naturalPerson) {
          this.$router.push(routerpath[4])
        } else {
          this.$router.push(routerpath[0])
        }
      } else if (conditionsB) {
        this.$router.push(routerpath[2])
      } else if (item.openType === 'e_payment' && !!item.naturalPerson) {
        this.$router.push(routerpath[4])
      } else {
        this.$router.push(routerpath[1])
      }
    },
    // 支付宝跳转
    toRule() {
      const alipayApplyState = this.alipayApplyState
      if (!alipayApplyState.applyPermission) {
        hintToast.show(
          '抱歉，您的账号暂无权限申请本活动，请使用超级管理员账号申请。'
        )
        return false
      }
      if (alipayApplyState.openStatus === 'unopen') {
        //是否未开通
        this.showRule = true
        fixedBody()
      } else {
        window.location.href = `ocean.html#/result`
      }
    },
    hide() {
      this.showRule = false
      looseBody()
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
.entrance-wrapper {
  .sub-title {
    font-size: 15px;
    font-weight: bold;
    padding-left: 15px;
    margin-top: 36px;
    margin-bottom: 10px;
  }
  .entrance-top {
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    .image {
      width: 100%;
      height: auto;
      img {
        display: block;
        width: 100%;
        height: auto;
      }
    }
    .text {
      letter-spacing: 0;
      padding: 13px 15px 15px;
    }
  }
  .notice {
    .title {
      margin-top: 36px;
      padding: 0 15px 10px;
      font-size: 15px;
      font-weight: bold;
    }
    .text {
      font-size: 13px;
      padding: 0 15px;
      // border-bottom: 1PX solid #ddd;
      // border-top: 1PX solid #ddd;
      text-indent: 20px;
      background: #fff
        url('https://assets.2dfire.com/frontend/939a53c86715009ea96e3486f21b5e79.png')
        no-repeat;
      background-position: 15px 12px;
      background-size: 12px 12px;
      letter-spacing: 0;
    }
    .pt1 {
      border-top: 1px solid #ddd;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .pb1 {
      border-bottom: 1px solid #ddd;
      padding: 10px 15px;
    }
  }
  .hint {
    /*height: 61px;*/
    font-size: 13px;
    color: #ff0033;
    letter-spacing: 0;
    line-height: 18px;
    padding: 10px 15px 15px;
  }

  .introduce {
    padding: 20px 15px;
    background: #ffffff;

    img {
      display: block;
      width: 190px;
      height: 124px;
      margin: auto;
    }

    p {
      font-size: 13px;
      color: #333333;
      line-height: 18px;
      letter-spacing: 0;
      margin-top: 22px;
    }
  }

  .process {
    padding-top: 36px;

    p {
      padding-left: 15px;
      font-size: 15px;
      color: #000000;
      line-height: 14px;
      margin-bottom: 10px;
      font-weight: bold;
    }

    .process-img {
      height: 110px;
      background-image: url(https://assets.2dfire.com/frontend/b4b0304283563804fb66b067b2c64ed9.png);
      background-size: 301px 80px;
      background-repeat: no-repeat;
      background-position: 50%;
      margin: auto;
      background-color: white;
    }
  }

  .active-entrance {
    height: 64px;
    padding: 10px 15px;
    background-color: white;

    img {
      width: 44px;
      height: 44px;
      display: inline-block;
    }

    .apply {
      display: inline-block;
      vertical-align: top;

      .apply-title {
        font-size: 17px;
        color: #333333;
        line-height: 22px;
        font-weight: bold;

        span.label {
          padding: 1px 4px;
          display: inline-block;
          font-size: 11px;
          border-radius: 3px;
          border: 1px solid;
          line-height: 16px;
          vertical-align: 3px;
        }

        .unopen {
          color: #ff0033;
          border-color: #ff0033;
        }

        .opening {
          color: #ff9900;
          border-color: #ff9900;
        }

        .success {
          color: #00cc33;
          border-color: #00cc33;
        }

        .fail {
          color: #ff0033;
          border-color: #ff0033;
        }
      }

      .apply-content {
        font-size: 13px;
        color: #999999;
        letter-spacing: 0;
        margin-top: 4px;
        line-height: 18px;
        width: 260px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    .turn-right {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAnCAYAAAFiXLgWAAAABGdBTUEAALGPC/xhBQAAA+tJREFUSA2tlktIlFEUx53RUafoMVASRrYJI6hFtgkqQuhltCnIiEoRHY0ogqAIWtQiiqBFmwxfiDJUWERE0JOC6AEVVIugxyKoVUVZUGOmzvQ7n9/5+h535sv0wnDuOed/HvecM/d+BQX+1dbWlvXIRBD1SIRxYH19fcUebWdn5zqPAOgdS8Dmqm5++SFZtBUeoZuRcB0dHUdFFnErZI/yAOSEI0fwTiwcQXt7+z6PQDUodujeTaPZbLbXaCEoFN9zKnH5LKcShSwrM9M5spFI5KU7EavQuEwFhLhpCggp/uKAsLu7e7pHCBPB5y4OeVoUxcXFiYaGhm9+kJt3siXubxQxURYWFlY1NTU9cwN17xioAMP37OfYfLKlpaVTdUIDBqrE8Bp7naoUhlbTchq4DA+yPy68FDY4xoqEUpAzEAsMvdvc3LzQGAHgUyq3xLY9RjqH7L33DOT9FUVClFSqhkpdV6BSKwIeM3jUaHPxKJUyriKRAm5IJBLnamtrpRfhi1TOh6NGETIaVjqU7AFVWB5mKGW1KkBayzB+HWZgHZS/89ZMJnNWwET6TKSyXIZamQKMVmB0zwamqdRkk5FjIMqurq75w8PDr2xgBqNCv5HHQJS9vb1lAwMDHxWIkQfjYRREmSex/6l8ZWVlrLq6elh4o4EoqFqUqo3IXhaNnUJjf+Q0GIW57uBRQXne8VYjpUVFRZFAFVQpKZWXl2eUBzy1sbHxizElXoB4f39/WsF5D02FZgD8rGB/WT1n4Dab5wJL4wIZOAaMxtKRkZG3tucBU5dFZxlQ743M0SMRyPABlsYZlzRnLxW5JFrAb/JNqmDk8Thlgx8Cni/70DWmv6h448CNnKGdbZS0bhB1E+dw+hAaMQ9A7oATOJR31bMI9Ly0tHRtXV3dJ49ijIzTRwLtJJC8Q04rbV8fGLvVjF3ofWKK7QRQJeVaT7kuwsdVZtPv0A2U7r5PnpcNBFA0jayiTNc51UyV2XQIuo1AF3xyI5szgKIJVEGgWwSqVJlS5PsZvZPKm2hoADUi0DT28vFmegxOE2gPAf9+b9mG/xzAFSiGoxQnqlWZUuRXYrHYFj5UnI/HMQdQZ0LzjPjjaDQqz/XXcQXQYJSvj/1m5ZVyotvjCoBj+VyRbxzPwvGTkpKSmvr6evOV7UH7GJxKD3rowVafSm6//+9BKpWamk6nr+B4pcFxazKZ3E2AsU9RT0/P7MHBQfkfLDA4/v//AaVYhMOb/Gb5HA+R6XbmXhobugJNZvRWYXWZjP2fL+O7i8i4nsy6cOx/3Md3m3J7Hub2PGI464t4PL5mQt4DeQsI0Er2HGJiX7Q/eLe0vymLctoAAAAASUVORK5CYII=);
      background-size: cover;
      width: 8px;
      height: 13px;
      float: right;
      margin-top: 15.5px;
    }
  }
  /*.alipay-entrance{*/
  /*background: url("https://assets.2dfire.com/frontend/d8deb5e67e9aed34955fe5f1ed3add6b.png") no-repeat 15PX center,*/
  /*url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAnCAYAAAFiXLgWAAAABGdBTUEAALGPC/xhBQAAA+tJREFUSA2tlktIlFEUx53RUafoMVASRrYJI6hFtgkqQuhltCnIiEoRHY0ogqAIWtQiiqBFmwxfiDJUWERE0JOC6AEVVIugxyKoVUVZUGOmzvQ7n9/5+h535sv0wnDuOed/HvecM/d+BQX+1dbWlvXIRBD1SIRxYH19fcUebWdn5zqPAOgdS8Dmqm5++SFZtBUeoZuRcB0dHUdFFnErZI/yAOSEI0fwTiwcQXt7+z6PQDUodujeTaPZbLbXaCEoFN9zKnH5LKcShSwrM9M5spFI5KU7EavQuEwFhLhpCggp/uKAsLu7e7pHCBPB5y4OeVoUxcXFiYaGhm9+kJt3siXubxQxURYWFlY1NTU9cwN17xioAMP37OfYfLKlpaVTdUIDBqrE8Bp7naoUhlbTchq4DA+yPy68FDY4xoqEUpAzEAsMvdvc3LzQGAHgUyq3xLY9RjqH7L33DOT9FUVClFSqhkpdV6BSKwIeM3jUaHPxKJUyriKRAm5IJBLnamtrpRfhi1TOh6NGETIaVjqU7AFVWB5mKGW1KkBayzB+HWZgHZS/89ZMJnNWwET6TKSyXIZamQKMVmB0zwamqdRkk5FjIMqurq75w8PDr2xgBqNCv5HHQJS9vb1lAwMDHxWIkQfjYRREmSex/6l8ZWVlrLq6elh4o4EoqFqUqo3IXhaNnUJjf+Q0GIW57uBRQXne8VYjpUVFRZFAFVQpKZWXl2eUBzy1sbHxizElXoB4f39/WsF5D02FZgD8rGB/WT1n4Dab5wJL4wIZOAaMxtKRkZG3tucBU5dFZxlQ743M0SMRyPABlsYZlzRnLxW5JFrAb/JNqmDk8Thlgx8Cni/70DWmv6h448CNnKGdbZS0bhB1E+dw+hAaMQ9A7oATOJR31bMI9Ly0tHRtXV3dJ49ijIzTRwLtJJC8Q04rbV8fGLvVjF3ofWKK7QRQJeVaT7kuwsdVZtPv0A2U7r5PnpcNBFA0jayiTNc51UyV2XQIuo1AF3xyI5szgKIJVEGgWwSqVJlS5PsZvZPKm2hoADUi0DT28vFmegxOE2gPAf9+b9mG/xzAFSiGoxQnqlWZUuRXYrHYFj5UnI/HMQdQZ0LzjPjjaDQqz/XXcQXQYJSvj/1m5ZVyotvjCoBj+VyRbxzPwvGTkpKSmvr6evOV7UH7GJxKD3rowVafSm6//+9BKpWamk6nr+B4pcFxazKZ3E2AsU9RT0/P7MHBQfkfLDA4/v//AaVYhMOb/Gb5HA+R6XbmXhobugJNZvRWYXWZjP2fL+O7i8i4nsy6cOx/3Md3m3J7Hub2PGI464t4PL5mQt4DeQsI0Er2HGJiX7Q/eLe0vymLctoAAAAASUVORK5CYII=)*/
  /*no-repeat 352PX center;*/
  /*background-color: #fff;*/
  /*background-size: 44PX,8PX;*/
  /*padding: 10PX 15PX 10PX 72PX;*/
  /*}*/
  .weixin-0 {
    margin: 0;
  }
  .weixin-entrance {
    margin: 0 0 88px;

    &.border-t:before {
      border-top: 0;
    }
  }
}

.z-hide-oasis {
  .alipay-entrance {
    margin-bottom: 176px;
  }
  .weixin-entrance {
    display: none;
  }
}
</style>

