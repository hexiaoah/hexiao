/**
 * Created by hupo on 16/8/30.
 */

/* 微信 & QQ & 支付宝 & 百度统计 jsSdk 的封装
 *
 * 不依赖任何其他js文件
 *
 * 请使用全局的 "JsSdkUtil" 或 "window.JsSdkUtil"
 *
 * 在此js文件加载后(可以是加载后的任何地方), 根据所需要使用的功能, 配置 JsSdkUtil, 配置完成后, 显式调用 JsSdkUtil.initialize() 执行初始化
 *
 * 使用示例:
 *      <script src="../js/jsSdkUtil.js"></script>                  加载此文件
 *      <script>
 *              JsSdkUtil.scanCodeId = "scanCode"; (或 JsSdkUtil.scanCodeId = "wrapper"; JsSdkUtil.scanCodeConfirmId = "scanCode";)    根据需要配置所使用的功能 (可选)
 *              JsSdkUtil.scanCallback = function (result) {        配置功能回调 (可选)
 *                    console.log("scanCallback run");
 *                    window.location.href = result
 *              };
 *              JsSdkUtil.initialize()                               初始化 (必须)
 *      </script>
 *
 * 更新日志：
 * 20170912：
 *     增加第三方APP bridge
 *
 */

(function () {
  var FILE_BASE_URL = '__FILE_BASE_URL'; // 本工程路径，由gulp替换
  var SHARE_API_BASE_URL = '__SHARE_API_BASE_URL'; // 分享api路径，由gulp替换
  var API_BASE_URL = '__SHARE_API_BASE_URL';
  var WX_JS_SDK_URL = "//res.wx.qq.com/open/js/jweixin-1.3.2.js";
  var ALIPAY_JS_SDK_URL = "https://as.alipayobjects.com/g/component/antbridge/1.1.4/antbridge.min.js";
  var ALIPAY_TRACK_URL = "https://os.alipayobjects.com/rmsportal/oknmeDPmBzRhliY.js";
  var QQ_JS_SDK_URL = "https://mp.gtimg.cn/open/js/openApi.js";
  var QQ_PAY_JS_SDK_URL = "//pub.idqqimg.com/qqmobile/qqapi.js?_bid=152";
  var APP_JS_SDK_URL = FILE_BASE_URL + "/js/FRWCardApp.0.0.4.js";
  var APP_BRIDGE_SDK_URL = FILE_BASE_URL + "/js/DFireBridge.js?v=0.0.2";
  var JX_JS_SDK_URL = "https://cdn.52shangou.com/lib/bridge/2.0.3/build/bridge.js";  //联华鲸选app内嵌bridge
  var BAIDU_ANALYSIS_URL = "//hm.baidu.com/hm.js?24910471637fcf3fc7f8a730579094d1";
  var WX_CONFIG_URL = SHARE_API_BASE_URL + "/share/v1/get_jsapi_ticket";
  var QQ_CONFIG_URL = SHARE_API_BASE_URL + "/share/v1/get_qq_jsapi_ticket";
  var V_CONSOLE_URL = FILE_BASE_URL + "/js/vconsole.2.5.2.js";

  // SHARE_API_BASE_URL = 'http://mock.2dfire-daily.com/mockjs/27/mockjsdata/7/'
  var SHARE_INFO = SHARE_API_BASE_URL + "/share/v1/info"; //获取分享所需的数据

  var jsSdk, JsSdkUtil;
  var isInit = false;                      // 是否已经开始初始化
  var isGetShareDataRetry = false;         // 获取分享信息失败重试一次
  var isGetSdkConfigRetry = false;         // 获取分享信息失败重试一次

  JsSdkUtil = {
      client: 0,                           // 客户端类型  1 微信;    2 支付宝;    3 qq;    4 app内嵌;    7 小程序
      debug: false,                        // 是否开启微信或qqSDk的调试  默认关闭   在init执行前配置
      useShare: true,                      // 是否使用分享功能(包括朋友圈和分享给好友) 默认开启 在init执行前配置
      useHideMenu: true,                   // 是否使用隐藏菜单功能 默认开启 在init执行前配置
      useLocation: false,                  // 是否使用定位功能  默认关闭  在init执行前配置
      userProtectMenu: false,              // 是否开启传播类菜单  在init执行前配置
      scanCodeId: undefined,               // 是否使用扫码功能(直接指定 dom ID 自动开启, 应保证事件绑定时此ID对应的DOM已存在) 默认关闭
      scanCodeConfirmId: undefined,        // 此时 scanCodeId 作为wrapper用来绑定事件, scanCodeConfirmId 作为实际触发的 target(主要用于处理事件绑定时,扫码DOM元素还未生成的情况)
      shareInfo: undefined,                // 分享的内容, 默认使用获取分享内容的接口
      shareUrlParam: undefined,            // 获取分享内容的url, 默认使用获取分享内容的接口
      hideMenuList: undefined,             // 隐藏的menuList, 有默认list,可以不传
      scanCallback: undefined,             // 扫码后的回调, 默认自动跳转到扫码地址
      locationCallback: undefined,         // 定位后的回调, 默认设置到 sessionStorage 名称: gps
      shareCallback: undefined,            // 分享成功后的回调, 默认无
      showProtectMenus: showProtectMenus,  // init执行后 通过执行function 开启传播类菜单
      bindShareData: bindShareData,        // init执行后 通过执行function 绑定分享数据, 用于需要临时指定分享内容的情况, 会自动开启传播发送给好友和分享到朋友圈的菜单
      initialize: initialize,              // sdk配置初始化, 请再此文件加载后调用 (必须!)
      useGetNetworkType: false,
      isMpWebViewEnv: isMpWebViewEnv,
      getNetworkTypeCallback: undefined,
      trigger: triggerFunction
  };
  window.JsSdkUtil = JsSdkUtil;

  /**
   * 是否是小程序内嵌
   * @return {Boolean}
   */
  function isMpWebViewEnv() {
      return window.__wxjs_environment === 'miniprogram';
  }

  /*
   *  工具类方法 start
   */
  // 简单封装 ajax 只用 get 方法
  function ajax(url, arg1, arg2, arg3) {
      var params, success, error;
      if (typeof (arg1) == "object") {
          params = arg1;
          success = arg2;
          error = arg3
      } else {
          params = undefined;
          success = arg1;
          error = arg2
      }

      var xmlHttp = new XMLHttpRequest();

      if (params && Object.keys(params).length > 0) {
          url += "?";
          for (var k in params) {
              if (params.hasOwnProperty(k)) {
                  url = url + k + "=" + encodeURIComponent(params[k]) + "&"
              }
          }
          if (url[url.length - 1] === "&") {
              url = url.slice(0, -1)
          }
      }

      xmlHttp.onreadystatechange = function () {
          if (xmlHttp.readyState == 4) {
              if (xmlHttp.status == 200) {
                  var resp = JSON.parse(xmlHttp.responseText);
                  if (resp.code == 1 && success) {
                      success(resp.data)
                  } else if (error) {
                      error(resp)
                  }
              } else if (error) {
                  error("error status: " + xmlHttp.status)
              }
          }
      };
      xmlHttp.open("get", url, true);
      xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*');
      xmlHttp.timeout = 15000;
      xmlHttp.ontimeout = function () {
          error("timeout")
      };
      xmlHttp.send();
  }

  // 简单封装获取 cookie 的方法
  function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
              var cookie = cookies[i].replace(/.*\s/, "");
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) == (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }

  // 动态加载sdk和指定回调
  function loadScript(src, callback) {
      var script = document.createElement('script');
      var head = document.getElementsByTagName('head')[0];
      script.type = 'text/javascript';
      script.charset = 'UTF-8';
      script.src = src;
      // script.onload = function () {
      //     if (callback) {
      //         callback();
      //     }
      //     script.onLoad = null
      // };

      script.addEventListener('load', function () {
          if (callback) {
              callback();
          }
          script.removeEventListener('load', function () {
          });
      }, false);

      head.appendChild(script);
  }

  // 地址栏参数替换 url 原始地址:如/hello/:id/    arg 如果只有一个参数,则为string,多个需传递数组
  function api_get_request_url(url, arg) {
      if (typeof arg === "string") {
          return url.replace(':id', arg);
      } else if (typeof arg === "object" && arg.length > 0) {
          return api_get_request_url(url.replace(':id', arg[0]), arg.slice(1, arg.length));
      } else {
          return url;
      }
  }

  /* 工具类方法 end */

  // 设置 js api config 到 sessionStorage
  function setJsApi(page, data) {
      var obj = {};
      obj.time = new Date().getTime();
      obj.data = data;
      sessionStorage.setItem(page, JSON.stringify(obj));
  }

  function getJsApi(page) {
      var result = JSON.parse(sessionStorage.getItem(page));
      try {
          if (new Date().getTime() - result.time > 1.5 * 60 * 60 * 100) {
              result = null;
          } else {
              result = result.data;
          }
      } catch (ex) {
          result = null;
      }
      return result;
  }

  // 设置 shareInfo 到 sessionStorage
  function setShareInfo(shareInfo) {
      if (typeof shareInfo === "object" && shareInfo != null) {
          shareInfo = JSON.stringify(shareInfo);
      } else {
          shareInfo = "";
      }
      var SID = sessionStorage.getItem('_DFMAP_sid_current');
      sessionStorage.setItem("shareInfo" + (SID ? '_' + SID : ''), shareInfo);
  }

  function getShareInfo() {
      var shareInfo = null;
      try {
          var SID = sessionStorage.getItem('_DFMAP_sid_current');
          shareInfo = JSON.parse(sessionStorage.getItem("shareInfo" + (SID ? '_' + SID : '')));
      } catch (ex) {
          console.log("share need init");
      }
      return shareInfo;
  }

  // 初始化sdk
  function initialize() {
      isInit = true;
      // client有值说明scriptInit先完成, 那么在此处初始化, client无值说明scriptInit后完成, 则在scriptInit回调中自动初始化. 以此保证初始化绝对执行
      if (JsSdkUtil.client === 1 || JsSdkUtil.client === 7) {
          getSdkConfig(WX_CONFIG_URL)
      } else if (JsSdkUtil.client === 2) {
          aliPayInit()
      } else if (JsSdkUtil.client === 3) {
          getSdkConfig(QQ_CONFIG_URL)
      } else if (JsSdkUtil.client === 4) {
          appInit()
      } else if (JsSdkUtil.client === 6) {
          TAppInit()
      }
  }

  // 获取sdk验证信息
  function getSdkConfig(url) {
      var page = "jsapi-" + window.location.href;  // 直接使用完整的url做缓存 防止hash变化造成的问题
      var jsApi = getJsApi(page);
      if (jsApi) {
          wxQqInit(jsApi)
      } else {
          ajax(url, { url: window.location.href.split("#")[0] }, function (resp) {
              wxQqInit(resp);
              setJsApi(page, resp)
          }, function (resp) {
              if (!isGetSdkConfigRetry) {
                  isGetSdkConfigRetry = true;
                  getSdkConfig(url)
              }
          }
          )
      }
  }

  // 获取分享数据
  function getShareData() {
      var entityId = getCookie('entity_id');
      var token = getCookie('token');
      var params = {
          xtoken: token,
          entityId: entityId,
          type: 0
      };
      if (JsSdkUtil.shareUrlParam && typeof JsSdkUtil.shareUrlParam === 'object') {
          for (var k in JsSdkUtil.shareUrlParam) {
              if (JsSdkUtil.shareUrlParam.hasOwnProperty(k)) {
                  params[k] = JsSdkUtil.shareUrlParam[k]
              }
          }
      }
      if (entityId) {
          ajax(SHARE_INFO, params, function (resp) {
              bindShareData(resp);
              setShareInfo(resp)
          }, function (resp) {
              if (!isGetShareDataRetry) {
                  isGetShareDataRetry = true;
                  getShareData()
              }
          }
          )
      }
  }

  function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj === null) return true;

    if (obj === undefined) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (typeof obj === "number") {
      if (obj === 0) {
        return true;
      } else {
        return false;
      }
    }
    if (typeof obj === "string") {
      if (obj.length === 0) {
        return true;
      } else {
        return false;
      }
    }

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    // bug:如果是Date类型,则总是会返回为空
    if (typeof obj === "object") {
      if (obj.length === undefined) {//对象
        for (var key in obj) {
          if (hasOwnProperty.call(obj, key)) return false;
        }
      } else {//数组
        if (obj.length > 0) {
          return false;
        } else {
          return true;
        }
      }
    }

    return true;
  }

  // 调用分享接口
  function bindShareData(shareInfo) {
      // todo 第三方app需要增加分享到朋友圈的能力 by hup @2017.8.8

      if (isEmpty(shareInfo)) {
          console.log("shareInfo 不能为空");
          return
      }
      var friend = shareInfo.friend || {};//朋友
      var moment = shareInfo.moment || {};//朋友圈
      if (JsSdkUtil.client == 4) {    // 调用app分享接口
          jsSdk.share({
              shareType: friend.shareType || 2,   // 展示分享的类型，用于app分享  value: 1 保存到朋友圈图片, 2 分享链接(默认使用链接) 3、图片+链接
              icon: friend.imgUrl || "../images/shop/wechatshare.png",
              title: friend.title,
              desc: friend.memo,
              link: friend.shareUrl,
              logo: friend.iconUrl,
              third: friend.third,
              background: friend.background,
              qrCodeWidth: friend.qrCodeWidth,
              xCoordinate: friend.xCoordinate,
              yCoordinate: friend.yCoordinate,
              success: function (res) {
                  // 用户确认分享后执行的回调函数
                  if (JsSdkUtil.shareCallback) {
                      JsSdkUtil.shareCallback("shareInApp")
                  }
              },
              cancel: function (res) {
              },
              fail: function (res) {
              }
          });
      } else if (JsSdkUtil.client === 5) {
          jsSdk.callNative('weixin', true, {
              'type': "shareFriend", //sharelink  shareFriend
              'title': friend.title,
              'description': friend.memo,
              'url': friend.shareUrl,
              'imgUrl': friend.imgUrl
          }, function (data) {
              if (data.status && data.result) {
                  // 用户确认分享后执行的回调函数
                  if (JsSdkUtil.shareCallback) {
                      JsSdkUtil.shareCallback("shareInApp")
                  }
              }
          })
      } else if (JsSdkUtil.client == 1 || JsSdkUtil.client == 3) {
          jsSdk.showMenuItems({
              menuList: [
                  "menuItem:share:appMessage",
                  "menuItem:share:timeline"
              ] // 要显示的菜单项，所有menu项见附录3
          });
          //分享给朋友
          jsSdk.onMenuShareAppMessage({
              title: friend.title, // 分享标题
              desc: friend.memo, // 分享描述
              link: friend.shareUrl, // 分享链接
              imgUrl: friend.imgUrl || "../images/shop/wechatshare.png", // 分享图标
              success: function () {
                  // 用户确认分享后执行的回调函数
                  if (JsSdkUtil.shareCallback) {
                      JsSdkUtil.shareCallback("shareToFriend")
                  }
              },
              cancel: function () {
                  // 用户取消分享后执行的回调函数
              }
          });
          //分享到朋友圈
          jsSdk.onMenuShareTimeline({
              title: moment.title, // 分享标题
              link: moment.shareUrl, // 分享链接
              imgUrl: moment.imgUrl || "../images/shop/wechatshare.png", // 分享图标
              success: function () {
                  // 用户确认分享后执行的回调函数
                  if (JsSdkUtil.shareCallback) {
                      JsSdkUtil.shareCallback("shareToTimeLine")
                  }
              },
              cancel: function () {
                  // 用户取消分享后执行的回调函数
              }
          });
      } else if (JsSdkUtil.client == 7) {
          if (!friend) {
              return;
          }
          wx.miniProgram.postMessage({
              data: {
                  type: 'updateShareData',
                  data: {
                      source: friend.source,
                      title: friend.title, // 分享标题
                      url: friend.shareUrl, // 分享链接
                      imageUrl: friend.bigImgUrl || friend.imgUrl || 'https://assets.2dfire.com/frontend/3880475a93fc4de7886a6dd7e1c9ceab.png', // 分享图标
                  },
              },
          });
      }
  }

  function triggerFunction(key, params) {
      var func = JsSdkUtil[key];
      if (func) {
          func(params)
      } else {
          // nofunc
          console.log('no func name:', key)
      }
  }

  function bindFunction(key, func) {
      if (JsSdkUtil[key]) return;
      console.log('bind', key, func);
      JsSdkUtil[key] = func;
  }

  // 开启保护类菜单
  function showProtectMenus() {
      jsSdk.showMenuItems({
          menuList: [
              "menuItem:copyUrl",
              "menuItem:openWithQQBrowser",
              "menuItem:openWithSafari"
          ] // 要显示的菜单项，所有menu项见附录3
      });
  }

  /*
   *  wx 和 qq 初始化
   */
  function wxQqInit(config) {
      jsSdk.config({
          debug: JsSdkUtil.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: config.appId, // 必填，公众号的唯一标识
          timestamp: config.timestamp, // 必填，生成签名的时间戳
          nonceStr: config.noncestr, // 必填，生成签名的随机串
          signature: config.sign,// 必填，签名，见附录1
          jsApiList: [
              "getLocation",
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "scanQRCode",
              "hideMenuItems",
              "showMenuItems",
              "getNetworkType"
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

      //这里把checkApi改为ready，因为版本较低的微信不支持check
      jsSdk.ready(function () {
          //获取网络状态接口
          if (JsSdkUtil.useGetNetworkType) {
              jsSdk.getNetworkType({
                  success: function (res) {
                      var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                      window.sessionStorage.removeItem("networkType");
                      window.sessionStorage.setItem("networkType", networkType);
                      if (JsSdkUtil.getNetworkTypeCallback) {
                          JsSdkUtil.getNetworkTypeCallback(networkType);
                      }
                  }
              });
          }

          if (JsSdkUtil.useHideMenu) {
              var menuList = [
                  "menuItem:favorite",
                  "menuItem:share:qq",
                  "menuItem:copyUrl",
                  "menuItem:openWithQQBrowser",
                  "menuItem:openWithSafari",
                  "menuItem:share:weiboApp",
                  "menuItem:share:QZone",
                  "menuItem:share:facebook",
                  "menuItem:share:appMessage",
                  "menuItem:share:timeline"
              ]; // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
              jsSdk.hideMenuItems({
                  menuList: (JsSdkUtil.hideMenuList && JsSdkUtil.hideMenuList.length > 0) ? JsSdkUtil.hideMenuList : menuList
              });
          }

          function scanQRCode() {
              jsSdk.scanQRCode({
                  needResult: 1,
                  desc: "scanQRCode desc",
                  success: function (res) {
                      if (JsSdkUtil.scanCallback) {
                          JsSdkUtil.scanCallback(res.resultStr)
                      } else {
                          if (JsSdkUtil.client == 7) {
                              var token = getCookie('token');
                              /**
                               * 如果是小程序需要调定制的接口进行解析（不授权）
                               * 有问题联系@炒饭 和 @排骨
                               */
                              window.location.href = API_BASE_URL + '/mini-program/jump/v1/scan?xtoken=' + token + '&url=' + encodeURIComponent(res.resultStr);
                          } else {
                              window.location.href = res.resultStr
                          }
                      }
                      return false;
                  }
              });
          }
          bindFunction('scanQRCode', scanQRCode);

          // 微信扫码
          if (JsSdkUtil.scanCodeId) {
              var scanCodeDom = document.getElementById(JsSdkUtil.scanCodeId) || {};


              function scanCodeClickListener(e) {
                  if (JsSdkUtil.scanCodeConfirmId) {
                      if (JsSdkUtil.scanCodeConfirmId === e.target.id) {
                          scanQRCode()
                      }
                  } else {
                      scanQRCode()
                  }
              };
              scanCodeDom.onclick = null;
              scanCodeDom.onclick = scanCodeClickListener;
          }

          // 分享接口调用
          if (JsSdkUtil.useShare) {
              var shareData = JsSdkUtil.shareInfo || getShareInfo();
              if (shareData) {
                  bindShareData(shareData);
              } else {
                  getShareData();
              }
          }

          // 开启保护类接口
          if (JsSdkUtil.userProtectMenu) {
              showProtectMenus()
          }


          // 微信定位
          if (JsSdkUtil.useLocation) {
              jsSdk.getLocation({
                  type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                  success: function (res) {
                      var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                      var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                      var speed = res.speed; // 速度，以米/每秒计
                      var accuracy = res.accuracy; // 位置精度
                      var obj = {
                          longitude: longitude,
                          latitude: latitude,
                          speed: speed,
                          accuracy: accuracy
                      };
                      window.localStorage.removeItem("position");
                      window.localStorage.setItem("position", JSON.stringify(obj));
                      window.localStorage.removeItem("gps");
                      window.localStorage.setItem("gps", parseInt(longitude * 1000000) + ":" + parseInt(latitude * 1000000));
                      window.localStorage.removeItem("location");
                      window.localStorage.setItem("location", JSON.stringify(obj));
                      if (JsSdkUtil.locationCallback) {
                          JsSdkUtil.locationCallback(latitude, longitude)
                      }
                  },
                  fail: function (res) {
                      console.log('获取位置失败', res);
                  }
              });
          }
      });
  }

  function aliPayInitFunc() {
      if ((jsSdk.alipayVersion).slice(0, 3) >= 8.1) {
          // 支付宝获取网络类型
          if (JsSdkUtil.useGetNetworkType) {
              jsSdk.network.getType({
                  timeout: 5000
              }, function (result) {
                  if (result.errorCode) {
                      //没有获取网络状态的情况
                      //errorCode=5，调用超时
                      if (result.errorCode == 5) {
                          jsSdk.alert({
                              title: '亲',
                              message: '调用超时',
                              button: '确定'
                          });
                      }
                  } else {
                      //成功获取网络状态的情况
                      //result.isWifi bool    是否在Wifi下使用
                      //result.isOnline   bool    是否联网
                      //result.type   string  网络类型'fail': 无网络，或网络断开'wifi': wifi网络'wwan': 移动网络 8.2
                      //result.networkAvailable   bool    网络是否连网可用    8.2
                      var networkType = result.type;
                      window.sessionStorage.removeItem("networkType");
                      window.sessionStorage.setItem("networkType", networkType);
                      if (JsSdkUtil.getNetworkTypeCallback) {
                          JsSdkUtil.getNetworkTypeCallback(networkType);
                      }
                  }
              });
          }

          function scanQRCode() {
              jsSdk.scan({
                  type: 'qr'  //qr(二维码) / bar(条形码) / card(银行卡号)
              }, function (result) {
                  if (result.errorCode) {
                      //没有扫码的情况
                      //errorCode=10，用户取消
                      //errorCode=11，操作失败
                      if (result.errorCode == 11) {
                          //alert('操作失败');
                      }
                  } else {
                      //成功扫码的情况
                      if (result.qrCode !== undefined) {
                          if (JsSdkUtil.scanCallback) {
                              JsSdkUtil.scanCallback(result.qrCode)
                          } else {
                              window.location.href = result.qrCode
                          }
                      }
                  }
              });
          }
          bindFunction('scanQRCode', scanQRCode);

          // 支付宝扫码
          if (JsSdkUtil.scanCodeId) {
              var scanCodeDom = document.getElementById(JsSdkUtil.scanCodeId);
              function scanCodeClickListener(e) {
                  if (JsSdkUtil.scanCodeConfirmId) {
                      if (JsSdkUtil.scanCodeConfirmId === e.target.id) {
                          scanQRCode()
                      }
                  } else {
                      scanQRCode()
                  }
              }
              scanCodeDom.onclick = null;
              scanCodeDom.onclick = scanCodeClickListener;
          }

          // 支付宝定位
          if (JsSdkUtil.useLocation) {
              jsSdk.geolocation.getCurrentPosition({
                  timeout: 5000 //超时时间
              }, function (res) {
                  if (res.errorCode) {
                      //没有定位的情况
                      //errorCode=5，调用超时
                  } else {
                      //成功定位的情况
                      var latitude = res.coords.latitude; //double    纬度
                      var longitude = res.coords.longitude;   //double    经度
                      var city = res.city;    //string    城市
                      var province = res.province;    //string    省份
                      var cityCode = res.cityCode;    //string    城市编码
                      var address = res.address;//    array   地址
                      var obj = {
                          latitude: latitude,
                          longitude: longitude,
                          city: city,
                          province: province,
                          cityCode: cityCode,
                          address: address
                      };

                      window.localStorage.removeItem("gps");
                      window.localStorage.setItem("gps", parseInt(longitude * 1000000) + ":" + parseInt(latitude * 1000000));
                      window.localStorage.removeItem("position");
                      window.localStorage.setItem("position", JSON.stringify(obj));
                      window.localStorage.removeItem("location");
                      window.localStorage.setItem("location", JSON.stringify(obj));
                      if (JsSdkUtil.locationCallback) {
                          JsSdkUtil.locationCallback(latitude, longitude)
                      }
                  }
              });
          }

      } else {
          var userAgent = navigator.userAgent;
          //  配合口碑客户端所做的判断, 检测的口碑客户端时, 大于6.0.0的版本不提醒更新  by hupo
          if (userAgent.indexOf("KoubeiClient") !== -1) {
              var koubeiVersion = userAgent.match(/KoubeiClient\/[0-9]/) || "";
              if (koubeiVersion) {
                  var version = parseInt(koubeiVersion[0].split("/")[1]);
                  if (version < 6) {
                      jsSdk.alert({
                          title: '亲',
                          message: '请升级您的口碑到最新版',
                          button: '确定'
                      });
                  }
              }
          } else {
              jsSdk.alert({
                  title: '亲',
                  message: '请升级您的钱包到最新版',
                  button: '确定'
              });
          }
      }
  }

  /*
   *  支付宝初始化
   */
  function aliPayInit() {
      if (window.AlipayJSBridge && window.AlipayJSBridge.call) {
          aliPayInitFunc()
      } else {
          jsSdk.on("AlipayJSBridgeReady", aliPayInitFunc);
          window.DFAnalytics && window.DFAnalytics.fire && window.DFAnalytics.fire("Cu", "AlipayJSBridge not defind when jssdk is ready");
      }
  }

  /*
   *  口碑统计相关
   */
  function koubeiTrackInit() {
      var status = "";
      var url = window.location.href;
      if (url.search("welcome.html") >= 0) {
          status = "welcome"
      } else if (url.search("paySuccess") >= 0) {
          status = "paySuccess"
      }

      if (!status) {
          return
      }

      var kouBeiInfoString = sessionStorage.getItem("kouBeiInfo") || "{}";
      var kouBeiInfo = JSON.parse(kouBeiInfoString);
      var source = kouBeiInfo.source || "";
      var shopId = kouBeiInfo.source || "";

      if (source && shopId) {
          var operateName = status === "welcome" ? "支付宝点菜-开始点菜" : "支付宝点菜-订单完成";
          var operateId = status === "welcome" ? "dc_start" : "dc_end";
          var commodityId = source === "koubeishop" ? "201601260038260226" : "201601260038260226";
          loadScript(ALIPAY_TRACK_URL, function () {
              setTimeout(function () {
                  document.addEventListener("AlipayJSBridgeReady", function () {
                      var req = {
                          appId: "2015122201024689",
                          operateName: operateName,
                          operateId: operateId,
                          shopId: shopId,
                          commodityId: commodityId
                      };
                      MCloudJSBridge.processStartLog(req)
                  })
              }, 0);
          });
      }
  }


  /*
   *  App内嵌初始化
   */
  function appInit() {
      //获取网络状态接口
      if (JsSdkUtil.useGetNetworkType) {
          jsSdk.getNetworkType({
              success: function (res) {
                  var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                  window.sessionStorage.removeItem("networkType");
                  window.sessionStorage.setItem("networkType", networkType);
                  if (JsSdkUtil.getNetworkTypeCallback) {
                      JsSdkUtil.getNetworkTypeCallback(networkType);
                  }
              }
          });
      }
      // App定位
      if (JsSdkUtil.useLocation) {
          if (jsSdk.getLocation) {
              jsSdk.getLocation({
                  type: 'wgs84', // 坐标系类型，默认为wgs84的gps坐标
                  success: function (res) {
                      //成功定位的情况
                      var latitude = res.latitude;
                      var longitude = res.longitude;
                      var obj = {
                          latitude: latitude,
                          longitude: longitude,
                      };

                      window.localStorage.removeItem("gps");
                      window.localStorage.setItem("gps", parseInt(longitude * 1000000) + ":" + parseInt(latitude * 1000000));
                      window.localStorage.removeItem("position");
                      window.localStorage.setItem("position", JSON.stringify(obj));
                      window.localStorage.removeItem("location");
                      window.localStorage.setItem("location", JSON.stringify(obj));
                      if (JsSdkUtil.locationCallback) {
                          JsSdkUtil.locationCallback(latitude, longitude)
                      }
                  },
                  cancel: function (res) {
                      console.log("cancel")
                  },
                  fail: function (res) {
                      console.log("fail")
                  }

              });
          }
      }

      function scanQRCode() {
          jsSdk.getQrCode({
              needResult: 0,
              success: function (res) {
                  if (res && res.resultStr) {
                      if (JsSdkUtil.scanCallback) {
                          JsSdkUtil.scanCallback(res.resultStr)
                      } else {
                          window.location.href = res.resultStr
                      }
                  }
                  return false;
              }
          });
      }
      bindFunction('scanQRCode', scanQRCode);

      // app唤起扫码
      if (JsSdkUtil.scanCodeId) {
          var scanCodeDom = document.getElementById(JsSdkUtil.scanCodeId);

          function scanCodeClickListener(e) {
              if (JsSdkUtil.scanCodeConfirmId) {
                  if (JsSdkUtil.scanCodeConfirmId === e.target.id) {
                      scanQRCode()
                  }
              } else {
                  scanQRCode()
              }
          }
          scanCodeDom.onclick = null;
          scanCodeDom.onclick = scanCodeClickListener;
      }
  }


  /*
   *  App内嵌初始化
   */
  function jxInit() {
      //获取网络状态接口
      if (JsSdkUtil.useGetNetworkType) {
          jsSdk.callNative('getNetwork_sync', function (data) {
              if (data.status && data.result) {
                  var networkType = data.result; // 返回网络类型2g，3g，4g，wifi
                  window.sessionStorage.removeItem("networkType");
                  window.sessionStorage.setItem("networkType", networkType);
                  if (JsSdkUtil.getNetworkTypeCallback) {
                      JsSdkUtil.getNetworkTypeCallback(networkType);
                  }
              }
          });
      }
      // App定位
      if (JsSdkUtil.useLocation) {

          // console.log('use location')

          jsSdk.callNative('getLocation', true, {}, function (data) {

              // console.log('getLocation', data)

              if (data.status && data.result) {
                  var latitude = data.result.latitude;
                  var longitude = data.result.longitude;
                  var obj = {
                      latitude: latitude,
                      longitude: longitude
                  };
                  window.localStorage.removeItem("gps");
                  window.localStorage.setItem("gps", parseInt(longitude * 1000000) + ":" + parseInt(latitude * 1000000));
                  window.localStorage.removeItem("position");
                  window.localStorage.setItem("position", JSON.stringify(obj));
                  window.localStorage.removeItem("location");
                  window.localStorage.setItem("location", JSON.stringify(obj));
                  if (JsSdkUtil.locationCallback) {
                      JsSdkUtil.locationCallback(latitude, longitude)
                  }
              }
          });
      }

      function scanQRCode() {
          jsSdk.callNative('openScan', true, {
              "scanType": "qr"
          }, function (data) {
              if (data.status && data.result) {
                  if (JsSdkUtil.scanCallback) {
                      JsSdkUtil.scanCallback(data.result)
                  } else {
                      window.location.href = data.result
                  }
                  return false;
              } else {
                  console.log("扫码失败")
              }
          })
      }
      bindFunction('scanQRCode', scanQRCode);

      // 联华app唤起扫码
      if (JsSdkUtil.scanCodeId) {
          var scanCodeDom = document.getElementById(JsSdkUtil.scanCodeId);

          function scanCodeClickListener(e) {
              if (JsSdkUtil.scanCodeConfirmId) {
                  if (JsSdkUtil.scanCodeConfirmId === e.target.id) {
                      scanQRCode()
                  }
              } else {
                  scanQRCode()
              }
          }

          // changed by qinghe
          scanCodeDom.onclick = "";
          scanCodeDom.onclick = scanCodeClickListener;
      }
  }

  // 第三方 APP 内嵌脚本
  function TAppInit() {
      //获取网络状态接口
      if (JsSdkUtil.useGetNetworkType) {
          jsSdk.getNetworkType({
              success: function (res) {
                  var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                  window.sessionStorage.removeItem("networkType");
                  window.sessionStorage.setItem("networkType", networkType);
                  if (JsSdkUtil.getNetworkTypeCallback) {
                      JsSdkUtil.getNetworkTypeCallback(networkType);
                  }
              }
          });
      }

      // App定位
      if (JsSdkUtil.useLocation) {
          jsSdk.getLocation({
              type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function (res) {
                  var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                  var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                  if (JsSdkUtil.locationCallback) {
                      JsSdkUtil.locationCallback(latitude, longitude);
                  }
              }
          });
      }

      function scanQRCode() {
          jsSdk.scanQRCode({
              success: function (res) {
                  var resultStr = res.resultStr;   // 返回 扫码结果 字符串

                  if (JsSdkUtil.scanCallback) {
                      JsSdkUtil.scanCallback(resultStr);
                  } else {
                      window.location.href = resultStr;
                  }
              }
          });
      }
      bindFunction('scanQRCode', scanQRCode);

      // 联华app唤起扫码
      if (JsSdkUtil.scanCodeId) {
          var scanCodeDom = document.getElementById(JsSdkUtil.scanCodeId);
          function scanCodeClickListener(e) {
              if (JsSdkUtil.scanCodeConfirmId) {
                  if (JsSdkUtil.scanCodeConfirmId === e.target.id) {
                      scanQRCode();
                  }
              } else {
                  scanQRCode();
              }
          }
          // changed by qinghe
          scanCodeDom.onclick = "";
          scanCodeDom.onclick = scanCodeClickListener;
      }


  }

  // 根据客户端加载对应的sdk文件
  function scriptInit() {
      var userAgent = navigator.userAgent;
      if (userAgent.indexOf("MicroMessenger") !== -1) {
          loadScript(WX_JS_SDK_URL, function () {
              // 用 setTimeOut 保证 加载后的jsSdk执行完成
              setTimeout(function () {
                  wx.miniProgram.getEnv(function (res) {
                      jsSdk = window.wx;

                      if (res.miniprogram) {
                          JsSdkUtil.client = 7; // 小程序
                      } else {
                          JsSdkUtil.client = 1; // 微信h5
                      }
                      if (isInit) {
                          getSdkConfig(WX_CONFIG_URL)
                      }
                  });
              }, 0);
          });
      } else if (userAgent.indexOf("AlipayClient") !== -1) {
          loadScript(ALIPAY_JS_SDK_URL, function () {
              setTimeout(function () {
                  jsSdk = window.Ali;
                  JsSdkUtil.client = 2;
                  if (isInit) {
                      aliPayInit()
                  }
              }, 0);
          });
          koubeiTrackInit()
      } else if (userAgent.indexOf("cardapp.client") !== -1 || userAgent.indexOf("hestia.client") !== -1) {
          loadScript(APP_JS_SDK_URL, function () {
              setTimeout(function () {
                  jsSdk = window.FRWCardApp;
                  JsSdkUtil.client = 4;
                  if (isInit) {
                      appInit()
                  }
              }, 0);
          });
      } else if (userAgent.indexOf("appType(lianhua)") !== -1) {
          // 联华鲸选 js bridge
          loadScript(JX_JS_SDK_URL, function () {
              setTimeout(function () {
                  jsSdk = window.lib.bridge;
                  JsSdkUtil.client = 5;
                  if (isInit) {
                      jxInit()
                  }
              }, 0);
          });
      } else if (userAgent.indexOf("QQ") !== -1) {
          loadScript(QQ_JS_SDK_URL, function () {
              // 加载qq钱包
              loadScript(QQ_PAY_JS_SDK_URL, function () {
              });
              setTimeout(function () {
                  jsSdk = window.mqq;
                  JsSdkUtil.client = 3;
                  if (isInit) {
                      getSdkConfig(QQ_CONFIG_URL)
                  }
              }, 0);
          });
      } else {

          // mock:
          // window.DFireBridge = {
          //     messageSend: function( func , id , param){
          //         console.log(func , id , param)
          //     }
          // }

          loadScript(APP_BRIDGE_SDK_URL, function () {
              setTimeout(function () {
                  JsSdkUtil.client = 6;
                  jsSdk = window.DFireBridge;
                  if (isInit) {
                      TAppInit()
                  }
              }, 0);
          });
      }
      // 加载百度统计脚本
      loadScript(BAIDU_ANALYSIS_URL);

      if(localStorage.debug) {
          loadScript(V_CONSOLE_URL);
      }

      // // 加载vconsole
      // if (window.location.href.indexOf('vconsole_open')) {
      //     window.localStorage.setItem('vconsole_expire', new Date().getTime() + 3e6);
      //     loadScript(V_CONSOLE_URL);
      // } else if (window.location.href.indexOf('vconsole_close')) {
      //     window.localStorage.setItem('vconsole_expire', '');
      // } else {
      //     var vconsoleExpire = window.localStorage.getItem('vconsole_expire');
      //     if (vconsoleExpire && vconsoleExpire > (new Date).getTime()) {
      //         loadScript(V_CONSOLE_URL);
      //     }
      // }

  }

  scriptInit()

})();
