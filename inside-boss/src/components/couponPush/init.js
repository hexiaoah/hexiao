/**
 * Created by air on 2018/3/14.
 */
import { currentAPIUrlPrefix, currentEnvString } from '../../utils/env'

const protocol = (currentEnvString === 'PUBLISH' ? 'https://' : 'http://')
const templateDomainPrefix = (currentEnvString === 'PUBLISH' || currentEnvString === 'PRE' ? 'ifile' : 'ifiletest')

const APP_AUTH = {
    app_key: '200800',
    s_os: 'pc_merchant_back',
}

export default (key, query,couponId,couponNum,processId) => {

    const {entityId, memberId, userId} = query;

    var options = {

        'coupon': {
            importUrl: currentAPIUrlPrefix + 'coupon/back/v1/importCoupon',
            // importUrl: currentAPIUrlPrefix + 'merchant/import/v2/card',
            importData: {
                ...APP_AUTH,
                entityId: entityId,
                memberId: memberId,
                userId: userId,
                couponId:couponId,
                couponNum:couponNum,
                processId:processId
            },
            exportUrl: currentAPIUrlPrefix + 'coupon/back/v1/couponCard',
            exportData: {
                ...APP_AUTH,
                entityId: entityId,
                memberId: memberId,
                userId: userId
            },
            // templateFile: protocol + templateDomainPrefix + '.2dfire.com/template/merchant/excelImportCard.xls',
            templateFile: 'https://assets.2dfire.com/background/%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx',
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
