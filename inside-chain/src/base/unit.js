// 防止滚动穿透
export const fixedBody = function () {
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    document.body.style.cssText += 'position:fixed;top:-' + scrollTop + 'px'
}

// 恢复滚动
export const looseBody = function () {
    let body = document.body
    body.style.position = ''
    let top = body.style.top
    document.body.scrollTop = document.documentElement.scrollTop = - parseInt(top)
    body.style.top = ''
}
