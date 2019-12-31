<template>
    <div>
        <OpenTitle :title="pageTitle"></OpenTitle>
        <div class="wrap">
           <table class="app-table">
                <thead class="app-thead">
                <th style='width:6%;'><button style="color:#1AA2F8" @click='checkAll'>{{btn}}</button></th>
                <th v-for='item in tableHead'>{{item}}</th>
                </thead>
                <tbody>
                <tr v-for="item in appList">
                    <td style='width:6%;'><Checkbox v-model='item.binded'></Checkbox></td>
                    <td>{{item.code}}</td>
                    <td>{{item.entityId}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.linkman}}</td>
                    <td>{{item.phone1}}</td>
                    <td>{{item.address}}</td>
                </tr>
                </tbody>
            </table>
            <div class="page-bar">
                 <Page :total='totalNum' @on-change="change" :page-size='params.pageSize'></Page>
            </div>
            <div class="btn">
                <Button class="" type="primary" @click='agree'>{{agreeBtn}}</Button>
            </div>
    </div>
    </div>
</template>

<script>
    import _i from "@/i18n/index";
    import Requester from "@/base/requester";
    import catchError from "@/base/catchError";
    import API from "@/config/api";

    let pageData = {
        pageTitle:_i('SIDEBAR.SERVICE.DIRECT'),
        appList:[],
        totalNum:20,
        btn:_i('SERVICE_DIRECT_BTN'),
        agreeBtn:_i('SERVICE.DEVELOPER.DETAILS.BTN'),
        tableHead: {
            shopCode: _i('SERVER.APPS.AUTH.TABLE.SHOPNO'),
            shopId: _i('SERVER.APPS.AUTH.TABLE.SHOPID'),
            shopName: _i('SERVICE_DIRECT_SHOPNAME'),
            contact: _i('SERVER.APPS.AUTH.TABLE.CONTACT'),
            phone: _i('SERVER.APPS.AUTH.TABLE.PHONE'),
            address: _i('SERVICE_DIRECT_ADDRESS'),
        },
        isShow:false,
        params:{
            pageIndex:1,
            pageSize:10,
        }
    };

    export default {
        data() {
            return pageData;
        },
        components: {
            OpenTitle: require("@/components/open-title.vue"),
        },
        methods: {
            // 全选 全不选
           checkAll(){
                let self=this
                self.isShow=!self.isShow
                self.appList.forEach(item=>{
                item.binded=self.isShow
            })
           },
            getShopInfo() {
               Requester.get(API.DIRECT_LIST, {params: this.params}).then((data) => {
                   this.appList=data.chainShopList
                   this.totalNum=data.totalNum;
                   this.params.pageSize=data.pageSize;
               }).catch((e) => {
                   catchError(e)
               });

            },
           //同意授权
           agree(){
                let that=this
                let bindedChainShop=[]
                 that.appList.forEach(item=>{
                    if(item.binded){
                        bindedChainShop.push(item.entityId)
                    }
                })
                bindedChainShop=bindedChainShop.join(',')
                Requester.get(API.DIRECT_BIND,{params:{bindedChainShop}}).then((data) => {
                 this.$Message.success('授权成功');
                 this.getShopInfo()
                }).catch((e) => {
                    catchError(e)
                });
           },
          change(e){
            this.params.pageIndex = e;
            this.getShopInfo()
            },
        },
        created() {
          this.getShopInfo()
        }
    }
</script>


<style lang="scss" scoped="">

    .wrap {
        max-width: 1273px;
        margin-left: 0px;
        text-align: center;
        overflow: auto;
    }
    .app-table {
        width: 100%;
        margin: 20px 0 45px 0;
        max-width: 1273px;
        th, td {
            width: 15%;
            height: 60px;
            padding: 0 5px;
        }

        .table-btn {
            font-size: 12px;
            color: #1AA2F8;
            display: inline-block;
            padding: 0 10px 0 5px;
            border-right: 1px solid #dedede;
            &:last-child {
                padding-right: 0;
                border-right: 0;
            }
        }
    }
    .btn{
      width: 100%;
      text-align: center;
      margin-top: 45px;
  }
</style>

