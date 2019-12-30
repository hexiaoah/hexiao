<template>
    <div>
        <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
                <img :src="item.fullPath">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>

        <Upload
            :style="{visibility: isShow ? 'visible' : 'hidden'}"
            class="upload-wrapper"
            ref="upload"
            :data="formData"
            :show-upload-list="false"
            :default-file-list="defaultValue"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="limitSize * 1024"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            :action="action">
            <div>
                <Icon type="plus" size="20"></Icon>
            </div>
        </Upload>
        <div class="advice">
            <slot name="promptMes"></slot>
        </div>
        <!-- <p class="advice">建议尺寸：800*800像素，大小不可超过{{limitSize}}M，最多上传{{num}}张</p> -->
    </div>
</template>

<script>
    import { UPLOAD_PATH,  API_BASE_URL, ENV} from "apiConfig"
    import {GW} from '@2dfire/gw-params'
    const AND = '&' + GW + '&env=' + ENV + '&lang=zh_CN&'
    export default {
        name: 'drap-upload',
        props: {
            limitSize: {
                type: Number,
                default: 10
            },
            defaultList: {
                type: Array,
                default(){
                    return []
                }
            },
            num: {
                type: Number,
                default: 5
            },
            entityId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                defaultValue: [],
                uploadList: [],
                formData: {}
            }
        },
        computed: {
            isShow(){
                let arr = this.uploadList.filter(item => item.status === 'finished')
                return arr.length < this.num
            },
            action(){
                return `${API_BASE_URL}com.dfire.soa.boss.centerpc.file.service.IUploadFileService.upload&projectName=zmfile&path=${this.entityId}/menu${AND}`
            }
        },
        watch: {
            defaultList(newval){
                this.defaultValue = newval
                //赋值后马上更新
                this.$nextTick(()=> {
                    this.uploadList = this.$refs.upload.fileList;
                })
            }
        },
        mounted() {
            this.uploadList = this.$refs.upload.fileList
        },
        methods: {
            // 删除已上传图片
            handleRemove(file){
                const fileList = this.$refs.upload.fileList
                let index = fileList.indexOf(file)
                let path = fileList[index].fullPath
                let uid = fileList[index].uid
                this.$refs.upload.fileList.splice(index, 1)
                this.$emit('upload-remove', path, uid)
            },
            // 上传成功
            handleSuccess(res, file){
                if(res.data.data){
                    let imgPath = ''
                    if(/^https:\/\//.test(res.data.data)){
                        imgPath = res.data.data
                    }else{
                        imgPath = UPLOAD_PATH + res.data.data
                    }
                    file.fullPath = imgPath
                    res.data.data = res.data.data.replace(UPLOAD_PATH,'')
                    this.$emit('upload-success', res)
                }
                else{
                    this.$Message.error('图片上传失败，请重试')
                }
            },
            // 上传格式失败
            handleFormatError(){
                this.$Message.warning({
                    content: '上传图片格式有问题,请确认'
                });
            },
            // 图片限制
            handleMaxSize(){
                this.$Message.warning({
                    content: '图片大小不得大于10M，请重新上传'
                })
            },
            // 上传之前检查是否超过5张图片
            handleBeforeUpload(file){
                //设置图片
                this.$set(this.formData, 'file', file)
                const check = this.uploadList.length < this.num
                if (!check) {
                    this.$Message.warning({
                        content: `上传图片不能超过${this.num}张`
                    })
                }
                return check
            }
        }
    }
</script>

<style type="text/scss" lang="scss" rel="stylesheet/scss" scoped>
    .upload-wrapper {
        width: 80px;
        height: 80px;
        line-height: 80px;
        background: #F1F1F1;

        & > div {
            height: 80px !important;
            width: 80px !important;
            line-height: 80px !important;
        }

        .ivu-icon-plus {
            width: 26px;
            height: 26px;
            font-size: 26px;
            transform: translateY(5px);
            color: #CCCCCC;
            border-radius: 8px;
        }
    }

    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }

    .advice {
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        line-height: 18px;
    }
</style>

