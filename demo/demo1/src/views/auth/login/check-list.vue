<template>
    <div>
        <div class="wrap pc-auth">
            <div class="left-wrap">
                <div class="checkTableTitle">请选择登录店铺</div>
                <f-table class="checkTable" :data="newCheckDataList" ref="selection">
                    <f-table-column title="店铺名称" prop="shopName"></f-table-column>
                    <f-table-column title="店铺类型" prop="entityType">
                        <template slot-scope="scope">
                            <div>{{entityT(scope.entityType)}}</div>
                        </template>
                    </f-table-column>
                    <f-table-column title="店铺编码" prop="shopCode"></f-table-column>
                    <f-table-column title="职级" prop="roleName"></f-table-column>
                    <f-table-column title="类型" prop="type">
                        <template slot-scope="scope">
                            <select v-model="scope.type">
                                <option value="0" >餐饮</option>
                                <option value="1" >老零售</option>
                                <option value="3" >新零售</option>
                            </select>
                        </template>
                    </f-table-column>
                    <f-table-column title="操作">
                        <template slot-scope="scope">
                            <InlineButton  @on-tap="check(scope)">确认选择</InlineButton>
                        </template>
                    </f-table-column>
                </f-table>
                <Page :total="checkDataList.length" class="mT20" show-total @on-change="changePageSize" />
            </div>
            <div class="right-wrap">
                <p class="right-title">{{rightTitleBefore}} {{devName}} {{rightTitleAfter}}</p>
                <div class="right-list">
                    <ul>
                        <li v-for="item in rightList">{{item.rightsName}}</li>
                    </ul>
                </div>
            </div>
            <div class="fl-clear"></div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import _i from '@/i18n/index'
    import MD5 from "md5";
    import Requester from "@/base/requester";
    import CatchError from "@/base/catchError";
    import Route from "@2dfire/utils/router"
    import API from "@/config/api";
    import fTable from '@/components/fTable/fTable'
    import fTableColumn from '@/components/fTable/fTableColumn'
    import InlineButton from '@/components/button/inline-button'
	export default {
		name: "check-list",
        data(){
		    return{
                couponSelected:'',
                newCheckDataList:[],
                checkDataList:[],
                rightTitleBefore: _i('AUTH.RIGHT.TITLE.BEFORE'),
                rightTitleAfter: _i('AUTH.RIGHT.TITLE.AFTER'),
                devName:'',
                rightList:[],
                volumeTypes:[{
                    value:'1'
                },{
                    value:'2'
                }],
                checkRow:{},
            }
        },
        methods:{
            entityT(t){
                if(t==="0"){
                    return '单店'
                }else if(t==="1"){
                    return '总部'
                }else if(t==="2"){
                    return '门店'
                }else if(t==="3"){
                    return '分公司'
                }else if(t==="4"){
                    return '商场'
                }else {
                    return ''
                }
            },
            check(params){
                this.checkRow=params
                this.checkTableSubmit()
            },
            checkTableSubmit(){
                 let pwd=localStorage.getItem('pwd')
                 this.checkPhone(this.checkRow,pwd)
            },
            checkPhone(data,pwd){
                let self=this;
                let params={
                    entityCode:data.shopCode,
                    entityType:data.type,
                    password:MD5(pwd),
                    operatorType:2,
                    token:localStorage.getItem('token')
                }
                Requester.post(API.SHOP_CHECK_PHONE_LOGIN,params,{emulateJSON:true})
                    .then(d => {
                        self.$Message.success("登陆成功");
                        self.$router.push({
                            path: "/check",
                            query: {
                                appId: Route.route.query["appId"],
                                returnURL: Route.route.query["returnURL"],
                                switchShop:true
                            }
                        })
                    })
                    .catch(e => {
                        CatchError(e);
                    });
            },
            changePageSize(page){
                const p=page-1
                this.newCheckDataList=this.checkDataList.slice(p*10,(p+1)*10)
            }
        },
        created(){
		    let checkDataList=JSON.parse(localStorage.getItem('checkDataList'))
            for (let i=0;i<checkDataList.length;i++){
                Vue.set(checkDataList[i], 'type', 0)
            }
            this.checkDataList=checkDataList
            this.devName=localStorage.getItem('devName')
            this.rightList=JSON.parse(localStorage.getItem('rightList'))
        },
        components:{
            fTable,
            fTableColumn,
            InlineButton
        },
        watch:{
            checkDataList:{
                handler(curVal,oldVal){
                    this.changePageSize(1)
                },
                deep:true
            }
        },
	}
</script>

<style lang="scss" scoped>
    .mobi-select{
        border: 1px solid #d83f3f;
        width: 100%;
        appearance:none;
        -webkit-appearance:none;
        padding: 0 42px 0 12px;
        background: #ffffff;
        color: #999999;
        line-height: 40px;
        height: 40px;
        font-size: 14px;
        background: url("../../../images/icon-select.png") no-repeat;
        background-size: 12px;
        background-position: 95% center;
    }
    .countrySelect{
        .ivu-select-selection{
            width: 50px;
            display: block;
        }
    }
    .mT20{
        margin-top: 20px;
    }
    .code-select {
        width: 40px;
        line-height: 40px;
        height: 40px;
        float: left;
        border: 0;
        outline: 0;
        margin-right: 5px;
        -webkit-appearance: none;
        background-image: url("https://assets.2dfire.com/frontend/b6420948cf5dd99ca5af08ca22263f43.png");
        background-position: right center;
        background-size: 20px 20px;
        background-repeat: no-repeat;
        background-color: #ffffff;
        display: inline-block;
    }
    .checkTableBtn{
    margin: 0 auto;
    margin-top:25px;
    }
    .checkTableTitle{
    margin-bottom: 20px;
    font-size: 16px;
    }
    .scan-login {
        width: 269px;
        height: 269px;
        margin-left: 25px;
        margin-right: 25px;
    }

    .scan-text {
        width: 320px;
        height: 40px;
        padding-top: 290px;
        color: #999;
        line-height: 28px;
    }
    .checkTable{
        width: 553px;
        margin: 0 auto;
    }
    .scan-box {
        height: 400px;
        width: 269px;
        display: block;
    }

    .wrap {
        padding: 50px 0;
        overflow: auto;
    }

    .right-wrap {
        border-left: 1px solid #DEDEDE;
    }

    .left-wrap, .right-wrap {
        height: 100%;
        width: 50%;
        float: left;

        text-align: center;

        .box {
            display: inline-block;
            width: 290px;
        }

        padding-top: 20px;
    }

    .right-title {
        font-size: 16px;
        color: #333333;
        margin-bottom: 20px;
        font-weight: bold;
    }

    .right-list {
        border: 1px solid #DEDEDE;
        border-radius: 2px;
        width: 290px;
        height: 350px;

        display: inline-block;
        padding: 15px 0 15px 30px;
        overflow-x: hidden;
        overflow-y: auto;
        font-size: 14px;
        color: #333333;

        ul {
            list-style: decimal;
            text-align: left;
        }
    }

    .form_wrap {
        margin: 0 auto;
        width: 320px;
        .form_item {
            width: 320px;
            height: 42px;
            border: 1px solid #dedede;
            background: #fbfbfb;
            border-radius: 5px;
            margin-bottom: 12px;
            position: relative;
            .icon {
                font-size: 18px;
                color: #d8d8d8;
                margin: 0 15px;
                vertical-align: -2px;
            }
            .icon-close {
                position: absolute;
                right: 10px;
                top: 7px;
                cursor: pointer;
                font-size: 25px;
                color: #e17776;
                background-color: #fff;
            }
            input {
                border-left: 1px solid #dedede;
                box-sizing: border-box;
                padding: 0 12px;
                background: #ffffff;
                width: 271px;
                line-height: 40px;
                height: 40px;
                border-radius: 0 5px 5px 0;
                &::-webkit-input-placeholder {
                    color: #999999;
                }
            }
        }
        .errorTip {
            height: 18px;
            text-align: right;
            font-size: 12px;
            color: #c42022;
            margin-bottom: 9px;
        }
    }

    .btn {
        display: block;
        text-align: center;
        line-height: 42px;
        background-image: linear-gradient(-180deg, #de4040 2%, #a42525 99%);
        border-radius: 5px;
        font-size: 14px;
        width: 320px;
        height: 42px;
        color: #ffffff;
    }

</style>
