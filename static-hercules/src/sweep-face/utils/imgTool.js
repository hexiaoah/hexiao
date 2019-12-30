export function chooseImage(config) {
  const { success, fail } = config || {}
  wx.chooseImage({
    count: 1, // 默认9
    success(res) {
      const localId = res.localIds[0]
      wx.getLocalImgData({
        localId,
        success(res) {
          let localData = res.localData
          if (localData.indexOf('data:image') !== 0) {
            //判断是否有这样的头部
            localData = 'data:image/jpeg;base64,' + localData
          }
          const base64 = localData
            .replace(/\r|\n/g, '')
            .replace('data:image/jgp', 'data:image/jpeg')
          success && success(base64)
        },
        fail(e) {
          fail && fail(e, 'getLocalImgData')
        }
      })
    },
    fail(e) {
      fail && fail(e, 'chooseImage')
    }
  })
}
//base64转换为file文件
export function base64ToFile(dataurl, filename = 'file') {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let suffix = mime.split('/')[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, { type: mime })
}
