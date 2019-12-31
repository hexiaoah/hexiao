<template>
    <div>
        <Crumb></Crumb>
        <schemeT :title=sceneTitle>
            <schemeList :list="list"></schemeList>
        </schemeT>
        <schemeT :title=sceneOneTitle>
            <sceneStepList :sceneList="couponManualList"></sceneStepList>
        </schemeT>
        <schemeT :title=sceneTwoTitle>
            <div class="secondTitle">方法一：通过美团开放平台对接</div>
            <sceneStepList :sceneList="parceTwoMeituanList"></sceneStepList>
            <div class="secondTitle">方法二：通过蓝牙棒对接</div>
            <sceneStepList :sceneList="parceTwoBluetoothList"></sceneStepList>
        </schemeT>
        <schemeT :title=sceneThreeTitle>
            <sceneStepList :sceneList="parceThreeList"></sceneStepList>
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
                data:'我是商户，我使用二维火的收银机，我现在也在做饿了么的外卖，希望饿了么下单的外卖也会下单到二维火收银机上，避免人工手动录入订单',
                width:25
            },{
                title:'场景二',
                data:'我是商户，我使用二维火的收银机，我现在也在做美团的外卖，希望美团下单的外卖也会下单到二维火收银机上，避免人工手动录入订单',
                width:25
            },{
                title:'场景三',
                data:'我有自己的APP和网站，我希望用户在我的APP和网站上下的订单会直接推送到合作商家的二维火收银机上，避免手工录入订单',
                width:25
            }],
            sceneOneTitle:_i('DOC.SCHEME_DATA.SCENE.ONE.TITLE'),
            couponManualList:[{
                data:_i('DOC.SCHEME_PRECEL.SCENE.ONE.CON.ONE'),
                imglist:[{
                    img:'https://assets.2dfire.com/frontend/39a12eab99ff50f8f85c2bea410f1122.png'
                },{
                    img:'https://assets.2dfire.com/frontend/f1b033a6164ca7ad749f9071d532618e.png'
                },{
                    img:'https://assets.2dfire.com/frontend/f1b033a6164ca7ad749f9071d532618e.png'
                },{
                    img:'https://assets.2dfire.com/frontend/5010a1ea629070dabd13109a4f3d27d7.png'
                }]
            },{
                data:_i('DOC.SCHEME_PRECEL.SCENE.ONE.CON.TWO'),
                imglist:[{
                    img:'https://assets.2dfire.com/frontend/f4da49a1739064a9168b87131700ab6d.png'
                },{
                    img:'https://assets.2dfire.com/frontend/f737889ed3b26a98e1d1bc4673a23264.png'
                }]
            },{
                data:_i('DOC.SCHEME_PRECEL.SCENE.ONE.CON.THREE'),
                imglist:[{
                    img:'https://assets.2dfire.com/frontend/152ae0f2ac3e1f5d5c656b611e3c95c2.png'
                },{
                    img:'https://assets.2dfire.com/frontend/e2db219d6356d21c3f5019ab8ae85907.png'
                }]
            },{
                data:_i('DOC.SCHEME_PRECEL.SCENE.ONE.CON.FOUR'),
                imglist:[{
                    img:'https://assets.2dfire.com/frontend/9d01b2cc9b8dde60d917a79a946b0c4a.png'
                },{
                    img:'https://assets.2dfire.com/frontend/20c79045ac5d15536ccd7000c463041a.png'
                }]
            }],

            sceneTwoTitle:_i('DOC.SCHEME_DATA.SCENE.TWO.TITLE'),
            parceTwoMeituanList:[{
                data:'商家在美团外卖已开通商户，需要在美团开放平台申请开发者账号，获得appid和appsecret'
            }, {
                data:'在美团外卖开放平台的回调地址填写open.2dfire.com/meituan/shop/tool/bind.do'
            }, {
                data: '通过工程或者销售联系二维火开放平台进行配置即可完成对接'
            }],

            parceTwoBluetoothList:[{
                data:'在收银机上二维火商店的餐饮应用的左边最下面第三方应用安装模块中下载美团外卖商家版;',
                imglist:[{
                    img:'https://assets.2dfire.com/frontend/a89ff688fc21d6d1188974fab47a396c.png'
                },{
                    img:'https://assets.2dfire.com/frontend/045af299ff2ab16ba3eacbdd4aef1bf4.png'
                }]
            }, {
                data:'在完成后，收银机器上打开美团外卖商家版，点击登录，用账号和密码登入或者是手机号码和验证码登入'
            }, {
                data:'登录外卖软件后，在左下角我的中，找到打印机设置——蓝牙打印机——选择蓝牙打印机配对，打开打印商家联后，进行打印测试页检测，最后打开自动打印小票按钮'
            }, {
                data:'打开外卖软件进行接单即可'
            }],

            sceneThreeTitle:_i('DOC.SCHEME_DATA.SCENE.THREE.TITLE'),
            parceThreeList:[{
                data:`${_i('DOC.SCHEME_PRECEL.SCENE.THREE.CON.ONE_ONE')}</br>${_i('DOC.SCHEME_PRECEL.SCENE.THREE.CON.ONE_TWO')}</br><a class="scene-a" href=${_i('DOC.SCHEME_PRECEL.SCENE.THREE.CON.ONE.A')}>${_i('DOC.SCHEME_PRECEL.SCENE.THREE.CON.ONE.A')}</a>`
            },{
                data:`${_i('DOC.SCHEME_PRECEL.SCENE.THREE.CON.TWO_ONE')}</br>${_i('DOC.SCHEME_PRECEL.SCENE.THREE.CON.TWO_TWO')}</br>${_i('DOC.SCHEME_PRECEL.SCENE.THREE.CON.TWO_THREE')}`
            },{
                data:`${_i('DOC.SCHEME_PRECEL.SCENE.THREE.CON.THREE_ONE')}</br>
                        ${_i('DOC.SCHEME_PRECEL.SCENE.THREE.CON.THREE_TWO')}
                        </br><a class="scene-a" href=${_i('DOC.SCHEME_PRECEL.SCENE.THREE.CON.THREE.A')}>${_i('DOC.SCHEME_PRECEL.SCENE.THREE.CON.THREE.A')}</a>`
            },{
                data:`${_i('DOC.SCHEME_PRECEL.SCENE.FOUR.CON.ONE')}`
            },{
                data:`${_i('DOC.SCHEME_PRECEL.SCENE.FIVE.CON.ONE')}`
            },{
                data:`${_i('DOC.SCHEME_PRECEL.SCENE.SIX.CON.ONE')}`
            },{
                data:`${_i('DOC.SCHEME_PRECEL.SCENE.SEVEN.CON.ONE')}`
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
