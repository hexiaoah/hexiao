const getters = {
    allMenuList: (state) => {
        return state.allMenuList
    },
    // 复用菜单列表
    reuseMenuList(state) {
        return state.reuseMenuList
    },
    goodsList(state) {
        return state.goodsList
    },
    unSubmitGoods(state) {
        return state.unSubmitGoods
    },
    menuInfo(state) {
        return state.menuInfo
    },
    resultBackup(state) {
        return state.resultBackup
    },
    typeList(state) {
        return state.typeList
    },
    goodsOfMenuTotal(state) {
        return state.goodsOfMenuTotal
    },
    goodsOfMenu(state) {
        return state.goodsOfMenu
    },
    goodsKinds(state) {
        return state.goodsKinds
    },
    goodsKindsSingle(state) {
        return state.goodsKindsSingle
    },
    goodsPrice(state) {
        return state.goodsPrice
    },
    kindMenuTree(state) {
        return state.kindMenuTree
    },
    goodsOfMenuSimple(state){
        return state.goodsOfMenuSimple
    },
    goodsOfMenuSimpleTotal(state){
        return state.goodsOfMenuSimpleTotal
    },
    allSimpleItem(state) {
        return state.allSimpleItem
    },
    unSubmitGoods(state) {
        return state.unSubmitGoods
    },
    resultBackup(state) {
        return state.resultBackup
    },
    publishType(state) {
        return state.publishType
    },
    publishTimeType(state) {
        return state.publishTimeType
    },
    publishMenus(state) {
        return state.publishMenus
    },
    noSearchItems(state) {
        return state.noSearchItems
    }
}

export default getters
