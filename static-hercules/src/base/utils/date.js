export const dateFormat = function dateFormat(fmt, date) {
    const o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S': date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        const f = RegExp.$1;
        fmt = fmt.replace(f,
            (date.getFullYear() + '').substr(4 - f.length)
        );
    }
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            const f = RegExp.$1;
            fmt = fmt.replace(f,
                f.length === 1
                    ? o[k]
                    : ('00' + o[k]).substr(('' + o[k]).length)
            );
        }
    }
    return fmt;
};
