import emuTabs from "@/const/emu-distTabs.js";
import router from "@/router";
import iView from "iview";
let Message = iView.Message;

const tabs = {
    namespaced: true,
    state: {
        list: []
    },
    mutations: {
        _setTab(state, list) {
            state.list = list;
        }
    },
    actions: {
        // 设置tabs & 选中当前路由tab
        setTab(context) {
            let initList = emuTabs;
            let currPath = '/' + window.location.hash.split("\/")[1].split("?")[0];
            for(let i = 0;i < initList.length; i++) {
                if(currPath == initList[i].path){
                    initList[i].active = true;
                }else{
                    initList[i].active = false;
                }
            }
            context.commit("_setTab", initList);

        },
        // tabs点击跳转
        jump(context, params) {
            let item = params.item;
            let query = params.query;
            if(!item.active){
                if (item.path != "") {
                    router.push({
                        path: item.path,
                        query: query
                    });
                }
                else{
                    Message.info(
                        '正在开发中，敬请期待。如有需要，请在二维火掌柜APP进行操作'
                    )
                }
            }
        }
    },
    getters: {
        list(state) {
            return state.list;
        }
    }
};
export default tabs;
