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
        <schemeT :title=sceneThreeTitle>
            <sceneStepList :sceneList="sceneThreeList"></sceneStepList>
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
                data:_i('DOC.SCHEME_DATA.SCENE.ONE.DESC'),
                width:25
            },{
                title:_i('SCENE.TWO.TITLE'),
                data:_i('DOC.SCHEME_DATA.SCENE.TWO.DESC'),
                width:28
            },{
                title:_i('SCENE.THREE.TITLE'),
                data:_i('DOC.SCHEME_DATA.SCENE.THREE.DESC'),
                width:25
            }],
            sceneOneTitle:_i('DOC.SCHEME_DATA.SCENE.ONE.TITLE'),
            sceneOneList:[{
                data:`${_i('DOC.SCHEME_DATA.SCENE.ONE.CON.ONE')}</br><a class="scene-a" href=${_i('DOC.SCHEME_DATA.SCENE.ONE.CON.ONE.A')}>${_i('DOC.SCHEME_DATA.SCENE.ONE.CON.ONE.A')}</a>`
            },{
                data:`${_i('DOC.SCHEME_DATA.SCENE.ONE.CON.TWO_ONE')}</br><a class="scene-a" href=${_i('DOC.SCHEME_DATA.SCENE.ONE.CON.TWO.A')}>${_i('DOC.SCHEME_DATA.SCENE.ONE.CON.TWO.A')}</a></br>${_i('DOC.SCHEME_DATA.SCENE.ONE.CON.TWO_TWO')}`
            },{
                data:_i('DOC.SCHEME_DATA.SCENE.ONE.CON.THREE')
            },{
                data:_i('DOC.SCHEME_DATA.SCENE.ONE.CON.FOUR')
            }],
            sceneTwoTitle:_i('DOC.SCHEME_DATA.SCENE.TWO.TITLE'),
            sceneTwoList:[{
                data:`${_i('DOC.SCHEME_DATA.SCENE.TWO.CON.ONE')}</br><a class="scene-a" href=${_i('DOC.SCHEME_DATA.SCENE.TWO.CON.ONE.A')}>${_i('DOC.SCHEME_DATA.SCENE.TWO.CON.ONE.A')}</a>`
            },{
                data:`${_i('DOC.SCHEME_DATA.SCENE.TWO.CON.TWO_ONE')}</br><a class="scene-a" href=${_i('DOC.SCHEME_DATA.SCENE.TWO.CON.TWO.A')}>${_i('DOC.SCHEME_DATA.SCENE.TWO.CON.TWO.A')}</a></br>${_i('DOC.SCHEME_DATA.SCENE.TWO.CON.TWO_TWO')}`
            },{
                data:_i('DOC.SCHEME_DATA.SCENE.TWO.CON.THREE')
            },{
                data:_i('DOC.SCHEME_DATA.SCENE.TWO.CON.FOUR')
            }],
            sceneThreeTitle:_i('DOC.SCHEME_DATA.SCENE.THREE.TITLE'),
            sceneThreeList:[{
                data:`${_i('DOC.SCHEME_DATA.SCENE.THREE.CON.ONE_ONE')}</br>${_i('DOC.SCHEME_DATA.SCENE.THREE.CON.ONE_TWO')}</br><a class="scene-a" href=${_i('DOC.SCHEME_DATA.SCENE.THREE.CON.ONE.A')}>${_i('DOC.SCHEME_DATA.SCENE.THREE.CON.ONE.A')}</a>`
            },{
                data:_i('DOC.SCHEME_DATA.SCENE.THREE.CON.TWO')
            },{
                data:`${_i('DOC.SCHEME_DATA.SCENE.TWO.CON.TWO_ONE')}</br><a class="scene-a" href=${_i('DOC.SCHEME_DATA.SCENE.TWO.CON.TWO.A')}>${_i('DOC.SCHEME_DATA.SCENE.TWO.CON.TWO.A')}</a></br>${_i('DOC.SCHEME_DATA.SCENE.TWO.CON.TWO_TWO')}`
            },{
                data:_i('DOC.SCHEME_DATA.SCENE.THREE.CON.FOUR')
            },{
                data:_i('DOC.SCHEME_DATA.SCENE.THREE.CON.FIVE')
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

<style lang="scss" scoped>
    .footer{
        font-size: 16px;
        color: #333333;
        margin-top: 95px;
        margin-bottom: 100px;
    }
</style>
