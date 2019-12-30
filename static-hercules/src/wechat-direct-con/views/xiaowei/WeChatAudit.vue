<template>
<!-- 微信审核页面 -->
    <div class="audit-wrapper">
        <div class="top-wrapper">
            <img class="img-audit-status" v-if="imgContent" :src="imgContent"/>
            <div class="audit-status">{{titleContent}}</div>
            <div class="submit-time" v-if="isAuditing">{{getApplyTime}}</div>
        </div>
        <div class="content-wrapper" v-if="isAuditing">
            <div class="explain-content">你的申请资料已经成功提交，微信官方会在1-3个工作日内审核，请耐心等待。</div>
            <div class="explain-content">审核结果会以邮件和短信的形式通知到您，请及时关注！</div>
            <div class="check-info" @click="checkInfo">查看申请资料</div>
        </div>
        <div class="failure-wrapper" v-if="!isAuditing">
            <div class="failure-content">{{auditMessage}}</div>
            <div class="btn">
                 <btn-custom-short @click.native="reApply">重新申请</btn-custom-short>
            </div>
        </div>
    </div>
</template>

<script>
import BtnCustomShort from '../../components/btn-custom-short.vue'

export default {
    data() {
        return {
            auditStatus: this.$route.query.auditStatus, // 审核状态
            applyTime: this.$route.query.applyTime,
            auditMessage: '失败原因: ' + this.$route.query.auditMessage,  // 审核失败原因
            titleContent: '',
            imgContent: ''
        }
    },
    components: {
        BtnCustomShort
    },
    computed: {
        isAuditing() {
            if(this.auditStatus === true || this.auditStatus === 'true') {  // 审核中，返回操作中true会变为字符串
                this.titleContent = '微信审核中！';
                this.imgContent = "https://assets.2dfire.com/frontend/760515f5926619d080ed765d3802a2ac.png";
                return true;
            } else {  // 审核失败
                this.titleContent = '微信审核失败！';
                this.imgContent = "https://assets.2dfire.com/frontend/0d3bb4caf2b823c8b8e31a9a3fe08e31.png";
                return false;
            }
        },
        getApplyTime() {
            if(this.isAuditing) {
                var date = new Date(parseInt(this.applyTime))
                var year = date.getFullYear()+'年'
                var month = date.getMonth()+1+'月'
                var day = date.getDate()+'日 '
                var hour = date.getHours()+":"
                var min = date.getMinutes()
                if(min < 10) {
                    min = '0' + min
                }
                return '申请提交时间：'+year+month+day+hour+min
            }
        },
    },
    created() {
        
    },
    methods: {
        reApply() {
            this.$router.push({path: '/input/first/first', query:{isNeedGetInfo: true}})  // 需要从服务端获取表单数据
        },
        checkInfo() {  // 查看申请资料
            this.$router.push({path: '/merchantinfo', query:{canEditInfo: false}})  // 不可修改
        },
    }
}
</script>

<style type="text/scss" lang="scss" scoped>

    .audit-wrapper {
        margin-top: 212px;

        .top-wrapper{
            text-align: center;

            .img-audit-status {
                width: 58px;
                height: 58px;
                vertical-align: middle;
            }

            .audit-status {
                margin-top: 40px;
                color: #333333;
                font-size: 34px;
            }

            .submit-time {
                margin-top: 30px;
                color: #333333;
                font-size: 30px;
                margin-bottom: 10px;
            }
        }

        .content-wrapper {
            .explain-content {
                color: #666666;
                font-size: 26px;
                line-height: 36px;
                padding: 0 30px;
            }

            .check-info {
                color: #0088ff;
                font-size: 26px;
                line-height: 36px;
                padding: 0 30px;
            }
        }

        .failure-wrapper {
            .failure-content {
                padding: 20px 30px;
                font-size: 26px;
                color: #666666;
                line-height: 36px;
                text-align: center;
            }

            .btn {
                text-align: center;
                margin: 52px 76px;
            }
        }
    }
</style>