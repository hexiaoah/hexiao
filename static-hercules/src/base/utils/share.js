let defaultShareInfo = null;
let defaultShareCallback = null;

/**
 * 调用jssdk绑定分享信息
 * @param  {String}   options.title   标题
 * @param  {String}   options.imgUrl  图片
 * @param  {String}   options.shareUrl 链接
 * @param  {String}   options.memo    简介
 * @param  {Function} cb              分享成功后回调
 * @return {void}
 */
export function bindShare ({ title = '', imgUrl = '', shareUrl = '', memo = '' }, cb) {
    const JsSdkUtil = window.JsSdkUtil;
    // 微信分享成功回调
    JsSdkUtil.shareCallback = (...args) => {
        if (cb) cb(args);
        // 分享成功后，绑定回默认信息
        bindDefaultShare();
    };
    try {


        const shareInfo = {
            // 分享到朋友圈
            moment: { title, imgUrl, shareUrl },
            // 分享给朋友
            friend: { title, imgUrl, shareUrl, memo }
        };
        console.info(shareInfo);
        console.info('JsSdkUtil.client：' + JsSdkUtil.client);
        // if (window.DFAnalytics){
        //     DFAnalytics.fire("Er", "marketing-url-1-bindShare:"+ shareUrl);
        //     if(JsSdkUtil){
        //         DFAnalytics.fire("Er", "jssdk-:" + JsSdkUtil.client);
        //     } else {
        //         DFAnalytics.fire("Er", "jssdk-:undefined");
        //     }
        // }
        JsSdkUtil.useShare = true;
        JsSdkUtil.shareInfo = shareInfo;
        JsSdkUtil.bindShareData(shareInfo);
    } catch (e) {
        console.error(e);
    }
}

/**
 * 设置默认的分享信息
 * @param {Object} shareInfo
 * @param {Function} shareCallback
 * @return {void}
 */
export function setDefaultShare (shareInfo, shareCallback) {
    defaultShareInfo = Object.assign({}, shareInfo);
    defaultShareCallback = shareCallback;
    console.log('setDDDDDDD')
    bindDefaultShare();
}

/**
 * 将分享信息绑定为默认
 * @return {void}
 */
export function bindDefaultShare () {
    if (!defaultShareInfo) {
        return;
    }
    console.log('bindDDDDDDD')

    bindShare(defaultShareInfo, defaultShareCallback);
}
