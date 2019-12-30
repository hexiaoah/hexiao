/**
 * Created by sheldon on 15/11/14.
 */

// Speed up calls to hasOwnProperty

var hasOwnProperty = Object.prototype.hasOwnProperty;

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
    if (obj.length === undefined) {
      //对象
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
      }
    } else {
      //数组
      if (obj.length > 0) {
        return false;
      } else {
        return true;
      }
    }
  }

  return true;
}

function isEquals(x, y) {
  // If both x and y are null or undefined and exactly the same
  if (x === y) {
    return true;
  }

  // If they are not strictly equal, they both need to be Objects
  if (!(x instanceof Object) || !(y instanceof Object)) {
    return false;
  }

  // They must have the exact same prototype chain, the closest we can do is
  // test the constructor.
  if (x.constructor !== y.constructor) {
    return false;
  }

  for (var p in x) {
    // Inherited properties were tested using x.constructor === y.constructor
    if (x.hasOwnProperty(p)) {
      // Allows comparing x[ p ] and y[ p ] when set to undefined
      if (!y.hasOwnProperty(p)) {
        return false;
      }

      // If they have the same strict value or identity then they are equal
      if (x[p] === y[p]) {
        continue;
      }

      // Numbers, Strings, Functions, Booleans must be strictly equal
      if (typeof x[p] !== "object") {
        return false;
      }

      // Objects and Arrays must be tested recursively
      if (!isEquals(x[p], y[p])) {
        return false;
      }
    }
  }

  for (p in y) {
    // allows x[ p ] to be set to undefined
    if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
      return false;
    }
  }
  return true;
}

function isArray(v) {
  return toString.apply(v) === "[object Array]";
}

function isString(v) {
  return typeof v == "string";
}

function clone(o) {
  var k, ret = o,
    b;
  if (o && ((b = o instanceof Array) || o instanceof Object)) {
    ret = b ? [] : {};
    for (k in o) {
      if (o.hasOwnProperty(k)) {
        ret[k] = clone(o[k]);
      }
    }
  }
  return ret;
}

function offset(el) {
  var _x = 0;
  var _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return {
    top: _y,
    left: _x
  };
}

function toInt(v) {
  let num = parseInt(v);
  return isNaN(num) ? 0 : num;
}

function toIntBool(v) {
  let bool = v;
  if (typeof (v) == 'string') {
    bool = toInt(v);
  }
  return bool ? 1 : 0;
}

function toJson(v) {

  try {
    var json = JSON.parse(v) || {};
    return json
  } catch (e) {
    return {};
  }
}

function toStr(v) {
  if (toJson(v)) {
    return JSON.stringify(v);
  }
  return '';
}

function paramsFormat(url, params) {
  if (params != undefined && Object.keys(params).length > 0) {
    if (url.indexOf("?") > -1) {
      url += "&";
    } else {
      url += "?";
    }

    for (var k in params) {
      if (params.hasOwnProperty(k)) {
        url = url + k + "=" + encodeURIComponent(params[k]) + "&";
      }
    }
    if (url[url.length - 1] === "&") {
      url = url.slice(0, -1);
    }
  }
  return url;
}

/**
 * 从地址栏验证指定的字符串是否存在
 * @param str 验证的字符串
 * @returns {boolean} ture:存在
 */
function matchStr(str) {
  var reg = new RegExp(str, "ig");
  var href = location.href;
  return reg.test(href);
}

function isArray(ary) {
  if (Object.prototype.toString.call(ary) == "[object Array]") {
    return true;
  } else {
    return false;
  }
}

function getCookie(name) {

  // FIXME: cookie 中的 token 还有 entity_id 统一去 session 里获取 
  // by feiyuzi 因为点餐流程中的 token 统一迁移到 session 里了.
  if (name === 'token') {
    var s = window.sessionStorage;
    var t = s.getItem('_DFMAP_common_token');
    if (t) {
      try {
        var token = JSON.parse(t);
        if (token) {
          return token
        }
      } catch (e) {
        console.log('ops! can not find token in session ~');
      }
    }
  } else if (name === 'entity_id') {
    var c = s.getItem('_DFMAP_sid_current')
    if (c.indexOf('_')) {
      return c.split('_')[1]
    }
  }

  var cookieValue = null;
  if (document.cookie && document.cookie != "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].replace(/.*\s/, "");
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function setToken(v) {
  try {
    var n = JSON.stringify(v);
    window.sessionStorage.setItem('_DFMAP_common_token', n);
  } catch (e) {
    console.log("可能没有token");
  }

}

//获取地址栏中的参数
function queryStr(item) {
  var sValue = location.hash.match(
    new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i")
  );
  return sValue ? unescape(decodeURI(decodeURI(sValue[1]))) : "";
}

function query(a) {
  if (isString(a)) {
    return queryString(a).val;
  }

  if (isArray(a)) {
    return queryArray(a);
  }

  return null;
}

function queryArray(arr) {
  var res = {};
  arr.map(function (n) {
    var s = queryString(n);
    res[s.key] = s.val;
  });
  return res;
}

function queryString(name) {
  var key = name;
  var type = null;

  // 检测是否 有类型转换标志
  if (key.indexOf(":") > 0) {
    var a = key.split(":");
    key = a[0];
    type = a[1];
  }

  // url 中获取数据
  var sValue = window.location.href.match(
    new RegExp("[\?\&]" + key + "=([^\&\#]*)(\&?)", "i")
  );
  var val = sValue ? decodingUrl(sValue[1]) : null;

  if (type != null) {
    switch (type) {
      case "int":
        var int = parseInt(val);
        val = isNaN(int) ? null : int;
        break;
      default:
        break;
    }
  }

  var res = {
    key: key,
    val: val
  };

  return res;
}
// 过滤URL
function decodingUrl(params) {
  if (params) {
    return unescape(decodeURI(decodeURI(params)));
  } else {
    return "";
  }
}

// 工具类 金额显示和计算必须先调用此format_number
function format_number(pnumber) {
  var mark = "";

  if (isNaN(pnumber)) {
    return "0.00";
  }

  if (pnumber == "") {
    return "0.00";
  }
  pnumber = pnumber.toString();
  if (pnumber.charAt(0) == "-") {
    mark = "-";
    pnumber = pnumber.split("-")[1];
  }

  var whole = new String(pnumber).split(".")[0];
  var snum = new String(pnumber * 1000);
  var sec = snum.split(".");
  var wholeStr = sec[0];
  var result = "";
  var firstDes = "0";
  var secondDes = "0";
  var thirdDes = "0";
  if (wholeStr.length - 2 > 0) {
    firstDes = wholeStr.substring(wholeStr.length - 3, wholeStr.length - 2);
  }

  if (wholeStr.length - 1 > 0) {
    secondDes = wholeStr.substring(wholeStr.length - 2, wholeStr.length - 1);
  }

  if (wholeStr.length > 0) {
    thirdDes = wholeStr.substring(wholeStr.length - 1, wholeStr.length);
  }

  firstDes = parseInt(firstDes);
  secondDes = parseInt(secondDes);
  thirdDes = parseInt(thirdDes);
  if (thirdDes > 4) {
    secondDes += 1;
    if (secondDes >= 10) {
      secondDes = secondDes - 10;
      firstDes += 1;
      if (firstDes >= 10) {
        whole = new String(parseInt(whole) + 1);
      }
    }
  }

  if (firstDes == 0 && secondDes == 0) {
    result = whole + ".00";
  } else {
    result = whole + "." + new String(firstDes) + new String(secondDes);
  }
  return mark + result;
}

// 重置业务对接收银台参数
function resetCashierInfo() {
  var allInfo = [
    "returnBtnText", // 支付列表页左上角返回按钮的文案
    "returnBtnUrl", // 支付列表左上角返回按钮的链接

    "successTitle", // 成功页面标题信息
    "successMessage", // 成功页面主要信息
    "successBtnUrl", // 成功页面按钮跳转地址
    "successBtnText", // 成功页面按钮信息
    "successSecondBtnUrl", // 成功页面子按钮跳转地址
    "successSecondBtnText", // 成功页面子按钮信息

    "successPageUrl", // check成功后跳转的finish页面，默认跳到收银台提供的base Finish页面

    "failTitle",
    "failMessage",
    "failBtnUrl",
    "failBtnText",

    "failPageUrl",

    "errorTitle",
    "errorMessage",
    "errorBtnUrl",
    "errorBtnText",

    "errorPageUrl"
  ];

  allInfo.forEach(function (i) {
    window.sessionStorage.setItem(i, "");
  });
}

// 统一设置业务对接收银台所需参数
function setCashierInfo(obj) {
  for (var key in obj) {
    window.sessionStorage.setItem(key, obj[key]);
  }
}

// 获取业务对接收银台的所有参数
function getCashierInfo() {
  var allInfo = [
    "returnBtnText", // 支付列表页左上角返回按钮的文案
    "returnBtnUrl", // 支付列表左上角返回按钮的链接

    "successTitle", // 成功页面标题信息
    "successMessage", // 成功页面主要信息
    "successBtnUrl", // 成功页面按钮跳转地址
    "successBtnText", // 成功页面按钮信息
    "successSecondBtnUrl", // 成功页面子按钮跳转地址
    "successSecondBtnText", // 成功页面子按钮信息

    "successPageUrl", // check成功后跳转的finish页面，默认跳到收银台提供的base Finish页面

    "failTitle",
    "failMessage",
    "failBtnUrl",
    "failBtnText",

    "failPageUrl",

    "errorTitle",
    "errorMessage",
    "errorBtnUrl",
    "errorBtnText",

    "errorPageUrl"
  ];

  var obj = {};
  allInfo.forEach(function (i) {
    obj[i] = window.sessionStorage.getItem(i);
  });

  return obj;
}

module.exports = {
  queryStr: queryStr,
  query: query,
  isEmpty: isEmpty,
  isEquals: isEquals,
  toIntBool: toIntBool,
  toStr: toStr,
  clone: clone,
  offset: offset,
  matchStr: matchStr,
  isArray: isArray,
  getCookie: getCookie,
  setToken: setToken,
  paramsFormat: paramsFormat,
  formatNumber: format_number,
  resetCashierInfo: resetCashierInfo,
  setCashierInfo: setCashierInfo,
  getCashierInfo,
  getCashierInfo
};