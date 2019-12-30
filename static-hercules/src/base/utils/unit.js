
module.exports = {
	initGiftsFormat: function(gifts, otherData, callback){
		var tempData = {};
		var giftWithId = this.checkGiftsWithId();
		// 为gifts数组转变成对象属性
		for(var i = 0; i < gifts.length; i++){
			// gifts[i].unitPrice = gifts[i].unitPrice !== undefined ? gifts[i].unitPrice/100 : 0;
			if (gifts[i].giftId == giftWithId.lollies) {
	          tempData.lollies = gifts[i];
	        } else if (gifts[i].giftId == giftWithId.chocoolate) {
	          tempData.chocoolate = gifts[i];
	        } else if (gifts[i].giftId == giftWithId.flower) {
	          tempData.flower = gifts[i];
	        }
		}
		// 将其他属性合并进gifts对象
		// return Object.assign(otherData, tempData);
		return this.combineobject(otherData, tempData);
	},
	// 礼物对应的giftId
	checkGiftsWithId: function(){
		return {
			lollies: '777de2bb56fe490cb2aadbaa9c36e0e7',
			chocoolate: '2ea898e0feef4628917e26ec7d722dda',
			flower: 'a705affe2f7c4fc094bb93cc16141d78'
		}
	},
	// 合并对象(Object.assign 通过外引入的方式在android上不兼容)
	combineobject: function(oriObject, newObject){
		for (var item in newObject) {
			oriObject[item] = newObject[item];
		}
		return oriObject;
	},
	// 截取url参数，可用this.$route.query代替
	getRequest: function(){
	    var url = location.search;
	    var theRequest = new Object();
	    if (url.indexOf("?") != -1) {
	        var str = url.substr(1);
	        strs = str.split("&");
	        for(var i = 0; i < strs.length; i ++) {
	            theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
	        }
	    }
	    return theRequest;
	},

	// 提示弹出框
	showDialog: function(text){
		var alertdialog = document.getElementById('alertdialog')
		if ( alertdialog !== undefined && alertdialog !== null ) {
			document.getElementById('alertdialog').style.display = 'block';
			document.getElementById('alertdialogtext').innerHTML = text;
		} else {
			alertdialog = document.createElement("div");
			alertdialog.innerHTML = '<div id="alertdialog" styles="display:block" class="alertdialog"><div class="box"><div id="alertdialogtext">' + text + '</div></div></div>'
			alertdialog.addEventListener('click', function(){
				document.getElementById('alertdialog').style.display = 'none';
			})
			document.body.appendChild(alertdialog);
		}
	},
	// cookie操作
	Cookie: {
		set: function(name,value,expHour,domain,path){
			 /*把cookie的domain设置到根域名下*/
		    var strDomain = document.domain;
		    var aryDomain = strDomain.split(".");
		    var strRootDomain = strDomain;
		    var domainLen = aryDomain.length;

		    //域名数组求和,判断是否为ip地址 
		    var ipSum = aryDomain.reduce(function (preValue, curValue) {
		        return preValue + curValue
		    });
		    //如果是localhost或者ip地址访问,则不修改domain 
		    if (strDomain != "localhost" && isNaN(ipSum)) {
		        strRootDomain = "." + aryDomain[domainLen - 2] + "." + aryDomain[domainLen - 1];
		    }
		    // 如果没有主动设置domain,则修改为根域名 
		    if (typeof domain == "undefined") {
		        domain = strRootDomain;
		    }

		    //如果是localhost或者ip地址访问,则不修改domain 
		    if (strDomain != "localhost" && isNaN(ipSum)) {
		        strRootDomain = "." + aryDomain[domainLen - 2] + "." + aryDomain[domainLen - 1];
		    }
		  	document.cookie = name+"="+encodeURIComponent(value==undefined?"":value)+(expHour?"; expires="+new Date(new Date().getTime()+(expHour-0)*3600000).toUTCString():"")+"; domain="+(domain?domain:document.domain)+"; path="+(path?path:"/");
		},
		get: function(name){
		  	return document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"))==null ? null : decodeURIComponent(RegExp.$2);
		},
		remove: function(name){
		  	if(this.get(name) != null) this.set(name,null,-1);
		}
	},
	// 设置Token
	setToken: function( token ){
		var Cookie = this.Cookie;
		Cookie.set('token', token );
	},
	// 获取Token
	getToken: function(){
		var Cookie = this.Cookie;
		if (Cookie.get('token')) {
			return Cookie.get('token');
		}else{
			return null
		}
	},
	// 获取用户名
	getNickName: function(){
		var Cookie = this.Cookie;
		if (Cookie.get('nickname')) {
			var nickname = Cookie.get('nickname');
			return nickname.replace(/\"/g, "");
		}
	},
	// 另一种实现方法
	getCookie: function(name) {
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
	},
  // 防止滚动穿透
  fixedBody: function(){
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    document.body.style.cssText += 'position:fixed;top:-' + scrollTop + 'px'
  },
  // 恢复
  looseBody: function() {
    var body = document.body
    body.style.position = ''
    var top = body.style.top
    document.body.scrollTop = document.documentElement.scrollTop = - parseInt(top)
    body.style.top = ''
  }
}
