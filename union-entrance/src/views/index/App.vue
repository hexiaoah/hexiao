<template>
  <div class="index">
    <div class="login-wrap">
      <div class="login-content">
        <span class="line-bar"></span>
        <div class="logo-bar">
          <img class="logo"
               src="https://assets.2dfire.com/frontend/af534792962ad1feade6cb038d98772a.png" alt="">
          <i class="line"></i>
          <span class="title">商家管理后台</span>
        </div>
        <div class="codeLogin" v-if="baseData.userEnterType === 3">
          <div class="input-wrap">
            <input type="text" class="input" v-model.trim="baseData.code_params.shopCode"
                   @keydown.enter="codeLogin" placeholder="请输入店铺编码">
          </div>
          <div class="input-wrap">
            <input type="text" class="input" v-model.trim="baseData.code_params.account"
                   @keydown.enter="codeLogin" placeholder="请输入用户名">
          </div>
          <div class="input-wrap">
            <input type="password" class="input" v-model.trim="baseData.code_params.password"
                   @keydown.enter="codeLogin" placeholder="请输入密码">
          </div>
          <Button type="primary" :loading="baseData.loading1" @click="codeLogin" class="btn">
            <span v-if="!baseData.loading1">登录</span>
            <span v-else>Loading...</span>
          </Button>
          <!-- <button class="btn" @click="codeLogin">登录</button> -->
        </div>
        <!-- 扫一扫登录 -->
        <div class="codeLogin" v-if="baseData.userEnterType === 1">
          <div class="scan-code">
            <div class="qrcode-bg" v-if="codeStatus">
              <img class="qrcode" :src="codeStatus" alt="">
            </div>
            <qriously v-show="scanData.value" :value="scanData.value" :size="198"/>
          </div>
          <p class="scan-text">
            {{scanData.type[scanData.showState].text1}}
            <br v-if="scanData.type[scanData.showState].text2" >
            {{scanData.type[scanData.showState].text2}}
            <Poptip trigger="hover" placement="right">
                  <span class="propclass" slot="content">
                    如遇扫码登录异常，可刷新页面重试。
                  </span>
                  <span class="help">?</span>
            </Poptip>

          </p>
        </div>
        <!-- 手机号码登录 -->
        <div class="telLogin" v-if="baseData.userEnterType === 2">
          <div class="input-wrap">
            <span class="icon icon-phone"></span>
            <select name="selectCode" v-model="baseData.tel_params.countryCode" class="code-select">
              <option v-for="item in baseData.codeList" :value="item.countryCode" :key="item.id">
                {{item.countryCode}}
              </option>
            </select>
            <input type="text" class="input phone-input" v-model.trim="baseData.tel_params.mobile"
                   @keydown.enter="telLogin" maxlength=11 placeholder="请输入手机号码">
          </div>
          <div class="input-wrap">
            <span class="icon icon-pwd"></span><input type="password" class="input pwd-input"
                                                      v-model.trim="baseData.tel_params.password"
                                                      @keydown.enter="telLogin" placeholder="请输入密码">
          </div>
          <Button type="primary" :loading="baseData.loading2" @click="telLogin" class="btn">
            <span v-if="!baseData.loading2">登录</span>
            <span v-else>Loading...</span>
          </Button>
          <!-- <button class="btn" @click="telLogin">登录</button> -->
        </div>
      </div>
      <div class="footer-bar">
        <!--<div class="login-type" v-if="!baseData.userEnterType" @click="login_type"><span-->
          <!--class="useType">使用密码登录 <i-->
          <!--class="arrows"></i></span></div>-->
        <!--<div class="login-type" v-if="baseData.userEnterType" @click="login_type"><span-->
          <!--class="useType">使用扫码登录 <i-->
          <!--class="arrows"></i></span></div>-->
        <div class="login-btn" v-if="baseData.userEnterType !== 1" @click="login_type(1)">
          <i class="boss-icon"></i>掌柜扫码登录<i class="arrows"></i>
        </div>
        <div class="login-btn" v-if="baseData.userEnterType !== 2" @click="login_type(2)">
          <i class="phone-icon"></i>手机账号登录<i class="arrows"></i>
        </div>
        <div class="login-btn" v-if="baseData.userEnterType !== 3" @click="login_type(3)">
          <i class="shop-icon"></i>店铺编码登录<i class="arrows"></i>
        </div>


      </div>

    </div>
    <!-- 20181204 加回店铺编码登录 泰国需求 大KA需求-->
    <!--<p class="tip">提示：查看门店营业数据，可点击登录<a href="https://data.2dfire.com" target="_blank">二维火数据中心</a>。数据中心支持店铺编码方式登录。-->
    <!--</p>-->

      <div class="copyrightInfoWarp" >
        <p class="copyrightInfo"> &copy; 2005-2020<a class="copyLink" target="_blank" href="https://www.2dfire.com">www.2dfire.com</a><span class="copyAll">All rights reserved</span>浙ICP备12027267号</p>
        <p class="suggest"> 建议浏览器使用Google Chrome或IE 10以上版本</p>
      </div>
  </div>
</template>

<script>
  import Requester from '@/base/requester'
  import API from '@/config/api'
  import Cookie from '@2dfire/utils/cookie'
  import Object from '@2dfire/utils/object'
  import Route from '@2dfire/utils/router'
  import socket from '@2dfire/socket'
  import Timer from './js/interval'
  import MD5 from 'md5'
  import { Poptip } from 'iview'

  let timer = new Timer()

  let baseData = {
    code_params: {
      shopCode: '',
      account: '',
      password: ''
    },
    tel_params: {
      countryCode: '+86',
      mobile: '',
      password: ''
    },
    loading1: false,
    loading2: false,
    userEnterType: 1,
    isSelect: false,
    entrance: {
      //cookies 信息
      token: '',
      userInfo: {},
      shopInfo: {},
      menuIdList: {},
      loginType: ''
    },
    codeStatusImg: {
      none:
        'https://assets.2dfire.com/frontend/25813913458641f380b6edec89436fd5.png',
      ok:
        'https://assets.2dfire.com/frontend/03dd85c6e71fdbb6da9c666ca733deb3.png'
    },
    codeList: {}
  }
  let scanData = {
    value: '', //二维码值
    showState: 'NO_SCAN', //显示方式，-1 ERROR 异常状态, 0 NO_SCAN 未扫描, 1 HAVE_SEAN 已扫描, 2 LOGIN已登录
    type: {
      NO_ONLINE: {
        text1: '网络连接已断开',
        text2: '请检查你的网络设置',
        img: 'type_none'
      },
      NO_SCAN: {
        text1: '请登录二维火掌柜APP',
        text2: '打开左侧栏“扫一扫”功能登录',
        img: ''
      },
      HAVE_SEAN: {
        text1: '扫描成功',
        text2: '请在二维火掌柜上点击确认以登录',
        img: 'type_ok'
      },
      LOGIN: {
        text1: '登录成功',
        text2: '',
        img: 'type_ok'
      },
      ERROR: {
        text1: '未知原因扫描失败',
        text2: '请重新尝试扫描',
        img: 'type_none'
      }
    }
  }

  export default {
    name: 'app',
    data() {
      return {
        baseData,
        scanData
      }
    },
    components: {
      Poptip
    },
    computed: {
      codeStatus() {
        let self = this
        let img = self.scanData.type[self.scanData.showState].img
        if (img === 'type_none') {
          return self.baseData.codeStatusImg.none
        } else if (img === 'type_ok') {
          return self.baseData.codeStatusImg.ok
        } else {
          return ''
        }
      },
      phoneReg() {
        let self = this
        let reg = ''
        for (let i = 0; i < self.baseData.codeList.length; i++) {
          if (
            self.baseData.codeList[i].countryCode ===
            self.baseData.tel_params.countryCode
          ) {
            reg = self.baseData.codeList[i].checkPattern
            break
          }
        }
        return reg
      }
    },
    methods: {
      // 店铺编码登录 20180807 去掉店铺编码登录方式
      codeLogin() {
        let self = this
        if (self.codeLogin_verify(self.baseData.code_params)) {
          let params = {
            shopCode: self.baseData.code_params.shopCode,
            account: self.baseData.code_params.account,
            password: MD5(self.baseData.code_params.password.toUpperCase().trim())
          }
          self.baseData.loading1 = true
          Requester.post(API.CODE_LOGIN, params, { emulateJSON: true })
            .then(data => {
              let token = data.data
              self.baseData.entrance.token = token
              self.getUserInfo(token)
              // 数据处理
              // ...
            })
            .catch(e => {
              self.baseData.loading1 = false
              self.$Message.error(e.result.message)
            })
        }
      },
      // 手机号码登录
      //      手机号码登录
      telLogin() {
        let self = this
        if (this.telLogin_verify(self.baseData.tel_params)) {
          let params = {
            countryCode: self.baseData.tel_params.countryCode,
            mobile: self.baseData.tel_params.mobile,
            password: MD5(self.baseData.tel_params.password)
          }
          console.log(params)
          self.baseData.loading2 = true
          Requester.post(API.TEL_LOGIN, params, { emulateJSON: true })

            .then(data => {
              console.log(data)
              // 数据处理
              let token = data.data
              self.baseData.entrance.token = token
              self.getUserInfo(token)
              // ...
            })
            .catch(e => {
              self.baseData.loading2 = false
              self.$Message.error(e.result.message)
            })
        }
      },

      // 获取用户信息
      getUserInfo(token) {
        let self = this
        let params = {
          menuVersion: 12 //菜单版本号
        }
        const headers = {
          token: token
        }
        Requester.get(API.GET_USER_INFO, {
          params: params,
          headers: headers
        })
          .then(data => {
            // 数据处理
            let datas = data.data
            console.log(datas.rootMenuList, 'datas')
            let userInfo = {
              name: datas.name,
              picture:
                datas.picture ||
                'https://assets.2dfire.com/frontend/31648f04d3ceb9ce7b776bb46c729d0c.png',
              mobile: datas.mobile,
              countryCode: datas.countryCode,
              userId: datas.userId,
              memberId: datas.membereId
            }
            let shopInfo = null
            if (datas.entityVo) {
              shopInfo = {
                entityId: datas.entityVo.entityId,
                entityName: datas.entityVo.entityName,
                entityType: datas.entityVo.entityType,
                industry: datas.entityVo.industry,
                logo:
                  datas.entityVo.logo ||
                  'https://assets.2dfire.com/frontend/8ffcc382dc07323a2dc4cb8f2c6ef468.png',
                roleName: ''
              }
              if (!Object.isEmpty(datas.roleVo)) {
                shopInfo.roleName = datas.roleVo.roleName
              }
              if (datas.entityVo.entityCode) {
                shopInfo.entityCode = datas.entityVo.entityCode
              }
            }
            let menuIdList = []
            if (datas.rootMenuList) {
              datas.rootMenuList.forEach(function(item) {
                menuIdList.push(item.menuId)
              })
            }
            // 将登陆有关的信息存入到entrance中
            // const entrance = {
            //     userInfo: userInfo,
            //     shopInfo: shopInfo,
            //     menuIdList: menuIdList,
            //     loginType: datas.loginType
            // }
            self.baseData.entrance.userInfo = userInfo
            self.baseData.entrance.shopInfo = shopInfo
            self.baseData.entrance.menuIdList = menuIdList
            if (datas.loginType == 2) {
              self.baseData.entrance.loginType = datas.loginType
            } else {
              self.baseData.entrance.loginType = 1
            }
            //            self.baseData.entrance.loginType = datas.loginType
            Cookie.setItem('entrance', JSON.stringify(self.baseData.entrance))
            self.baseData.loading1 = false
            self.baseData.loading2 = false
            self.jump(shopInfo)
          })
          .catch(e => {
            self.baseData.loading2 = false
            self.baseData.loading1 = false
            console.log(e)
            self.$Message.error(e.result.message)
          })
      },
      jump(isWelcome) {
        //如果存在entityVo跳转到欢迎页 没有跳转到选店页
        let h = {
          'biz.2dfire-daily.com': 'https://biz.2dfire-daily.com/page/',
          'biz.2dfire-pre.com': 'https://biz.2dfire-pre.com/page/',
          'biz.2dfire.com': 'https://biz.2dfire.com/page/'
        }[location.hostname]
        if (h) {
          location.href = h + (isWelcome ? 'welcome.html' : 'change.html')
        } else {
          location.href = isWelcome ? 'welcome.html' : 'change.html'
        }
      },
      // 登录类型 切换登录方式 扫码/手机号密码登录
      login_type(type) {
        this.baseData.userEnterType = type
      },
      //  店铺编码登录 字段验证 20180807 去掉店铺编码登录方式
      codeLogin_verify(params) {
        let nullReg = /\s*\S+/ //匹配输入全为空格
        if (!nullReg.test(params.shopCode)) {
          this.$Message.warning('店铺编码不能为空')
          return false
        }
        if (!nullReg.test(params.account)) {
          this.$Message.warning('用户名不能为空')
          return false
        }
        if (!nullReg.test(params.password)) {
          this.$Message.warning('请输入密码')
          return false
        }
        return true
      },
      //  手机号码登录 字段验证
      //      手机号登录 验证
      telLogin_verify(params) {
        let self = this
        let nullReg = /\s*\S+/ //匹配输入全为空格
        let telRegExp = self.phoneReg
        let telReg = new RegExp(telRegExp)
        if (!nullReg.test(params.mobile)) {
          this.$Message.warning('手机号码不能为空')
          return false
        } else if (!telReg.test(params.mobile)) {
          this.$Message.warning('手机号码格式错误')
          return false
        }
        if (!nullReg.test(params.password)) {
          this.$Message.warning('请输入密码')
          return false
        }
        return true
      },
      cookieInit() {
        let isTimeOut = Route.route.query['flag'] || ''
        if (isTimeOut === 'timeout') {
          sessionStorage.clear()
          Cookie.clear()
        }
      },
      /**
       * Socket初始化
       * @param value 二维码id str
       * */
      initSocket(value) {
        let self = this
        const io = window.io
        // 必须先init socket,全局仅一次
        socket.init(
          io(API.SCAN_CODE_LOGIN, {
            query: 'scanId=' + value,
            transports: ['websocket']
          })
        )
        //扫描之后监听
        socket.on('scan_login', ret => {
          switch (ret.status) {
            case 0:
              self.scanData.value = ret.data
              self.scanData.showState = 'NO_SCAN'
              break
            case -1:
              self.scanData.showState = 'ERROR'
              timer.clear()
              break
            case 1:
              self.scanData.showState = 'HAVE_SEAN'
              timer.clear()
              break
            case 2:
              self.scanData.showState = 'LOGIN'
              self.toLogin(ret)
              break
            default:
              self.scanData.showState = 'ERROR'
              timer.clear()
          }
        })
        //监听断开连接事件
        socket.on('disconnect', function() {
          self.isNoOnLine()
        })
        //监听重新建立连接事件
        socket.on('reconnect', function() {
          self.scanData.showState = 'NO_SCAN'
          timer.init(self.getScanQrcode)
        })
      },
      /**
       * 判断错误原因是没网还是异常
       * */
      isNoOnLine() {
        let self = this
        if (navigator && navigator.onLine === false) {
          self.scanData.showState = 'NO_ONLINE'
        } else {
          self.scanData.showState = 'ERROR'
        }
        timer.clear()
      },
      /**
       * 去登陆
       * @param ret socket返回数据
       * */
      toLogin(ret) {
        let self = this
        let token = ret.token
        self.baseData.entrance.token = token
        self.getUserInfo(token)
      },
      //      获取二维码 200017：商家后台
      getScanQrcode() {
        let self = this
        Requester.get(API.GET_CODE, {
          params: { biz_app_key: 200800 }
        }).then(
          ret => {
            const code = ret.data.url.replace('SCAN://', '')
            if (!self.scanData.value) {
              self.initSocket(code)
            } else {
              // 不需创建socket,直接开始使用
              socket.emitServer('refresh_qr_code', code)
            }
            self.scanData.value = ret.data.url
          },
          response => {
            console.log(response)
            self.isNoOnLine()
          }
        )
      },
      //      获取国际地区码
      getCountryCode() {
        let self = this
        Requester.get(API.GET_COUNTRY_CODE).then(res => {
          if (res.data && res.data.length > 0) {
            self.baseData.codeList = res.data
          }
        })
      },
      refresh() {
        timer.init(this.getScanQrcode)
      }
    },
    created() {
      this.cookieInit()
      this.getCountryCode()
      timer.init(this.getScanQrcode)
    }
  }
</script>
<style lang="less" src="../../theme/default.less">
</style>
<style lang="scss" src="../../style/common.scss">
</style>
<style lang="scss" scoped>
  .main-wrap {
    padding-bottom: 50px;
  }

  .index {
    // background: url('https://assets.2dfire.com/frontend/4ffa93c37eec1a291329123710681e70.png')
    background: url('https://assets.2dfire.com/frontend/20d8bed495f64b51c003e8e658846ff2.png')
      0 0 no-repeat;
    background-size: 100% 100%;
    min-height: 100%;
  }

  .icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    float: left;
  }

  .icon-phone {
    background-image: url('https://assets.2dfire.com/frontend/ff2ba841f548774eb500b720b4c93ea9.png');
    background-size: cover;
  }

  .icon-pwd {
    background-image: url('https://assets.2dfire.com/frontend/26fd72bc1f389cf231725cbb9f3a2278.png');
    background-size: cover;
  }

  .login-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -190px;
    transform: translateY(-50%);
    width: 380px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);

    .btn {
      display: block;
      width: 300px;
      height: 40px;
      font-size: 14px;
      margin: 30px auto 0;
      color: #ffffff;
      background: #d83f3f;
      border-radius: 5px;
    }

    .login-content {
      height: 390px;
      background: #ffffff;

      .line-bar {
        position: absolute;
        height: 4px;
        width: 88px;
        left: 50%;
        margin-left: -44px;
        background: #d83f3f;
        border-radius: 1px;
      }

      .logo-bar {
        padding: 30px 0 20px 0;
        height: 95px;
        overflow: hidden;

        .logo {
          float: left;
          height: 45px;
          width: 111px;
          margin: 0 10px 0 72px;
        }

        .line {
          float: left;
          width: 2px;
          height: 28px;
          margin-top: 12px;
          background: #e0e0e0;
        }

        .title {
          float: left;
          font-size: 18px;
          line-height: 50px;
          font-weight: bold;
          color: #333333;
          padding-left: 6px;
        }
      }

      .input-wrap {
        width: 300px;
        height: 61px;
        margin: 0 auto;
        padding-top: 20px;
        font-size: 14px;
        border-bottom: 1px solid #efefef;
      }

      .scan-code {
        width: 200px;
        height: 200px;
        padding: 2px;
        margin: 0 auto 20px auto;

        .qrcode-bg {
          position: absolute;
          width: 200px;
          height: 200px;
          background-color: rgba(255, 255, 255, 0.7);
        }

        .qrcode {
          width: 80px;
          margin: 60px;
        }
      }

      .scan-text {
        color: #999999;
        font-size: 14px;
        text-align: center;
      }
      .help{
        display: inline-block;
        width: 18px;
        height: 18px;
        text-align: center;
        line-height: 16px;
        border: 1px solid #cccccc;
        border-radius: 100%;
        cursor: pointer;
      }
      .propclass{
        white-space: initial;
        text-align: justify;
        display: block;
      }
      .te {
        border-bottom: 0;
        padding-top: 40px;
        font-size: 12px;
      }

      .input {
        height: 40px;
        width: 100%;

        &::-webkit-input-placeholder {
          color: #999999;
        }
      }

      .phone-input {
        width: 205px;
      }

      .pwd-input {
        width: 260px;
      }

      .code-select {
        width: 50px;
        line-height: 40px;
        height: 40px;
        float: left;
        border: 0;
        outline: 0;
        margin-right: 5px;
        -webkit-appearance: none;
        background-image: url('https://assets.2dfire.com/frontend/b6420948cf5dd99ca5af08ca22263f43.png');
        background-position: right center;
        background-size: 20px 20px;
        background-repeat: no-repeat;
        background-color: #ffffff;
        display: inline-block;
      }
    }

    .footer-bar {
      height: 60px;
      background: #f3f3f3;
      border-radius: 1px;
      text-align: center;
      line-height: 60px;
      font-size: 16px;
      color: #333333;

      .login-type {
        cursor: pointer;

        .useType {
          display: inline-block;
          vertical-align: middle;
        }
      }
      .arrows {
        display: inline-block;
        width: 10px;
        height: 16px;
        line-height: 60px;
        vertical-align: middle;
        margin-left: 8px;
        transform: translateY(-2px);
        background: url('https://assets.2dfire.com/frontend/a7de968d5eb104cb56e6e44d5c70930d.png')
          0 0 no-repeat;
        background-size: cover;
      }
    }
  }

  .tip {
    text-align: center;
    font-size: 14px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 240px);

    a {
      color: #2d8cf0;
    }
  }

  .footer-bar {
    .login-btn {
      width: 50%;
      float: left;
      border-right: 1px solid #d3d3d3;
      cursor: pointer;
      user-select: none;
      &:last-child {
        border-right: 0px;
      }
    }

    .boss-icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      line-height: 60px;
      vertical-align: middle;
      margin-right: 8px;
      transform: translateY(-2px);
      background: url('https://assets.2dfire.com/frontend/b2e5b724fb76d438fbc9affe3e588abe.png')
        0 0 no-repeat;
      background-size: cover;
    }
    .shop-icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      line-height: 60px;
      vertical-align: middle;
      margin-right: 8px;
      transform: translateY(-2px);
      background: url('https://assets.2dfire.com/frontend/5d60f273962043f4f08328c89f389f42.png')
        0 0 no-repeat;
      background-size: cover;
    }
    .phone-icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      line-height: 60px;
      vertical-align: middle;
      margin-right: 8px;
      transform: translateY(-2px);
      background: url('https://assets.2dfire.com/frontend/a57882e5bcc0963b711616ca863de55d.png')
        0 0 no-repeat;
      background-size: cover;
    }
  }
  .copyrightInfoWarp{
    position: fixed;
    bottom: 8%;
    width: 100%;
    text-align: center;
    .copyrightInfo{
      font-size: 16px;
      color: #999999;
      margin-bottom: 5px;
    }
    .copyLink{
      color: #2D8cF0;
      margin: 0 8px;
    }
    .copyAll{
      margin-right: 10px;
    }
    .suggest{
      font-size: 12px;
      color: #999999;
    }
  }
</style>
