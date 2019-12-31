<template>
    <div>
        <Crumb></Crumb>
        <schemeT :title=sceneTitle>
            <schemeList :list="list"></schemeList>
        </schemeT>
        <schemeT :title=sceneOneTitle>
            <div>
                <div class="secondTitle">商户对接流程</div>
                <sceneStepList :sceneList="receiptOneList"></sceneStepList>
            </div>
        </schemeT>
        <schemeT :title=sceneTwoTitle>
            <div>
                <div class="secondTitle">商户对接流程</div>
                <sceneStepList :sceneList="receiptTwoList"></sceneStepList>
                <div class="secondTitle">商户使用流程</div>
                <sceneStepList :sceneList="receiptTwoUseList"></sceneStepList>
            </div>
        </schemeT>
        <schemeT :title=sceneThreeTitle>
            <sceneStepList :sceneList="receiptThreeList"></sceneStepList>
        </schemeT>
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
                    data:'我是商户，我使用二维火餐饮管理系统，我还没有对接任何电子发票，我希望接入电子发票，方便我的客户在消费完后可以快速开具发票，详情请见场景一操作步骤',
                    width:33
                },{
                    title:'场景二',
                    data:'我是商户，我在使用二维火餐饮管理系统，我已经在用二维火对接服务商提供的电子发票，我希望这个电子发票能跟二维火收银打通，详情请见场景二操作步骤',
                    width:33
                },{
                    title:'场景三',
                    data:'我是服务商，我有资质和能力为二维火的商户提供电子发票服务',
                    width:33
                }],
                sceneOneTitle:_i('DOC.SCHEME_DATA.SCENE.ONE.TITLE'),
                receiptOneList:[{
                    data:_i('DOC.SCHEME_RECEIPT.SCENE.MANUAL.ONE'),
                    imglist:[{
                        img:'https://assets.2dfire.com/frontend/9996155a847353201310e4dff79cee6b.jpg'
                    },{
                        img:'https://assets.2dfire.com/frontend/34f4537a3b9c5caf90b09cc033f4ab36.jpg'
                    },{
                        img:'https://assets.2dfire.com/frontend/c064a06eb099c188ac0b8fcbf6457eb4.jpg'
                    }]
                },{
                    data:`${_i('DOC.SCHEME_RECEIPT.SCENE.MANUAL.TWO')}</br><div class="care">${_i('DOC.SCHEME_RECEIPT.SCENE.MANUAL.TWO_CARE')}</div>`,
                },{
                    data:_i('DOC.SCHEME_RECEIPT.SCENE.MANUAL.THREE'),
                },{
                    data:_i('DOC.SCHEME_RECEIPT.SCENE.MANUAL.FOUR'),
                    imglist:[{
                        img:'https://assets.2dfire.com/frontend/b3ccc3ff540afe726e213e2dbd8f429a.png'
                    },{
                        img:'https://assets.2dfire.com/frontend/16f9e50c65b23c110a3884076891be7b.png'
                    }]
                },{
                    data:_i('DOC.SCHEME_RECEIPT.SCENE.MANUAL.FIVE'),
                    imglist:[{
                        img:'https://assets.2dfire.com/frontend/fddf8cbbe7cb844153093cd2b88f1d41.png'
                    },{
                        img:'https://assets.2dfire.com/frontend/fe8db46b0d8ea01b98552246da8bf1e0.png'
                    }]
                }],
                sceneTwoTitle:_i('DOC.SCHEME_DATA.SCENE.TWO.TITLE'),
                receiptTwoList:[{
                    data:_i('DOC.SCHEME_RECEIPT.SCENE.TWO.CON.ONE'),
                    imglist:[{
                        img:'https://assets.2dfire.com/frontend/9996155a847353201310e4dff79cee6b.jpg'
                    },{
                        img:'https://assets.2dfire.com/frontend/34f4537a3b9c5caf90b09cc033f4ab36.jpg'
                    },{
                        img:'https://assets.2dfire.com/frontend/c064a06eb099c188ac0b8fcbf6457eb4.jpg'
                    }]
                },{
                    data:`${_i('DOC.SCHEME_RECEIPT.SCENE.TWO.CON.TWO')}</br><div class="care">${_i('DOC.SCHEME_RECEIPT.SCENE.TWO.CON.TWO_CARE')}</div>`,
                },{
                    data:_i('DOC.SCHEME_RECEIPT.SCENE.TWO.CON.THREE'),
                    imglist:[{
                        img:'https://assets.2dfire.com/frontend/b3ccc3ff540afe726e213e2dbd8f429a.png'
                    },{
                        img:'https://assets.2dfire.com/frontend/16f9e50c65b23c110a3884076891be7b.png'
                    }]
                },{
                    data:_i('DOC.SCHEME_RECEIPT.SCENE.TWO.CON.FOUR'),
                    imglist:[{
                        img:'https://assets.2dfire.com/frontend/fddf8cbbe7cb844153093cd2b88f1d41.png'
                    },{
                        img:'https://assets.2dfire.com/frontend/fe8db46b0d8ea01b98552246da8bf1e0.png'
                    }]
                }],
                receiptTwoUseList:[{
                    data:_i('DOC.SCHEME_RECEIPT.SCENE.TWO.USE.ONE'),
                },{
                    data:_i('DOC.SCHEME_RECEIPT.SCENE.TWO.USE.TWO'),
                    imglist:[{
                        img:'https://assets.2dfire.com/frontend/d7438bf50b527347a95bbe5789d483fc.png'
                    }]
                },{
                    data:_i('DOC.SCHEME_RECEIPT.SCENE.TWO.USE.THREE'),
                    imglist:[{
                        img:'https://assets.2dfire.com/frontend/6063eb2e75d27158a71c2d743c53f944.jpg'
                    }]
                }],

                sceneThreeTitle:_i('DOC.SCHEME_DATA.SCENE.THREE.TITLE'),
                receiptThreeList:[{
                    data:_i('DOC.SCHEME_RECEIPT.SCENE.THREE.CON.ONE'),
                },{
                    data:_i('DOC.SCHEME_RECEIPT.SCENE.THREE.CON.TWO'),
                    secondTitle:`<div class="second">${_i('DOC.SCHEME_RECEIPT.SCENE.THREE.DETAIL.ONE')}</div><br /><div class="second">${_i('DOC.SCHEME_RECEIPT.SCENE.THREE.DETAIL.TWO')}</div><br /><div class="second">${_i('DOC.SCHEME_RECEIPT.SCENE.THREE.DETAIL.THREE')}</div><br /><div class="second">${_i('DOC.SCHEME_RECEIPT.SCENE.THREE.DETAIL.FOUR')}</div>`
                },{
                    data:_i('DOC.SCHEME_RECEIPT.SCENE.THREE.CON.THREE'),
                },{
                    data:_i('DOC.SCHEME_RECEIPT.SCENE.THREE.CON.FOUR'),
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
    .secondTitle{
        font-size: 14px;
        color: #333333;
        line-height: 26px;
        margin-bottom: 20px;
    }
</style>
