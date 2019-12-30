<template>
    <div class="wrapper">
    <div class="rule-wrapper">
        <!--<h1 class="title-h1" v-pre>移动支付收单服务协议</h1>-->

        <h2 class="title-h2" v-pre>积分是什么？</h2>
        <p class="p" v-pre>
            积分是对您在二维火掌柜上完成相应积分任务给予的奖励。积分任务包括但不限于签到、体验产品功能、购买消费等。获得的积分可以在积分商城直接兑换相应的商品和增值服务。
        </p>
        <h2 class="title-h2" v-pre>怎样获取积分？</h2>
        <ul>
            <li class="list" v-pre>
                1、您可以通过完成积分任务来获取积分，所有的积分任务可以在积分商城页面进行查看。
            </li>
            <li class="list" v-pre>
                2、当完成积分任务以后，需要在积分商城页面进行领取操作该积分才会计入积分账户。
            </li>
            <li class="list" v-pre>
                3、日常任务未领取积分次日清零，请及时领取。
            </li>
            <li class="list" v-pre>
                4、每日每个门店积分发放上限为500，超过上限后您仍可以做任务但积分不再发放。
            </li>
        </ul>
        <h2 class="title-h2" v-pre>如何使用积分？</h2>
        <ul>
            <li class="list" v-pre>
                1、只有开通了积分兑换权限才可以进行积分兑换，您可以联系店铺管理者开通相应权限。
            </li>
            <li class="list" v-pre>
                2、您可以在积分商城页面或积分兑好礼页面查看可以兑换的商品并进行兑换。
            </li>
            <li class="list" v-pre>
                3、积分一经兑换不可退还。
            </li>
            <li class="list" v-pre>
                4、当年获得的积分次年年底失效，请及时使用兑换。
            </li>
        </ul>
    </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'rule',
        computed: {
            ...mapGetters([
                "getRule"
            ])
        },
        created(){
            document.title = '积分规则'
            window.tdfire.configNavigationBar(stringify({title: '积分规则'}))
        }
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border: 1px solid transparent;
        background-image: url(https://assets.2dfire.com/frontend/2a09d96ab1a27c8475b4e53f6f6132a0.jpg);
        background-size: cover;
        background-repeat: repeat;
        overflow-y: auto;
    }
    .rule-wrapper {
        font-size: 16PX;
        padding: 0 10PX;
    }

    .title-h1 {
        font-size: 16PX;
        text-align: center;
    }

    .top {
        font-size: 14PX;
        font-weight: 600;
        letter-spacing: 0;
        line-height: 20PX;
    }

    .title-h2 {
        margin: 20PX 0;
        font-size: 14PX;
    }

    .list, .p {
        letter-spacing: 0;
        line-height: 18PX;
        font-size: 14PX;
        margin: 20PX 0;
    }
</style>

