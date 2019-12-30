<template>
    <li class="item-wrapper">
        <div class="img"
            v-if="itemData.imageUrl"
            :style="{ backgroundImage: 'url(' + itemData.imageUrl + ')'}">
        </div>
        <div class="item">
            <h3 class="item-title">{{itemData.title}}</h3>
            <p class="item-text">{{itemData.content}}</p>
        </div>
    </li>
</template>

<script>
export default {
  name: 'function-introfuce-item',
  props: {
    itemData: {
      default() {
        return {}
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
    .item-wrapper{
            height: 144px;
            padding: 60px 30px;
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

            .item{
                width: 570px;
                font-size: 30px;
                color: #333333;
                padding-left: 30px;
                &-title{
                    font-weight: bold;
                    font-size: 30px;
                    color: #333333;
                    line-height: 44px;
                    margin-bottom: 6px;
                }
                &-text{
                   font-size: 26px;
                   color: #999999;
                   line-height: 36px;
                }
            }
        }
</style>