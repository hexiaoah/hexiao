export default{
    // 获取品牌列表
    _getAllMenus(state, params){
        state.allMenuList = params
    },
    _getReuseMenus(state, params){
        state.reuseMenuList = params
    },
    _setMenuInfo(state, menuInfo) {
        state.menuInfo = menuInfo
    },
    _getGoodsByMenuId(state, res) {
        state.goodsOfMenu = res.goods || []
        state.goodsOfMenuTotal = res.total
    },
    _getGoodsByMenuIdSimple(state, res) {
        state.goodsOfMenuSimple = res.goods || []
        state.goodsOfMenuSimpleTotal = res.total
    },
    _getGoodsKindsByMenuId(state, list) {
        state.goodsKinds = list
    },
    _getGoodsKindsByMenuIdSingle(state, list) {
        state.goodsKindsSingle = list
    },
    _setMenuInfo(state, menuInfo) {
        state.menuInfo = menuInfo
    },
    _setGoodsOfMenu(state, goods) {
        state.goodsOfMenu = goods
    },
    _setGoodsByMenuIdSimple(state, goods) {
        state.goodsOfMenuSimple = goods
    },
    _getGoodsPrice(state, res) {
        state.goodsPrice = res
    },
    _priceBackup(state, res) {
        state.priceBackup = res
    },
    // 商品导入 mutations
    // 获取所有商品/套餐
    _listAllSimpleItem(state, res) {
        state.allSimpleItem = res
    },
    _kindMenuTree(state, res){
        state.typeList = res
    },
    // 设置结果区列表
    _setUnSubmitList(state, list) {
        state.unSubmitGoods = list
    },
    // 设置结果区备份
    _setResultBackup(state, list) {
        state.resultBackup = list
    },
    // 存储筛选数据
    _setFilterParams(state, res) {
        state.filterParams = res
    },
    // 获取下发类型
    _getPublishType(state, res) {
        state.publishType = res
    },
    // 获取下发时间类型
    _getPublishTimeType(state, res) {
        state.publishTimeType = res
    },
    _getAllPublishMenus(state, res) {
        state.publishMenus = res
    },
    _setNoSearchItems(state, res) {
        state.noSearchItems = res
    },
}
