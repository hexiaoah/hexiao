<script>
    /**
     -- zeqi@2dfire

     @props:
     label：左侧说明
     content: 右侧条数

     显示列表总条数用
     */

    export default {
        props: ["label","content","selectedList"],
        data() {
            return {
            }
        },
        created() {

        }
    }
</script>

<template>
<div class="total">
    <span class="label">{{label}}</span>
    <span class="content">{{content}}</span>
    <span class="label selected-laber" v-if="selectedList">已选择门店数：</span>
    <span class="selectd-content" v-if="selectedList">{{selectedList && selectedList.length}}</span>
</div>
</template>

<style lang="scss" scoped>
    .total {
        margin: 20px 0 20px 0;
        font-size: 14px;
        font-weight: bold;
    }

    .label {
        color: #999999;
    }

    .content {
        color: #151515;
    }
    .selected-laber{
        margin-left: 25px;
    }
    .selectd-content{
        color: #5599FF;
    }
</style>

