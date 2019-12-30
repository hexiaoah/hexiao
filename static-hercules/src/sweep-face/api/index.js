import http from 'base/requester'
import Vue from 'vue'
import {
  getCookie
} from '../../base/utils/AppUtil'
// import { GW } from '@2dfire/gw-params'
const {
  API_BASE_URL,
  SHARE_BASE_URL
} = require('apiConfig')

function createApi(url, config) {
  const {
    method = 'get', ...rest
  } = config || {}
  return params =>
    http[method](
      API_BASE_URL + url,
      // url,
      params, {
        emulateJSON: true,
        ...rest
      },
      false
    )
}
export default {
  // 上传图片
  uploadImg: formData =>
    Vue.http.post(API_BASE_URL + '/activity-api/face/food/v1/uplodpic?xtoken=' + getCookie('token'), formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  uploadSaveFace: createApi('/cash/v1/face_save'),
  verifyFace: createApi('/cash/v1/poll_person_info'),
  hasFace: createApi('/cash/v1/face_save/status'),
}