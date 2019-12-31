import Requester from "@/base/requester";
import API from "@/config/api";
import catchError from "@/base/catchError";


let tools = {
    /**
     * 格式化数字
     * @param s:带格式化数据
     * @param n:保留小数点后几位(默认2位)
     */
    formateNumber(s, n) {
        n = n >= 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        let l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        let t = "";
        for (let i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        if (n == 0) return t.split("").reverse().join("");
        return t.split("").reverse().join("") + "." + r;
    },
    /**
     * 格式化金额
     * @param s:带格式化数据
     * @param n:保留小数点后几位(默认2位)
     */
    formateMoney(s, n) {
        n = n >= 0 && n <= 20 ? n : 2;
        return s.toFixed(n);
    },
    /**
     * 日期格式化
     * @param  date:日期
     * @param  fmt:数据格式
     */

    dateFormate(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    /**
     * formdate参数转化
     * @param o:需要转化的对象
     * return string: key=value&key=value
     */
    formDate(o) {
        let p = "";
        for (let i in o) {
            p += i + "=" + o[i] + "&";
        }
        p = p.substring(0, p.length - 1);
        return p;
    },
    /**
     * scrollTo 滚动至某位置
     * @param id || class 需要跳转到的元素位置绑定的id或class
     * demo
     * <div id='t'>...</div>
     * <div class='t'>...</div> 会跳转到文档流中第一个匹配的class
     * scrollTo('t')
     */
    scrollTo(t) {
        let tmp_id = '#' + t;
        let tmp_class = '.' + t;
        let tmp_target = '';

        if (document.querySelector(tmp_id)) {
            tmp_target = document.querySelector(tmp_id)
        }
        else {
            tmp_target = document.querySelector(tmp_class)
        }

        let targetTop = tmp_target.offsetTop || 0;
        window.scrollTo(0, targetTop);
    },
    /**
     * 文件下载
     * @param list:需要下载的文件路径
     */
    fileDownload(list) {
        Requester.post(API.DOWNLOAD_INVOICE, { urlList: list }, { emulateJSON: true }).then((data) => {
            window.location = data;
        }).catch((e) => {
            catchError(e)
        });
    },
    /**
     * 获取当前页面名称
     */
    getPageName() {
        let path = window.location.pathname;
        let pagelist = path.split("/");
        let page = pagelist[pagelist.length - 1].slice(0, -5);
        return page;
    },
    /**
     * 获取肉串路由值
     * @param i: 第几个值
     * example: #/first_second_third ====>> 1=>first 2=>second 3=>third
     */
    getRouter(i) {
        let hash = window.location.hash.slice(2);
        let items = hash.split("_");
        if (items.length < 2) {
            return items[0];
        }
        if (i > 0) { return items[i - 1]; }
        return items[0];

    }
}

export default tools;
