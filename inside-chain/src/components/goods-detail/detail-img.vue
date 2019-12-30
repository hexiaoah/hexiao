<template>
    <div class="cashier-b clearfix">
        <Form :model="formItem" ref="formInline" :label-width="150" :rules="ruleValidate">
            <FormItem label="商品介绍" class="order-num" prop="memo">
                <Input v-model="formItem.memo"
                       :maxlength="250"
                       type="textarea"
                       @on-change="changeDetailImgVal('memo', formItem.memo)"
                       :autosize="{minRows: 2,maxRows: 5}"
                       placeholder="可在此添加关于菜品的文字介绍">
                </Input>
            </FormItem>
            <FormItem label="在客户端置顶并大图显示" v-show="recommendLevel > 0" class="isshow-topimg">
                <i-switch v-model="formItem.showTop === 1"
                          size="default"
                          :disabled="!isDisabled"
                          @on-change="changeDetailImgVal('showTop', $event)">
                </i-switch>
            </FormItem>
            <FormItem label="商品详情图" class="upload goods-detail-img">
                <drap-upload :default-list="defaultList"
                             :entity-id="entityId"
                             :num="24"
                             @upload-remove="uploadRemove"
                             @upload-success="uploadSuccess">
                             <div slot="promptMes">
                                <p>图片格式：png,jpeg,jpg,gif；建议使用png格式图片</p>
                                <p>图片尺寸：建议比例为5:4（如750*600px）</p>
                                <p>图片大小：不可超过10M，至多可添加24张</p>
                            </div>
                </drap-upload>
            </FormItem>
            <FormItem label="商品视频" class="goods-video" v-show="formItem.video && formItem.video.videoCoverUrl">
                <div class="video-img"
                     :style="{backgroundImage: 'url(' + (formItem.video && formItem.video.videoCoverUrl) + ')'}">
                </div>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from "vuex"
    import {UPLOAD_PATH} from "apiConfig"
    import DrapUpload from '@/components/upload/drap-upload'
    export default {
        props: {
            checkForm: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                formItem: {
                    memo: '',
                    showTop: 0,
                    video: {}
                },
                defaultList: [],
                picListToBack: [],
                ruleValidate: {
                    memo: [
                        {
                            required: true,
                            trigger: 'change',
                            validator(rule, val, callback){
                                if (val && val.length > 250) {
                                    callback('输入错误！至多输入250个字符')
                                }
                                else {
                                    callback()
                                }
                            }
                        }
                    ]
                }
            }
        },
        computed: {
            ...mapState({
                recommendLevel(state){
                    return (state.setting.common.goods.detailToBack.label && state.setting.common.goods.detailToBack.label.recommendLevel) || 0
                },
                isDisabled(state){
                    let a = state.setting.common.goods.detailToBack.headPicList
                    if (!a || !a.filter(item => item.isValid === 1).length) {
                        this.formItem.showTop = 0
                        this._changeGoodsItemVal({attr: 'showTop', val: 0})
                    }
                    return a && a.filter(item => item.isValid === 1).length
                }
            }),
            ...mapGetters({
                goodsDetailFromBackMediaStream: "setting/goodsDetailFromBackMediaStream",
            }),
            entityId(){
                let entityId = this.$route.query.entityId
                let plateEntityId = this.$route.query.plateEntityId
                return entityId || plateEntityId
            }
        },
        watch: {
            goodsDetailFromBackMediaStream(newval){
                let {memo, showTop, detailPicList, video} = newval
                this.formItem = {
                    memo,
                    showTop,
                    video
                }
                this.defaultList = JSON.parse(JSON.stringify(detailPicList || []))
                this.picListToBack = JSON.parse(JSON.stringify(detailPicList || []))
            },
            checkForm(newval, oldval){
                if(newval !== oldval){
                    this.$refs['formInline'].validate(valid => {
                        this.$emit('check-detail-img', valid)
                    })
                }
            }
        },
        methods: {
            ...mapActions({
                _changeGoodsItemVal: 'setting/changeGoodsItemVal'
            }),
            changeDetailImgVal(type, val){
                let value = val
                if (Object.prototype.toString.call(val) === '[object Boolean]') {
                    value = Number(val)
                }
                this._changeGoodsItemVal({attr: type, val: value})
            },
            uploadRemove(path){
                for (let i = 0; i < this.picListToBack.length; i++) {
                    if (this.picListToBack[i].fullPath === path) {
                        this.picListToBack[i].isValid = 0
                    }
                }
                this._changeGoodsItemVal({attr: 'detailPicList', val: this.picListToBack})
            },
            uploadSuccess(res){
                let index = this.picListToBack.length + 1
                this.picListToBack.push({
                    fullPath: UPLOAD_PATH + res.data.data,
                    isValid: 1,
                    path: res.data.data,
                    sortCode: index
                })
                this._changeGoodsItemVal({attr: 'detailPicList', val: this.picListToBack})
            }
        },
        components: {
            DrapUpload
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>

    .cashier-b {
        padding-left: 67px;

        .isshow-topimg {
            /deep/ .ivu-form-item-content {
                height: auto !important;
            }
        }

        .ivu-form-item {
            margin-bottom: 15px;

            /deep/ .ivu-form-item-content {
                height: 88px;

                .ivu-input-wrapper {
                    height: 100%;
                    width: 400px;

                    textarea {
                        height: 100% !important;
                        font-size: 12px;
                    }
                }
            }
        }

        /deep/.ivu-form-item-label{
            &::before{
                display: none;
            }
        }

        .goods-video {
            margin-top: 45px;
            margin-bottom: 0;

            /deep/ .ivu-form-item-content {
                height: auto !important;
            }

            .video-img {
                height: 80px;
                width: 80px;
                background: red;
            }
        }

        .advice {
            font-size: 12px;
            color: #999999;
            letter-spacing: 0;
            line-height: 18px;
            margin-top: 10px;
        }
    }

    .goods-detail-img{

        /deep/ .ivu-form-item-content{
            height: auto !important;
        }
    }

</style>
