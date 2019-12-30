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
    /*
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
     * formatDateByStamp 时间戳转时间(yyyy-MM-dd)
     * @param stamp:需要转化的时间戳(单位ms)
     * return string: yyyy-MM-dd
     */
    formatDateByStamp(stamp) {
        let time = new Date(stamp);
        let y = time.getFullYear();

        let m = time.getMonth() + 1;
        if (m < 10) {
            m = '0' + m;
        }

        let d = time.getDate();
        if (d < 10) {
            d = '0' + d;
        }

        return y + '-' + m + '-' + d
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
        Requester.post(API.DOWNLOAD_INVOICE, {urlList: list}, {emulateJSON: true}).then((data) => {
            window.location = data;
        }).catch((e) => {
            catchError(e)
        });
    },
    /**
     * 套餐/商品分类递归
     * @param data
     */
    recursion(data) {
        const flat = arr => [].concat(...arr)
        const item = arr => {
            return flat(arr.map(i => {
                    if (i.subList) {
                        return item(i.subList).map(j => {
                            return {name: i.name + '-' + j.name, id: j.id}
                        })
                    }
                    else {
                        return {name: i.name, id: i.id}
                    }
                }
            ))
        }
        return item(data)
    },
    /**
     * 套餐/商品分类递归-最后一级和自己不可选
     * @param data
     */
    recursionClass(data) {
        let tmp_list = [];
        const loop = (arr,father) => {
            arr.map(item => {
                if(father){
                    tmp_list.push({
                        name: father.name + '-' + item.name,
                        id: item.id,
                        disabled: item.disabled
                    })
                }else{
                    tmp_list.push({
                        name: item.name,
                        id: item.id,
                        disabled: item.disabled
                    })
                }

                if (item.subList) {
                    loop(item.subList, item)
                }
            })
            return tmp_list
        }

        return loop(data)

    },
    /**
     * 套餐/商品分类递归 只取叶子节点的名称
     * @param data
     */
    recursionLeaf(data) {
        const flat = arr => [].concat(...arr)
        const item = arr => {
            return flat(arr.map(i => {
                    if (i.subList) {
                        return item(i.subList).map(j => {
                            return {name: j.name, id: j.id}
                        })
                    }
                    else {
                        return {name: i.name, id: i.id}
                    }
                }
            ))
        }
        return item(data)
    },
    /**
     * 给有children的添加disabled
     */
    addDisableWithChildren(data) {
        const item = arr => {
            return arr.map(i => {
                if (!!i.children && i.children.length) {
                    i.disabled = true
                    item(i.children)
                    return i
                }
                else {
                    i.disabled = false
                    return i
                }
            })
        }
        return item(data)
    },
    addDisableWidthOutChoosed(data, id) {
        const item = arr => {
            return arr.map(i => {
                i.disabled = i.id !== id
                !!i.children && i.children.length && item(i.children)
                return i
            })
        }
        return item(data)
    }
}

export default tools;
