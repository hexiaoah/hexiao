<template>
<div>
    <Form class="img-form" :label-width="165">
        <FormItem label="套餐主图" class="category">
            <drap-upload :default-list="defaultImgList"
                         :entity-id="entityId"
                         @upload-remove="uploadRemove"
                         @upload-success="uploadSuccess">
                         <div slot="promptMes">
                            <p>图片格式：png,jpeg,jpg,gif；建议使用png格式图片</p>
                            <p>图片尺寸：建议比例为5:4（如750*600px）</p>
                            <p>图片大小：不可超过10M，至多可添加5张</p>
                            <p>注意：系统会在主图中截取正方形区域作为菜单缩略图，以手机实际预览效果为准<span @click="handleClick" class="example">示例</span></p>
                        </div>
            </drap-upload>
        </FormItem>
    </Form>
    <Modal 
        v-model="visible"
        width='600'
        footerHide
    >
        <div>
            <img style="width:520px;display:block;margin:0 auto;" src="https://assets.2dfire.com/frontend/9cc7696eb06429081f8036c5cac31c8a.png">
        </div>
    </Modal>
</div>
</template>

<script>
    import DrapUpload from '@/components/upload/drap-upload'
    import {UPLOAD_PATH} from "apiConfig"
    import {mapState, mapGetters, mapActions} from "vuex"
    export default {
        data() {
            return {
                toback: [],
                defaultImgList: [],
                visible: false
            }
        },
        computed: {
            ...mapGetters({
                suitDetailToBackMainImg: "setting/suitDetailToBackMainImg",
            }),
            entityId(){
                let entityId = this.$route.query.entityId
                let plateEntityId = this.$route.query.plateEntityId
                return entityId || plateEntityId
            }
        },
        watch: {
            suitDetailToBackMainImg(newval){
                if (newval && newval.length) {
                    let arr = newval && newval.map(item => {
                            if (!item.fullPath) {
                                item.fullPath = UPLOAD_PATH + item.path
                            }
                            return item
                        })
                    this.defaultImgList = (arr || []).filter(item => item.isValid)
                    this.toback = [].concat(arr)
                }
            }
        },
        methods: {
            ...mapActions({
                _changeSuitBaseInfoVal: 'setting/changeSuitBaseInfoVal',
            }),
            uploadRemove(path, uid){
                for (let i = 0; i < this.toback.length; i++) {
                    if (this.toback[i].fullPath === path && this.toback[i].uid === uid) {
                        this.toback[i].isValid = 0
                    }
                }
                this._changeSuitBaseInfoVal({attr: 'mainPicture', val: this.toback})
            },
            uploadSuccess(res){
                let index = this.toback.length + 1
                this.toback.push({
                    fullPath: UPLOAD_PATH + res.data.data,
                    isValid: 1,
                    path: res.data.data,
                    sortCode: index
                })
                this._changeSuitBaseInfoVal({attr: 'mainPicture', val: this.toback})
            },
            handleClick(){
                this.visible = true
            },
            handleOk(){
                this.visible = false
            }
        },
        components: {
            DrapUpload
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .ivu-form-item {
        margin-bottom: 10px;

        /deep/ .ivu-form-item-content {
            height: 88px;

            .ivu-input-wrapper {
                height: 100%;

                textarea {
                    height: 100% !important;
                    font-size: 12px;
                }
            }
        }
    }
    .example{
        display: inline-block;
        padding: 0 5px;
        margin-left: 5px;
        background-color: dodgerblue;
        color: #ffffff;
        cursor: pointer;
        border-radius: 4px;
    }
</style>

