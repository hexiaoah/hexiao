const APP_AUTH = {
    app_key: '200800',
    s_os: 'pc_merchant_back',
}

export default (key, query) => {
    const {entityId} = query;
    
    const options = {
        "import_history": {
            exportData: {
                ...APP_AUTH,
                entityId: entityId
            },
            records:[],
            totalRecord:0,
            pageNum:1,
            pageSize:10
        }
    }
    
    return options[key]
};
