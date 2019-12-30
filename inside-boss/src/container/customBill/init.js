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
        'main': {
            importData: {
                ...APP_AUTH,
                entityId: entityId,
                userName: userName,
                memberId: memberId,
                userId: userId
            },
        },
    }
    return options[key]
};
