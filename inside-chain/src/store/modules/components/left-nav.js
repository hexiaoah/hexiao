// import Res from "@/base/requester"; import API from '@/config/api';
import emuNav from "@/const/emu-nav.js";
import router from "@/router";
import Session from "@2dfire/utils/sessionStorage";
import Cookie from '@2dfire/utils/cookie'
import Requester from '@/base/requester';
import catchError from '@/base/catchError';
import API from '@/config/api';
import Obj from '@2dfire/utils/object';
import iView from "iview";
import shopNavList from "@/const/emu-shopNav"
let Message = iView.Message;

const leftNav = {
    namespaced: true,
    state: {
        shopNav: false,
        shop: {
            name: '',
            logo: ''
        },
        select: "",
        list: [
            {
                name: "", //导航展示名
                id: 1,
                select: false, //是否被选中
                list: [], // 二级菜单
                show: false, //显示二级菜单
            }
        ],
        shopNavList: []
    },
    mutations: {
        _updateNav(state, list) {
            state.list = list;
        },
        _updateShopNav(state, list) {
            state.shopNavList = list;
        },
        _setShop(state, shop) {
            state.shop.name = shop.name;
            state.shop.logo = shop.logo;
        },
        _setSelect(state, id) {
            state.select = id;
        },
        _showShopNav(state, show) {
            state.shopNav = show;
        }
    },
    actions: {
        showShopNav(context, show) {
            context.commit('_showShopNav',show)
            let selected_nav = 'shopNav_' + show;
            let tmp_list = shopNavList;
            tmp_list.map(t_item =>{
                if(t_item.id === selected_nav){
                    t_item.active = true
                }else{
                    t_item.active = false

                }
            })
            context.commit('_updateShopNav',shopNavList)
        },
        // 一级导航跳转
        firstNavClick(context, item) {
            if (item.list) {
                item.show = !item.show;
            }
            let newlist = context
                .state
                .list
                .concat();
            newlist.map(v => {
                if (v.id == item.id) {
                    v.select = true;
                } else {
                    v.select = false;
                    v.show = false;
                }
            })
            context.commit("_updateNav", newlist);
            if (item.url != "") {
                newlist.map(v => {
                    if (v.id != item.id) {
                        if (v.list) {
                            v
                                .list
                                .map(v1 => {
                                    v1.select = false;
                                })
                        }
                    }
                })
                context.commit("_updateNav", newlist);
                router.push({path: item.url});
            }
        },
        // 二级导航点击
        secondNavClick(context, item) {
            if (item.url != "") {
                router.push({path: item.url});
            } else {
                Message.info('正在开发中，敬请期待。如有需要，请在二维火掌柜APP进行操作');
            }
        },
        // 店铺内左导航跳转
        shopNavClick(context, item) {
            let tmp_list = context.state.list.concat();
            tmp_list.map(t_item =>{
                if(t_item.id === item.id){
                    t_item.active = true
                }else{
                    t_item.active = false

                }
            })
            context.commit('_updateNav', tmp_list)
            if (item.url != "") {
                router.push(
                    {
                        path: item.url,
                        query: item.query
                    }
                    );
            } else {
                Message.info('正在开发中，敬请期待。如有需要，请在二维火掌柜APP进行操作');
            }

        },
        // 导航列表
        getNavFromApi() {
            let params = {
                // menuVersion: 10
                menuVersion: 12
            }
            Requester
                .get(API.GET_LEFT_NAV, {params: params})
                .then(data => {
                    // 数据处理 ... 提交mutation
                    console.log(data.data)
                    this.dispatch("leftNav/formateNav", data.data);
                    // context.commit('_getShopsList', data);
                })
                .catch(e => {
                    catchError(e);
                });
        },
        // 格式化导航栏
        formateNav(context, data) {
            let list = [];
            if (Obj.isEmpty(data)) {
                // sessionStorage.removeItem("leftNav");
                context.commit("_updateNav", list);
            } else {
                data.map(v => {
                    let o = {}
                    o.name = v.menuName || "";
                    o.id = v.menuId || "";
                    o.select = false;
                    o.list = [];
                    o.show = false;
                    o.url = emuNav[v.menuId]
                        ? emuNav[v.menuId].url
                        : "";
                    o.icon = emuNav[v.menuId]
                        ? emuNav[v.menuId].icon
                        : "";
                    if (!Obj.isEmpty(v.children)) {
                        v
                            .children
                            .map(v0 => {
                                let o1 = {}
                                o1.name = v0.menuName || "";
                                o1.id = v0.menuId || "";
                                o1.select = false;
                                o1.show = false;
                                o1.url = emuNav[v0.menuId]
                                    ? emuNav[v0.menuId].url
                                    : "";
                                o
                                    .list
                                    .push(o1);
                            });
                    }
                    list.push(o);
                });
                // sessionStorage.setItem("leftNav", JSON.stringify(list));
                context.commit("_updateNav", list);
                this.dispatch("leftNav/setNavSelect");
            }
        },
        // 设置导航入口
        setNav(context, id) {
            context.commit("_setSelect", id);
            // 显示连锁左侧栏
            context.commit("_showShopNav", false);
            // let nav = Session.getItem("leftNav");

            //阻止请求 for test
            // return
            // if (nav) {
            //     let list = JSON.parse(nav);
            //     context.commit("_updateNav", list);
            //     this.dispatch("leftNav/setNavSelect", id);
            // } else {
            // store中存在侧边栏的数据时，直接选中某个项，而不是从接口获取，减少接口请求
            let nav = context.state.list.concat();
            if(nav && nav.length > 1){
                this.dispatch("leftNav/setNavSelect", id);
            }else{
                this.dispatch("leftNav/getNavFromApi");
            }
            // }
        },
        // 设置导航选中
        setNavSelect(context) {
            let id = context.state.select;
            let nid = "";
            for (let i in emuNav) {
                if (emuNav[i].id == id) {
                    nid = i;
                }
            }
            let newlist = context
                .state
                .list
                .concat();
            newlist.map(v => {
                if (v.id == nid) {
                    v.select = true;
                    v.show = true;
                } else {
                    v.select = false;
                    v.show = false;
                }
                if (v.list) {
                    v
                        .list
                        .map(v1 => {
                            if (v1.id == nid) {
                                v1.select = true;
                                v.select = true;
                                v.show = true;
                            } else {
                                v1.select = false;
                            }
                        })
                }
            });
            context.commit("_updateNav", newlist);
        },
        // 获取cookie中的店铺信息
        setShop(context) {
            let shop = {
                name: '',
                logo: ''
            }

            let shopInfo = '';
            if(Cookie.getItem('entrance') != undefined){
                shopInfo = JSON.parse(decodeURIComponent(Cookie.getItem('entrance'))).shopInfo
            }
            if (shopInfo) {
                shop.name = shopInfo.entityName;
                shop.logo = shopInfo.logo;
            }
            context.commit('_setShop', shop);
        },
    },
    getters: {
        data(state) {
            return state;
        },
        shopNav(state) {
            return state.shopNav
        },
        shopNavList(state) {
            return state.shopNavList
        }
    }
}

export default leftNav;
