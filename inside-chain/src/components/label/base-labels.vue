<script>
    /**
     -- zeqi@2dfire

     @props:
     list: 展示的标签列表
     show: 是否展示右侧删除按钮，默认展示
            1：不展示

     @events:
     on-del: 点击删除的冒泡时间
     return 当前点击的节点及节点序号

     @desc:
     标签列表展示，右侧有删除按钮

     */


    export default {
        name: "baseLabels",
        props: ["list","show"],
        data() {
            return {
//                输入合法
                success: true
            }
        },
        components: {},
        methods: {
            emitDel(item, index) {
                let e = {
                    item: item,
                    index: index
                }
                this.$emit('on-del', e)
            }
        }
    };
</script>

<template>
    <div class="label-wrap">
        <transition-group name="list-label" tag="p">
            <div class="list-label-item" v-for="(item,index) in list" :key="item.value">
                <div class="label">
                    <span class="label-content">{{item.name}}</span>

                    <span v-if="!show" class="del" @click="emitDel(item,index)"></span>
                </div>
            </div>
        </transition-group>
    </div>
</template>

<style lang="scss" scoped>
    .label {
        vertical-align: middle;
        font-size: 12px;

        height: 30px;
        line-height: 30px;
        background: #F1F1F1;
        color: #333333;
        border-radius: 100px;

        display: inline-block;

        margin: 15px 10px 0 0;

        padding: 0 10px;
    }

    .label-content {
        display: inline-block;
    }

    .del {
        display: inline-block;
        height: 12px;
        width: 12px;
        vertical-align: middle;
        margin-top: -2px;
        margin-left: 6px;

        background: url("https://assets.2dfire.com/frontend/0e77b242cfde1b5658cc06d1238a554c.png");
        background-size: cover;

        cursor: pointer;
    }

    .del-icon {
        vertical-align: middle;
    }

    .list-label-item {
        transition: all 0.3s;
        display: inline-block;
    }

    .list-label-enter {
        opacity: 0;
        transform: translateX(30px);
    }

    .list-label-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }

    .list-label-leave-active {
        position: absolute;
    }

</style>

