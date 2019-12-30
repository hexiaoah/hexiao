<template>
    <div class='list-part-baseinfo'>
        <img-box :src="itemData.imgUrl" class="img-box"></img-box>
        <div class="content">
            <div class="title">
                <span class="name">{{itemData.suitName}}</span>
                <span v-if="itemData.chain && !isChain" class="label">连锁下发</span>
            </div>

            <div class="code">套餐编码: <span v-if="itemData.suitCode">{{itemData.suitCode}}</span></div>
            <span :class="['price', {active: (itemData.memberPrice === 0 || itemData.memberPrice) && (itemData.memberPrice !== itemData.price)}]">
                <span>¥ {{itemData.price.toFixed(2)}}</span>
                /{{itemData.account}}
            </span>
            <span class="mermber-price" v-if="(itemData.memberPrice === 0 && itemData.price !== 0) || (itemData.memberPrice && (itemData.memberPrice !== itemData.price))">
                <span>¥ {{itemData.memberPrice.toFixed(2)}}</span>
                /{{itemData.account}}
            </span>
            <i class="mermber-icon" v-if="(itemData.memberPrice === 0 && itemData.price !== 0) || (itemData.memberPrice && (itemData.memberPrice !== itemData.price))"></i>
        </div>
    </div>
</template>

<script>
    import ImgBox from '@/components/img/img-box'
    export default {
        name: 'base-info',
        props: {
            itemData: {
                type: Object,
                defult: null
            }
        },
        computed: {
            isChain(){
                return !this.$route.query.entityId
            }
        },
        components: {
            ImgBox
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    .list-part-baseinfo {
        padding: 10px 10px 10px 0;

        /deep/ .ivu-checkbox {
            position: absolute;
            top: 42px;
            left: -23px;
        }

        .img-box {
            width: 80px;
            height: 80px;
            float: left;
        }

        .content {
            margin-left: 90px;
            padding-top: 10px;

            .title {
                font-size: 14px;
                color: #333333;
                font-weight: bold;

                .name{
                    max-width: 150px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    display: inline-block;
                }

                .label{
                    height: 18px;
                    background: #5599FF;
                    border-radius: 2px;
                    font-size: 12px;
                    color: #FFFFFF;
                    text-align: right;
                    line-height: 16px;
                    letter-spacing: 0;
                    padding: 1px 4px;
                    vertical-align: 6px;
                    margin-left: -1px;
                }
            }

            .code {
                font-size: 12px;
                color: #666666;
                line-height: 12px;
                margin-bottom: 4px;
            }

            .price {

                &.active {
                    text-decoration: line-through;
                    color: #999999;

                    span{
                        color: #999999;
                    }
                }

                span {
                    color: #D83F3F;


                    &.active {
                        color: #999999;
                    }
                }
            }

            .mermber-price {
                span {
                    color: #D83F3F;
                }
            }

            .mermber-icon{
                display: inline-block;
                vertical-align: middle;
                width: 38px;
                height: 16px;
                background-size: contain;
                background-image: url(https://assets.2dfire.com/frontend/b8bd5b42f411673be2f8dc6bcc8743db.png);
            }
        }
    }
</style>

