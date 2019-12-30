<script>
    /**
     -- zeqi@2dfire
     单行显示所有选择项目的name，点击选择项，则返回当前点击项信息
     样式:
        一级> 二级> 三级
     @props:
     list: array[] 选择项  例如: [{"name": "abc", "entityId": "123"}]
     active: string 选中项的id
     @event:
     on-tap: 点击，返回当前点击项
     */

    export default {
        props: ['list', 'active'],
        methods: {
            emitSelect(item, index) {
                // 点击事件冒泡，带当前点击项和序号
                this.$emit('on-tap', {item, index});
            }
        },
        created() {
        }
    }
</script>

<template>
    <div class="content-wrap">

        <span class="filter-item" :class="{'item-active':item.entityId == active }" @click="emitSelect(item,index)"
              v-for="(item,index) in list">
            <a>
                {{item.branchName}}
            </a>

            <span v-if="index != list.length -1">> </span>

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
        margin-right: 5px;
        margin-bottom: 10px;
    }

    .item-active {
        a {
            color: #D83F3F;

        }
    }

</style>

