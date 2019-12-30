const UA = navigator.userAgent
export const isAndroid = UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1
export const isIos = !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)