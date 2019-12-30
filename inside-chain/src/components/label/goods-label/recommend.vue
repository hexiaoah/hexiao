<template>
    <div class="recommond-wrapper">
        <div class="title">
            推荐指数
        </div>
        <ul class="label-list">
            <li v-for="(item, $index) in recommendList"
                @click="change(item)"
                :class="{active: item.recommendLevel == choosedId}"
                :key="$index">
                {{item.recommendLevelString}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'recommend',
        props: {
            recommendList: {
                type: Array,
                default(){
                    return []
                }
            },
            defaultValue: {
                type: Number,
                default: 0
            }
        },
        watch: {
            defaultValue(newval){
                this.choosedId = newval
            }
        },
        data(){
            return {
                choosedId: 0
            }
        },
        methods: {
            change(item){
                this.choosedId = item.recommendLevel
                this.$emit('change-recommend', item)
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .recommond-wrapper {
        margin-top: 30px;

        .title {
            font-size: 14px;
            color: #333333;
        }

        .label-list {
            overflow: hidden;

            li {
                width: 70px;
                height: 30px;
                line-height: 30px;
                background: #F1F1F1;
                border-radius: 67px;
                text-align: center;
                float: left;
                margin-top: 10px;
                margin-right: 10px;
                cursor: pointer;

                &.active {
                    background: #D83F3F;
                    color: white;
                }
            }
        }

        .custom{
            width: 100px !important;
            float: left;
            border: 1px solid #D83F3F;
            border-radius: 100px;
            display: inline-block;
            height: 30px;
            line-height: 30px;
            cursor: pointer;
            background: white !important;
            color: #D83F3F;
            text-align: center;
        }
    }
</style>

