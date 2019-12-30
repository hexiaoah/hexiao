import { currentAPIUrlPrefix, currentEnvString,currentAPIUrlNetwork } from '../../utils/env'
import {GW} from '@2dfire/gw-params'
const protocol = (currentEnvString === 'PUBLISH' ? 'https://' : 'http://')
const templateDomainPrefix = (currentEnvString === 'PUBLISH' || currentEnvString === 'PRE' ? 'ifile' : 'ifiletest')

const APP_AUTH = {
    app_key: '200800',
    s_os: 'pc_merchant_back',
}
console.log(GW)
export default (key, query , videoType) => {
    const {entityId, userName, memberId, userId} = query

    const options = {

        'picture': {
            importUrl: currentAPIUrlPrefix + 'merchant/import/v2/menu_image',
            uploadUrl: currentAPIUrlNetwork + '?method=com.dfire.soa.boss.centerpc.file.service.IUploadFileService.upload' + '&app_key=200800&s_os=pc_merchant_back' + GW + '&env=' + currentEnvString,
            importData: {
                ...APP_AUTH,
                entityId: entityId,
                userName: userName,
                memberId: memberId,
                userId: userId,
                videoType : videoType,
            },
            exportUrl: currentAPIUrlPrefix + 'merchant/export/v1/card',
            exportData: {
                ...APP_AUTH,
                entityId: entityId,
                memberId: memberId,
                userId: userId,
            },
            templateFile: protocol + templateDomainPrefix + '.2dfire.com/template/merchant/excelImportCard.xls',          
            title: '商品图片管理',
            exportBtnText: '导入',
            isRecharge: false,
            showSpin: {
                boole: false,
                content: ''
            }
        }

    }

    return options[key]

};
