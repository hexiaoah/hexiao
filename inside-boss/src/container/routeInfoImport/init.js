import { currentAPIUrlPrefix, currentEnvString } from '../../utils/env'

const protocol = (currentEnvString === 'PUBLISH' ? 'https://' : 'http://')
const templateDomainPrefix = (currentEnvString === 'PUBLISH' || currentEnvString === 'PRE' ? 'ifile' : 'ifiletest')

const APP_AUTH = {
    app_key: '200800',
    s_os: 'pc_merchant_back',
}

export default (key, query) => {

    const {entityId, userName, memberId, userId, industry} = query;
        var options = {

            'item': {
                importUrl: currentAPIUrlPrefix + 'railway/v1/importTrain',
                importData: {
                    ...APP_AUTH,
                    entityId: entityId,
                    memberId: memberId,
                    userId: userId
                },
                exportUrl: currentAPIUrlPrefix + 'railway/v1/exportTrain',
                exportData: {
                    ...APP_AUTH,
                    entityId: entityId,
                    memberId: memberId,
                    userId: userId
                },
                pageNumber:1,
                templateFile: protocol + templateDomainPrefix + '.2dfire.com/template/merchant/excelImportTrain.xlsx',
                exportBtnText: '导出交路信息',
                isRecharge: false,
                showSpin: {
                    boole: false,
                    content: ''
                }
            }

        }

    return options[key]

};
