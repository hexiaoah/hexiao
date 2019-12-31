<template>
    <div>
        <Crumb></Crumb>
        <div class="wrap">
            <p class="auth-title">{{appInfo.appName}}</p>
            <p class="auth-desc">{{pageLabel.tip}}</p>
            <div class="auth-box">
                <div class="auth-row">
                    <span class="label">{{pageLabel.url}}:</span><a class="auth-url" target="_blank" :href="appInfo.url">{{appInfo.url}}</a>
                </div>
                <div>
                    <span class="label">{{pageLabel.qrCode}}:</span><img class="auth-url" :src="appInfo.QRCode" alt="">
                </div>
            </div>
            <div class="app-table-box">
                <table class="app-table">
                    <thead>
                    <th>{{tableHead.shopNo}}</th>
                    <th>{{tableHead.shopId}}</th>
                    <th>{{tableHead.shopName}}</th>
                    <th>{{tableHead.brandId}}</th>
                    <th>{{tableHead.brandName}}</th>
                    <th>{{tableHead.contact}}</th>
                    <th>{{tableHead.phone}}</th>
                    <th>{{tableHead.action}}</th>
                    </thead>
                    <tbody>
                    <tr v-for="item in shopList">
                        <!--店铺编码：code-->
                        <!--店铺Id：entityId-->
                        <!--店铺名称；name-->
                        <!--品牌Id：brandCode-->
                        <!--品牌名：brandName-->
                        <!--联系人：linkman-->
                        <!--联系电话：phone1-->
                        <td>{{item.code}}</td>
                        <td>{{item.entityId}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.brandCode}}</td>
                        <td>{{item.brandName}}</td>
                        <td>{{item.linkman}}</td>
                        <td>{{item.phone1}}</td>
                        <td>
                            <!-- 查看店铺详情 -->
                            <a class="table-btn" @click="showDetail(item.entityId)">{{tableActions.detail}}</a>
                            <!-- 删除店铺 -->
                            <a class="table-btn" @click="deleteShop(item.entityId)">{{tableActions.delete}}</a>
                            <!-- 绑定 -->
                            <a class="table-btn" @click="bind(item.entityId)">{{tableActions.bind}}</a>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="page-bar">
                    <Page :current="params.pageIndex" :total="pageCtrl.totalNum" :page-size="params.pageSize"
                          @on-change="change"></Page>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import _i from "@/i18n/index";
    import Requester from "@/base/requester";
    import CatchError from "@/base/catchError";
    import API from "@/config/api";
    import QR from "qr-image";
    import Route from "@2dfire/utils/router";

    let pageData = {

        appInfo: {
            appName: '',
            url: ''
        },

        params: {
            appId: '',
            pageIndex: 1,
            pageSize: 10
        },

        pageCtrl: {
            totalNum: 0
        },

        shopList: [],

        pageLabel: {
            tip: _i('SERVER.APPS.AUTH.TIP'),
            url: _i('SERVER.APPS.AUTH.URL'),
            qrCode: _i('SERVER.APPS.AUTH.QRCODE'),
        },
        tableHead: {
            shopNo: _i('SERVER.APPS.AUTH.TABLE.SHOPNO'),
            shopId: _i('SERVER.APPS.AUTH.TABLE.SHOPID'),
            shopName: _i('SERVER.APPS.AUTH.TABLE.SHOPNAME'),
            brandId: _i('SERVER.APPS.AUTH.TABLE.BRANDID'),
            brandName: _i('SERVER.APPS.AUTH.TABLE.BRANDNAME'),
            contact: _i('SERVER.APPS.AUTH.TABLE.CONTACT'),
            phone: _i('SERVER.APPS.AUTH.TABLE.PHONE'),
            action: _i('SERVER.APPS.AUTH.TABLE.ACTION'),
        },
        tableActions: {
            detail: _i('SERVER.APPS.AUTH.TABLE.BTN.DETAIL'),
            delete: _i('SERVER.APPS.AUTH.TABLE.BTN.DELETE'),
            bind: _i('SERVER.APPS.AUTH.TABLE.BTN.BIND'),
        }
    };

    export default {
        data() {
            return pageData;
        },
        components: {
            Crumb: require("@/components/crumb.vue"),
        },
        methods: {
//             获取授权长短链接/应用名称
            getAuthUrl() {
                Requester.get(API.GET_AUTH_INFO, {params: this.params}).then((data) => {
                    this.appInfo.appName = data.appName;
                    this.appInfo.url = data.longUrl;
                    this.generateCode(data.shortUrl);

                }).catch((e) => {
                    CatchError(e)
                });
//                this.appInfo.appName = '二维火小二';
            },
//            获取已授权的店铺
            getAuthShops() {
                let self = this;
//                GET_APP_SHOPS 应用下授权商家列表
                Requester.get(API.GET_APP_SHOPS, {params: this.params}).then((data) => {
                    self.shopList = data.voList;
                    self.pageCtrl.totalNum = data.totalNum;
                }).catch((e) => {
                    CatchError(e)
                });
//                this.shopList = [
//                    {
//                        shopNo: "1001",
//                        shopId: "123",
//                        shopName: "麦当来旗舰店",
//                        brandId: "1233",
//                        brandName: "金拱门",
//                        contact: "蓝蓝路",
//                        phone: "4000123123",
//                    }
//                ]
            },
//            将url转换成二维码
            generateCode(url) {
                const img = QR.imageSync(url, {type: 'png', size: 3, margin: 0});
                this.appInfo.QRCode = 'data:image/png;base64,' + img.toString('base64');
            },
//            删除店铺提示弹窗
            deleteShop(id) {
                let self = this;
                this.$Modal.confirm({
                    title: "注意",
                    content: _i('SERVER.APPS.AUTH.MODAL.DELETE'),
                    onOk: function () {
                        self.deleteShopById(id);
                    },
                    onCancel: () => {
                        self.$Message.warning(_i('SERVER.APPS.AUTH.MODAL.CANCEL'));
                    }
                })
            },
//            删除店铺请求
            deleteShopById(entityId) {
                let self = this;
                let params = {
                    appId: Route.route.query["appId"],
                    entityId: entityId
                }
                Requester.post(API.DEL_APP_SHOP, params, {emulateJSON: true}).then((data) => {
                    self.getAuthShops();
                    this.$Message.success(_i('SERVER.APPS.AUTH.MODAL.SUCCESS'));
                }).catch((e) => {
                    CatchError(e);
                });
            },
//            跳转商家详情页 传递 appId 月entityId，详情页中调用获取详情
            showDetail(entityId) {
                this.$router.push({
                    path: "/server_app_auth_detail",
                    query: {
                        appId: Route.route.query["appId"],
                        entityId: entityId
                    }
                });
            },
//            带id跳转到第三方商家id绑定页面
            bind(entityId) {
                this.$router.push({
                    path: "/server_app_auth_bind",
                    query: {
                        appId: Route.route.query["appId"],
                        entityId: entityId
                    }
                });
            },
//            初始化 获取url中的参数
            init() {
                this.params.appId = Route.route.query["appId"];
                this.params.pageIndex = 1;
            },
//            分页 获取页码，修改params中的pageIndex，再次请求商铺
            change(pageIndex) {
                this.params.pageIndex = pageIndex;
                this.getAuthShops()
            }
        },
        created() {
            this.init();
            this.getAuthUrl();
            this.getAuthShops();
        }
    }
</script>

<style lang="scss" scoped="">

    .wrap {
        min-width: 100%;
        margin: 0 auto;

        text-align: left;

        padding: 20px 0;

        overflow: auto;

    }

    .auth-title {
        font-size: 16px;
        color: #333333;
        margin-bottom: 10px;
    }

    .auth-desc {
        font-size: 14px;
        color: #999999;
        margin-bottom: 15px;
    }

    .auth-box {
        padding: 15px;
        border: 1px solid #DEDEDE;
        border-radius: 2px;

        max-width: 1280px;
        width: 100%;
        margin-bottom: 20px;

        .auth-row {
            margin-bottom: 12px;
        }
        .label {
            vertical-align: top;
        }

        .auth-url {
            color: #1AA2F8;
            margin-left: 10px;
        }
    }

    .app-table-box {
        text-align: center;
        max-width: 1280px;

    }

    .app-table {
        th, td {
            max-width: 160px;
            width: 12.5%;
            height: 60px;
            text-align: center;
            padding: 0 5px;
        }

        .table-btn {
            font-size: 12px;
            color: #1AA2F8;

            padding: 0 10px 0 5px;
            border-right: 1px solid #dedede;
            &:last-child {
                padding-right: 0;
                border-right: 0;
            }
        }
    }

</style>
