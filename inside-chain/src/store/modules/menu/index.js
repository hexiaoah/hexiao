import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

export default {
    namespaced: true,
    getters,
    state,
    actions,
    mutations
}
