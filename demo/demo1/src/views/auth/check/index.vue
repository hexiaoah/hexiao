<script>
    /**
     -- zeqi@2dfire

     商户授权模块

     todo 组件返回出rightslist  在本页面处理数据
     */
    import API from "@/config/api";
    import Cookie from "@2dfire/utils/cookie";
    import CatchError from "@/base/catchError";
    import Route from "@2dfire/utils/router"
    import Requester from "@/base/requester";

    let pageData = {}

    export default {
        data() {
            return {
//        组件用数据
//        商家信息
                shopInfo: {
                    entName: '',
                    appName: '',
                    email: '',
                    phone: '',
                    name: '',
                    newReturnURL :'',
                },
//        需要授权的权限列表
                rightList: [],
                params: {
                    appId: '',
                    returnURL:''
                }
            }
        },
        components: {
            PcIndex: require("../pc/index.vue"),
            MobileIndex: require("../mobile/index.vue")
        },
        methods: {
            authRights(data) {
                let self = this;
                let params =  {
                    appId: self.params.appId,
                    bindRightsId: data
                }
                Requester.post(API.SHOP_AUTH_APP, params, { emulateJSON: true }).then((data) => {
                    self.getShopDetail();
                    if(self.shopInfo.newReturnURL){
                         self.$Message.success({
                           content: '授权成功',
                           duration:1.5,
                           onClose:function(){
                               window.location.href=self.shopInfo.newReturnURL
                           }
                         });

                    }else{
                        self.$Message.success('授权成功');
                    }
                }).catch((e) => {
//                    跳转回授权登录页面 需要appId
                    e.appId = self.params.appId;
                    CatchError(e)
                });
            },
            getShopDetail() {
                let self = this;
                Requester.get(API.SHOP_AUTH_DETAIL, {params: this.params}).then((data) => {
                    self.shopInfo.entName = data.developerInfo.companyName;
                    self.shopInfo.appName = data.appName;
                    self.shopInfo.email = data.developerInfo.email;
                    self.shopInfo.phone = data.developerInfo.mobile;
                    self.shopInfo.name = data.developerInfo.name;
                    self.shopInfo.newReturnURL = data.newReturnURL;//新增
                    self.rightList = data.rightsList;

                }).catch((e) => {
//                    跳转回授权登录页面 需要appId
                    e.appId = self.params.appId;
                    CatchError(e)
                });
//                let info = {
//                    entName: '二维火',
//                    appName: '火通卡',
//                    email: '2d@fire.com',
//                    phone: '88009999'
//                };
//                let right_data = [
//                    {
//                        id: '1',
//                        name: '获取您的会员信息111'
//                    },
//                    {
//                        id: '2',
//                        name: '获取您的会员信息222'
//                    },
//                    {
//                        id: '3',
//                        name: '获取您的会员信息3333'
//                    },
//                    {
//                        id: '4',
//                        name: '获取您的会员信息444'
//                    },
//                    {
//                        id: '5',
//                        name: '获取您的会员信息555'
//                    },
//                    {
//                        id: '6',
//                        name: '获取您的会员信息666'
//                    },
//                    {
//                        id: '7',
//                        name: '获取您的会员信息777'
//                    },
//                    {
//                        id: '8',
//                        name: '获取您的会员信息888'
//                    },
//                    {
//                        id: '9',
//                        name: '获取您的会员信息999'
//                    },
//                ];
//                this.shopInfo = info;
//                this.rightList = right_data
            },
            init() {
                this.params.appId = Route.route.query["appId"];
                this.params.returnURL = Route.route.query["returnURL"];
            }
        },
        created() {
            this.init();
            this.getShopDetail()
        }
    }
</script>

<template>
    <div>
        <div class="pc">
            <PcIndex :info="shopInfo" :rightList="rightList" @rights="authRights"></PcIndex>
        </div>
        <div class="mobile">
            <MobileIndex :info="shopInfo" :rightList="rightList" @rights="authRights"></MobileIndex>
        </div>
    </div>
</template>

<style lang="" scoped>

</style>

