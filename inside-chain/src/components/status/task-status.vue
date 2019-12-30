<script>
    /**
     -- zeqi@2dfire

     @props:
     type：
     1：成功
     2：失败
     3：等待

     任务状态
     */

    export default {
        props: ["type"],
        data() {
            return {
                text: ''
            }
        },
        computed: {
            classes() {
                let status = '';
                let self = this;
                switch (self.type) {
                    case 3:
                        status = 'success';
                        self.text = '下发成功'
                        break;
                    case 2:
                        status = 'fail';
                        self.text = '下发失败'
                        break;
                    case 0:
                        status = 'wait';
                        self.text = '等待下发'
                        break;
                    case 1:
                        status = 'wait';
                        self.text = '发布中'
                        break;
                }

                return [
                    status
                ]
            }
        },
        created() {

        }
    }
</script>

<template>
    <div class="task-status" :class="classes">
        <span class="icon"></span><span class="text">{{text}}</span>
    </div>
</template>

<style lang="scss" scoped>
    .task-status {
        display: inline-block;
    }

    .icon {
        width: 18px;
        height: 18px;
        display: inline-block;
        margin-right: 5px;
        background-size: cover;
        vertical-align: middle;
    }

    .text {
        display: inline-block;
        font-size: 12px;
    }

    .success {
        .icon {
            background-image: url("https://assets.2dfire.com/frontend/ce47b8090724cbdae404138db22bb50c.png");
        }
        .text {
            color: #49C070;
        }
    }

    .fail {
        .icon {
            background-image: url("https://assets.2dfire.com/frontend/3e1dc3f9fbce2ccf7fac1fcdcaf67fe0.png");
        }
        .text {
            color: #D83F3F;
        }
    }

    .wait {
        .icon {
            background-image: url("https://assets.2dfire.com/frontend/7783711c937b326e71766109b49fc25a.png");
        }
        .text {
            color: #FFAA00;
        }
    }

</style>

