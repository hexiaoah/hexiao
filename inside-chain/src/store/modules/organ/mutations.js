export default {
    _setOrganHead(state, name) {
        state.organ.name = name;
    },
    _getOrganMap(state, organ) {
        state.organ = organ
    },
    _searchOrgan(state, organs) {
        state.organ.organs = organs
    },
    _getOrganInfo(state, organ_info) {
        state.organ_info = organ_info
    },

    _expandOrgan(state, organs) {
        state.tmp_organs = organs
    },
    _setOrganFlow(state, flow) {
        state.organ_flow = flow
    },
    _setOrganTmpFlow(state, flow) {
        state.tmp_flow = flow
    },
    _clearTmpFlow(state) {
        state.tmp_flow = []
    },

    _selectOrgan(state, organs) {
        state.shop_filter.organs_show = organs
    },
    _setOrgan(state, organ) {
        state.shop_filter.selected_organ = organ
    },
    _setOrganChecked(state, organs_checked) {
        console.log('organs_checked', organs_checked)
        state.shop_filter.organs_checked = organs_checked
    },
    _clearOrgan(state) {
        state.organ.organs = []
    }
}
