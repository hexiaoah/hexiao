<template>
    <Modal
        class="modal"
        :value="isShow"
        :width="width"
        :closable="false"
        :loading="loading"
        :mask-closable="false"
        okText="保存"
        :title="title"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="body">
            <type :label-vo-list="labelList.labelVoList"
                  :label-material-vo-list="labelList.labelMaterialVoList"
                  :default-type-id="typeId"
                  :default-materials="choosedMainIngredient"
                  @change-main-ingredient="changeChoosedMainIngredient"
                  @change-type="changeType">
            </type>

            <acrid :acrid-list="labelList.acridList"
                   :default-value="acridLevel"
                   @change-acrid="changeAcrid">
            </acrid>

            <special :special-list="labelList.specialList"
                     :default-value="specialTagId"
                     @change-special="changeSpecial">
            </special>

            <recommend :recommend-list="labelList.recommendList"
                       :default-value="recommendLevel"
                       @change-recommend="changeRecommend">
            </recommend>
        </div>
    </Modal>
</template>

<script>
    import Type from '@/components/label/goods-label/type'
    import acrid from '@/components/label/goods-label/acrid'
    import special from '@/components/label/goods-label/special'
    import Recommend from '@/components/label/goods-label/recommend'
    import {mapActions, mapState} from 'vuex'
    export default {
        name: 'goods-modal-lable-setting',
        props: {
            title: {
                type: String,
                defautl: ''
            },
            width: {
                type: Number,
                default: 450
            },
            isShow: {
                type: Boolean,
                default: false
            },
            labelList: {
                type: Object,
                default(){
                    return {}
                },
                required: true
            },
            defaultValue: {
                type: Object,
                default(){
                    return {}
                }
            }
        },
        watch: {
            defaultValue(newval){
                let obj = newval && JSON.parse(JSON.stringify(newval))
                let arr = []
                this.typeId = obj.materials && obj.materials.labelId
                this.acridLevel = (obj.acrid && obj.acrid.acridLevel) || 0
                this.specialTagId = (obj.specialTag && obj.specialTag.specialTagId) || ''
                this.recommendLevel = (obj.recommend && obj.recommend.recommendLevel) || 0

                if (obj.materials && obj.materials.subList && obj.materials.subList.length) {
                    for (let i = 0; i < obj.materials.subList.length; i++) {
                        if (obj.materials.subList[i].subList && obj.materials.subList[i].subList.length) {
                            obj.materials.subList[i].subList.map(item => {
                                item.fatherId = obj.materials.subList[i].labelId
                                return item
                            })
                            arr = arr.concat(obj.materials.subList[i].subList)
                        }
                    }
                }
                this.choosedMainIngredient = [].concat(arr)
                this.$emit('choosed-item-list', arr)
                this._changeGoodsItemVal({
                    attr: 'label', val: {
                        typeId: this.typeId,
                        tagSource: 1,
                        acridLevel: (obj.acrid && obj.acrid.acridLevel) || 0,
                        specialTagId: (obj.specialTag && obj.specialTag.specialTagId) || '',
                        recommendLevel: (obj.recommend && obj.recommend.recommendLevel) || 0,
                        mainIngredient: arr
                    }
                })
            }
        },
        data(){
            return {
                loading: true,
                // 被选中的类型id
                typeId: 0,
                // 主料设置
                choosedMainIngredient: [],
                // 辣椒
                acridLevel: 0,
                // 特色标签
                specialTagId: '',
                // 推荐指数
                recommendLevel: 0
            }
        },
        computed: {
            ...mapState({
                labelFromStore(state){
                    return state.setting.common.goods.detailToBack.label
                }
            })
        },
        methods: {
            ...mapActions({
                _changeGoodsItemVal: 'setting/changeGoodsItemVal'
            }),
            changeType(item){
                this.typeId = item.labelId
                this.choosedMainIngredient = []
            },
            changeChoosedMainIngredient(arr){
                this.choosedMainIngredient = arr
            },
            changeAcrid(item){
                this.acridLevel = item.acridLevel
            },
            changeSpecial(item){
                this.specialTagId = item.specialTagId
            },
            changeRecommend(item){
                this.recommendLevel = item.recommendLevel
            },
            ok(){
                if (this.typeId > 5) {
                    this._changeGoodsItemVal({
                        attr: 'label',
                        val: {
                            typeId: this.typeId,
                            tagSource: 1,
                            acridLevel: this.acridLevel || 0,
                            specialTagId: this.specialTagId || '',
                            recommendLevel: this.recommendLevel || 0,
                            mainIngredient: this.choosedMainIngredient || []
                        }
                    })
                    this.$emit('choosed-item-list', this.choosedMainIngredient)
                    this.$emit('change-visible', 'close')
                }
                else {
                    if (this.choosedMainIngredient && this.choosedMainIngredient.length) {
                        this._changeGoodsItemVal({
                            attr: 'label',
                            val: {
                                typeId: this.typeId,
                                tagSource: 1,
                                acridLevel: this.acridLevel || 0,
                                specialTagId: this.specialTagId || '',
                                recommendLevel: this.recommendLevel || 0,
                                mainIngredient: this.choosedMainIngredient || []
                            }
                        })
                        this.$emit('choosed-item-list', this.choosedMainIngredient)
                        this.$emit('change-visible', 'close')
                    }
                    else {
                        this.$Message.error('请先选择主料')
                        setTimeout(() => {
                            this.loading = false
                            this.$nextTick(() => {
                                this.loading = true
                            })
                        }, 500)
                    }
                }
            },
            cancel(){
                this.typeId = this.labelFromStore.typeId
                this.acridLevel = this.labelFromStore.acridLevel
                this.specialTagId = this.labelFromStore.specialTagId || ''
                this.recommendLevel = this.labelFromStore.recommendLevel
                this.choosedMainIngredient = [].concat(this.labelFromStore.mainIngredient)
                this.$emit('choosed-item-list', this.choosedMainIngredient)
                this.$emit('change-visible', 'close')
            }
        },
        components: {
            Type,
            acrid,
            special,
            Recommend
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .modal {
        /deep/ .ivu-modal-body {
            padding-top: 0;
        }

        /deep/ button {
            width: 88px;
            height: 32px;
            border: 1px solid #CCCCCC;
            border-radius: 4px;

            & + button {
                border: none;
            }
        }
    }

    .body {
        /deep/ .ivu-select {
            width: 88px;
            margin-right: 10px;
        }

        /deep/ .ivu-input-wrapper {
            width: 180px;
        }

        .refresh {
            width: 36px;
            height: 36px;
            float: right;
            display: inline-block;
            background-size: cover;
            background-image: url(https://assets.2dfire.com/frontend/cadf13fa9eb8bdc77b5545d7c18464e9.png);
        }

        .table-header {
            height: 40px;
            margin-top: 10px;
            background: #F1F1F1;

            .title-wrapper {
                display: block;
                height: 40px;
                line-height: 40px;
                padding-left: 10px;

                /deep/ .ivu-checkbox {
                    margin-right: 5px;
                }
            }
        }

        .table-ul {
            height: 480px;
            overflow: auto;
            border: 1px solid #E5E5E5;

            li {
                height: 80px;
                padding: 0 10px;
                border-bottom: 1px solid #E5E5E5;

                /deep/ .ivu-checkbox-wrapper {
                    vertical-align: 25px;
                }

                .img {
                    width: 60px;
                    height: 60px;
                    display: inline-block;
                    margin-top: 10px;
                    background: red;
                    margin-right: 10px;
                }

                .content {
                    vertical-align: top;
                    height: 80px;
                    margin-top: 20px;

                    .title {
                        font-size: 14px;
                        color: #333333;
                    }

                    .price {
                        font-size: 12px;
                        color: #D83F3F;
                        line-height: 12px;
                    }
                }

                .mark {
                    float: right;
                    font-size: 12px;
                    color: #FFFFFF;
                    line-height: 16px;
                    padding: 0 3px;
                    background: #5599FF;
                    border-radius: 2px;
                    margin-top: 20px;
                }

                .img, .content, .mark {
                    display: inline-block;
                }
            }
        }
    }

    .footer {
        overflow: hidden;

        .comfirm {
            background: #D83F3F;
            border: 1px solid #D83F3F;
            border-radius: 4px;
            float: left;
        }
    }
</style>
