<template>
    <div>
        <Crumb></Crumb>
        <schemeT :title=sceneTitle>
            <schemeList :list="list"></schemeList>
        </schemeT>
        <schemeT :title=sceneOneTitle>
            <sceneStepList :sceneList="sceneOneList"></sceneStepList>
        </schemeT>
        <schemeT :title=couponManual>
            <div>
                <!--<div class="secondTitle">用户二维火上查看优惠券流程</div>-->
                <sceneStepList :sceneList="couponManualList"></sceneStepList>
            </div>
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
                title:_i('SCENE.ONE.TITLE'),
                data:_i('DOC.SCHEME_COUPON.SCENE.ONE.DESC'),
                width:25
            }],
            sceneOneTitle:_i('DOC.SCHEME_DATA.SCENE.ONE.TITLE'),
            sceneOneList:[{
                data:`${_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.ONE')}`
            },{
                data:_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.TWO')
            },{
                data:`${_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.THREE')}</br><div class="care">${_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.THREE_CARE')}</div>`
            },{
                data:`${_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.FOUR_ONE')}</br>${_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.FOUR_TWO')}</br><a class="scene-a" href=${_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.FOUR.A')}>${_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.FOUR.A')}</a>`
            },{
                data:_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.FIVE')
            },{
                data:`${_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.SIX_ONE')}</br><a class="scene-a" href=${_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.SIX.A')}>${_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.SIX.A')}</a></br>${_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.SIX_TWO')}`
            },{
                data:_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.SEVEN')
            },{
                data:_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.EIGHT')
            },{
                data:_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.NINE')
            },{
                data:_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.TEN')
            },{
                data:_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.ELEVEN')
            },{
                data:_i('DOC.SCHEME_COUPON.SCENE.ONE.CON.TWELVE')
            }],
            couponManual:_i('DOC.SCHEME_COUPON.SCENE.ONE.TITLE'),
            couponManualList:[{
                data:_i('DOC.SCHEME_COUPON.SCENE.MANUAL.ONE'),
                imglist:[{
                    img:'https://assets.2dfire.com/frontend/7c5cb6e0391ccede2f0252a207dd162f.png'
                },{
                    img:'https://assets.2dfire.com/frontend/a5089be6c4a43d7f873d88d5c6065c4d.png'
                },{
                    img:'https://assets.2dfire.com/frontend/1fd03c654d6381447f9e402ca1f8e356.png'
                },{
                    img:'https://assets.2dfire.com/frontend/bd543186c5732c72fd6808339a63cdac.png'
                }]
            },{
                data:_i('DOC.SCHEME_COUPON.SCENE.MANUAL.TWO'),
                imglist:[{
                    img:'https://assets.2dfire.com/frontend/c9d7640697f66cb2101875dfaf542111.png'
                },{
                    img:'https://assets.2dfire.com/frontend/c9d7640697f66cb2101875dfaf542111.png'
                },{
                    img:'https://assets.2dfire.com/frontend/bb102dfc7d93ec381c90dcf0804d9126.png'
                }]
            },{
                data:_i('DOC.SCHEME_COUPON.SCENE.MANUAL.THREE'),
                imglist:[{
                    img:'https://assets.2dfire.com/frontend/08d966f76ce45d1fbb531e8f413d6126.png'
                },{
                    img:'https://assets.2dfire.com/frontend/00cf90f047a15a54241ae474cdd17a38.png'
                },{
                    img:'https://assets.2dfire.com/frontend/45b7ec53d194659c008871a9d42c783f.png'
                },{
                    img:'https://assets.2dfire.com/frontend/00cf90f047a15a54241ae474cdd17a38.png'
                }]
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
