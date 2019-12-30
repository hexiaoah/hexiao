<script>
    /**
     -- zeqi@2dfire

     @props:
     type
     1: 成功
     2: 失败
     3: 等待
     发布状态（0：待发布,1：发布中，2：发布失败,3：发布成功）

     显示下发状态用模块
     */

    export default {
        props: ["type", "datetime", "errormsg", "canretry"],
        data() {
            return {
                titleClass: ''
            }
        },
        methods: {
            cancelDist(){
//                取消下发
                this.$emit('cancel')
            },
            retryDist(){
//                重发下发
                this.$emit('retry')

            }
        },
        computed: {
            statusTitle(){
                let self = this
                switch(self.type){

                    case 0: {
                        self.titleClass = 'wait'
                        return '等待下发…'
                    }
                    case 1: {
                        self.titleClass = 'wait'
                        return '发布中'
                    }
                    case 2: {
                        self.titleClass = 'fail'
                        return '下发失败！'
                    }
                    case 3: {
                        self.titleClass = 'success'
                        return '下发成功~'
                    }
                    default: {
                        return '数据加载中'
                    }

                }
            },
            showError() {
                let self = this
                if(self.type === 2){
                    return true
                }else{
                    return false
                }
            }
        },
        created() {

        }
    }
</script>

<template>
    <div class="dist-status">
        <div class="status-img" :class="titleClass"></div>
        <div class="status-desc">
        <p class="title" :class="titleClass">{{statusTitle}}</p>
        <div class="desc">
            <p v-if="showError">
                失败原因：{{errormsg}}
            </p>
            <p>
                下发开始时间：{{datetime}}
            </p>
        </div>
        <Button type="ghost" @click="retryDist" v-if="type === 2" :disabled="!canretry">重新下发</Button>
        <Button type="ghost" @click="cancelDist" v-if="type === 0">取消下发</Button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dist-status {
    text-align: center;

}
.status-img {
    display: inline-block;
    width: 130px;
    height: 76px;
    background-size: cover;
    margin-left: -140px;
    margin-right: 10px;
    &.success{
        background-image: url("https://assets.2dfire.com/frontend/341d86aa4e44f5c0b080b96e6616c65c.png")
    }
    &.fail {
        background-image: url("https://assets.2dfire.com/frontend/673276a1e93eaf6b18dc32a386affa5a.png")
    }
    &.wait {
        background-image: url("https://assets.2dfire.com/frontend/cf54ab15336c8dcb08edc157fe659ec0.png");
    }
}

    .title {
        font-size: 20px;
        font-weight: bold;
    }
    .wait {
        color: #FFAA00;
    }
    .success {
        color: #49C070;
        padding-top: 15px;
    }
    .fail {
        color: #D83F3F;
    }

    .desc {
        margin-top: 3px;
        color: #999999;
        font-size: 12px;
        margin-bottom: 10px;
    }

    .status-desc{
        display: inline-block;
        vertical-align: top;
    }

</style>

