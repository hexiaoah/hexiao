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
        'List': {
            importData: {
                ...APP_AUTH,
                entityId: entityId,
                userName: userName,
                memberId: memberId,
                userId: userId,
            },
            pageNumber:1,
            monListLeg:0
        }

    }

    return options[key]

};
