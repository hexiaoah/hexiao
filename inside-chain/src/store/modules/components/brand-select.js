import Requester from '@/base/requester'
import catchError from '@/base/catchError'
import API from '@/config/api'

const brandSelect = {
    namespaced: true,
    state: {
        brandList: [],
        brandList_old: [],
        selected: "",
        selectedName: "",
        showDefBtn: false
    },
    mutations: {
        _setSelected(state, id) {
            state.selected = id || "";
        },
        _setSelectedName(state, name) {
            state.selectedName = name;
        },
        _setBrandList(state, list) {
            state.brandList = list
            state.brandList_old = list
        },
        _setDefBtn(state, show) {
            state.showDefBtn = show
        }
    },
    actions: {
        // 改变选中的标签value
        setSelected(context, id) {
            context.commit("_setSelected", id);
            context.dispatch('setSelectedName')
        },
        // 替换选中品牌名称
        setSelectedName(context){
            let tmp = context.state.brandList.concat();
            let tmp_selected = context.state.selected;
            let brandName = ''

            if (tmp.length > 0 && tmp_selected) {
                tmp.map(v => {
                    if(v.entityId == tmp_selected)
                        brandName = v.name
                })
            }

            console.log('brandName',brandName, tmp_selected)

            context.commit("_setSelectedName", brandName);
        },

        //    获取品牌列表
        getBrandList(context, params) {
            Requester.get(API.GET_ALL_PLATE).then(data => {
                let true_data = [];
                let defChange = false
                if (data.data && data.data.length > 0) {
                    data.data.map(v => {
                        true_data.push({
                            name: v.name,
                            entityId: v.entityId,
                            canManage: v.canManage,
                            defaultPlate: v.defaultPlate

                        })
                        // 如果有默认的品牌 todo
                        if(v.defaultPlate){
                            defChange = true
                        }
                    })

                }

                // 没有默认品牌 且 品牌数量大于一个，显示"设置默认品牌"的按钮
                if(!defChange && true_data.length > 1){
                    context.commit('_setDefBtn', true);
                }
                context.commit('_setBrandList', true_data);


            }).catch(e => {
                catchError(e);
            });
            // let mock_data = [
            //     {
            //         value: '1',
            //         label: '外婆家'
            //     }, {
            //         value: '2',
            //         label: '雁西湖'
            //     }, {
            //         value: '3',
            //         label: '第二乐章'
            //     },
            // ]
            // context.commit('_setSelected', mock_data[0].value);
            // context.commit('_setBrandList', mock_data);

        }
    },
    getters: {
        data(state) {
            return state;
        },
        brandList(state) {
            return state.brandList
        },
        selected(state) {
            return state.selected
        },
        selectedName(state) {
            return state.selectedName
        },
        showDefBtn(state) {
            return state.showDefBtn
        }
    }
};
export default brandSelect;
