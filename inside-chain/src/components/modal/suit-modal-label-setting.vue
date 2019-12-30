<template>
    <Modal
        class="modal"
        :value="isShow"
        :width="750"
        :closable="false"
        okText="保存"
        title="套餐标签设置"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="body">
            <div class="label-wrapper">
                <div class="title">
                    辣椒指数
                </div>
                <ul class="label-list">
                    <li v-for="(item, $index) in labelList.acridMap"
                        :class="{active: item.id === acridLevel}"
                        @click="changeAcrid(item)"
                        :key="$index">
                        {{item.name}}
                    </li>
                </ul>
            </div>

            <div class="label-wrapper mt-30px">
                <div class="title">
                    特色标签
                </div>
                <ul class="label-list">
                    <li v-for="(item, $index) in labelList.specialTagList"
                        :class="{active: (item.specialTagId === specialTagId) || (specialTagId === '' && item.specialTagId === labelList.specialTagList[0].specialTagId)}"
                        @click="changeSpecial(item)"
                        :key="$index">
                        {{item.specialTagName}}
                    </li>
                </ul>
            </div>

            <div class="label-wrapper mt-30px">
                <div class="title">
                    推荐指数
                </div>
                <ul class="label-list">
                    <li v-for="(item, $index) in labelList.recommendMap"
                        :class="{active: item.id === recommendLevel}"
                        @click="changeRecommend(item)"
                        :key="$index">
                        {{item.name}}
                    </li>
                </ul>
            </div>
        </div>
    </Modal>
</template>

<script>
    import {mapState, mapActions, mapGetters} from 'vuex'
    export default {
        name: 'suit-modal-lable-setting',
        props: {
            isShow: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ...mapState({
                labelList(state){
                    return state.setting.common.suit.labelList || []
                }
            }),
            ...mapGetters({
                choosedLable: 'setting/suitDetailToBackLabel'
            })
        },
        data(){
            return {
                acridLevel: 0,
                // 特色标签
                specialTagId: '',
                // 推荐指数
                recommendLevel: 0
            }
        },
        created(){
            // 这个是为了点击返回上一步的时候从watch监听不到，所以需要事先赋值
            let {acridLevel, specialTagId, recommendLevel} = this.choosedLable
            this.acridLevel = acridLevel
            this.specialTagId = specialTagId
            this.recommendLevel = recommendLevel
        },
        watch: {
            choosedLable(newval){
                if(newval){
                    let {acridLevel, specialTagId, recommendLevel} = newval
                    this.acridLevel = acridLevel
                    this.specialTagId = specialTagId
                    this.recommendLevel = recommendLevel
                }
            }
        },
        methods: {
            ...mapActions({
                _changeSuitBaseInfoVal: 'setting/changeSuitBaseInfoVal',
            }),
            changeAcrid(item){
                this.acridLevel = item.id
            },
            changeSpecial(item){
                this.specialTagId = item.specialTagId
            },
            changeRecommend(item){
                this.recommendLevel = item.id
            },
            ok(){
                this._changeSuitBaseInfoVal({attr: 'acridLevel', val: this.acridLevel})
                this._changeSuitBaseInfoVal({attr: 'recommendLevel', val: this.recommendLevel})
                this._changeSuitBaseInfoVal({attr: 'specialTagId', val: this.specialTagId})
                this.$emit('change-visible', 'close')
            },
            cancel(){
                this.acridLevel = this.choosedLable.acridLevel
                this.specialTagId = this.choosedLable.specialTagId
                this.recommendLevel = this.choosedLable.recommendLevel
                this.$emit('change-visible', 'close')
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .modal{
        /deep/ .ivu-modal-body{
            padding-top: 10px;
        }

        /deep/ button{
            width: 88px;
            height: 32px;
            border: 1px solid #CCCCCC;
            border-radius: 4px;

            & + button{
                border: none;
            }
        }
    }

    .body{
        /deep/ .ivu-select{
            width: 88px;
            margin-right: 10px;
        }

        /deep/ .ivu-input-wrapper{
            width: 180px;
        }

        .refresh{
            width: 36px;
            height: 36px;
            float: right;
            display: inline-block;
            background-size: cover;
            background-image: url(https://assets.2dfire.com/frontend/cadf13fa9eb8bdc77b5545d7c18464e9.png);
        }

        .table-header{
            height: 40px;
            margin-top: 10px;
            background: #F1F1F1;

            .title-wrapper{
                display: block;
                height: 40px;
                line-height: 40px;
                padding-left: 10px;

                /deep/ .ivu-checkbox{
                    margin-right: 5px;
                }
            }
        }

        .table-ul{
            height: 480px;
            overflow: auto;
            border: 1px solid #E5E5E5;

            li{
                height: 80px;
                padding: 0 10px;
                border-bottom: 1px solid #E5E5E5;

                /deep/ .ivu-checkbox-wrapper{
                    vertical-align: 25px;
                }

                .img{
                    width: 60px;
                    height: 60px;
                    display: inline-block;
                    margin-top: 10px;
                    background: red;
                    margin-right: 10px;
                }

                .content{
                    vertical-align: top;
                    height: 80px;
                    margin-top: 20px;

                    .title{
                        font-size: 14px;
                        color: #333333;
                    }

                    .price{
                        font-size: 12px;
                        color: #D83F3F;
                        line-height: 12px;
                    }
                }

                .mark{
                    float: right;
                    font-size: 12px;
                    color: #FFFFFF;
                    line-height: 16px;
                    padding: 0 3px;
                    background: #5599FF;
                    border-radius: 2px;
                    margin-top: 20px;
                }

                .img, .content, .mark{
                    display: inline-block;
                }
            }
        }
    }

    .footer{
        overflow: hidden;

        .comfirm{
            background: #D83F3F;
            border: 1px solid #D83F3F;
            border-radius: 4px;
            float: left;
        }
    }

    .label-wrapper {

        &.mt-30px{
            margin-top: 30px;
        }

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
