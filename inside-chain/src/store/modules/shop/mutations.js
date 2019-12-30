export default {
    _getBrands(state, brands) {
        state.brands = brands
    },
    _getShops(state, shops) {
        console.log(shops)
        state.shops = shops
    },
    _getShopInfo(state, shop_info) {
        state.shop_info = shop_info
    },
    _getShopView(state, shop_view) {
        state.shop_view = shop_view
    },
    _getBrandInfo(state, brand_info) {
        state.brand_info = brand_info
    },

    _selectBrand(state, brands) {
        state.shop_filter.brands = brands
    },
    _setBrand(state, selected_brand) {
        state.shop_filter.selected_brand = selected_brand
    },
    _selectJoinModes(state, joinModes) {
        state.shop_filter.joinModes = joinModes
    },
    _setJoinType(state, selected_join) {
        state.shop_filter.selected_join = selected_join
    },
    _selectOrgan(state, organs) {
        state.shop_filter.organs_show = organs
    },
    _selectArea(state, areas) {
        state.shop_filter.areas = areas
    },
    _setOrgan(state, organ) {
        state.shop_filter.selected_organ = organ
    },
    _setOrganChecked(state, organs_checked) {
        state.shop_filter.organs_checked = organs_checked
    },
    _setAreasChecked(state, areas_checked) {
        state.shop_filter.areas_checked = areas_checked
    },

    _setViewDate(state, viewDate) {
        state.view_date = viewDate
    },
    _setDateStart(state, start) {
        state.view_date.start = start

    },
    _setDateEnd(state, end) {
        state.view_date.end = end
    },
    _setAreas(state, areas) {
        state.shop_filter.areas = areas
    },
    _setAllArea(state) {
        state.shop_filter.selected_provinceId = '';
        state.shop_filter.selected_cityId = '';
        state.shop_filter.selected_townId = '';
    },
    _setProvinceId(state, id) {
        state.shop_filter.selected_provinceId = id;
        state.shop_filter.selected_cityId = '';
        state.shop_filter.selected_townId = '';
    },
    _setCityId(state, id) {
        state.shop_filter.selected_cityId = id;
        state.shop_filter.selected_townId = '';
    },
    _setTownId(state, id) {
        state.shop_filter.selected_townId = id
    },
    _setKeyword(state, word) {
        state.shop_filter.keyWord = word;
    },
    _setcode(state, code) {
        state.shop_filter.code = code;
    },
    _clearFilter(state) {
        state.shop_filter.selected_brand = '';
        state.shop_filter.selected_organ = '';
        state.shop_filter.selected_provinceId = '';
        state.shop_filter.selected_cityId = '';
        state.shop_filter.selected_townId = '';
        state.shop_filter.groupIds = [];
        state.shop_filter.select_supplyGroupMap = [];
        state.shop_filter.categoryIds = [];
        state.shop_filter.shopStatus = '';
        state.shop_filter.selected_join = '-1';
        state.shop_filter.keyWord = '';
        state.shop_filter.code = '';
    },
    _setHideOrgan(state) {
        state.shop_filter.showFilterOrgan = false;

    },
    _category(state,data){
        state.category = [].concat(data)
    },
    _categoryIds(state,data){
        state.shop_filter.categoryIds = [].concat(data)
    },
    _groupIds(state,data){
        state.shop_filter.groupIds = [].concat(data)
    },
    _getBrandEntitiesList(state,data){
        state.shop_filter.supplyGroupMap = [].concat(data)
    },
    _setSelectSupplyGroup(state,data){
        state.shop_filter.select_supplyGroupMap = [].concat(data)
    },
    _setPageSize(state,data){
        state.params = Object.assign({},data)
    },
    _selectShopStatus(state,data){
        state.shop_filter.shopStatusList = [].concat(data)
    },
    _setShopStatus(state,data){
        state.shop_filter.shopStatus = data
    },
    _setCloseShop(state,data){
        state.shop_filter.closeShop = data
    },
    _setShopFilter(state,data){
        state.shop_filter = Object.assign({},data)
    },
    _saveFilters(state,data){
        state.catchFilter = Object.assign({},data)
    },
}
