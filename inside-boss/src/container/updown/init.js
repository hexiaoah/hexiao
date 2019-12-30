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
            importUrl: currentAPIUrlPrefix + 'merchant/import/v1/card',
            importData: {
                ...APP_AUTH,
                entityId: entityId,
                userName: userName,
                memberId: memberId,
                userId: userId
            },
            exportUrl: currentAPIUrlPrefix + 'merchant/export/v1/card',
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
        },

        'item': {
            importUrl: currentAPIUrlPrefix + 'merchant/import/v1/menus',
            importData: {
                ...APP_AUTH,
                entityId: entityId,
                memberId: memberId,
                userId: userId
            },
            exportUrl: currentAPIUrlPrefix + 'merchant/export/v1/menus',
            exportData: {
                ...APP_AUTH,
                entityId: entityId,
                memberId: memberId,
                userId: userId
            },
            // templateFile: protocol + templateDomainPrefix + '.2dfire.com/template/merchant/excelImportMenu.xls',
            templateFile:
            `https://download.2dfire.com/template_file/excelImportMenu.xls`,
            title: '商品信息导入导出',
            exportBtnText: '导出商品信息',
            isRecharge: false,
            showSpin: {
                boole: false,
                content: ''
            }
        },

        'recharge': {
            importUrl: currentAPIUrlPrefix + 'merchant/import/v1/recharge_batch_details',
            importData: {
                ...APP_AUTH,
                entityId: entityId,
                memberId: memberId,
                userId: userId
            },
            exportUrl: currentAPIUrlPrefix + 'merchant/export/v1/recharge_batch_details',
            exportData: {
                ...APP_AUTH,
                entityId: entityId,
                memberId: memberId,
                userId: userId
            },
            templateFile: protocol + templateDomainPrefix + '.2dfire.com/template/merchant/excelImportRecharge.xls',
            title: '批量充值、红冲',
            exportBtnText: '导出',
            isRecharge: true,
            batchList: [],
            rechargeBatchDetailsViewList: [],
            name: '',
            cancelRechargeCount: 0,
            faiRechargeCount: 0,
            pageCount: 1,
            preRechargeCount: 0,
            rechargeBatchId: '',
            sucRechargeCount: 0,
            totalCount: 0,
            showEditLayer: false,
            defaultPageSize: 50,
            selectedCounter: 0,
            selectedRowKeys: [],
            currentPage: 1,
            btnLocker: {
                name: '',
                bool: false
            },
            showSpin: {
                bool: false,
                content: ''
            },
            statusList: [],
            layerDefaultvalues: {},
            startValue: null,
            endValue: null
        }

    }

    return options[key]

};
