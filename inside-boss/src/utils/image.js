
export function getRectImageUrl(url = '', opt = {}) {
    const { w, h } = opt

    if (url && w && h) {
        return `${url}?x-oss-process=image/resize,m_lfit,w_${w},h_${h}`
    }
}
