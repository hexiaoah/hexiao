let commonCss = `position: absolute;
            width: 0;
            height: 0;`;
let borderDiv = document.createElement('span');
let arrowsDiv = document.createElement('span');

/**
 * 获取箭头指向css
 * */
const getCss = (top, bottom, left, right, width, halfWidth, color) => {
    return `border-${top}: 0;
            border-${bottom}: ${width}px solid ${color};
            border-${left}:${halfWidth}px solid transparent;
            border-${right}: ${halfWidth}px solid transparent;
            ${top}: -${width}px;
            ${left}: 50%;
            margin-${left}: -${halfWidth}px;`
}
/**
 * 获得不同箭头指向的DOM节点
 * */
export default {
    top() {
        borderDiv.style = `${commonCss}${getCss('top', 'bottom', 'left', 'right', 11, 6, '#999')}`;
        arrowsDiv.style = `${commonCss}${getCss('top', 'bottom', 'left', 'right', 10, 5, '#fff')}`;
        return borderDiv.outerHTML + arrowsDiv.outerHTML;
    },

    right() {
        borderDiv.style = `${commonCss}${getCss('right', 'left', 'top', 'bottom', 11, 6, '#999')}`;
        arrowsDiv.style = `${commonCss}${getCss('right', 'left', 'top', 'bottom', 10, 5, '#fff')}`;
        return borderDiv.outerHTML + arrowsDiv.outerHTML;
    },

    bottom() {
        borderDiv.style = `${commonCss}${getCss('bottom', 'top', 'left', 'right', 11, 6, '#999')}`;
        arrowsDiv.style = `${commonCss}${getCss('bottom', 'top', 'left', 'right', 10, 5, '#fff')}`;
        return borderDiv.outerHTML + arrowsDiv.outerHTML;
    },

    left() {
        borderDiv.style = `${commonCss}${getCss('left', 'right', 'top', 'bottom', 11, 6, '#999')}`;
        arrowsDiv.style = `${commonCss}${getCss('left', 'right', 'top', 'bottom', 10, 5, '#fff')}`;
        return borderDiv.outerHTML + arrowsDiv.outerHTML;
    },
    /**
     * 点的颜色
     * */
    spot(color){
        return `<span style="vertical-align:middle;display: inline-block;width: 5px;height: 5px;background: ${color};
position: absolute;left: 0"></span>`
    }
};