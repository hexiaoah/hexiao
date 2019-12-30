import axios from './networkAxios'
import { currentUrlUploadRul } from '@src/utils/env'
// 全局 AppKey
const APP_AUTH = '?app_key=200800&s_os=pc_merchant_back'
const getFormData=(params)=>{
    let formData = new FormData()
    console.log('output',params);
    // for (let key in params) {
    //     formData.append(key, params[key])
    // }
    formData.append('file',params)
    return formData
}
const getFormDataForPlate=(params)=>{
    let formData = new FormData()
    console.log('output',params);
    for (let key in params) {
        formData.append(key, params[key])
    }
    // formData.append('file',params)
    return formData
}
export default {
    // 	商品导入导出
    uploadGoods(params) {
       return axios.post(
            'merchant/import/v1/menus'+APP_AUTH,
           getFormData(params.file),
        )
    },
    // 	商品导入导出(有品牌的时候)
    uploadGoodsV2(params) {
        return axios.post('merchant/import/v2/menus'+APP_AUTH,
            getFormDataForPlate(params),
        )
    },
    // 	商品导入导出(多规格)
    uploadGoodsSpecification(params) {
        return axios.post('merchant/import/item'+APP_AUTH,
            getFormDataForPlate(params),
        )
    },
     // 查询导入结果
     getImportResult(params) {
        return axios.get('merchant/import/item/result/'+ params +APP_AUTH)
    },
    // 	商品导入导出(无规格)
    // uploadGoodsNoSpecification(params) {
    //     return axios.post('merchant/import/item/no_spec'+APP_AUTH,
    //         getFormData(params),
    //     )
    // }
     uploadGoodTagImage(params) {
        return axios.post('/api/uploadfile', getFormDataForPlate(params), {
            isUploadImg: true
        })
    },

    // excel上传到oss
    uploadfile(file) {
        let formData = new FormData()
        formData.append('file', file)
        formData.append('projectName', 'OssDownload')
        formData.append('path', 'bossimportmenu')
        return axios.post('/api/uploadfile', formData, {
            isUploadImg: true
        })
    }
}
