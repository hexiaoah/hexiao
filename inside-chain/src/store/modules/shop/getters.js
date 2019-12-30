const getters = {
    // 数据
    data(state) {
        return state;
    },
    shop_filter(state) {
        return state.shop_filter
    },
    shops(state) {
        return state.shops
    },
    brands(state) {
        return state.brands
    },
    shop_info(state) {
        return state.shop_info
    },
    brand_info(state) {
        return state.brand_info
    },
    view_date(state) {
        return state.view_date
    },
    shop_view(state) {
        return state.shop_view
    },
    categoryList(state){
        return state.category
    },
    isCatch(state){
        return state.catchFilter.status
    }
}

export default getters
