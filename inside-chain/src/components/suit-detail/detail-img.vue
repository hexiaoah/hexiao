<template>
    <div class="cashier-b clearfix">
        <Form :model="detailInfo" :label-width="150">
            <FormItem label="套餐介绍" class="order-num">
                <Input v-model="detailInfo.detail"
                       :maxlength="250"
                       type="textarea"
                       :autosize="{minRows: 2,maxRows: 5}"
                       @on-change="change('detail', detailInfo.detail)"
                       placeholder="可在此添加关于套餐的文字介绍">
                </Input>
            </FormItem>
            <FormItem label="套餐详情图" class="upload">
                <drap-upload :default-list="defaultImgList"
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
            <FormItem label="商品视频" class="video upload" v-show="detailInfo && detailInfo.video && detailInfo.video.coverUrl">
                <div class="video-img" :style="{backgroundImage: 'url(' + detailInfo && detailInfo.video && detailInfo.video.coverUrl + ')'}"></div>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions} from 'vuex'
    import DrapUpload from '@/components/upload/drap-upload'
    import { UPLOAD_PATH } from "apiConfig"
    export default {
        data () {
            return {
                defaultImgList: [],
                toBack: []
            }
        },
        computed: {
            ...mapGetters({
                suitDetailToBackDetailImg: "setting/suitDetailToBackDetailImg",
                detailInfo: "setting/suitDetailToBackDetailAndVideo",
            }),
            entityId(){
                let entityId = this.$route.query.entityId
                let plateEntityId = this.$route.query.plateEntityId
                return entityId || plateEntityId
            }
        },
        watch: {
            suitDetailToBackDetailImg(newval){
                let arr = newval && newval.map(item => {
                        if(!item.fullPath){
                            item.fullPath = UPLOAD_PATH + item.path
                        }
                        return item
                    })
                this.defaultImgList = (arr || []).filter(item => item.isValid)
                this.toBack = [].concat(arr)
            }
        },
        methods: {
            ...mapActions({
                _changeSuitBaseInfoVal: 'setting/changeSuitBaseInfoVal'
            }),
            change(type, val){
                let value = val
                if(Object.prototype.toString.call(val) === '[object Boolean]'){
                    value = Number(val)
                }
                this._changeSuitBaseInfoVal({attr: type, val: value})
            },
            uploadRemove(path, uid){
                for(let i=0; i<this.toBack.length; i++){
                    if(this.toBack[i].fullPath === path && this.toBack[i].uid === uid){
                        this.toBack[i].isValid = 0
                    }
                }
                this._changeSuitBaseInfoVal({attr: 'detailImgList', val: this.toBack})
            },
            uploadSuccess(res){
                let index = this.toBack.length + 1
                this.toBack.push({
                    fullPath: UPLOAD_PATH + res.data.data,
                    isValid: 1,
                    path: res.data.data,
                    sortCode: index
                })
                this._changeSuitBaseInfoVal({attr: 'detailImgList', val: this.toBack})
            }
        },
        components: {
            DrapUpload
        },
    }
</script>
<style lang="scss" type="text/scss" scoped>

    .cashier-b {
        padding-left: 45px;

        .ivu-form-item {
            margin-bottom: 10px;

            /deep/ .ivu-form-item-content {
                //width: 400px !important;

                .ivu-input-wrapper {
                    height: 100%;

                    textarea {
                        width: 400px;
                        height: 88px !important;
                        font-size: 12px;
                    }
                }
            }
        }
    }

    .video{
        margin-bottom: 0 !important;

        .video-img{
            width: 80px;
            height: 80px;
        }
    }
</style>
