const getters = {
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
    organ(state) {
        return state.organ
    },
    organ_info(state) {
        return state.organ_info
    },
    organ_flow(state) {
        return state.organ_flow
    },
    organ_organs(state) {
        return state.organ.organs
    }
}

export default getters
