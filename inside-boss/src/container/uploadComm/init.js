import {currentAPIUrlPrefix, currentEnvString} from '../../utils/env'

const protocol = (currentEnvString === 'PUBLISH' ? 'https://' : 'http://')
const templateDomainPrefix = (currentEnvString === 'PUBLISH' || currentEnvString === 'PRE' ? 'ifile' : 'ifiletest')

const APP_AUTH = {
    app_key: '200800',
    s_os: 'pc_merchant_back',
}

export default (key, query) => {
    const {entityId, userId} = query;

    const options = {

        'item': {
            importUrl: currentAPIUrlPrefix + 'merchant/import/v1/import_excel_goods',
            importData: {
                ...APP_AUTH,
                entityId: entityId,
                platformId: 0,
                opUserId: userId
            },
            // templateFile: protocol + templateDomainPrefix + '.2dfire.com/template/merchant/excelImportMenu.xls',
            templateFile:`https://download.2dfire.com/template_file/excelImportMenu.xls`,
            title: '商品信息导入导出',
            showSpin: {
                boole: false,
                content: ''
            },
        }
    }

    return options[key]

};
