<template>
    <div class="list-part-baseinfo">
        <img-box :src="itemData.itemPath || itemData.imgUrl" class="img-box"></img-box>
        <div class="content">
            <div class="title oneline">{{itemData.itemName}}</div>
            <div class="code">套餐编码: <span v-if="itemData.itemCode">{{itemData.itemCode}}</span></div>
            <span :class="['price', {active: (itemData.itemMemberPrice === 0 || itemData.itemMemberPrice) && (itemData.itemMemberPrice !== itemData.itemPrice)}]">
                <span>¥ {{itemData.itemPrice && itemData.itemPrice.toFixed(2)}}</span>
                /{{itemData.itemAccount}}
            </span>
            <span class="mermber-price" v-if="(itemData.itemMemberPrice === 0 && itemData.itemPrice !== 0) || (itemData.itemMemberPrice && (itemData.itemMemberPrice !== itemData.itemPrice))">
                <span>¥ {{itemData.itemMemberPrice && itemData.itemMemberPrice.toFixed(2)}}</span>
                /{{itemData.itemAccount}}
            </span>
            <i class="mermber-icon" v-if="(itemData.itemMemberPrice === 0 && itemData.itemPrice !== 0) || (itemData.itemMemberPrice && (itemData.itemMemberPrice !== itemData.itemPrice))"></i>
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
        watch: {
            itemData(newval){
                console.log(newval)
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

        img {
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
                margin-bottom: 4px;
                font-weight: bold;
                max-width: 115px;
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

            .mermber-icon{
                display: inline-block;
                vertical-align: middle;
                width: 38px;
                height: 16px;
                background-size: contain;
                background-image: url(https://assets.2dfire.com/frontend/b8bd5b42f411673be2f8dc6bcc8743db.png);
            }

            .mermber-price {
                span {
                    color: #D83F3F;
                }
            }
        }
    }
    .img-box{
        float: left;
        width: 80px;
        height: 80px;
    }
</style>

