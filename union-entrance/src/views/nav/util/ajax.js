import cookie from "./cookie";
//格式化参数
function formatParams(data) {
    const arr = [];
    for (const name in data) {
        arr.push(
            encodeURIComponent(name) + "=" + encodeURIComponent(data[name])
        );
    }
    arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
}
export default function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    const params = formatParams(options.data);

    //创建  - 第一步
    const xhr = new XMLHttpRequest();
    //接收 - 第三步
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            const status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success &&
                    options.success(xhr.responseText, xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    };
    //连接 和 发送 - 第二步
    if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, true);
        const token = cookie.getCookie("entrance").token;
        // console.log(getCookies('entrance'),111)
        // console.log(token,222)
        // const tokenCookie = Cookie.getItem('token');
        // if (tokenCookie) {
        //     const token = tokenCookie
        // }
        //设置表单提交时的内容类型
        xhr.setRequestHeader("token", token);
        xhr.setRequestHeader("env", "85da200fc40b467b9e20aca6b39833af");
        // xhr.setRequestHeader("env", "3c46b0f369e64415a167b5d6af060545");
        xhr.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        xhr.send(params);
    }
}
