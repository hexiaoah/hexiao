<script>
    /**
     -- zeqi@2dfire
     单行显示所有选择项目的name，点击选择项，则返回当前点击项信息
     样式:
        名称1 名称2 名称3 ...
     @props:
        list: array[] 选择项  例如: [{"name": "abc", "entityId": "123"}]
        active: string 选中项的id
        show:
             1 - 展示name 筛选品牌使用

             2- 展示branchName 筛选分支机构使用
     @event:
        on-tap: 点击，返回当前点击项
     */

    export default {
        props:['list','active','show'],
        methods:{
            emitSelect(e){
                // 点击事件冒泡，带当前点击项
                this.$emit('on-tap', e);
            }
        },
        created() {
            console.log(typeof this.show)
        }
    }
</script>

<template>
    <div class="content-wrap">

        <span class="filter-item" :class="{'item-active':item.entityId == active}" @click="emitSelect(item)" v-for="item in list">
            <a v-if="show == 1">
                {{item.name}}
            </a>
            <a v-if="show == 2">
                {{item.branchName}}
            </a>
        </span>
    </div>
</template>

<style lang="scss" scoped>
    .content-wrap {
        font-size: 12px;
        color: #333333;
    }
    .filter-item {
        display: inline-block;
        margin-right: 38px;
        margin-bottom: 10px;
    }

    .item-active {
        a {
            color: #D83F3F;
        }
    }

</style>

