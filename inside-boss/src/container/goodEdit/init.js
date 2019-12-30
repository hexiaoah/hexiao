import { currentAPIUrlPrefix, currentEnvString } from '../../utils/env'
const protocol = (currentEnvString === 'PUBLISH' ? 'https://' : 'http://')
const templateDomainPrefix = (currentEnvString === 'PUBLISH' || currentEnvString === 'PRE' ? 'ifile' : 'ifiletest')

const APP_AUTH = {
    app_key: '200800',
    s_os: 'pc_merchant_back',
}

export default (key, query) => {
    const { entityType='0', industry} = query;
    var options = {
        'item': {
            entityType,
            industry,
        }       
    }
    return options[key]
}