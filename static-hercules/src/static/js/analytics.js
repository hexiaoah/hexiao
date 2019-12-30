/**
 * Created by hupo.
 * on 17/4/24.
 *
 * !!! 加载位置: 在head标签最下面 !!!  目的是用于统计白屏时间和监听所有js报错
 *
 * !!! 重要的事情说三遍(~加三个感叹号) !!!
 * !!! 为了减少日志数据量, 所有定义的key/value尽可能用了简写 !!!
 * !!! 后续编辑人员, 如果新增定义,必须在这里写明详细注释 !!!
 * !!! 防止日志别人看不懂 !!!
 *
 *
 * 错误类型配置表 (其他子配置见各处注释 直接在本文件中搜索)
 *  T: 同 type            日志类型                  EXAMPLE:  "Er": 错误日志, "Wa": 警示日志, "Nm": 常规日志, "Cu": 自定义日志
 *  S: 同 subType         日志子类型                EXAMPLE:  "js": js报错, "api": 接口请求, "zy": 资源错误, "pv": 访问量, "uv": 用户量, "st": 超时类错误,
 *  U: 同 url             日志相关页面的url
 *  M: 同 msg             日志信息详情
 *  A: 同 additionalMsg   附加的日志信息
 *  V: 同 randomString    每次请求的随机串, 防止浏览器缓存机制造成不发起请求
 *
 */

(function () {
    var win = window;

    // 防止报错
    if (typeof win != "undefined" && win.performance != "undefined" && win.performance.now != "undefined" && win.performance.timing != "undefined") {
        var per = win.performance;
        /***
         * 主逻辑部分
         *
         */
        DFAnalytics = {
            type: "static",                                 // 日志请求类型, 默认静态日志
            IMG_URL: "https://trace.2dfire.com/0.gif",      // 静态日志请求地址
            API_URL: "https://trace.2dfire.com/0.gif",      // api实时统计接口地址
            useFirstPageTime: false,                        // 是否使用自定义首屏接口
            isPvSend: false,                                // 是否已经发送过pv统计
            times: {
                rdt: "",                                    // 重定向完成时间
                wst: "",                                    // 白屏时间
                fPt: "",                                    // 首屏时间(包括异步加载完成时的耗时, 每个页面需要手动指定)
                tPt: "",                                    // onload时间(同步加载完成的耗时, 没有异步加载时等同于首屏时间)
                dmt: "",                                    // domready的时间
                dit: "",                                    // dom 解析耗时
                tct: ""                                     // tcp 耗时
            },
            res: [],                             // 所有资源耗时
            usr: {                               // 用户和店铺相关信息
                uid: "",                         // 用户id
                qrc: "",                         // qr_code
                eid: "",                         // 店铺 id
                stc: ""                          // 座位码
            },
            oth: {                               // 其他
                ntw: "",                                     // 网络类型
                gps: ""                                      // 经纬度坐标
            },

            /***
             * 发送日志信息
             * @param type                    日志类型(具体见顶部注释)     必要
             * @param msg                     日志信息详情                必要
             * @param sub_type                日志子类型(具体见顶部注释)
             * @param params                  其他自定义参数
             * @param track_type              发送日志的方式: 静态/api
             */
            fire: function (type, msg, params, sub_type, track_type) {
                if (!params) {
                    params = {};
                }
                params.M = msg;
                params.U = encodeURIComponent(win.location.href);
                params.S = sub_type || "";
                params.T = type || "Nm";
                if (track_type && track_type == "api") {
                    this.utils.fireAPI(this.API_URL, params);
                } else {
                    this.utils.fireStatic(this.IMG_URL, params);
                }
            },                  // 白屏时间

            /***
             * 记录首屏时间, 由每个页面自定义
             */
            markFirstPageTime: function () {
                this.useFirstPageTime = true;
                this.times.fPt = this.utils.timeFormat(per.now());
                var networkType = this.utils.getSession("networkType");
                if (networkType && !this.isPvSend && this.times.tPt) {
                    this.sendPv()
                } else {
                    var _this = this;
                    setTimeout(function () {             // 防止jsSdk初始化失败造成pv不发送的情况
                        if (!_this.isPvSend) {
                            _this.sendPv()
                        }
                    }, 5000)
                }
            },

            /***
             * 自动发送pv统计 会保证 onload 和 自定义的 markFirstPageTime 完成后发送
             */
            autoSendPv: function () {
                var networkType = this.utils.getSession("networkType");
                if (!this.isPvSend && networkType) {
                    if (this.useFirstPageTime) {
                        if (this.times.tPt && this.times.fPt) {
                            this.sendPv()
                        }
                    } else {
                        this.sendPv()
                    }
                }
            },

            /***
             * pv
             */
            sendPv: function () {
                this.oth.gps = this.utils.getLocalStorage("gps") || "";
                this.oth.ntw = this.utils.getSession("networkType") || "";
                var params = {
                    rdt: this.times.rdt,
                    wst: this.times.wst,
                    fPt: this.times.fPt,
                    tPt: this.times.tPt,
                    dmt: this.times.dmt,
                    dit: this.times.dit,
                    tct: this.times.tct,
                    uid: this.usr.uid,
                    qrc: this.usr.qrc,
                    eid: this.usr.eid,
                    stc: this.usr.stc,
                    gps: this.oth.gps,
                    ntw: this.oth.ntw,
                    res: this.res
                };
                this.isPvSend = true;
                this.fire("Nm", "pv", params);
            },

            /***
             * utils 工具相关
             *
             */
            utils: {
                // 发送静态资源请求 用于日志
                fireStatic: function (url, params) { //发送信息到http服务器  里面要追加信息标识 比如info error等
                    if (!params) {
                        params = {};
                    }
                    // 防止浏览器缓存
                    params.V = (new Date().getTime() + parseInt(1000 * Math.random(0, 1))).toString(36);
                    var img = new Image();
                    img.onload = img.onerror = function (e) {
                        // 请求完成后清除
                        img = null;
                    };
                    img.src = url + this.formatParam(params);
                },

                // 发送ajax请求 用户实时监控
                fireAPI: function (url, arg1, arg2, arg3) { //发送信息到http服务器  里面要追加信息标识 比如info error等
                    var params, success, error;
                    if (typeof(arg1) == "object") {
                        params = arg1;
                        success = arg2;
                        error = arg3
                    } else {
                        params = undefined;
                        success = arg1;
                        error = arg2
                    }

                    var xmlHttp = new XMLHttpRequest();

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
                    xmlHttp.open("get", url + this.formatParam(params), true);
                    xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*');
                    xmlHttp.timeout = 15000;
                    xmlHttp.ontimeout = function () {
                        error("timeout")
                    };
                    xmlHttp.send();
                },

                //格式化请求参数
                formatParam: function (params) {
                    if (params && Object.keys(params).length > 0) {
                        var paramArray = [];
                        for (var k in params) {
                            if (params.hasOwnProperty(k)) {
                                if (typeof params[k] === "object") {
                                    params[k] = JSON.stringify(params[k])
                                }
                                paramArray.unshift(k + "=" + encodeURIComponent(params[k]));
                            }
                        }
                        return "?" + paramArray.join("&");
                    } else {
                        return ""
                    }
                },
                //格式化请求参数
                timeFormat: function (time) {
                    time = Math.round(time);
                    if (time < 0) {
                        time = 0
                    }
                    return time
                },

                getCookie: function (name) {
                    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
                    if (arr != null) {
                        return win.unescape(arr[2]);
                    }
                    return "";
                },

                // 获取sessionStorage中的参数
                getSession: function (name) {
                    return sessionStorage.getItem(name);
                },
                // 获取localStorage中的参数
                getLocalStorage: function (name) {
                    return localStorage.getItem(name);
                },

                // 获取url中的参数
                queryUrl: function (name) {
                    var url = window.location.href;
                    var values = url.match(new RegExp("[(\?)|(\&)]" + name + "\=[^\?\&\\\/\#]*", "g"));
                    var value = "";
                    if (values) {
                        var val = "";
                        if (values.length === 1) {
                            val = values[0] || "";
                            value = val.split("=")[1]
                        } else if (values.length > 1) {   // 有多个值 就返回第二个
                            val = values[values.length - 1] || "";
                            value = val.split("=")[1]
                        }
                    }
                    return value || ""
                }
            },

            /***
             * 自定义埋点
             * todo hupo 待完成, 需要自己封装原生方法
             */
            // 时间打点 参考 performance user timing api mark 方法
            mark: function (name) {
                if (typeof per.mark != "undefined") {
                    per.mark(name)
                }
            },
            // 时间打点 参考 performance user timing api measure 方法
            measure: function (name, mark_1, mark_2) {
                if (typeof per.measure != "undefined") {
                    per.measure(name, mark_1, mark_2);
                    per.getEntriesByType && per.getEntriesByType('measure').forEach(function (ms) {
                        if (ms.name == name) {
                            var params = {};
                            params[name] = ms.duration;
                            this.fire("Cu", "measure", params);
                            per.clearMarks(mark_1);
                            per.clearMarks(mark_2);
                            per.clearMeasures(name);
                        }
                    })
                }
            }
        };

        /***
         * 基础统计信息采集
         *
         */
        // js报错监控
        win.onerror = function (message, url, line) {
            if (!url) {
                return
            }
            var params = {
                'fn': url,
                'li': line
            };
            DFAnalytics.fire("Er", message || "", params, "js");
            return false;
        };

        // 获取基础数据
        win.onload = function (event) {
            setTimeout(function () {
                if (typeof per.timing != "undefined" && typeof per.now != "undefined") {
                    var t = per.timing || {};
                    DFAnalytics.times.tPt = DFAnalytics.utils.timeFormat(per.now());                                            // onload时间
                    DFAnalytics.times.dmt = DFAnalytics.utils.timeFormat(t.domContentLoadedEventEnd - t.navigationStart);       // domready的时间
                    DFAnalytics.times.rdt = DFAnalytics.utils.timeFormat(t.redirectEnd - t.navigationStart);                    // 重定向完成时间
                    DFAnalytics.times.dit = DFAnalytics.utils.timeFormat(t.domComplete - t.domInteractive);                     // dom 解析耗时
                    DFAnalytics.times.tct = DFAnalytics.utils.timeFormat(t.connectEnd - t.connectStart);                        // tcp 耗时

                    var result = [];

                    if (typeof per.getEntriesByType != "undefined") {
                        var resource = per.getEntriesByType('resource') || [];
                        resource.forEach(function (item) {
                            var nameStr = item.name;
                            var name = "";
                            // 排除无名/百度或百度统计相关/自己/ajax
                            if (item.initiatorType != "xmlhttprequest" && nameStr && nameStr.search("baidu.com") < 0 && nameStr.search("0.gif") < 0) {
                                var nameList = nameStr.split("/") || [];
                                name = nameList[nameList.length - 2] + "/" + nameList[nameList.length - 1] || "";
                                result.push({
                                    nam: name,                                 // name 请求名(文件名)
                                    typ: item.initiatorType || "",                        // type 类型
                                    stm: DFAnalytics.utils.timeFormat(item.startTime) || "",                // startTime 请求延时(请求开始时间, 可能是队列等原因造成的延时)单位:ms
                                    dur: DFAnalytics.utils.timeFormat(item.duration) || "",                 // duration 请求耗时(请求开始时间, 可能是队列等原因)单位:ms
                                    tfs: DFAnalytics.utils.timeFormat(item.transferSize / 1024) || ""       // transferSize 请求文件大小 单位:kb
                                });
                            }
                        });
                        DFAnalytics.res = result;
                    }

                    DFAnalytics.usr = {
                        uid: DFAnalytics.utils.queryUrl('uid') || DFAnalytics.utils.getSession("user_id") || "",                  // 用户id
                        qrc: DFAnalytics.utils.queryUrl('qr_code') || DFAnalytics.utils.getSession("qr_code") || "",              // qr_code
                        eid: DFAnalytics.utils.queryUrl('entity_id') || DFAnalytics.utils.getSession("shop_id") || DFAnalytics.utils.getSession("entity_id") || "",            // 店铺 id
                        stc: DFAnalytics.utils.queryUrl('seat_code') || DFAnalytics.utils.getSession("seat_code") || "",          // 座位码
                    };

                    // 保证在gps和markFirstPageTime执行完成后发送
                    DFAnalytics.autoSendPv()
                }
            }, 0);
        };
        win.DFAnalytics = DFAnalytics;
        DFAnalytics.times.wst = DFAnalytics.utils.timeFormat(per.now());

    } else {
        // 防止报错   todo hupo  不支持此api的要发送一条统计 注明: 此浏览器不支持
        win.DFAnalytics = {
            fire: function () {
            },
            markFirstPageTime: function () {
            },
            autoSendPv: function () {
            },
            sendPv: function () {
            },
            mark: function () {
            },
            measure: function () {
            }
        };
    }
})();
