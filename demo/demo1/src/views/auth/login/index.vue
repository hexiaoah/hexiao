<script>
    /**
     -- zeqi@2dfire

     */
    import API from "@/config/api";
    import MD5 from "md5";
    import CatchError from "@/base/catchError";
    import Route from "@2dfire/utils/router"
    import Requester from "@/base/requester";
    import Cookie from "@2dfire/utils/cookie";
    export default {
        data() {
            return {
                rightList: [],
                shopInfo: {},
                devName: '',
                params: {
                    appId: ''
                },
                checkDataList:[],
                pwd:'',
                s_tk: Route.route.query["s_tk"] || ""
            }
        },
        components: {
            PcLogin: require("../pc/login.vue"),
            MobileLogin: require("../mobile/login.vue")
        },
        watch: {
            ''() {
                this.fetchData();
            }
        },
        methods: {
            fetchData() {

            },
            login(data) {
                let self = this;
                let loginInfo = data;
                if (this.verify(loginInfo)) {
                    let params = {
                        entityType: loginInfo.kind,
                        entityCode: loginInfo.number,
                        username: loginInfo.username,
                        password: MD5(loginInfo.password.toUpperCase())
                    };
                    Requester.get(API.SHOP_AUTH_LOGIN,{ params: params })
                        .then(data => {
                                self.$Message.success("登陆成功");
                                self.$router.push({
                                    path: "/check",
                                    query: {
                                        appId: self.params.appId,
                                        returnURL: Route.route.query["returnURL"]
                                    }
                                })
                        })
                        .catch(e => {
                             CatchError(e);
                        });
                }
            },
            getToken() {
                let ticket = sessionStorage.getItem("s_tk");
                let token = sessionStorage.getItem("token");
                const wx_st = this.urlArgs(location.search).wxSt;
                // 添加 token 分支
                if (wx_st !== undefined) {
                    const session_wxSt = sessionStorage.getItem("wx_st");
                    if (wx_st === session_wxSt && token) {
                        this.checkToken(token);
                    } else {
                        this.getTokenBySt(wx_st, dtoken => {
                            sessionStorage.setItem("wx_st", wx_st);
                            sessionStorage.setItem("token", dtoken);
                            Cookie.setItem("dtoken", dtoken);
                            this.checkToken(dtoken);
                        });
                    }
                } 
                else {
                    if ((ticket === this.s_tk || !this.s_tk) && token) {
                        this.checkToken(token);
                    } else {
                        this.getTokenBySt(this.s_tk, dtoken => {
                            sessionStorage.setItem("s_tk", this.s_tk);
                            sessionStorage.setItem("token", dtoken);
                            Cookie.setItem("dtoken", dtoken);
                            this.checkToken(dtoken);
                        });
                    }
                }
            },
            getTokenBySt(st, cb) {
                const self = this
                const xhr = new XMLHttpRequest()
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        const status = xhr.status;
                        if (status >= 200 && status < 300) {
                            var resp = JSON.parse(xhr.response)
                            if(resp.code == 1){
                                let dtoken = resp.data.data.dfireToken;
                                cb(dtoken);
                            }else{
                                // if(resp.errorCode !== '20005'){
                                //     self.$Message.warning(resp.message);
                                // }
                                console.log(resp.message)
                            }
                        }
                    }
                }
                xhr.open("GET", API.GET_TOKEN + `&serviceTicket=${st}&appKey=200004`, true);
                xhr.setRequestHeader('env','bdfdef663cfd4eb89861a11c10ed17fe');
                xhr.send(null);
            },
            urlArgs(search){
                let args = {};
                const pairs = search.length?search.substring(1).split("&"):[]
                pairs.map(i=>{
                    let pos = i.indexOf("=")
                    if(pos == -1){
                        let name = pairs[i].substring(0, pos)
                        let value = decodeURIComponent(pairs[i].substring(pos + 1))
                        args[name] = value
                    }
                })
                return args;
            },
            checkToken(dtoken=''){
                const self = this
                const xhr = new XMLHttpRequest()
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        const status = xhr.status;
                        if (status >= 200 && status < 300) {
                            var resp = JSON.parse(xhr.response)
                            if(resp.success){
                                self.$router.replace({
                                    path: "/check",
                                    query: {
                                        appId: self.params.appId,
                                        returnURL: Route.route.query["returnURL"]
                                    }
                                })
                            }else{
                                resp.message && self.$Message.warning(resp.message);
                            }
                        }
                    }
                }
                xhr.open("GET", API.CHECK_AUTH_LOGIN , true);
                xhr.setRequestHeader('dfiretoken',dtoken);
                xhr.send(null);

            },
            phoneLogin(data){
                let self = this;
                if (this.phoneverify(data)) {
                    self.pwd=data.pwd
                    let params = {
                        mobile:data.mobile,
                        pwd:MD5(data.pwd),
                        countryCode:data.countryCode
                    };
                    Requester.post(API.SHOP_AUTH_PHONE_LOGIN,params,{emulateJSON:true})
                        .then(res => {
                            console.log('data',res)
                            localStorage.setItem("mobile",data.mobile);
                            localStorage.setItem("pwd",data.pwd);
                            let d=JSON.parse(res)
                            localStorage.setItem('token',d.token)
                            if(d.code==1){
                                if(d.data.data.length>=1){
                                    localStorage.setItem("checkDataList",JSON.stringify(d.data.data));
                                }else{
                                    localStorage.setItem("checkDataList",[]);
                                }
                                this.$router.replace({
                                    path: "/checkList",
                                    query: {
                                        appId: Route.route.query["appId"],
                                        returnURL: Route.route.query["returnURL"]
                                    }
                                })
                            }
                        })
                        .catch(e => {
                            CatchError(e);
                        });
                }
            },
            verify(loginInfo) {
                let nullReg = /\s*\S+/; //匹配输入全为空格
                if (loginInfo.number == "") {
                    this.$Message.warning("商家编号不能为空");
                    return false;
                } else if (!nullReg.test(loginInfo.number)) {
                    this.$Message.warning("商家编号不能为空");
                    return false;
                }
                if (loginInfo.username == "") {
                    this.$Message.warning("管理员账号不能为空");
                    return false;
                } else if (!nullReg.test(loginInfo.username)) {
                    this.$Message.warning("管理员账号不能为空");
                    return false;
                }
                if (loginInfo.password == "") {
                    this.$Message.warning("密码不能为空");
                    return false;
                } else if (!nullReg.test(loginInfo.password)) {
                    this.$Message.warning("密码不能为空");
                    return false;
                }
                return true;
            },

            scanLogin(data){
                let self=this
                let params={
                    token:data.data.token,
                    operatorType:2
                }
                Requester.post(API.SHOP_SHOP_INFO_LIST,params,{emulateJSON:true})
                    .then(res => {
                        localStorage.setItem("token",data.data.token);
                        console.log('token',data.data.token)
                        let d=JSON.parse(res)
                        if(d.code==1){
                            localStorage.setItem("checkDataList",JSON.stringify(d.data.data));
                            this.$router.push({
                                path: "/checkList",
                                query: {
                                    appId: Route.route.query["appId"],
                                    returnURL: Route.route.query["returnURL"]
                                }
                            })
                        }
                    })
                    .catch(e => {
                        CatchError(e);
                    });
            },
            phoneverify(data){
                let nullReg = /\s*\S+/; //匹配输入全为空格
                if (data.mobile == "") {
                    this.$Message.warning("手机号不能为空");
                    return false;
                } else if (!nullReg.test(data.mobile)) {
                    this.$Message.warning("手机号不能为空");
                    return false;
                }
                if (data.pwd == "") {
                    this.$Message.warning("密码不能为空");
                    return false;
                } else if (!nullReg.test(data.pwd)) {
                    this.$Message.warning("密码不能为空");
                    return false;
                }
                return true;
            },
//            获取开发者想要授权的权限列表
            getRightList() {
                let self = this;
                let param = {
                    appId : self.params.appId
                }

                Requester.get(API.GET_SHOP_APP_RIGHTS, {params: param}).then((data) => {
                    self.rightList = data.rightsList;
                    self.devName = data.devName;
                    localStorage.setItem('rightList',JSON.stringify(self.rightList))
                    localStorage.setItem('devName',data.devName)
                }).catch((e) => {
                    CatchError(e)
                });
                let right_data = [
                    {
                        id: '1',
                        name: '获取您的会员信息111'
                    },
                    {
                        id: '2',
                        name: '获取您的会员信息222'
                    },
                    {
                        id: '3',
                        name: '获取您的会员信息3333'
                    },
                    {
                        id: '4',
                        name: '获取您的会员信息444'
                    },
                    {
                        id: '5',
                        name: '获取您的会员信息555'
                    },
                    {
                        id: '6',
                        name: '获取您的会员信息666'
                    },
                    {
                        id: '7',
                        name: '获取您的会员信息777'
                    },
                    {
                        id: '8',
                        name: '获取您的会员信息888'
                    },
                    {
                        id: '9',
                        name: '获取您的会员信息999'
                    },
                ]
            },
//            从 url 获取appId
            init() {
                this.params.appId = Route.route.query["appId"];
                this.getToken()
            }
        },
        created() {
            this.init();
            this.getRightList()
        },
    }
</script>

<template>
<div>
    <div class="pc">
        <PcLogin :rightList="rightList"  :devName="devName" @emit-login="login" @emit-phone-login="phoneLogin" @emit-scan-login="scanLogin"></PcLogin>
    </div>

    <div class="mobile">
        <MobileLogin @emit-login="login"></MobileLogin>
    </div>
</div>
</template>

<style lang="scss" scoped>

</style>

