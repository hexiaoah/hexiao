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
                importUrl: currentAPIUrlPrefix + 'railway/v1/importTrainStation',
                importData: {
                    ...APP_AUTH,
                    entityId: "12345678",
                    memberId: memberId,
                    userId: '9993000559496cd70159496cd7580001'
                },
                exportUrl: currentAPIUrlPrefix + 'railway/v1/exportTrainStation',
                exportData: {
                    ...APP_AUTH,
                    entityId: entityId,
                    memberId: memberId,
                    userId: userId
                },
                pageNumber:1,
                templateFile: protocol + templateDomainPrefix + '.2dfire.com/template/merchant/excelImportTrainStation.xlsx',
                exportBtnText: '导出车次时刻信息',
                isRecharge: false,
                showSpin: {
                    boole: false,
                    content: ''
                }
            }

        }

    return options[key]
};
