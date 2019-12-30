<template>
    <div class="entrance-wrapper" >
        <div class="entrance-top">
            <div class="image">
                <img src="https://assets.2dfire.com/frontend/96e4b38f40500c933d0865be4fee7391.jpg">
            </div>
        </div>
        <div class="notice">
            <p class="title">政策通知</p>
            <div class="text pt1">根据微信和支付宝通知，优惠费率新规调整如下：从2018年12月28日开始，至2019年12月31日，所有已审核通过微信优惠费率申请的商户，结算费率将统一调整为0.2%。</div>
        </div>
        <p class="sub-title">申请入口</p>
        <div class="entrance-wrap">
            <div v-for="item in list" :key="item.type" class="active-entrance " @click="toRule(item.type)">
                <img :src="item.icon"/>
                <div class="apply">
                    <p class="apply-title"><span>{{item.name}}</span></p>
                    <p class="apply-content">{{item.text}}</p>
                </div>
                <div class="turn-right"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { getToken, getMapToken } from 'src/oasis/config/api.js'
import Router from '@2dfire/utils/router'

export default {
  name: 'ApplyEntrance',
  data() {
    return {
      ticket: Router.route.query['s_tk'] || '',
      token: sessionStorage.getItem('token'),
      list: [
        {
          type: '1',
          icon:
            'https://assets.2dfire.com/frontend/d8deb5e67e9aed34955fe5f1ed3add6b.png',
          name: '支付宝优惠费率',
          text: '费率仅需0.2%'
        },
        {
          type: '2',
          icon:
            'https://assets.2dfire.com/frontend/248916a36f9f66a2637ec2e995fdca3e.png',
          name: '微信支付优惠费率',
          text: '费率仅需0.2%'
        }
      ]
    }
  },
  created() {
    this.getToken()
  },
  methods: {
    init() {
      this.getMapToken()
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
            console.log(e)
          })
      }
    },
    // 根据token查询店铺信息
    getMapToken() {
      getMapToken().then(data => {
        const { entityId, shopName } = data.data
        sessionStorage.setItem('entityId', entityId)
        sessionStorage.setItem('shopName', shopName)
      })
    },
    // 支付宝跳转
    toRule(v) {
      this.$router.push({
        path: '/second-entrance',
        query: {
          type: v
        }
      })
      console.log(v)
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
  .line{
        height: 1PX;
        background: #fff;
    }
    .entrance-wrap{
        padding-left: 15px;
        border-top: 1PX solid #ddd;
        background-color: white;
        border-bottom: 1PX solid #ddd;
    }
  .active-entrance {
    height: 64px;
    padding: 10px 15px 10px 0;
    border-bottom: 1PX solid #ddd;
    &:last-child{
        border-bottom: none;
    }
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
}
</style>