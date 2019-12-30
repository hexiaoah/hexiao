<template>
    <div class="list-part-baseinfo">
        <ImgBox class="goods-img" :src="item.path"></ImgBox>
        <div class="content">
            <div class="title">{{item.itemName}}</div>
            <div class="code">{{item.isInclude | showItemType}}: {{item.itemCode}}</div>
            <!--<span v-show="item.memberPrice" :class="['price', 'vip', {origin: item.memberPrice}]">-->
            <!--<span :class="{origin: item.memberPrice}">¥ {{item.price}}</span>-->
            <!--/份-->
            <!--</span>-->
            <span>
                <span class="member-price">¥ {{item.price}}</span>
                /{{item.account | showAccount}}
            </span>
        </div>
        <div class="fl-clear"></div>
    </div>
</template>

<script>

    import ImgBox from '@/components/img/img-box'

    export default {
        name: 'base-info',
        components: {ImgBox},
        props: {
            item: {
                type: Object,
                defult: null
            }
        },
        filters: {
            showItemType: function (value) {
                if (value) return '套餐编码'
                return '商品编码'
            },
            showAccount: function (value) {
                if (value) return value
                return '份'
            }
        },
    }
</script>

<style lang="scss" scoped>

    .list-part-baseinfo {

        .goods-img {
            width: 80px;
            height: 80px;
            float: left;
        }

        .content {
            float: left;
            margin-left: 10px;
            padding-top: 10px;

            .title {
                font-size: 14px;
                color: #333333;
                margin-bottom: 4px;
                font-weight: bold;
            }

            .code {
                font-size: 12px;
                color: #666666;
                line-height: 12px;
                margin-bottom: 4px;
            }

            .price {

                &.origin {
                    text-decoration: line-through;
                    color: #999999;
                }

                .vip {
                    color: #D83F3F;

                    &.origin {
                        color: #999999;
                    }
                }
            }

            .member-price {
                color: #D83F3F;
            }
        }
    }
</style>

