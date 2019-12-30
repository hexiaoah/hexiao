/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-02-27 10:54:05
 * @LastEditTime: 2019-08-27 17:38:29
 * @LastEditors: Please set LastEditors
 */
/**
 * Created by air on 2018/3/14.
 */
import {currentAPIUrlPrefix, currentEnvString} from '../../utils/env'

const protocol = (currentEnvString === 'PUBLISH' ? 'https://' : 'http://')
const templateDomainPrefix = (currentEnvString === 'PUBLISH' || currentEnvString === 'PRE' ? 'ifile' : 'ifiletest')

const APP_AUTH = {
    app_key: '200800',
    s_os: 'pc_merchant_back',
}

export default (key, query, couponId, couponNum, processId) => {

    const {entityId, memberId, userId} = query;

    let options = {
        'coupon': {
            importData: {
                ...APP_AUTH,
                entityId: entityId,
                // memberId: memberId,
                // userId: userId,
                // couponId: couponId,
                // couponNum: couponNum,
                // processId: processId
            },
            exportCouponCodeUrl: currentAPIUrlPrefix + 'coupon/offline/v1/exportCoupon',
            exportActiveErrorUrl: currentAPIUrlPrefix + 'coupon/offline/v1/exportBatchProcessResult',
            exportStopErrorUrl: currentAPIUrlPrefix + 'coupon/offline/v1/exportBatchProcessResult',
            exportStatementUrl: currentAPIUrlPrefix + 'coupon/offline/v1/exportReport',
            select: {
                coupon: [],
                status: [],
                store: []
            },
            search:{},
            list: [],
            listLeg: 0,
            pageNumber: 1,
            setPageIsShow:false,
            setList: [],
            setListLeg: 0,
            setPageNumber: 1
        }
    }


    return options[key]

};
