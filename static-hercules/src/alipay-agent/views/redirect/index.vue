<template>
    <div class="index-wrapper" v-show="!isCloudPos">
       <div v-if="!isShow" class="active-entrance wxpay-entrance" @click="toRule" style="border-top: 1PX solid #ddd">
             <img src="https://assets.2dfire.com/frontend/248916a36f9f66a2637ec2e995fdca3e.png"/>
            <div  class="apply">
                <p class="apply-title">
                    <span>微信支付特约商户申请</span>
                    <!-- <span :class="['label',getStatusClass.cls]" >{{getStatusClass.text}}</span> -->
                </p>
                <p class="apply-content">开通微信支付特约商户，即微信直连</p>
            </div>
            <div class="turn-right"></div>
        </div>
        <!-- 新版  小微商户 -->
        <div v-if="isShow" class="active-entrance wxpay-entrance" @click="newToRule" style="border-top: 1PX solid #ddd">
             <img src="https://assets.2dfire.com/frontend/248916a36f9f66a2637ec2e995fdca3e.png"/>
            <div class="apply">
                <p class="apply-title">
                    <span>微信支付特约商户申请</span>
                    <span :class="['label',getWxStatusClass.cls]" >{{getWxStatusClass.text}}</span>
                </p>
                <p class="apply-content">开通微信支付特约商户，即微信直连</p>
            </div>
            <div class="turn-right"></div>
        </div>

         <div class="active-entrance alipay-entrance" @click="toAlipay" style="border-top: 1PX solid #ddd">
            <img src="https://assets.2dfire.com/frontend/d8deb5e67e9aed34955fe5f1ed3add6b.png"/>
            <div class="apply">
                <p class="apply-title">
                    <span>支付宝支付特约商户申请</span>
                    <span :class="['label',getStatusClass.cls]" >{{getStatusClass.text}}</span>
                </p>
                <p class="apply-content">开通支付宝支付特约商户，即支付宝直连</p>
            </div>
            <div class="turn-right"></div>
        </div>
    </div>
</template>

<script>
import API from '../../config/api'
import Router from '@2dfire/utils/router'
import errorToast from 'src/wechat-direct-con/libs/errorToast'
import { mapActions } from 'vuex'
import {
  alipayApplyState,
  wxApplyState
} from '../../constant/openStatus-config'

export default {
  data() {
    return {
      ticket: Router.route.query['s_tk'],
      isCloudPos: false,
      token: '',
      // 默认展示小微入口
      isShow: true,
      alipayApplyState: {
        openStatus: 'DEFAULT'
      },
      wxOpenStatus: 'DEFAULT'
    }
  },
  methods: {
    ...mapActions(['modifyInputInfo']),
    getToken() {
      // 获取token
      let ticket = sessionStorage.getItem('s_tk')
      let token = sessionStorage.getItem('token')
      if ((ticket === this.ticket || !this.ticket) && token) {
        this.getSessionInfo()
      } else {
        API.getToken({
          serviceTicket: this.ticket
        })
          .then(data => {
            let token = data.dfireToken
            sessionStorage.setItem('s_tk', this.ticket)
            sessionStorage.setItem('token', token)
            this.token = token
            this.getSessionInfo()
          })
          .catch(e => {})
      }
    },
    // 获取session信息
    getSessionInfo() {
      API.getSessionInfo()
        .then(data => {
          const { entityId, shopName } = data
          sessionStorage.setItem('entityId', entityId)
          sessionStorage.setItem('shopName', shopName)
          this.modifyInputInfo({ type: 'entityId', value: entityId })
          if (this.isCloudPos) {
            this.$router.replace({
              path: 'index'
            })
          } else {
            this.getAlipayApplyStatus(entityId)
            // 新增查询微信直连开通转态
            this.getWechatApplyStatusByPeople(entityId)
          }
        })
        .catch(e => {})
    },
    // 首页查看申请状态
    getAlipayApplyStatus(entityId) {
      API.getAlipayApplyStatus({ entityId })
        .then(data => {
          console.log(data)
          this.alipayApplyState.openStatus = data
        })
        .catch(e => {})
    },
    getWechatApplyStatusByPeople(entityId) {
      API.getWechatApplyStatusByPeople({ entityId: entityId, isBrand: '' })
        .then(data => {
          //   console.log(data, '后台人工')
          if (data.length >= 1) {
            this.isShow = false
          } else {
            this.getWechatApplyStatus(entityId)
          }
        })
        .catch(e => {})
    },
    getWechatApplyStatus(entityId) {
      API.getWechatApplyStatus({ entityId })
        .then(data => {
          //   console.log(data, '自动')
          this.wxOpenStatus = data
        })
        .catch(e => {})
    },
    // 跳转
    toRule() {
      window.location.href = 'tdf-manager://2dfire.com/member/specialBusiness'
    },
    newToRule() {
      window.location.href = 'wechat-direct-con.html#/index?source=manager'
    },
    toAlipay() {
      this.$router.push({
        path: 'index'
      })
    }
  },
  computed: {
    getStatusClass() {
      const { openStatus } = this.alipayApplyState
      return alipayApplyState[openStatus]
    },
    getWxStatusClass() {
      return wxApplyState[this.wxOpenStatus]
    }
  },
  components: {},
  created() {
    const source = Router.route.query['source']
    if (source === 'cloudPos') {
      this.isCloudPos = true
    }
    this.getToken()
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
    .index-wrapper{
        background: white;
        width: 100%;
        height: 100%;
        .active-entrance {
            height: 128px;
            padding: 20px 30px;
            background-color: white;
            img {
                width: 88px;
                height: 88px;
                display: inline-block;
            }
            .apply {
                display: inline-block;
                margin-left: 20px;
                vertical-align: top;
            .apply-title {
                font-size: 34px;
                color: #333333;
                line-height: 44px;
                font-weight: bold;

                span.label {
                padding: 2px 8px;
                display: inline-block;
                font-size: 22px;
                border-radius: 6px;
                border: 2px solid;
                line-height: 32px;
                vertical-align: 6px;
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
                font-size: 26px;
                color: #999999;
                letter-spacing: 0;
                margin-top: 8px;
                line-height: 36px;
                width: 520px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            }

            .turn-right {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAnCAYAAAFiXLgWAAAABGdBTUEAALGPC/xhBQAAA+tJREFUSA2tlktIlFEUx53RUafoMVASRrYJI6hFtgkqQuhltCnIiEoRHY0ogqAIWtQiiqBFmwxfiDJUWERE0JOC6AEVVIugxyKoVUVZUGOmzvQ7n9/5+h535sv0wnDuOed/HvecM/d+BQX+1dbWlvXIRBD1SIRxYH19fcUebWdn5zqPAOgdS8Dmqm5++SFZtBUeoZuRcB0dHUdFFnErZI/yAOSEI0fwTiwcQXt7+z6PQDUodujeTaPZbLbXaCEoFN9zKnH5LKcShSwrM9M5spFI5KU7EavQuEwFhLhpCggp/uKAsLu7e7pHCBPB5y4OeVoUxcXFiYaGhm9+kJt3siXubxQxURYWFlY1NTU9cwN17xioAMP37OfYfLKlpaVTdUIDBqrE8Bp7naoUhlbTchq4DA+yPy68FDY4xoqEUpAzEAsMvdvc3LzQGAHgUyq3xLY9RjqH7L33DOT9FUVClFSqhkpdV6BSKwIeM3jUaHPxKJUyriKRAm5IJBLnamtrpRfhi1TOh6NGETIaVjqU7AFVWB5mKGW1KkBayzB+HWZgHZS/89ZMJnNWwET6TKSyXIZamQKMVmB0zwamqdRkk5FjIMqurq75w8PDr2xgBqNCv5HHQJS9vb1lAwMDHxWIkQfjYRREmSex/6l8ZWVlrLq6elh4o4EoqFqUqo3IXhaNnUJjf+Q0GIW57uBRQXne8VYjpUVFRZFAFVQpKZWXl2eUBzy1sbHxizElXoB4f39/WsF5D02FZgD8rGB/WT1n4Dab5wJL4wIZOAaMxtKRkZG3tucBU5dFZxlQ743M0SMRyPABlsYZlzRnLxW5JFrAb/JNqmDk8Thlgx8Cni/70DWmv6h448CNnKGdbZS0bhB1E+dw+hAaMQ9A7oATOJR31bMI9Ly0tHRtXV3dJ49ijIzTRwLtJJC8Q04rbV8fGLvVjF3ofWKK7QRQJeVaT7kuwsdVZtPv0A2U7r5PnpcNBFA0jayiTNc51UyV2XQIuo1AF3xyI5szgKIJVEGgWwSqVJlS5PsZvZPKm2hoADUi0DT28vFmegxOE2gPAf9+b9mG/xzAFSiGoxQnqlWZUuRXYrHYFj5UnI/HMQdQZ0LzjPjjaDQqz/XXcQXQYJSvj/1m5ZVyotvjCoBj+VyRbxzPwvGTkpKSmvr6evOV7UH7GJxKD3rowVafSm6//+9BKpWamk6nr+B4pcFxazKZ3E2AsU9RT0/P7MHBQfkfLDA4/v//AaVYhMOb/Gb5HA+R6XbmXhobugJNZvRWYXWZjP2fL+O7i8i4nsy6cOx/3Md3m3J7Hub2PGI464t4PL5mQt4DeQsI0Er2HGJiX7Q/eLe0vymLctoAAAAASUVORK5CYII=);
            background-size: cover;
            width: 16px;
            height: 26px;
            float: right;
            margin-top: 31px;
            }
        }
    }

</style>

