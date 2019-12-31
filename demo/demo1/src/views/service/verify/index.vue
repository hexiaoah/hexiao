<template>
    <div class="verify">
        <OpenTitle :title="pageTitle"></OpenTitle>
        <div class="verify-box">
            <h2>{{title}}</h2>
            <div class="verify-contetn">
                <p>{{state}}
                    <span style="color: #109B0C" v-if='isShow'>{{state_pass}}</span>
                    <span style="color: #C42022" v-else>{{state_unverified}}</span>
                </p>
                <ul>
                    <li>{{introduce}}</li>
                    <li v-for='(tab,i) in list'>
                        {{tab}}
                        <ul v-if='i==2'>
                            <li v-for='item in list_ul'>
                                {{item}}
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="verify-btn">
                <button type="button" class="btn" @click="details">{{isShow?btn_details:btn_apply}}</button>
            </div>
        </div>
        <!--<Modal-->
            <!--v-model="modal1"-->
            <!--width="598"-->
            <!--:closable="false"-->
            <!--@on-cancel="cancel">-->
            <!--<p slot="header" class="verify-model">-->
                <!--<span>{{protocol}}</span>-->
            <!--</p>-->
            <!--<p class="pro_con" v-html="protocol_con"></p>-->
            <!--<div slot="footer" class="modal-footer clearfix">-->
                <!--<Button class="cancel" @click="cancel">取消</Button>-->
                <!--<Button class="agree" @click="ok">同意</Button>-->
            <!--</div>-->
        <!--</Modal>-->
        <Modal
            v-model="modal1"
            :title=protocol
            @on-ok="ok"
            @on-cancel="cancel">
            <p class="pro_con" v-html="protocol_con"></p>
        </Modal>
    </div>
</template>

<script>
import _i from "@/i18n/index";
import Requester from "@/base/requester";
import catchError from "@/base/catchError";
import API from "@/config/api";
import Route from "@2dfire/utils/router";
let pageData={
    pageTitle:_i('VERIFY.APP.CONTENT.TITLE'),
    title:_i('SIDEBAR.SERVICE.VERIFY'),
    state:_i('VERIFY.APP.CONTENT.STATE'),
    state_pass:_i('VERIFY.APP.CONTENT.STATE.PASS'),
    state_unverified:_i('VERIFY.APP.CONTENT.STATE.UNVERIFIED'),
    introduce:_i('VERIFY.APP.CONTENT.INTRODUCE'),
    list:[
        _i('VERIFY.APP.CONTENT.LIST.ONE'),
        _i('VERIFY.APP.CONTENT.LIST.TWO'),
        _i('VERIFY.APP.CONTENT.LIST.THREE'),
        _i('VERIFY.APP.CONTENT.LIST.FOUR'),
    ],
    list_ul:[
        _i('VERIFY.APP.CONTENT.LIST.TWO.FIRST'),
        _i('VERIFY.APP.CONTENT.LIST.TWO.SECOND'),
    ],
    btn_details:_i('VERIFY.APP.CONTENT.BTN.DETAILS'),
    btn_apply:_i('VERIFY.APP.CONTENT.BTN.APPLY'),
    isShow:false,
    modal1: false,
    protocol:_i('VERIFY.APP.CONTENT.PROTOCOL.TITLE'),
    protocol_con:_i('VERIFY.APP.CONTENT.PROTOCOL.CONTEN')
}
export default {
    data() {
        return pageData;
    },
    components: {
        OpenTitle: require("@/components/open-title.vue"),
    },
    methods: {
        ok(){
            this.modal1=false
            let that=this;
            setTimeout(function () {
                that.$router.push({
                    path: "/server_verify_information"
                });
            },0)

        },
        cancel(){
            this.modal1=false
        },
        details(){
            if(this.isShow==false){
                this.modal1=true
            }else{
                this.$router.push({
                    path:'/server_verify_details'
                })
            }
        },
        getData(){
            Requester.get(API.DEV_APTITUDE).then((data) => {
                this.isShow=data.isAuthenticate==1?true:false
            }).catch((e) => {
                catchError(e)
            });
        }
    },
    created() {
        this.getData()
    }
}
</script>

<style lang="scss" scoped="">
    .verify-box{
        // width: 100%;
        padding: 20px 0;
        overflow: auto;
        color: #333333;
    }
    .verify-box h2{
        text-align: center;
        font-family: PingFangSC-Medium;
        font-size: 16px;
    }
    .verify-contetn{
        text-align: left;
        width: 100%;
        font-family: PingFangSC-Regular;
        font-size: 14px;
    }
    .verify-contetn p{
        font-size: 16px;
        margin: 35px auto 30px auto;
        width: 790px;
    }
    .verify-contetn p span{
        color: #000E10;
        line-height: 20px;
    }
    .verify-contetn li{
        line-height: 35px;
    }
    .verify-contetn ul{
        width: 790px;
        margin: 0 auto;
    }
    .verify-btn{
        width: 100%;
        margin: 30px auto 0 auto;
        text-align: center;
        font-size: 14px;
        font-family: PingFangSC-Regular;
    }
    .verify-btn .btn{
        background: #C42022;
        border-radius: 4px;
        color:#fff;
        width: 86px;
        height: 34px;
        border-width: 0;
    }
    .pro_con{
        font-size: 14px;
        color: #333333;
        line-height: 28px;
        margin-left: 18px;
        margin-right: 18px;
        height: 224px;
        overflow-y: scroll;
    }
    .verify-model{
        text-align: center;
        margin-top: 7px;
        margin-bottom: 7px;
    }
    .modal-footer{
        width: 136px;
        margin:0 auto;
        padding-top:45px;
        padding-bottom: 23px;
    }
    .cancel{
        border:1px solid #DEDEDE;
        border-radius: 4px;
        width: 58px;
        height: 34px;
        background-color: #ffffff;
    }
    .agree{
        background-color: #C42022;
        color: #ffffff;
        width: 58px;
        height: 34px;
        border-radius: 4px;
    }
</style>
