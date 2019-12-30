<template>
    <div class="group-wrapper">
        <div class="group-name">套餐分组</div>
        <div class="group-other-name">
            <div v-for="(item, $index) in titleList"
                  :style="{width: item.width}"
                  :key="$index">
                {{ item.name }}
            </div>
        </div>
        <div class="operation">操作</div>
    </div>
</template>

<script>
    export default {
        props: {
            titleList: {
                type: Array,
                default: null
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    .group-wrapper {
        display: flex;
        justify-content: space-between;
        flex-flow: nowrap row;
        background: #F1F1F1;
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        color: #333333;
    }

    .group-name {
        width: 110px;
        flex-basis: 110px;
        padding-left: 10px;
    }

    .group-other-name {
        flex: 1;

        &>div{
            display: inline-block;
        }
    }

    .operation {
        width: 172px;
        flex-basis: 172px;
    }
</style>

