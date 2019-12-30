import { currentAPIUrlPrefix, currentEnvString } from '../../utils/env'

const protocol = (currentEnvString === 'PUBLISH' ? 'https://' : 'http://')
const templateDomainPrefix = (currentEnvString === 'PUBLISH' || currentEnvString === 'PRE' ? 'ifile' : 'ifiletest')

const APP_AUTH = {
    app_key: '200800',
    s_os: 'pc_merchant_back',
}

export default (key, query , videoType) => {
    const {entityId, userName, memberId, userId} = query

    const options = {

        'video': {
            importUrl: currentAPIUrlPrefix + 'shadow_deer/video_upload',
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
            title: '视频导入',
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
