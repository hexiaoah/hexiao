export default (key) => {
    const options = {
        shopManage: '/third/shopManage',
        category: '/third/category',
        bankCardCheckForGuarantee: '/third/bankCardCheckForGuarantee',
        chainManage: '/third/chainManage',
        dynamic: '/third/dynamic',
        vedio: '/third/vedio',
        report: '/third/report',
        groupbuyOrder: '/third/groupbuyOrder',
        shareMakeMoney: '/third/shareMakeMoney',
        groupDinner: '/third/groupDinner',
    }
    return options[key]
}