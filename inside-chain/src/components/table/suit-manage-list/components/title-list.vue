<template>
    <div class='title-list'>
        <div v-for="(item, $index) in titleList"
             class="title-item"
             :style="{width: item.width}"
             :key="$index">
            {{item.name}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'table-title',
        props: {
            titleList: {
                type: Array,
                default: null
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>

    .title-list {
        background: #F1F1F1;
        height: 40px;
        line-height: 40px;
        list-style-type: none;
        padding-left: 30px;

        /deep/ label {
            width: 100%;
        }

        .title-item {
            display: inline-block;
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
        }
    }
</style>

