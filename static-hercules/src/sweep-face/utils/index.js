import api from '../api'
const FACE_PHONE = 'FACE_PHONE'
const {
  warning: warningDialog
} = require('../../base/components/dialogs/events')
import { isAndroid } from '../../base/utils/tool'
export const setItem = function(key, value) {
  try {
    value = typeof value === 'string' ? value : JSON.stringify(value)
  } catch (e) {
    value = ''
  }
  sessionStorage.setItem(key, value)
}
export const getItem = function(key) {
  try {
    return JSON.parse(sessionStorage.getItem(key)) || {}
  } catch (e) {
    return {}
  }
}
export const getFace = function(name) {
  const info = getItem(FACE_PHONE)
  return name ? info[name] : info
}
export const setFace = function(info) {
  setItem(FACE_PHONE, {
    ...getFace(),
    ...(info || {})
  })
}
export const getServerImgPath = function(fileName) {
  return `face/food/${fileName}`
}
export const getUploadedImgUrl = function(name) {
  return `https://img.2dfire.com/${name}`
}
export const delFace = function() {
  sessionStorage.removeItem(FACE_PHONE)
}
export const uploadImg = function(file, config) {
  const { success, fail } = config || {}
  let data = new FormData()
  const fileName = file.name
  console.log(fileName)
  compress(file, 0.8, function(err, img) {
    if (err) {
      console.log(err)
      warningDialog.showError('服务器抖了一下')
      return
    }
    // 接下来就可以用 ajax 提交 fromdData
    // data.append('ImgBlob', img);
    data.append('FilePart', img)
    data.append('path', fileName)
    api.uploadImg(data).then(
      res => {
        success && success(res)
      },
      err => {
        fail && fail(err)
      }
    )
  })
}
export const getPhotoOrientation = function(img) {
  var orient
  EXIF.getData(img, function() {
    orient = EXIF.getTag(this, 'Orientation')
  })
  return orient
}
export const compress = function(file, quality, callback) {
  if (!window.FileReader || !window.Blob) {
    return errorHandler('您的浏览器不支持图片压缩')()
  }

  var reader = new FileReader()
  var mimeType = file.type || 'image/jpeg'

  reader.onload = createImage
  reader.onerror = errorHandler('图片读取失败！')
  reader.readAsDataURL(file)

  function createImage() {
    var dataURL = this.result
    var image = new Image()
    image.onload = compressImage
    image.onerror = errorHandler('图片加载失败')
    image.src = dataURL
  }

  function compressImage() {
    var canvas = document.createElement('canvas')
    var ctx
    var dataURI
    var result
    const orient = getPhotoOrientation(this)
    // const orient = 6;
    const w = this.naturalWidth
    const h = this.naturalHeight
    const base_w = 600
    const base_h = 800
    console.log('orient:', orient)
    if (w > h) {
      console.log('横向图')
      canvas.width = base_w
      canvas.height = (base_w * h) / w
    } else {
      console.log('纵向图')
      canvas.height = base_h
      canvas.width = (base_h * w) / h
    }
    ctx = canvas.getContext('2d')

    if (orient == 6) {
      ctx.save() //保存状态
      let cw = Number(ctx.canvas.width)
      let ch = Number(ctx.canvas.height)
      canvas.width = ch
      canvas.height = cw
      ctx.translate(ch / 2, cw / 2) //设置画布上的(0,0)位置，也就是旋转的中心点
      ctx.rotate((90 * Math.PI) / 180) //把画布旋转90度
      // 执行Canvas的drawImage语句
      ctx.drawImage(this, -cw / 2, -ch / 2, cw, ch) //把图片绘制在画布translate之前的中心点，
      ctx.restore() //恢复状态
    } else if (orient == 8) {
      ctx.save() //保存状态
      let cw = Number(ctx.canvas.width)
      let ch = Number(ctx.canvas.height)
      canvas.width = ch
      canvas.height = cw
      ctx.translate(ch / 2, cw / 2) //设置画布上的(0,0)位置，也就是旋转的中心点
      ctx.rotate((270 * Math.PI) / 180) //把画布旋转90度
      // 执行Canvas的drawImage语句
      ctx.drawImage(this, -cw / 2, -ch / 2, cw, ch) //把图片绘制在画布translate之前的中心点，
      ctx.restore() //恢复状态
    } else {
      // 执行Canvas的drawImage语句
      ctx.drawImage(this, 0, 0, canvas.width, canvas.height)
    }
    dataURI = canvas.toDataURL(mimeType, quality)
    result = dataURIToBlob(dataURI)
    callback(null, result)
  }

  function dataURIToBlob(dataURI) {
    var type = dataURI.match(/data:([^;]+)/)[1]
    var base64 = dataURI.replace(/^[^,]+,/, '')
    var byteString = atob(base64)

    var ia = new Uint8Array(byteString.length)
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ia], {
      type: type
    })
  }

  function errorHandler(message) {
    return function() {
      var error = new Error('Compression Error:', message)
      callback(error, null)
    }
  }
}
export const getCapture = function() {
  return isAndroid() ? 'camera' : false
}

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
export function base64ToFile(dataURI) {
  let arr = dataURI.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let suffix = mime.split('/')[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File(
    [u8arr],
    `${Math.random()
      .toString(36)
      .substr(2)}.${suffix}`,
    { type: mime }
  )
  // const type = dataURI.match(/data:([^;]+)/)[1]
  // const base64 = dataURI.replace(/^[^,]+,/, '')
  // const byteString = atob(base64)
  //
  // const ia = new Uint8Array(byteString.length)
  // for (let i = 0; i < byteString.length; i++) {
  //   ia[i] = byteString.charCodeAt(i)
  // }
  // return new Blob([ia], {
  //   type: type
  // })
}
