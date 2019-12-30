<script>
    /**
     -- zeqi@2dfire
     单行显示所有选择项目的name，点击选择项，则返回当前点击项信息
     地区选择用
     @props:
     list: array[] 选择项  例如: [{"name": "abc", "entityId": "123"}]
     area: object{}
     area.selected_provinceId - 选中的省直辖市id
     area.selected_cityId - 选中的城市id
     area.selected_townId - 选中的县镇id
     @event:
     on-tap: 点击，返回当前点击项
     */

    export default {
        props: ['list', 'area'],
        methods: {
            emitSelect(e) {
                // 点击事件冒泡，带当前点击项
                this.$emit('on-tap', e);
            }
        },
        created() {
        }
    }
</script>

<template>
    <div class="content-wrap">
        <span class="filter-item"
              :class="{'item-active': item.id == area.selected_provinceId || item.id == area.selected_cityId || item.id == area.selected_townId}"
              @click="emitSelect(item)" v-for="item in list">
               <a>
                {{item.name}}
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
        margin-right: 30px;
        margin-bottom: 10px;
    }

    .item-active {
        a {
            color: #D83F3F;
        }
    }

</style>

