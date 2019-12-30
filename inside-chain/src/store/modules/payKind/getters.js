const getters = {
    payKindList: (state) => {
        return state.payKindList
    },
    selectPayKind: (state) => {
        return state.selectPayKind
    },
    selectPayKindSingle: (state) => {
        return state.selectPayKindSingle
    },
    payKindInfo: (state) => {
        return state.payKindInfo
    },
    allPayKindList: (state) => {
        return state.allPayKindList
    },
    payKindListSingle: (state) => {
        return state.payKindListSingle
    },
    payKindInfoSingle: (state) => {
        return state.payKindInfoSingle
    },
    allPayKindListSingle: (state) => {
        return state.allPayKindListSingle
    },
    isAlipay: (state) => {
        return state.isAlipay
    }
}

export default getters
