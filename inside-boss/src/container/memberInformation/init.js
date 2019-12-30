import { currentAPIUrlPrefix, currentEnvString } from '../../utils/env'

const protocol = (currentEnvString === 'PUBLISH' ? 'https://' : 'http://')
const templateDomainPrefix = (currentEnvString === 'PUBLISH' || currentEnvString === 'PRE' ? 'ifile' : 'ifiletest')

const APP_AUTH = {
    app_key: '200800',
    s_os: 'pc_merchant_back',
}

export default (key, query) => {
    const {entityId, userName, memberId, userId} = query

    const options = {

        'member': {
            importUrl: currentAPIUrlPrefix + 'merchant/import/v2/card',
            importData: {
                ...APP_AUTH,
                entityId: entityId,
                userName: userName,
                memberId: memberId,
                userId: userId
            },
            exportUrl: currentAPIUrlPrefix + 'merchant/export/v1/card',
            exportBtn: 0,
            exportData: {
                ...APP_AUTH,
                entityId: entityId,
                memberId: memberId,
                userId: userId
            },
            templateFile: protocol + templateDomainPrefix + '.2dfire.com/template/merchant/excelImportCard.xls',
            title: '会员信息导入导出',
            exportBtnText: '导出会员信息',
            isRecharge: false,
            showSpin: {
                boole: false,
                content: ''
            }
        }

    }

    return options[key]

};
