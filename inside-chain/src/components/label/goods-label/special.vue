<template>
    <div class="features-wrapper">
        <div class="title">
            特色标签
        </div>
        <ul class="label-list">
            <li v-for="(item, $index) in specialList"
                :class="{active: item.specialTagId === choosedId || (!item.specialTagId && !choosedId)}"
                @click="change(item)"
                :key="$index">
                {{item.specialTagString}}
            </li>
            <!--下期要做-->
            <!--<li class="custom" @click="addItem">-->
                <!--<i data-v-6caa5ff1="" class="ivu-icon ivu-icon-plus"></i>-->
                <!--<span>自定义标签</span>-->
            <!--</li>-->
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'special',
        props: {
            specialList: {
                type: Array,
                default(){
                    return []
                }
            },
            defaultValue: {
                type: String,
                default: ''
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
                this.choosedId = item.specialTagId
                this.$emit('change-special', item)
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .features-wrapper {
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

