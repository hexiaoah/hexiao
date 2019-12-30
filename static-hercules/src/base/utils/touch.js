let startY = 0;
let startX = 0;
let up, down, left, right;
let touch = {
    watchHorizontal(l, r) {
        // 水平检测
        left = left;
        right = right;
        // PC端兼容
        document.addEventListener("mousedown", this.startH, false);
        document.addEventListener("mousemove", this.move, false);
        document.addEventListener("mouseup", this.endH, false);
        // 移动端的处理
        document.addEventListener('touchstart', this.startH, false);
        document.addEventListener('touchmove', this.move, false);
        document.addEventListener('touchend', this.endH, false);
    },
    watchVertical(u, d) {
        // 垂直检测
        up = u;
        down = d;
        // PC端兼容
        document.addEventListener("mousedown", this.startV, false);
        document.addEventListener("mousemove", this.move, false);
        document.addEventListener("mouseup", this.endV, false);
        // 移动端的处理
        document.addEventListener('touchstart', this.startV, false);
        document.addEventListener('touchmove', this.move, false);
        document.addEventListener('touchend', this.endV, false);
    },
    move(e){
        e.preventDefault();
    },
    startH(e) {
        if (e.changedTouches) {
            let x = e.changedTouches[0].screenX;
            startX = x;
        }
    },
    endH(e) {
        if (e.changedTouches) {
            let x = e.changedTouches[0].screenX;
            if (x - startX > 10) {
                //往左拉
                left();
            } else if (x - startX < -10) {
                //往右拉
                right();
            }
        }
    },
    startV(e) {
        if (e.changedTouches) {
            let y = e.changedTouches[0].screenY;
            startY = y;
        }
    },
    endV(e) {
        if (e.changedTouches) {
            let y = e.changedTouches[0].screenY;
            if (y - startY > 10) {
                //往下拉
                down();

            } else if (y - startY < -10) {
                //往上拉
                up();
            }
        }
    }
}
module.exports = touch;