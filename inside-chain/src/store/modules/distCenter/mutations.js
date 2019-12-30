export default{
    // 获取品牌列表
    _getPublishTaskList(state, obj){
        state.publishTaskList = obj
    },
    _getTaskInfo(state, obj){
        state.taskInfo = obj
    },
    _getAllBrands(state, list){
        state.brandList = list
    },
    _setTaskName(state, res){
        state.taskInfo.name = res
    },
    _setTimeType(state, res){
        state.taskInfo.timeType = res
    },
    // 获取下发时间类型
    _getPublishTimeType(state, res) {
        state.publishTimeType = res
    },

}
