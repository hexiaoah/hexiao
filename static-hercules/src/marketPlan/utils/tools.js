export default {
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
    }
}
