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

        'comm': {
            bizLogList: [],
            entityId: entityId,
            businessType: 1,
            totalCount: 0,
            detail: {
                bizLogDetailList: [],
                totalCount: 0
            },
            detailTotalCount: 0
        }

    }

    return options[key]

};
