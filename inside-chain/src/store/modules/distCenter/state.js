export default {
    // 下发任务列表
    publishTaskList: {
        total: 0,
        tasks: []
    },
    // 下发任务详情
    taskInfo: {
        timeType: 0,
        chainPublishTaskContent: {
            publishType: 0,
            shopList: [],
            failureReason: ''
        },
        id: "",
        name: "",
        plateEntityId: "",
        plateName: "",
        publishStartTime: 0,
        publishStartTimeStr: "",
        status: 0,
        menuInfo: {
            menuName: '',
            menuCount: 0
        },
        // 传菜方案
        passInfo: {
            name: '',
            time: ''
        }
    },
//    筛选用所有品牌列表
    brandList: [
        // {
        //     name: '全部',
        //     entityId: "all"
        // }
    ],
    publishTimeType: [],

}
