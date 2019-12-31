<template>
    <div>
        <Crumb></Crumb>
        <schemeT :title=sceneTitle>
            <schemeList :list="list"></schemeList>
        </schemeT>
        <schemeT :title=sceneOneTitle>
            <sceneStepList :sceneList="sceneOneList"></sceneStepList>
        </schemeT>
        <schemeT :title=sceneTwoTitle>
            <sceneStepList :sceneList="sceneTwoList"></sceneStepList>
        </schemeT>
        <!--<div class="footer">说明：根据以上步骤自行开发无需收费，如果没有开发能力可以联系客服或我们的技术人员来协助对接开发，我们将酌情收取一定的开发费用</div>-->
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
                data:_i('DOC.SCHEME_LEAGUER.SCENE.ONE.DESC'),
                width:25
            },
                {
                    title:_i('SCENE.TWO.TITLE'),
                    data:_i('DOC.SCHEME_LEAGUER.SCENE.TWO.DESC'),
                    width:25
                }],
            sceneOneTitle:_i('DOC.SCHEME_DATA.SCENE.ONE.TITLE'),
            sceneOneList:[{
                data:_i('DOC.SCHEME_LEAGUER.SCENE.ONE.CON.ONE')
            },{
                data:_i('DOC.SCHEME_LEAGUER.SCENE.ONE.CON.TWO')
            },{
                data:`${_i('DOC.SCHEME_LEAGUER.SCENE.ONE.CON.THREE')}<a class="scene-a" href=${_i('DOC.SCHEME_LEAGUER.SCENE.ONE.CON.THREE.A')}>${_i('DOC.SCHEME_LEAGUER.SCENE.ONE.CON.THREE.A')}</a>`
            },{
                data:_i('DOC.SCHEME_LEAGUER.SCENE.ONE.CON.FOUR')
            },{
                data:_i('DOC.SCHEME_LEAGUER.SCENE.ONE.CON.FIVE')
            },{
                data:_i('DOC.SCHEME_LEAGUER.SCENE.ONE.CON.SIX')
            }],
            sceneTwoTitle:_i('DOC.SCHEME_DATA.SCENE.TWO.TITLE'),
            sceneTwoList:[{
                data:_i('DOC.SCHEME_LEAGUER.SCENE.TWO.CON.ONE')
            },{
                data:_i('DOC.SCHEME_LEAGUER.SCENE.TWO.CON.TWO')
            },{
                data:_i('DOC.SCHEME_LEAGUER.SCENE.TWO.CON.THREE')
            }],
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
</style>
