const mutations = {
    _getGroupList(state,data){
        state.groupTableList = Object.assign({},data)
    },
    _setGroupList(state,data){
        state.groupTableList = [].concat(data)
    },
    _classList(state,data){
        state.classList = [].concat(data)

    },
    _getClassList(state,data){
        state.classTableList = [].concat(data)
    },
    _getGroupItem(state,data){
        state.editGroupItem = Object.assign({...state.editGroupItem},{...data})
    },

}

export default mutations