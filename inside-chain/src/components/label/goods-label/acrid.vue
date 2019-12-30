<template>
    <div class="spicy-wrapper">
        <div class="title">
            辣椒指数
        </div>
        <ul class="label-list">
            <li v-for="(item, $index) in acridList"
                :class="{active: item.acridLevel === choosedId}"
                @click="choosed(item)"
                :key="$index">
                {{item.acridLevelString}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'acrid',
        props: {
            acridList: {
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
            choosed(item){
                this.choosedId = item.acridLevel
                this.$emit('change-acrid', item)
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .spicy-wrapper {
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
    }
</style>

