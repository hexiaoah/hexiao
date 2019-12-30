/**
 * Created by air on 2018/2/28.
 */
import { currentAPIUrlPrefix, currentEnvString } from '../../utils/env'

const protocol = (currentEnvString === 'PUBLISH' ? 'https://' : 'http://')
const templateDomainPrefix = (currentEnvString === 'PUBLISH' || currentEnvString === 'PRE' ? 'ifile' : 'ifiletest')

const APP_AUTH = {
    app_key: '200800',
    s_os: 'pc_merchant_back',
}

export default (key, query) => {

    const {entityId, memberId, userId} = query;

        var options = {

            'order': {
                exportUrl: currentAPIUrlPrefix + 'merchant/export/exportCashLog',
                exportData: {
                    ...APP_AUTH,
                    entityId: entityId,
                    memberId: memberId,
                    userId: userId,
                },
                pageNumber:1,
                exportBtnText: 'Export',
                showSpin: {
                    boole: false,
                    content: ''
                }
            }

        }



    return options[key]

};
