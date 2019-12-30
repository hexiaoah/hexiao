import { currentAPIUrlPrefix } from '../../utils/env'

const APP_AUTH = {
    app_key: '200800',
    s_os: 'pc_merchant_back',
}

export default (key, query) => {
    const {entityId, userName, memberId, userId} = query;

    const options = {
        "template": {
            treeData : [],
            tableData: [],
            exportUrl: currentAPIUrlPrefix + 'merchant/import/v1/create_import_template',
            exportData: {
                ...APP_AUTH,
                entityId: entityId
            },
            checkedList: [],
            entityId: entityId,
            userName: userName,
            memberId: memberId,
            userId: userId
        }
    }

    return options[key]
};
