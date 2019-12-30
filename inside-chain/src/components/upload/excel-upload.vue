<template>
    <div>
        <div v-show="fileName">
        <span class="file-text">{{fileName}} <Icon v-show="percent === 100" class="del" type="close-circled" @click="removeFile"></Icon></span>
        <div class="progress-wrap">
            <Progress :percent="percent" :stroke-width="5"></Progress>
        </div>
        </div>
        <Upload
            v-show="!fileName"
            class="upload-wrap"
            ref="upload"
            :data="formData"
            :headers="configHeader"
            :show-upload-list="false"
            :default-file-list="defaultValue"
            :on-progress="handleProgress"
            :on-success="handleSuccess"
            :format="['xls','xlsx']"
            :max-size="limitSize"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            type="select"
            :before-upload="handleBeforeUpload"
            :action="action">
            <span class="tip-text" v-show="!fileName">请上传Excel文件</span>
        </Upload>
    </div>
</template>

<script>
    import {UPLOAD_OSS} from "apiConfig"
    import Cookie from "@2dfire/utils/cookie"

    export default {
        name: 'excel-upload',
        props: {
            // unit: kb
            limitSize: {
                type: Number,
                default: 1024
            },
            entityId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                percent: 0,
                defaultValue: [],
                formData: {
                    projectName: 'OssDownload',
                    path: 'pc3_5/user'
                },
                configHeader: {
                    "app-id": 200800,
                    "session-id": ''
                },
                fileName: '',
                startTime: 0,
                endTime: 0
            }
        },
        computed: {
            // 上传地址
            action() {
                return `${UPLOAD_OSS}`
            }
        },
        methods: {
            // 上传进度
            handleProgress(event, file) {
                let self = this;
                self.fileName = file.name

                self.$emit('upload-progress', event)
            },
            // 上传成功
            handleSuccess(res) {
                let self = this
                self.endTime = self.getMS();
                self.handleResult(res)
            },
            // format result
            handleResult(res){
                let self = this
                if(res.code === 1){
                    self.fakeProgress()
                    self.$emit('upload-success', res)
                }else{
                    self.fileName = ''
                    self.$Message.warning(res.message || '网络波动，请重试')
                }
            },
            fakeProgress(){
                let self = this
                self.percent = 0;
                let step = parseInt(((self.endTime - self.startTime)/100).toFixed(0));

                let plusInt = setInterval(() => {
                    self.percent = self.percent + step;
                    if (self.percent >= 99) {
                        self.percent = 100
                        clearInterval(plusInt)
                    }
                }, 1)
            },
            // 上传格式失败
            handleFormatError() {
                this.$Message.warning({
                    content: '仅允许上传格式为.xls或.xlsx的文件！'
                });
            },
            // 图片限制
            handleMaxSize() {
                this.$Message.warning({
                    content: `文件大小不得超过${this.limitSize}kb，请重新上传`
                })
            },
            // 开始上传前，获取文件地址
            handleBeforeUpload() {
                let self = this;
                self.startTime = self.getMS()
            },
            getMS() {
                return (new Date()).getTime()
            },
            removeFile() {
                let self = this;
                self.fileName = ''
                self.$emit('upload-del')
            }
        },
        created() {
            let self = this;
            // OSS上传需要用户token
            let userToken = '';
            if (Cookie.getItem('entrance') !== undefined) {
                userToken = encodeURIComponent(JSON.parse(decodeURIComponent(Cookie.getItem('entrance'))).token)
            }
            self.configHeader["session-id"] = userToken;
        }
    }
</script>

<style lang="scss" scoped>
    .upload-wrap {
        height: 32px;
        line-height: 32px;
    }
    .tip-text {
        color: #999999;
        cursor: pointer;
    }

    .file-text {
        color: #333333;
        .del {
            margin-left: 10px;
            font-size: 16px;
            cursor: pointer;
            vertical-align: text-bottom;
        }
    }

    .progress-wrap {
        width: 360px;
    }
</style>

