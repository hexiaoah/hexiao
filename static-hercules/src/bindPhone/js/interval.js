/**
 * 二维码刷新定时器
 * */
export default class Timer {
    constructor() {
        this.timer = null;
        this.time = 2 * 1000 * 60;
    }

    init(callback) {
        let that = this;
        if (!this.timer) {
            callback();
            this.timer = setInterval(function () {
                callback(true)
            }, this.time)
        } else {
            this.clear(function () {
                that.init(callback)
            })
        }
    }

    clear(callback) {
        clearInterval(this.timer);
        this.timer = null;
        callback ? callback() : '';
    }
};