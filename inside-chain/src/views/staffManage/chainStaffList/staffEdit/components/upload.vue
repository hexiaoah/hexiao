<template>
    <div class="upload">
            <div class="demo-upload-list" v-for="item in uploadList">
                <div v-if="item.status === 'finished'">
                    <img class="showPicture" :src="item.fullPath">
                    <div class="demo-upload-list-cover">
                        <Icon type="arrow-swap" @click.native="handleRemove(item)"></Icon>
                    </div>
                </div>
                <div v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </div>
            </div>
            <Upload
                v-show="isShow && !uploadList.length"
                class="upload-wrapper"
                ref="upload"
                :data="formData"
                :headers="configHeader"
                :show-upload-list="false"
                :default-file-list="defaultValue"
                :on-success="handleSuccess"
                :format="['jpg','png']"
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
        <div class="annotation">{{title}}</div>
    </div>
</template>

<script>
    import { UPLOAD_OSS, API_BASE_URL, ENV, UPLOAD_PATH } from "apiConfig"
    import Cookie from "@2dfire/utils/cookie"
    import {GW} from '@2dfire/gw-params'
    const AND = '&' + GW + '&env=' + ENV + '&lang=zh_CN&'

    export default {
        name: 'drap-upload',
        props: {
            limitSize: {
                type: Number,
                default: 1
            },
            defaultList: {
                type: Array,
                default(){
                    return []
                }
            },
            num: {
                type: Number,
                default: 1
            },
            entityId: {
                type: String,
                default: ''
            },
            title:{
                type: String,
                default: ''
            },
            picType:{
                type:String,
                default:''
            }
        },
        data() {
            return {
                defaultValue: [],
                uploadList: [],
                formData: {
                    // projectName: 'OssDownload',
                    // path: 'bossemploy'
                },
                configHeader: {
                    // "app-id": 200800,
                    // "session-id": ''
                },
            }
        },
        computed: {
            isShow(){
                let arr = this.uploadList.filter(item => item.status === 'finished')
                return arr.length < this.num
            },
            action(){
                // return `${UPLOAD_OSS}` //http://ifiletest.2dfire.com/99933682/employee/uuID.png
                return `${API_BASE_URL}com.dfire.soa.boss.centerpc.file.service.IUploadFileService.upload&projectName=zmfile&path=${this.entityId}/employee${AND}`
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
                // const fileList = this.$refs.upload.fileList
                // let index = fileList.indexOf(file)
                // let path = fileList[index].fullPath
                // let uid = fileList[index].uid
                // this.$refs.upload.fileList.splice(index, 1)
                this.$refs.upload.handleClick()
                // this.$emit('upload-remove', this.picType)
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
                    res.type = this.picType
                    this.$emit('upload-success', imgPath, this.picType)
                    console.log(this.uploadList)
                }
                else{
                    this.$Message.error('图片上传失败，请重试')
                }

                // if(res.code == '1'){
                //     file.fullPath = res.data
                //     this.$emit('upload-success', res)
                // }else{
                //     this.$Message.error('图片上传失败，请重试')
                // }
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
                    content: '图片大小不得大于1M，请重新上传'
                })
            },
            // 上传之前检查是否超过5张图片
            handleBeforeUpload(file){
                this.uploadList = []
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
.upload{
    display: inline-block;
    .upload-wrapper {
        width: 80px;
        height: 80px;
        line-height: 80px;
        background: #F1F1F1;
        margin-bottom: 5px;
        margin: 0 auto;
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
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        margin: 0 auto;
        &>div{
            width: 100%;
            height: 100%;
        }
    }
    .showPicture{
        display: block;
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
    .annotation{
        text-align: center;
        padding-top: 5px;
    }
}

</style>

