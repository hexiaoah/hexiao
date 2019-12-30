export default{
    // 获取付款方式列表
    _getPayKindList(state, obj){
        state.payKindList = obj
    },
    //获取付款方式详情
    _getPayKindInfo(state, obj){
        state.payKindInfo = obj
    },
    _getAllPayKindList(state, list){
        state.allPayKindList = list
    },
    // 获取付款方式列表
    _getPayKindListSingle(state, obj){
        state.payKindListSingle = obj
    },
    //获取付款方式详情
    _getPayKindInfoSingle(state, obj){
        state.payKindInfoSingle = obj
    },
    _getAllPayKindListSingle(state, list){
        state.allPayKindListSingle = list
    },
    _getPayKindListForSelect(state, list){
        state.selectPayKind = list
    },
    _getPayKindListForSelectSingle(state, list){
        state.selectPayKindSingle = list
    },
    _setIsAlipay(state, obj){
        state.isAlipay = obj
    }
}
