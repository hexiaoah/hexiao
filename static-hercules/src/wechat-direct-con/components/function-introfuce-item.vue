<template>
    <li class="item-wrapper">
        <div class="img"
            v-if="itemData.imageUrl"
            :style="{ backgroundImage: 'url(' + itemData.imageUrl + ')'}">
        </div>
        <p class="item-text">{{itemData.content}}</p>
    </li>
</template>

<script>
    export default {
        name: 'function-introfuce-item',
        props: {
            itemData: {
                default() {
                    return{}
                }
            }
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    .item-wrapper{
            height: 144px;
            padding: 40px 60px 40px 60px;
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            vertical-align: middle;

            .img{
                width: 80px;
                height: 80px;
                background-size: cover;
            }

            .item-text{
                width: 88%;
                font-size: 30px;
                color: #333333;
                padding-left: 30px;
            }
        }
</style>