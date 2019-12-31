<template>
    <div>
        <Crumb></Crumb>
        <schemeT :title=sceneTitle>
            <schemeList :list="list"></schemeList>
        </schemeT>
        <schemeT :title=sceneOneTitle>
            <sceneStepList :sceneList="dispatchOneList"></sceneStepList>
        </schemeT>
        <schemeT :title=sceneTwoTitle>
            <sceneStepList :sceneList="parceTwoList"></sceneStepList>
        </schemeT>
        <div class="footer">{{footer}}</div>
    </div>
</template>

<script>
import Crumb from '@/components/crumb.vue'
import schemeT from '@/components/schemeT.vue'
import schemeList from '@/components/schemeList.vue'
import sceneStepList from '@/components/sceneStepList.vue'
import _i from '@/i18n/index'
export default {
    name: 'index',
    data(){
        return{
            sceneTitle:_i('DOC.SCHEME_DATA.SCENE.TITLE'),
            list:[{
                title:'场景一',
                data:'我是外卖的商家，我送外卖缺少一个跑腿人，我想接入蜂鸟，达达或是顺丰的配送，来解决外卖跑腿的问题',
                width:33
            },{
                title:'场景二',
                data:'我是配送的特定合作方，我下面有很多商户使用二维火的产品，希望二维火外卖配送的订单直接推送给我们，同时我们也会将配送状态推送给二维火，也可以取消外卖的配送订单',
                width:33
            }],
            sceneOneTitle:_i('DOC.SCHEME_DATA.SCENE.ONE.TITLE'),
            dispatchOneList:[{
                data:_i('DOC.SCHEME_DISPATCH.SCENE.ONE.CON.ONE'),
                imglist:[{
                    img:'https://assets.2dfire.com/frontend/00af533cfb2b7e586794a268861d348a.png'
                }]
            },{
                data:_i('DOC.SCHEME_DISPATCH.SCENE.ONE.CON.TWO'),
                imglist:[{
                    img:'https://assets.2dfire.com/frontend/c4814a818259562529b7ec202224cb12.png'
                }]
            },{
                data:'可以选择以下几种配送方式',
                secondTitle:`<div class="second">a. 如果选择【新达达配送】或者【老达达配送】，填写相应的信息确认开通即可；</div>`,
                    image:'https://assets.2dfire.com/frontend/72ad2a03b9aefdfd49dc71c463b72773.png',

                secondTitleList:[{
                    secondTitle:`<div class="second">b. 如果选择【顺丰同城】，请按以下步骤进行开通：</div>`
                }, {
                    secondTitle:`<div class="second">①请先选择顺丰同城点击进入，并进行开通;</div>`
                }, {
                    secondTitle: `<div class="second">②和当地顺丰同城联系，确认好价格等签订合同，生成账号和商家编码，进行对接（当地顺丰同城如没有联系方式，可以通过9533868顺丰同城服务号码进行联系）</div>`
                }, {
                    secondTitle: `<div class="second">③商户需告知顺丰同城对接的二维火服务商号1503006720进行配置;</div>`
                }, {
                    secondTitle: `<div class="second">c. 如果商户需要使用【蜂鸟配送】，请先联系蜂鸟配送开通商户，然后联系二维火技术进行配置即可；</div>`
                }],
                reminder:_i('DOC.SCHEME_DISPATCH.SCENE.ONE.CON.TWO_REMINDER')
            },{
                data:_i('DOC.SCHEME_DISPATCH.SCENE.ONE.CON.FOUR'),
                imglist:[{
                    img:'https://assets.2dfire.com/frontend/4c7c5e69040bce5203897e84638a2ec3.png'
                },{
                    img:'https://assets.2dfire.com/frontend/c20c4b39d04d6e978c33bc2a99efd584.png'
                }],
                secondTitle:`<div class="second">${_i('DOC.SCHEME_DISPATCH.SCENE.ONE.CON.FOUR_ONE')}</div>
                            <div class="second">${_i('DOC.SCHEME_DISPATCH.SCENE.ONE.CON.FOUR_TWO')}</div>
                            <div class="second">${_i('DOC.SCHEME_DISPATCH.SCENE.ONE.CON.FOUR_THREE')}</div>
                            <div class="second">${_i('DOC.SCHEME_DISPATCH.SCENE.ONE.CON.FOUR_FOUR')}</div>`
            },{
                data:_i('DOC.SCHEME_DISPATCH.SCENE.ONE.CON.FIVE'),
                imglist:[{
                    img:'https://assets.2dfire.com/frontend/1e7450f3790e4912d9f6b3f722df7ff7.png',
                    width:663
                }]
            },{
                data:_i('DOC.SCHEME_DISPATCH.SCENE.ONE.CON.SIX'),
                imglist:[{
                    img:'https://assets.2dfire.com/frontend/e74a4c40a873424136635642b6a20397.png',
                    width:663
                }]
            },{
                data:_i('DOC.SCHEME_DISPATCH.SCENE.ONE.CON.SEVEN'),
                imglist:[{
                    img:'https://assets.2dfire.com/frontend/ef90dc4f5ef6c547a44a1e04d08d5dcc.png',
                    width:663
                }]
            }],
            sceneTwoTitle:_i('DOC.SCHEME_DATA.SCENE.TWO.TITLE'),
            parceTwoList:[{
                data:`${_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.FOUR_ONE')}</br><a class="scene-a" href=${_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.FOUR.A')}>${_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.FOUR.A')}</a>`,
            },{
                data:`${_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.FIVE')}`,
            },{
                data:`${_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.SIX_ONE')}</br><a class="scene-a" href=${_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.SIX.A')}>${_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.SIX.A')}</a></br>${_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.SIX_TWO')}`
            },{
                data:`${_i('DOC.SCHEME_DISPATCH.DISPATCH.TWO.CON.FOUR')}`
            }],
            footer:_i('DOC.FOOTER'),
        }

    },
    components:{
        Crumb,
        schemeT,
        schemeList,
        sceneStepList
    }
}
</script>

<style scoped>
    .footer{
        font-size: 16px;
        color: #333333;
        margin-top: 95px;
        margin-bottom: 100px;
    }
    .secondTitle{
        font-size: 14px;
        color: #333333;
        line-height: 26px;
        margin-bottom: 20px;
    }
</style>
