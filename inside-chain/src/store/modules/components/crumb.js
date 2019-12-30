import emuCrumb from "@/const/emu-crumb.js";
import router from "@/router";
import QueryParams from "@2dfire/utils/router"

const crumb = {
    namespaced: true,
    state: {
        name: "",
        path: "",
        secondPath: "",
        noQuery: false
    },
    mutations: {
        _setCrumb(state, crumb) {
            state.name = crumb.name;
            state.path = crumb.path;
            state.secondName = crumb.secondName;
            state.noQuery = crumb.noQuery;
        }
    },
    actions: {
        // 设置面包屑
        setCrumb(context) {
            let curr_route = router.currentRoute;
            let hash = curr_route
                .path
                .split("\/")[1];
            let new_crumb = {
                name: emuCrumb[hash].name,
                path: emuCrumb[hash].path,
                secondName: emuCrumb[hash].secondName,
                noQuery: emuCrumb[hash].noQuery,
            }
            let crumbName = curr_route.query["crumbName"] || "";
            if (crumbName) {
                new_crumb.secondName = crumbName
            }
            context.commit("_setCrumb", new_crumb);

        },
        // 面包屑点击跳转
        jump(context) {
            let query = QueryParams.route.query || {};
            if (!context.state.noQuery) {
                // 带参数跳转
                router.push(
                    {
                        path: context.state.path,
                        query: query
                    }
                );
            }else {
                router.push(
                    {
                        path: context.state.path
                    }
                );
            }
        }
    },
    getters: {
        data(state) {
            return state;
        }
    }
};
export default crumb;
