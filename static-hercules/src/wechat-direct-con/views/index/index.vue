<template>
    <div class="index-wrapper" v-if="isShow">
        <div class="top-attention">如果您的店铺已经在二维火其他产品申请了【微信特约商户】，请勿重复申请，避免费率有误。</div>
        <!--头部-->
        <div class="firstfloat">
            <div class="top-title">
                <p>小微商户</p>
            </div>
            <p>超低门槛，无需营业执照！</p>
            <p>极速审核，5分钟内审核完成！</p>
        </div>

        <!--介绍item-->
         <ul class="introduce-list">
            <function-introfuce-item v-for="(item, $index) in itemList"
                            :item-data="item"
                            :key="$index">
            </function-introfuce-item>
        </ul> 

        <div class="bottom"></div>
        <!--button-->
        <div class="footer">
            <div class="footerline"></div>
            <div class="align-center btn">
                <btn-custom @click.native="clickApply" v-click="{name:'click_wx_direct_con_apply_button',info:'entityid=' + entityId}" :disabled="disabled">立即申请</btn-custom>
            </div>
        </div>
    </div>
</template>

<script>
import FunctionIntrofuceItem from '../../components/function-introfuce-item.vue'
import BtnCustom from '../../components/btn-custom.vue'
import API from '../../config/api'
import Router from '@2dfire/utils/router'
import sessionStorage from '@2dfire/utils/sessionStorage'
import errorToast from 'src/wechat-direct-con/libs/errorToast'
import {
     mapActions
} from 'vuex'

export default {
    data() {
        return {
             itemList: [
                 {
                    imageUrl: "https://assets.2dfire.com/frontend/58ad89a28823e2b499dedd88e460632c.png",
                    content: "申请资料简单，无需营业执照，享受基础功能和服务。"
                 },
                 {
                    imageUrl: "https://assets.2dfire.com/frontend/f417ce93fdae728fb61d439223874e52.png",
                    content: "通过小程序实现对账，方便快捷。"
                 },
                 {
                    imageUrl: "https://assets.2dfire.com/frontend/f65d90413c1b341ab4a98214fc75076a.png",
                    content: "申请小微商户签约完成后可升级成为普通商户，解锁所有功能和服务。"
                 },
                 {
                    imageUrl: "https://assets.2dfire.com/frontend/c0769f1ffe63bfe23a53d6be62c8e0d7.png",
                    content: "默认费率0.6%，限额5万/日，其中信用卡限额500/笔。"
                 },
                 {
                    imageUrl: "https://assets.2dfire.com/frontend/c3b65b54aae4165be8d342eba77c2ace.png",
                    content: "实时到账，每笔收入微信播报，T+1自动提现到银行卡。"
                 }
             ],
             bgHeight: {
                 height:'',
             },
             ticket: Router.route.query['s_tk'],
             token: '',
             entityId: '',
             userId: '',
             disabled: true,
             isShow: false,
        }
    },
    methods: {
         ...mapActions([
            'modifyInputInfo'
        ]),
        getHeight() {  // 获取屏幕高度
            this.bgHeight.height = window.innerHeight + 'px';
        },
        getToken() {  // 获取token
            let ticket = sessionStorage.getItem('s_tk')
            let token = sessionStorage.getItem('token')
            if ((ticket === this.ticket || !this.ticket) && token) {
                this.getSessionInfo()
            } else {
                API.getToken({
                    serviceTicket: this.ticket
                }).then(data => {
                    let token = data.dfireToken
                    sessionStorage.setItem('s_tk', this.ticket)
                    sessionStorage.setItem('token', token)
                    this.token = token
                            
                    this.getSessionInfo()
                }).catch(e => {
                    this.isShow = true
                    this.disabled = true
                    this.getHeight()
                })
            }
        },
        getSessionInfo() {  // 获取session信息
           
            API.getSessionInfo({
                entityId: this.entityId,
                userId: this.userId
            }).then(data => {
                let entityId = data.entityId
                let userId = data.userId
                let industry = data.industry
                let shopName = data.shopName
                sessionStorage.setItem('entityId', entityId)
                sessionStorage.setItem('userId', userId)
                this.entityId = entityId
                this.userId = userId

                this.modifyInputInfo({type:'shopName', value: shopName});
                this.modifyInputInfo({type:'serviceType', value: (industry === 0)?'餐饮':'线下零售'})
                this.judgeSuper()
            }).catch(e => {
                this.isShow = true
                this.disabled = true
                this.getHeight()
            })
        },
        judgeSuper() {  // 判断是否是超级管理员
            API.judgeSuper({
                entityId: this.entityId,
                userId: this.userId
            }).then(data => {
                if(data === true) {
                    this.getPaymentStatus()
                } else {
                    errorToast.show('您没有执行此操作的权限')
                }
            }).catch(e => {
                this.isShow = true
                this.disabled = true
                this.getHeight()
            })
            
        },
        getPaymentStatus() {  // 查看申请状态
            API.getPaymentStatus({
                entityId: this.entityId,
                applyType: "WECHAT_XW"
            }).then(data => {
                console.log(data)
                // 已申请：有申请记录且未重置；
                // 未申请：无申请记录;或有申请记录且已重置
                let isApply = data.isApply  // 申请记录
                let isEnable = data.isEnable 

                // 已申请会返回下列内容
                let applyType = data.applyType  // 申请类型
                let auditStatus = data.auditStatus  // 申请状态（申请失败会有修改页面，返回的申请类型用于控制跳转到小微修改页还是升级修改页）
                let signUrl = data.signUrl  // 签约url
                let upgradeTime = data.upgradeTime  // 申请提交时间
                let applyTime = data.applyTime  // 申请提交时间
                let auditMessage = data.auditMessage  // 审核失败原因
                let mchId = data.mchId  // 商户号
                this.modifyInputInfo({type:'merchantNum', value: mchId});
                this.modifyInputInfo({type:'isXWEnable', value: isEnable});

                if(isApply === false) {  // 未申请
                    this.isShow = true
                    this.disabled = false
                } else {  // 已申请
                    if(auditStatus === 'RESET') {  // 已重置
                        this.isShow = true
                        this.disabled = false
                    }
                    if(auditStatus === 'XW_AUTH_AUDITING') {  // 小微进件审核中
                        this.$router.replace({path: '/input/second/second', query:{auditStatus:true, applyTime: applyTime}})
                    }
                    if(auditStatus === 'XW_AUTH_FAIL') {  // 小微进件失败
                        this.$router.replace({path: '/input/second/second', query:{auditStatus:false, auditMessage: auditMessage}})
                    }
                    if(auditStatus === 'XW_AUTH_SIGN') {  // 小微进件待签约
                        this.$router.replace({path: '/input/third/third', query:{signUrl:signUrl}})
                    }
                    if(auditStatus === 'XW_AUTH_SUCCESS') { // 小微进件成功
                        this.$router.replace({path: '/input/fourth/fourth', query:{mchId:mchId, isEnable: isEnable}})
                    }
                    if(auditStatus === 'XW_UPGRADE_AUDITING') { // 小微升级审核中
                        this.$router.replace({path: '/merchants/second/second', query:{auditStatus:auditStatus, upgradeTime: upgradeTime}})
                    }
                    if(auditStatus === 'XW_UPGRADE_ACCOUNT_VERIFY') { // 小微升级待打款验证
                        this.$router.replace({path: '/merchants/second/second', query:{auditStatus:auditStatus, upgradeTime: upgradeTime}})
                    }
                    if(auditStatus === 'XW_UPGRADE_SIGN') { // 小微升级待签约
                        this.$router.replace({path: '/merchants/third/third', query:{signUrl:signUrl}})
                    }
                    if(auditStatus === 'XW_UPGRADE_SUCCESS') { // 小微升级成功
                        this.$router.replace({path: '/merchants/fourth/fourth', query:{mchId:mchId, isEnable: isEnable}})
                    }
                    if(auditStatus === 'XW_UPGRADE_FAIL') { // 小微升级失败
                        this.$router.replace({path: '/merchants/second/second', query:{auditStatus:auditStatus, auditMessage: auditMessage}})
                    }
                }
            }).catch(e => {
                this.isShow = true
                this.disabled = true
            })
            
            this.getHeight();
        },
        clickApply() {  // 点击申请
           this.$router.replace({path: '/input/first/first', query:{isNeedGetInfo: false}})  // 不需要从服务端获取表单数据
        }
    },
    components: {
        FunctionIntrofuceItem,
        BtnCustom
    },
    created() {
        this.getHeight();
        this.getToken();
    },
    watch: {
        // 高度发生改变就会执行
        '$height': 'getHeight'
    }
}
</script>
<style type="text/scss" lang="scss" scoped>

    .index-wrapper{
        background: white;
        width: 100%;
        height: 100%;

        .top-attention {
            background: pink;
            color: #333333;
            padding-top: 18px;
            padding-bottom: 18px;
            padding-left: 30px;
            font-size: 30px;
            line-height: 40px;
            margin: 0 auto;
        }

        .firstfloat{
            height: 300px;
            background-size: cover;
            background-image: url("https://assets.2dfire.com/frontend/4472043d94aabf039655cd3a958e18dd.png");
            padding-top: 40px;

            .top-title{
                height: 78px;
                padding-bottom: 18px;

                p{
                    font-size: 44px;
                    font-weight: bold;
                    color: white;
                }
            }

            p{
                font-size: 26px;
                color: white;
                text-align: center;
            }
        }

        .bottom {
            height: 300px;
        }

        .footer {
            height: 128px;
            width: 100%;
            position: fixed;
            bottom: 0;
            background: white;
            text-align: center;

            .footerline {
                background-color: #e6e6e6;
                height: 1px;
            }

            .btn {
                padding: 20px 30px;
            }
        }
    }

</style>

